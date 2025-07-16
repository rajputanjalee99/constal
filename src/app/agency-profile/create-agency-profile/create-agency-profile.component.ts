import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { _languagesData } from '../../languages/languages';
import { Service } from "./../../service/service.service";


@Component({
  selector: 'app-create-agency-profile',
  templateUrl: './create-agency-profile.component.html',
  styleUrls: ['./create-agency-profile.component.scss']
})
export class CreateAgencyProfileComponent implements OnInit {


  client_focus_data:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};


  agencyForm: FormGroup;
  languages: any[];
  proficiencies: any;
  today = new Date()
  agency_cover_image
  agency_profile_image
  agency_languages : any = [{
    language_name : "",
    proficiency : "",
  }]

  agency_portfolio : Array<Object> = [{
    image : "",
    project_title : "",
    project_service : "",
  }]  
  profile: any;
  years = []

  constructor(private fb : FormBuilder,private service : Service,private router : Router) {
     
    this.agencyForm = this.fb.group({
      agency_image: ['', [Validators.required]],
      agency_cover_image: ['', [Validators.required]],
      agency_tagline: ['', [Validators.required]],
      agency_overview: ['', [Validators.required]],
      total_jobs: ['', [Validators.required]],
      member_since : ['',Validators.required],
      agency_size : ['',Validators.required],
      year_founded_in : ['',Validators.required],
      web_address : ['',Validators.required],
      agency_address : ['',Validators.required],
      client_focus : ['']
    }) 

    this.getAgencyProfile();

  }

  ngOnInit(): void {


    this.client_focus_data = [
      { item_id: "Contractor", item_text: 'Contractor' },     
      { item_id: "Developer", item_text: 'Developer' },     
      { item_id: "Consultant", item_text: 'Consultant' },     
      { item_id: "Others", item_text: 'Others' },     
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  
    this.getLanguages();
    this.getProficiencies();
    const startYear = 1980
    var currentYear = new Date().getFullYear();
    var years = []
    for(var i=startYear;i<=currentYear;i++){
        years.push(i);
    } 

    this.years = years.sort().reverse();
  
  }

  getLanguages(){
    const prs = JSON.parse(_languagesData);
    
    var gp2 = [];
    for (var i = 0; i < Object.keys(prs).length; i++) {
      const value = prs[Object.keys(prs)[i]];
            
      gp2[i] = {
        name: value.name,
        nativeName: value.nativeName,
      }        
    }
       
    this.languages = gp2;
    
  }

  getProficiencies(){
    const obj = { 
      type: "proficiency"
    }
    this.service.getProficiencies(obj).subscribe(async res => {                  
      console.log("proficiencies resp ============== ",res.data)
      this.proficiencies = res.data;
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  deleteLanguages(ind){
    this.agency_languages.splice(ind,1);
  }

  addLanguages(){
    this.agency_languages.unshift({
      language_name : "",
      proficiency : "",
    })
  }

  addPortfolio(){
    this.agency_portfolio.unshift({
      image : "",
      project_title : "",
      project_service : "",
    })
  }

  removePortfolio(index){
    this.agency_portfolio.splice(index,0)
  }

  uploadPortfolio(evt: any,index) {
   
    const file = evt.target.files[0];
    var img_arr = file.name.split('.');
    console.log(file);
    const fileType = file.type.split('/')[0]

    if (fileType == "image") {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        const formData = new FormData();
        formData.append('portfolio',file);
        
        this.service.uploadPortfolioImage(formData).subscribe(async res => {          

          console.log(res);
          

          this.agency_portfolio[index]['image'] = res.data 

        },(err) => {
          this.service.handleError(err)
          console.log(err)
        })
    } else {
        evt.target.value = ""
        window.alert("Please select valid file")
    }
  }

  uploadProfileImage(evt: any) {
   
    const file = evt.target.files[0];
    var img_arr = file.name.split('.');
    console.log(file);
    const fileType = file.type.split('/')[0]

    if (fileType == "image") {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        const formData = new FormData();
        formData.append('profile',file);
        
        this.service.uploadAgencyProfile(formData).subscribe(async res => {          

          console.log(res);
          
          this.agency_profile_image = res.data
          // this.agencyForm.controls["agency_image"].setValue(res.data); 

        },(err) => {
          this.service.handleError(err)
          console.log(err)
        })
    } else {
        evt.target.value = ""
        window.alert("Please select valid file")
    }
  }

  getAgencyProfile(){
    this.service.agencyProfile().subscribe(resp => {
      this.profile = resp.profile

      if(this.profile && this.profile.agency_details){
        this.agency_portfolio = this.profile.agency_details.portfolio
        this.agency_languages = this.profile.agency_details.languages
        
      }

      if(this.profile && this.profile.agency_details && this.profile.agency_details.profile_picture){
        this.agency_profile_image = this.profile.agency_details.profile_picture;
        this.agencyForm.controls['agency_image'].setValidators([]);
        this.agencyForm.controls['agency_image'].updateValueAndValidity();        
      }

      if(this.profile && this.profile.agency_details && this.profile.agency_details.cover_picture){
        this.agency_cover_image = this.profile.agency_details.cover_picture;
        this.agencyForm.controls['agency_cover_image'].setValidators([]);
        this.agencyForm.controls['agency_cover_image'].updateValueAndValidity();        
      }

      

      if(this.profile && this.profile.agency_details){
        this.agencyForm.controls['agency_tagline'].setValue(this.profile.agency_details.agency_tagline);
        this.agencyForm.controls['agency_overview'].setValue(this.profile.agency_details.overview);
        this.agencyForm.controls['total_jobs'].setValue(this.profile.agency_details.total_jobs);
        this.agencyForm.controls['member_since'].setValue( this.profile.agency_details.member_since);
        this.agencyForm.controls['agency_size'].setValue( this.profile.agency_details.agency_size);
        this.agencyForm.controls['agency_size'].setValue( this.profile.agency_details.agency_size);
        this.agencyForm.controls['year_founded_in'].setValue( this.profile.agency_details.year_founded);
        this.agencyForm.controls['web_address'].setValue( this.profile.agency_details.web_address);
        this.agencyForm.controls['agency_address'].setValue( this.profile.agency_details.agency_address);
        this.selectedItems = this.profile.agency_details.client_focus.map(item => {
          return { item_id: item, item_text: item }
        });
      }

    },(err) => {

      this.service.handleError(err)

    })
  }

  uploadCoverImage(evt: any) {
   
    const file = evt.target.files[0];
    var img_arr = file.name.split('.');
    console.log(file);
    const fileType = file.type.split('/')[0]

    if (fileType == "image") {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        const formData = new FormData();
        formData.append('profile',file);
        
        this.service.uploadAgencyProfile(formData).subscribe(async res => { 
          this.agency_cover_image = res.data;
          // this.agencyForm.controls["agency_cover_image"].setValue(res.data);  

        },(err) => {
          this.service.handleError(err)
          console.log(err)
        })
    } else {
        evt.target.value = ""
        window.alert("Please select valid file")
    }
  }

  apply(){

    console.log(this.selectedItems);



    if(!this.agencyForm.valid){
      this.agencyForm.markAllAsTouched();
      return false;
    }

    const form = {
      // agency_name : this.agencyForm.controls['agency_name'].value,
      cover_picture : this.agency_cover_image,      
      profile_picture : this.agency_profile_image,      
      agency_tagline: this.agencyForm.controls['agency_tagline'].value,
      overview: this.agencyForm.controls['agency_overview'].value,
      total_jobs: this.agencyForm.controls['total_jobs'].value,
      member_since: this.agencyForm.controls['member_since'].value,
      agency_size: this.agencyForm.controls['agency_size'].value,
      year_founded: this.agencyForm.controls['year_founded_in'].value,
      client_focus: this.selectedItems.map(item => item.item_id),
      web_address : this.agencyForm.controls['web_address'].value,
      agency_address : this.agencyForm.controls['agency_address'].value,
      languages : this.agency_languages,
      portfolio : this.agency_portfolio,
      request_submitted_to_admin : true,
    }

    this.service.addEditAgency(form).subscribe(resp => {

      this.service.showSuccessMessage({
        message : "Agency Edited Successfully"
      })

      this.router.navigate(['']);
    },(error) => {

      this.service.handleError(error)

    })


  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
