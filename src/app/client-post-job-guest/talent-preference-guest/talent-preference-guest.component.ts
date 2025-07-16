import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from  "@angular/router";
import { Router, CanActivate } from '@angular/router';
import { EmailExistComponent } from "./../../common/snackbar/email_exist/email.component";
declare let $ : any
import {MatTabGroup} from '@angular/material/tabs';


@Component({
  selector: 'app-talent-preference-guest',
  templateUrl: './talent-preference-guest.component.html',
  styleUrls: ['./talent-preference-guest.component.scss']
})
export class TalentPreferenceGuestComponent implements OnInit {

   activeIndex: number;
  activeIndex2: number;
  @ViewChildren('childTabs') childTabs: QueryList<MatTabGroup>;
    onTabChange(event: any){
    this.activeIndex = event.index;

    this.childTabs.forEach(childTab => {
       childTab.realignInkBar();
    });
  }
    onTabChange2(event: any){
    console.log(event)
    this.activeIndex2 = event.index;
    
  }
  value: number = 0;
      minDate = new Date();

    options: Options = {
    floor: 0,
    ceil: 30,
    step: 5,
    showTicks: true,
    showTicksValues: true,
    translate: (value: number): string => {
      if(value==30){
        return value+"+";
      }else{
        return value+"";
      }
    }
  };

  form: FormGroup;
  isLoading = false;
  specialities = [];
  newAddskill=[];
  tools_add=[];
  selectedSpecialities = [];
  newselection=[];
  specialitiesAdd = [];
  specialityIds = {};
  clientSpecialityDigitalServices = [];
  clientSpecialityTraditionalServices = [];
  jobDetail = null;
  addedSkill:any;
  totalTalents = [];
  currentIndex = 0;
  enterLocation ="";
  talentLocation = "remotely";
  skills: any;
  selected_skills=[];
  interpersonalSkills:any;
  specialityID: any;
  topSkills:any;
  tool_skills: any;
  selected_tool_skills=[];
  category="traditional"
  speciality
  service_name
  speciality_ids=[];
    traditional_services_List = [];

  selected_services=[];
  serviceList=[];
  countryCode:any;
  disciplineId: any;
  category_list = [{value: 'traditional', name: 'Traditional'},{value: 'digital',name: 'Digital'}];
  public saveSpeciality:boolean= false;
  specChecked:false;
    country_list=[];
    states_list=[];
    cities_list=[];
    selected_digital_specialities=[];
    english_level=[];
  speciality_name
  // constructor() { }
  constructor(public router: Router,private service : Service,private _snackBar: MatSnackBar,private fb: FormBuilder) {
    // // window.service = this.service
    // this.form = this.fb.group({
    //   // pay_type: ['', Validators.required],
    //   job_start_date: ['', Validators.required],
    //   job_end_date: ['', Validators.required],
    // })
    const job_id = localStorage.getItem("job_id");

    if(!job_id){
        this.router.navigate(['getting-started']);
        this.service.showErrorMessage({
          message : "Please complete 1 step first"
        })
    }
  }

  ngOnInit(): void {
    this.getJobSpecialities();
    this.getJobDetail();
    this.countries();
    this.getLanguageData();
  }

  getSkillsData(){
    this.service.getSkillsData().subscribe(res => {
      console.log('getSkills',res);
      this.tool_skills = res.technologySkills;
      console.log('in', this.skills)
    },(error) => {
      this.service.handleError(error);

    })
  }
   countries(){

    this.service.getLocationData({}).subscribe(res => {
    console.log('countries',res)
      this.country_list = res.countries
    },(error) => {
      this.service.handleError(error)
    })
  }
    changeCountry(event){
    console.log(event);
    this.countryCode= event.target.value
    const form = {
      country_code : event.target.value
    }
    this.service.getLocationData(form).subscribe(res => {
      this.states_list = res.states
    },(error) => {
      this.service.handleError(error)
    })

  }
    changeState(event){
    console.log('evevnt',event.target.value);
    const form = {
      state_code : event.target.value,
      country_code : this.countryCode
    }
    this.service.getLocationData(form).subscribe(res => {
      this.cities_list = res.cities
    },(error) => {
      this.service.handleError(error)
    })
  }

   deleteSpeciality(speciality_id){
    if(speciality_id){
      const obj = {
        speciality_id: speciality_id,
      }
      console.log("delete speciality obj ============= ",obj)
      this.service.deleteSpeciality(obj).subscribe(async res => {
        console.log("delete speciality resp ============ ",res)
        this.getJobSpecialities();
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }
  getJobDetail(){

    if(localStorage.getItem("talents")){

      this.totalTalents = JSON.parse(localStorage.getItem("talents"))

    }


    // const job_id = localStorage.getItem("job_id");
    let job_id;
		if(localStorage.getItem("reuse_job_id")){
			job_id = localStorage.getItem("reuse_job_id");
		}else{
			job_id = localStorage.getItem("job_id");
		}
    if (job_id && job_id!=undefined) {
      this.service.getJobDetail(job_id).subscribe(async res => {
        this.isLoading = false
        this.jobDetail = res.details;
        console.log("jobDetail response dd ================== ",res)
        for (let i = 0; i <= res.details.total_talents_required; i++) {
         // this.totalTalents.push(i);
         console.log(  res.details.job_talents[i])
           console.log(this.totalTalents[i])
if(res.details.job_talents.length){

                                         }
        }
        
        console.log("total talents ================== ",this.totalTalents)
        // this.form.setValue({
        //   title: res.details && res.details.title ? res.details.title : "",
        //   description: res.details && res.details.description ? res.details.description : "",
        // });

        // if(res.details && res.details.visibility){
        //   this.visibility = res.details.visibility;
        // }

        // if(res.details && res.details.co_workers.length){
        //   this.co_workers = res.details.co_workers
        // }

        // if(res.details && res.details.project_files.length){
        //   this.files = res.details.project_files
        // }

      },(err) => {
        this.isLoading = false
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      this.jobDetail = null;
    }
  }

  onCheckChange(event){
        console.log(event.target.value)
  }

  getJobSpecialities(){
  this.disciplineId= localStorage.getItem('disciplineId')
  let param=this.disciplineId;
    this.service.getJobSpecialities(param).subscribe(async res => {
      this.isLoading = false
      this.specialities = res.list
      console.log('sp', this.specialities)
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
    })
  }

  chooseSpeciality(speciality_id,index,speciality){
    // this.selectedSpecialities.push(speciality_id);
    this.speciality_ids=this.totalTalents[index]['specialities'].push(speciality_id)
            console.log('specialityids', this.speciality_ids)

    this.totalTalents[index]['specialities_full'].push(speciality)
    //console.log("speciality_ids =============== ",this.selectedSpecialities)
    // this.specialityIds.clientSpecialities = this.selectedSpecialities;
  //  console.log("spe ids ==============",this.specialityIds)
    this.getClientSpecialityServices(this.totalTalents[index]['specialities']);
        this.getSkills(this.totalTalents[index]['specialities']);
  }

  removeSpeciality(_id,ind){
    let index = this.specialities.findIndex((item) => {
      return item == _id
    });

    let index3 = this.totalTalents[ind].specialities.findIndex((item) => {
      return item == _id
    });

    let index4 = this.totalTalents[ind].specialities.findIndex((item) => {
      return item._id == _id
    });


    this.specialities.splice(index,1)
    this.totalTalents[this.currentIndex].specialities.splice(index3,1)
    this.totalTalents[this.currentIndex].specialities_full.splice(index4,1)

    console.log("speciality_ids =============== ",this.selectedSpecialities)
  }

  addIndustry(speciality_id){
    console.log(speciality_id)
    const skill_name = this.newAddskill; 
    // if(industry_name.length==1 && this.selected_specialities.length){
    if(skill_name.length==1){
      const obj = {
        name: skill_name[0].value,
        type: "industry",
        discipline_speciality_id: speciality_id
      }
      this.service.addNewClientSkill(obj).subscribe(async res => {
        this.selected_skills.push(res.data._id)
        this.newAddskill = [];
            let id=[];
            id.push(speciality_id)
    this.getSkills(id)
    console.log(obj)
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }

   addTool(speciality_id){
    
    const tool_name = this.tools_add; 
    // if(tool_name.length==1 && this.speciality_id){
    if(tool_name.length==1){
      const obj = {
        name: tool_name[0].value,
        type: "tool_technology",
        discipline_speciality_id: speciality_id
      }
      
      this.service.addNewClientSkill(obj).subscribe(async res => {
        
        this.selected_tool_skills.push(res.data._id)
            let id=[];
            id.push(speciality_id)
            this.getSkills(id)       
            this.tools_add = [];
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }
  showTalentTab(ind){
      console.log(ind)
      this.currentIndex = ind
  }
  onCheckboxChangeTraditional(id){
this.selected_services.push(id)
    console.log(this.selected_services); 
    }

     onCheckboxChangeDigital(id){
this.selected_digital_specialities.push(id)
    console.log(this.selected_digital_specialities); 
    }


  getClientSpecialityServices(spl){
    const obj = {
      clientSpecialities : spl
    }

    this.service.getClientSpecialityServices(obj).subscribe(async res => {

      this.clientSpecialityDigitalServices = res.digitalServices;
      this.clientSpecialityTraditionalServices = res.traditionalServices;
      this.serviceList=res.specialityData;

                res.traditionalServices.map((clientSpecialityTraditionalServices,index) => {
        this.clientSpecialityTraditionalServices[index]['services'] = clientSpecialityTraditionalServices.services.map((item => {
          if(this.selected_services.includes(item._id)){
            return item = {
              _id : item._id,
              name : item.name,
              status : item.status,
              flag : true,
            }
          }else{
            return item = {
              _id : item._id,
              name : item.name,
              status : item.status,
              flag : false,
            }
          }        
        }))        
      })
             res.digitalServices.map((clientSpecialityDigitalServices,index) => {
        this.clientSpecialityDigitalServices[index]['services'] = clientSpecialityDigitalServices.services.map((item => {
          if(this.selected_digital_specialities.includes(item._id)){
            return item = {
              _id : item._id,
              name : item.name,
              status : item.status,
              flag : true,
            }
          }else{
            return item = {
              _id : item._id,
              name : item.name,
              status : item.status,
              flag : false,
            }
          }        
        }))        
      })

      this.isLoading = false;

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
  }

  getLanguageData(){
     const obj = {
      type : 'proficiency'
    }
    console.log("obj",obj)
    this.service.getLanguages(obj).subscribe(async res => {
    console.log(res)
        this.english_level=res.data

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
        
  }
  onItemChange(id){
        console.log(id)
        this.english_level.forEach(item=>{
    console
    .log(item.id)
  })
  }
    getSkills(spl){
    const obj = {
      clientSpecialities : spl
    }
    console.log("obj",obj)
    this.service.getClientSpecialitySkills(obj).subscribe(async res => {
    console.log(res)
        this.skills = res.industryKnowledgeSkills;
      this.tool_skills = res.technologySkills;    
      console.log(res.industryKnowledgeSkills)
      this.newselection=res.specialities;
      console.log('0',res.industryKnowledgeSkills[0])
      console.log('sp', this.newselection)

      this.isLoading = false;

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
  }
  addSpecialityService(){
  console.log(this.speciality, this.service_name,this.category)
    if(this.speciality && this.service_name && this.category){
      const obj = {
        discipline_speciality_id : this.speciality,
        name : this.service_name,
        category : this.category,
      }

      this.service.addSpecialityService(obj).subscribe(async res => {

        if(this.category == "traditional"){
          this. selected_services.push({name: this.service_name,_id: this.speciality});
          let id=[];
            id.push(this.speciality)
    this.getClientSpecialityServices(id)
    console.log(obj)
        }else{
          this.selected_digital_specialities.push({name: this.service_name,_id: this.speciality});
          let id=[];
            id.push(this.speciality)
    this.getClientSpecialityServices(id)
    console.log(obj)
        }

        $('#addService').modal('hide')

        this.isLoading = false;
        this.speciality = '';
    this.category = '';
    this.service_name = '';

      },(err) => {

        this.isLoading = false;
        this.service.handleError(err)

      })
    }else{
      this.service.showErrorMessage({
        message : "Please fill all fields."
      })
    }


  }

    onCheckboxChangeSpeciality(event,speciality,index){
    console.log("event,speciality,index",event,speciality,index)
    this.specialityID=speciality._id;
    
    if(event.target.checked){
      // this.selected_specialities.push(speciality._id);
      this.totalTalents[index]['specialities'].push(speciality._id)
      this.totalTalents[index]['specialities_full'].push(speciality)
      console.log("spe ids ==============",this.totalTalents[index]['specialities'])
      this.getClientSpecialityServices(this.totalTalents[index]['specialities']);
      this.getSkills(this.totalTalents[index]['specialities']);
    }else{
      // let index = this.selected_specialities.findIndex((item) => {
        //   return item == speciality._id
        // });
        // this.selected_specialities.splice(index,1)
        // let indexx = this.totalTalents[index].specialities.findIndex((item) => {
        //   return item == speciality._id
        // });
        
        let index3 = this.totalTalents[index].specialities.findIndex((item) => {
          return item == speciality._id
        });
        
        let index4 = this.totalTalents[index].specialities.findIndex((item) => {
          return item._id == speciality._id
        });
        
        // this.specialities.splice(indexx,1)
        this.totalTalents[this.currentIndex].specialities.splice(index3,1)
        this.totalTalents[this.currentIndex].specialities_full.splice(index4,1)
        console.log("rem spe ids ==============",this.totalTalents[index]['specialities'])  
        this.getClientSpecialityServices(this.totalTalents[index]['specialities']);
      this.getSkills(this.totalTalents[index]['specialities']);
    }
  }

   chooseSkills(skill_id){
    this.selected_skills.push(skill_id)
    console.log(this.selected_skills);
    console.log("speciality_ids =============== ",this.selectedSpecialities)
  }

  removeSkills(skill_id){

     let index = this.selected_skills.findIndex((item) => {
      return item == skill_id
    });
    this.selected_skills.splice(index,1)
  }

  chooseToolSkills(skill_id){
  this.selected_tool_skills.push(skill_id)
    console.log(this.selected_tool_skills);
  }

  removeToolSkills(skill_id){

    let index = this.selected_tool_skills.findIndex((item) => {
      return item == skill_id
    });
    this.selected_tool_skills.splice(index,1)
  }
  addlocation(){
        console.log(this.enterLocation)
  }
    addSpeciality(index){
    const speciality_name = this.speciality_name; 
    if(speciality_name && speciality_name.trim() && this.disciplineId){
      const obj = {
        name: speciality_name,
        discipline_id: this.disciplineId
      }
    console.log("speobj",obj)
      
      this.service.addSpeciality(obj).subscribe(async res => {
        console.log("added spe resp ============= ",res)
        // this.selected_specialities.push(res.data._id)
        // this.getDisciplineSpeciality();
        this.totalTalents[index]['specialities'].push(res.data._id)
        this.totalTalents[index]['specialities_full'].push(res.data)
        this.speciality_name = "";
        this.getJobSpecialities();
        console.log("total talents added spe ============= ",this.totalTalents)
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      return this.service.showErrorMessage({ message : "Please enter Speciality Name", action : "Okay"})
    }
  }
  saveTalentDetails(){
    const job_id = localStorage.getItem("job_id");
    const discipline = localStorage.getItem("discipline");
    console.log("save talent discipline ========== ",discipline)
    console.log(this.clientSpecialityDigitalServices);
    console.log(this.clientSpecialityTraditionalServices);
    const diArr = [];
    const traArr = [];
    const newskills=[];
    const tooladdedskills=[];
    
    this.totalTalents[this.currentIndex].digital_service =this.selected_digital_specialities ;
    this.totalTalents[this.currentIndex].traditional_service = this.selected_services;
    // console.log("currentIndex ================= ",this.currentIndex)
    this.totalTalents[this.currentIndex].job_id = job_id;
    this.totalTalents[this.currentIndex].skills = this.selected_skills;
    this.totalTalents[this.currentIndex].tool_skills = this.selected_tool_skills;
    this.totalTalents[this.currentIndex].onsite_location = this.enterLocation;

    this.totalTalents[this.currentIndex].discipline = discipline;
    // const new_specialities = this.totalTalents[this.currentIndex].specialities_new.map(item => item.value)
    // this.totalTalents[this.currentIndex].new_specialities = new_specialities;
    console.log(this.totalTalents[this.currentIndex])
    let request_payload = this.totalTalents[this.currentIndex];
    console.log("request",request_payload)
    this.service.saveTalentDetails(request_payload).subscribe(async res => {
    console.log('savetalent',res, 'rpay',request_payload)
      this.totalTalents[this.currentIndex].job_talent_id = res.resp._id;
      localStorage.setItem('talents',JSON.stringify(this.totalTalents));

      this.selected_digital_specialities=[];
      this.selected_services=[];
      this.selected_skills=[];
      this.selected_tool_skills=[];
      this.enterLocation='';
      console.log('deleted',this.selected_digital_specialities,this.selected_services,this.selected_skills,this.selected_tool_skills)
      this.getJobSpecialities();

      if(this.totalTalents.length - 1 == this.currentIndex){
        this.router.navigate(["review-post"])
      }else{
        this.currentIndex = this.currentIndex + 1;
        this.activeIndex=0;
      }
      this.isLoading = false;
      

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })


  }

}
