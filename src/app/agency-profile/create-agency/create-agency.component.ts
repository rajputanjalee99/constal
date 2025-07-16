import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../../service/service.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

declare var $;

@Component({
  selector: 'app-create-agency',
  templateUrl: './create-agency.component.html',
  styleUrls: ['./create-agency.component.scss']
})
export class CreateAgencyComponent implements OnInit {

  agencyForm : FormGroup
  SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  phone
  tradeLic: string;
  licFile: string;
  profile: any;

  constructor(public router: Router,private service : Service,private fb: FormBuilder) {

    this.agencyForm = this.fb.group({
      license_number: ['', [Validators.required]],
      agency_name: ['', [Validators.required]],
      company_location: ['', [Validators.required]],
      license : ['',Validators.required], // trade
      registered_number: ['', []],
      phone_number: ['', []],
      other_details: ['', []]
    }) 

  }

  getAgencyProfile(){
    this.service.agencyProfile().subscribe(resp => {
      this.profile = resp.profile

      if(this.profile && this.profile.agency_details){
        this.agencyForm.controls['license_number'].setValue(this.profile.agency_details.license_no);
        this.agencyForm.controls['agency_name'].setValue(this.profile.agency_details.agency_name);
        this.agencyForm.controls['company_location'].setValue(this.profile.agency_details.company_location);
        this.agencyForm.controls['other_details'].setValue( this.profile.agency_details.other_details);
        // this.agencyForm.controls['license'].setValue( this.profile.agency_details.trade_license);
        
        if(this.profile.agency_details.trade_license){

          this.tradeLic = this.profile.agency_details.trade_license;

          this.agencyForm.controls['license'].setValidators([]);

          this.agencyForm.controls['license'].updateValueAndValidity();
        }

        
      
      }
    },(err) => {

      this.service.handleError(err)

    })
  }

  

  ngOnInit(): void {

    $(".new-one").hide();

    $(document).on('click','.radio-click',function(){
      $(this).parents(".frnt-div").find(".new-one").show();
      $(this).parents(".frnt-div").find(".registered-one").hide();
    });

    $(document).on('click','.radio-click-1',function(){
      $(this).parents(".frnt-div").find(".new-one").hide();
      $(this).parents(".frnt-div").find(".registered-one").show();
    });

    this.getAgencyProfile();
  }

  saveAgencyDetails(){

    if(!this.agencyForm.valid){
      this.agencyForm.markAllAsTouched();
      return
    }
    const form = {
      license_no : this.agencyForm.controls['license_number'].value,
      agency_name: this.agencyForm.controls['agency_name'].value,
      company_location : this.agencyForm.controls['license_number'].value,
      trade_license : this.tradeLic,
      // registered_number : "",
      other_details : this.agencyForm.controls['other_details'].value, 
    }

    this.service.addEditAgency(form).subscribe(resp => {

      this.service.showSuccessMessage({
        message : "Profile Updated Successfully"
      })
      this.router.navigate(['agency-disciplines']);
    },(err) => {
      this.service.handleError(err)
    })

    



  }

  checkNumber(){
    
  }

  resetLic(){
    this.tradeLic = "";
    this.licFile = "";
    this.agencyForm.controls['license'].setValue(null)
  }

  onSelectLic(event){
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log('file ',file.size);  
      if (file.size/1024/1024 > 25) {
        // this.isLoading = false;
        event.srcElement.value = null;
        this.agencyForm.controls['license'].setValue(null);
        this.tradeLic = "";
        this.service.showErrorMessage({ message : "The file should not exceed more than 25MB.", action : "Okay"});
        return;
      }  
      this.tradeLic = file.name
      this.licFile = file

      const formData = new FormData();
      formData.append('profile',file);
      
      // we will store lic in profile image as well
      this.service.uploadAgencyProfile(formData).subscribe(async res => {          

        console.log(res);
        
        this.tradeLic = res.data
        // this.agencyForm.controls["agency_image"].setValue(res.data); 

      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })

    }
  }

  preventSpace(event,formcontrolname){
    const inp = event.target.value
    if(!inp.trim()){
      event.target.value = ""
      if(formcontrolname){

        this.agencyForm.controls[formcontrolname].setValue("");

      }
      event.preventDefault();
      

    }

    

  }

}
