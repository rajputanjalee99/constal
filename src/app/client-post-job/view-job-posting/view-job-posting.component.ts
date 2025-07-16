import { Component, OnInit } from '@angular/core';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, CanActivate , ActivatedRoute} from '@angular/router';
import { Options } from '@angular-slider/ngx-slider';
import { PageEvent } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-job-posting',
  templateUrl: './view-job-posting.component.html',
  styleUrls: ['./view-job-posting.component.scss']
})
export class ViewJobPostingComponent implements OnInit {
  panelOpenState = false;
  currentIndex = 0;
  isLoading = false
	jobDetail
    jobtalent
    workers = []
  totalTalents = []
  disciplineName
  sectorName
  selectedSpecialities = []
  currentTalent
  files = []
  selectedTraditionalServices = []
  job_success_score
  selected_english_level
  amtEarned
  location
  selectedDigitalServices = []
  timeline_start
  timeline_end
  address
  addedSector
  additional_req
  selected_talent_level
    radioButton=[];
  specialityChecked:boolean=false;
  sectors:any;
  disciplineValue:any;
  specialityID:any;
sectorID:any;
specialityValue=[];
serviceValue=[];
  sectorValue=[];
  digitalServices=[];
  traditionalServices=[];
    selected = -1;
  discipline:any;
  disciplineID:any;
  englishLevel:any;
  speciality:any;
  services:any;
  toolsTechnology:any;
  expertiseskills:any;
  talentLevel:any;
  otherLang:any;
  paymentType:any;
  timeLine:any;
  jobSuccess:any;
  earnedAmt:any;
  talentType: any;
  talentLocation:any
  param:any='';
  filterParams:any='';
  itemsPerPage=10;
  p: any=1;
  total: number;
  loading: boolean;
  city:any;
  offset=0;
  jobDetails:any;
  totalLength: number;
  loadAgents:any;
  skills:any;
  techskills:any;
  foundItem:any;
  disciplines=[];
  specialities=[];
  allservices=[];
  // currentPage: 
  talent_level:['intermediate'];
  discipline_id: [];
  speciality_id:[];
  services_id:[];
  sector_id:[];
  discipline_speciality_id=[];
  selected_sectors=[];
  tool_technologies_id:[];
  english_level:[];
  other_languages:[];
  hourly_rate:number;
  salary_rate:number;
  timeline:number;
  selectedItemsList=[];
  skill_id:[];
  selectedSpeciality:[];
  selectedServices=[];
  selectedLanguages=[];
  allSectors=[];
  industryKnowledgeSkills:[];
  interpersonalSkills:[];
  technologySkills:[];
  selectedSector=[];
  servivesID:any;
  skillsID:any;
  techskillsID:any;
  paymentValue: number = 0;
  paymentOption: Options = {
    floor: 0,
    ceil: 800
  };;
    timeValue: number = 0;
  timeOption: Options = {
    floor: 0,
    ceil: 800
  };;
  selectedSkills=[];
  selectedTechSkills=[];
  techSkillValue=[];
  talentValue=[];
  talentID:any;
  profID:any;
  selectedProf=[];
  profValue=[];
  selectedTalent=[];
  AllLanguage=[];
  talentList=[];
  languageID:any;
  languageValue=[];
  skillValue=[];
  proficiency=[];
      links=[]
  skills
  tool_skills
  interpersonalskill
  country
  state
  city
  talent_pay_type
  timestart
  timeend
  page: number = 1;
  noResultfound=false;
    btnDisabled = false;
    searchTerm:any;
    jobId:any;
    jobStatus
  constructor(public router: Router,private service : Service,private _snackBar: MatSnackBar,private fb: FormBuilder) {
  }

  ngOnInit(): void {
  var body = document.body;
  body.classList.remove("mystyle");

  this.getJobDetail();
  this.getJobList();
    this.getDiscipline();
    this.getAllSectors();
    this.getAllLanguage();
    this.getskills();
    this.getProfiencydata();
    this.getTalentLevel();
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    // $(body).addClass("opacity-bg");
    var body = document.body;
    body.classList.add("mystyle");
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    // document.body.addClass("opacity-bg");
    var body = document.body;
    body.classList.remove("mystyle");
  }


    getJobDetail(){

    const job_id = localStorage.getItem("job_id");
    this.jobId=localStorage.getItem("job_id");
    if (job_id && job_id!=undefined) {
      this.service.getJobDetail(job_id).subscribe(async res => {
        this.isLoading = false
        this.jobDetail = res.details;
                this.disciplineName=this.jobDetail.job_talents[0]["discipline"]
                this.jobStatus= this.jobDetail.status
                this.jobtalent = this.jobDetail.job_talents[0]["specialities"];
                  this.selectedTraditionalServices = this.jobDetail.job_talents[0]["traditional_service"];
        this.selectedDigitalServices = this.jobDetail.job_talents[0]["digital_service"];
                this.job_success_score = this.jobDetail.job_talents[0]["job_success_score"];
        this.selected_english_level = this.jobDetail.job_talents[0]["english_level"].value;
        this.amtEarned = this.jobDetail.job_talents[0]["amount_earned"];
        this.location= this.jobDetail.job_talents[0]["talent_location"];
        this.timeline_start =   this.jobDetail.job_talents[0]["timeline_start_date"];
        this.timeline_end =this.jobDetail.job_talents[0]["timeline_end_date"];
        this.address= this.jobDetail.job_talents[0]["address"];
                this.workers= this.jobDetail.job_talents[0]["co_workers"];
                this.addedSector=this.jobDetail.job_talents[0]["sectors"];
                this.selected_talent_level=this.jobDetail.job_talents[0]["level_of_talent"];
                this.additional_req=this.jobDetail.job_talents[0]["additional_requirements"];
                              this.skills=this.jobDetail.job_talents[0]["skills"]
                                this.tool_skills=this.jobDetail.job_talents[0]["tool_skills"]
                this.interpersonalskill=this.jobDetail.job_talents[0]["interpersonal_skills"]
                this.talent_pay_type=this.jobDetail.job_talents[0]["talent_pay_type"]
                this.links=this.jobDetail["links"]
                this.timestart=this.jobDetail.job_talents[0]['job_start']
                this.timeend=this.jobDetail.job_talents[0]['talent_duration']
                if(this.jobDetail.job_talents[0]["country"].length){
                                this.country=this.jobDetail.job_talents[0]["country"].name

                }
                                if(this.jobDetail.job_talents[0]["city"].length){
                                                this.city=this.jobDetail.job_talents[0]["city"].name

}
                if(this.jobDetail.job_talents[0]["state"].length){
                                this.state= this.jobDetail.job_talents[0]["state"].name

}
        console.log("w",this.workers)
        if(res.details && res.details.project_files.length){
				  this.files = res.details.project_files
			  }
        console.log("job detail ====================== ",this.jobDetail)
        console.log("job detail files ====================== ",this.jobDetail.job_talents[this.currentIndex])

      },(err) => {
        this.isLoading = false
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      this.jobDetail = null;
    }
  }

    getJobList(){
    this.param='';
    // this.param='?limit='+this.itemsPerPage + '&offset='+this.offset;
let newparam={'limit':this.itemsPerPage, 'offset': this.offset, 'talent_level' : this.talent_level,'discipline_id': this.discipline_id, 'speciality_id': this.speciality_id ,'services_id':this.services_id, 'sector_id': this.sector_id, 'skill_id': this.skill_id};
let filterparam = this.disciplineID


  let param= Object.assign(newparam);
  
    this.service.getJObList(param).subscribe(async (res:any) =>{
      console.log(param)
           console.log("res",res)
           this.jobDetails=res.data;
           console.log(this.jobDetails);
           this.totalLength=res.data.length;
          //  console.log(this.totalLength);
    })
  }

  onPageChange(event){
console.log(event);
let page = event.pageIndex;
let size = event.pageSize;

  if(this.itemsPerPage != event.pageSize){
   this.itemsPerPage = event.pageSize;
   this.offset= 0;
   this.p=1;
   console.log('!=', this.offset)
   this.getJobList();
   return;
 }
if(event.previousPageIndex < event.pageIndex){
console.log('next')
  this.p++;
  this.offset= this.itemsPerPage * (this.p-1);
  console.log("<",this.offset, this.p)

}else if(event.previousPageIndex > event.pageIndex){
  this.p--;
  console.log('>')
  if(this.p == 0){
    this.offset=0;
    this.p=1;
  }else if(this.p > 0){
    this.offset = this.itemsPerPage * (this.p - 1);
  }

}else{
console.log('test')
}
console.log('newt')
this.getJobList();
  }

     onPrevious(event){
      let totalPages = Math.ceil(this.totalLength / this.itemsPerPage);
          console.log(totalPages)
         if(this.p == 1){
                  this.btnDisabled=false;
        this.offset=0;
        this.p=1;
        this.getJobList();
                 console.log("==",this.offset, this.p, this.btnDisabled)

         }else if(this.p > 1){
             this.btnDisabled=false;
             this.offset=0;
             this.p=1;
             this.offset = this.itemsPerPage * (this.p - 1);
             this.getJobList();
             console.log(">",this.offset, this.p,this.btnDisabled)

  }
  }
  onNext(event){
    console.log(event);
        this.p++;
        this.offset= this.itemsPerPage * (this.p-1);
        console.log(this.p,this.offset);
       this.getJobList();
 

  }

  onSearchChange(event: string): void {  
  console.log(event)
let param={'limit':this.itemsPerPage, 'offset': this.offset,'search': event};
  console.log(event)
   
     this.service.getJObList(param).subscribe(async (res:any) =>{
      console.log(param)
      this.noResultfound=false
           console.log("res",res)
          this.jobDetails=res.data;
          if(res.data.length==0){
              this.noResultfound=true;  
          }
    })

}
changeFilter(event){
console.log(event.value.id)
this.disciplineID=(event.value.id);
console.log(this.disciplineID)
 this.disciplineValue= event.value.discipline;

let newparam={'limit':this.itemsPerPage, 'offset': this.offset, 'talent_level' : this.talent_level,'discipline_id': this.disciplineID, 'speciality_id': this.speciality_id ,'services_id':this.services_id, 'sector_id': this.sector_id,  'tool_technologies_id' :this.tool_technologies_id,
'english_level': this.english_level, 'other_languages': this.other_languages, 'hourly_rate':this.hourly_rate, 'salary_rate':this.salary_rate, 'timeline': this.timeline};
console.log(newparam)
    this.service.getJObList(newparam).subscribe(async (res:any) =>{
           console.log("res",res)
          this.jobDetails=res.data;
    })

this.getSpeciality();
}

changeSpeciality(event){


    if(event.checked==false){
        console.log(event.source.value._id);
        let index=this.selectedItemsList.indexOf(event.source.value._id);
        console.log(index)
        this.selectedItemsList.splice(index,1);
        console.log('deselct',this.selectedItemsList)
              this.specialityValue.splice(index,1);
                  console.log("length",this.selectedItemsList.length);
                  if(this.selectedItemsList.length >0){
                              let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList }
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                                    this.getServices();
   
                  }else{
                        console.log('0');
                           let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                                    this.getServices();
                  }
  
    

                }else{
                console.log(event)
            console.log(event.source.value._id);
                  this.specialityID=event.source.value._id;
                  this.specialityValue.push(event.source.value.name)
                  console.log(this.specialityID,this.specialityValue);
            this.selectedItemsList.push(this.specialityID)
            let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList }
            console.log(param)
             this.service.getJObList(param).subscribe(async (res:any) =>{
             console.log("changespeciality",res.data)
                      this.jobDetails=res.data;
                })
                this.getServices();



}

    
}

changeServices(event){
console.log(event)
if(event.checked==false){
        console.log(event.source.value._id);
        let index=this.selectedServices.indexOf(event.source.value._id);
        console.log(index)
        this.selectedServices.splice(index,1);
        console.log(this.selectedServices)
         this.serviceValue.splice(index,1);
           if(this.selectedServices.length >0){
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices }
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                  }else if(this.selectedItemsList.length>0){
                        console.log('0');
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                  }else{
                    let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                  }

                  

      }else{

                           console.log(event);
                    this.servivesID=event.source.value._id;
                    this.selectedServices.push(this.servivesID)
                                this.serviceValue.push(event.source.value.name);
                          console.log(this.servivesID,this.serviceValue);
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices }

                          console.log(param)
                     this.service.getJObList(param).subscribe(async (res:any) =>{
                              this.jobDetails=res.data;
                              console.log('speciality', this.jobDetails)
                        })
}





}

changeSector(event){
  if(event.checked==false){
    console.log(event.source.value._id);
        let index=this.selectedSector.indexOf(event.source.value._id);
        console.log(index)
        this.selectedSector.splice(index,1);
        console.log('deselct',this.selectedItemsList)
              this.sectorValue.splice(index,1);
                  console.log("length",this.selectedSector.length);
                   if(this.selectedSector.length >0){
                      let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector }
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   } else  if(this.selectedServices.length >0){
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices }
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                  }else if(this.selectedItemsList.length>0){
                        console.log('0');
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                  }else{
                    let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                  }

                  
                  

            }else{
                        console.log(event);
    this.sectorID=event.source.value._id;
                        this.selectedSector.push(this.sectorID)
                this.sectorValue.push(event.source.value.name)
                console.log(this.selectedSector,this.sectorValue)
    console.log(this.sectorID)
                      let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector }

           this.service.getJObList(param).subscribe(async (res:any) =>{
           console.log("sector",res)
          this.jobDetails=res.data;
    })
      }
 
}
changeSkill(event){
if(event.checked==false){
        console.log(event.source.value.id);
        let index=this.selectedSkills.indexOf(event.source.value.id);
        console.log(index)
        this.selectedSkills.splice(index,1);
        console.log("selected",this.selectedSkills)
         this.skillValue.splice(index,1);
          if(this.selectedSkills.length >0){
                 let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages, 'skill_id' :this.selectedSkills}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   
                  }else   if(this.selectedSector.length >0){
                      let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector }
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   } else  if(this.selectedServices.length >0){
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices }
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                  }else if(this.selectedItemsList.length>0){
                        console.log('0');
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                  }else{
                    let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                  }
{
                  }
         }else{
 console.log(event);
 this.skillsID=event.source.value.id
 this.selectedSkills.push(this.skillsID);
                 this.skillValue.push(event.source.value.skill);

    let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages, 'skill_id' :this.selectedSkills, 'tool_technologies_id':this.selectedTechSkills}
   this.service.getJObList(param).subscribe(async (res:any) =>{
           console.log("skills",res)
          this.jobDetails=res.data;
    })
}
}
changeTechSkill(event){
if(event.checked==false){
        console.log(event.source.value.id);
        let index=this.selectedTechSkills.indexOf(event.source.value.id);
        console.log(index)
        this.selectedTechSkills.splice(index,1);
        console.log("selected",this.selectedTechSkills)
         this.techSkillValue.splice(index,1);
          if(this.selectedTechSkills.length >0){
    let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages, 'skill_id' :this.selectedSkills, 'tool_technologies_id':this.selectedTechSkills}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   
                  }else   if(this.selectedSkills.length >0){
                 let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages, 'skill_id' :this.selectedSkills}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   
                  }else   if(this.selectedSector.length >0){
                      let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector }
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   } else  if(this.selectedServices.length >0){
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices }
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                  }else if(this.selectedItemsList.length>0){
                        console.log('0');
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                  }else{
                    let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                  }
{
                  }
         }else{
          console.log(event);
 this.techskillsID=event.source.value.id
 this.selectedTechSkills.push(this.techskillsID);
                 this.techSkillValue.push(event.source.value.skill);

    let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages, 'skill_id' :this.selectedSkills, 'tool_technologies_id':this.selectedTechSkills}
   this.service.getJObList(param).subscribe(async (res:any) =>{
           console.log("skills",res)
          this.jobDetails=res.data;
    })
         }

    }

    changeTalent(event){
    if(event.checked==false){
        console.log(event.source.value._id);
        let index=this.selectedTalent.indexOf(event.source.value._id);
        console.log(index)
        this.selectedTalent.splice(index,1);
        console.log("selected",this.selectedTalent)
         this.talentValue.splice(index,1);
          if(this.selectedTalent.length >0){
       let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages,  'skill_id' :this.selectedSkills, 'tool_technologies_id':this.selectedTechSkills, 'talent_level': this.selectedTalent}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                                    
                                    }else     if(this.selectedTechSkills.length >0){
    let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages, 'skill_id' :this.selectedSkills, 'tool_technologies_id':this.selectedTechSkills}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   
                  }else   if(this.selectedSkills.length >0){
                 let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages, 'skill_id' :this.selectedSkills}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   
                  }else   if(this.selectedSector.length >0){
                      let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector }
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   } else  if(this.selectedServices.length >0){
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices }
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                  }else if(this.selectedItemsList.length>0){
                        console.log('0');
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                  }else{
                    let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                  }
{
                  }
                                    
     }else{
                                     console.log(event);
  this.talentID=event.source.value._id;
                this.talentValue.push(event.source.value.level);
                          this.selectedTalent.push(this.talentID)

       let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages,  'skill_id' :this.selectedSkills, 'tool_technologies_id':this.selectedTechSkills, 'talent_level': this.selectedTalent}
  console.log(param)
       this.service.getJObList(param).subscribe(async (res:any) =>{
           console.log("res",res)
          this.jobDetails=res.data;
    })
  }
   

}

changeProficiency(event){
 if(event.checked==false){
        console.log(event.source.value._id);
        let index=this.selectedProf.indexOf(event.source.value._id);
        console.log(index)
        this.selectedProf.splice(index,1);
        console.log("selected",this.selectedProf)
         this.profValue.splice(index,1);
          if(this.selectedProf.length >0){
       let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages,  'skill_id' :this.selectedSkills, 'tool_technologies_id':this.selectedTechSkills, 'talent_level': this.selectedTalent, 'english_level':this.selectedProf}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                                    
                                    }else   if(this.selectedTalent.length >0){
       let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages,  'skill_id' :this.selectedSkills, 'tool_technologies_id':this.selectedTechSkills, 'talent_level': this.selectedTalent}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                                    
                                    }else     if(this.selectedTechSkills.length >0){
    let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages, 'skill_id' :this.selectedSkills, 'tool_technologies_id':this.selectedTechSkills}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   
                  }else   if(this.selectedSkills.length >0){
                 let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages, 'skill_id' :this.selectedSkills}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   
                  }else   if(this.selectedSector.length >0){
                      let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector }
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   } else  if(this.selectedServices.length >0){
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices }
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                  }else if(this.selectedItemsList.length>0){
                        console.log('0');
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                  }else{
                    let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                  }
{
                  }

      } else{
      console.log(event);
  this.profID=event.source.value._id;
                this.profValue.push(event.source.value.value);
                          this.selectedProf.push(this.profID)

       let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages,  'skill_id' :this.selectedSkills, 'tool_technologies_id':this.selectedTechSkills, 'talent_level': this.selectedTalent, 'english_level':this.selectedProf}
  console.log(param)
       this.service.getJObList(param).subscribe(async (res:any) =>{
           console.log("res",res)
          this.jobDetails=res.data;
    })
    }
}


changeLanguage(event){
   if(event.checked==false){
    console.log(event.source.value._id);
        let index=this.selectedLanguages.indexOf(event.source.value._id);
        console.log(index)
        this.selectedLanguages.splice(index,1);
        console.log('deselct',this.selectedLanguages)
              this.languageValue.splice(index,1);
                  console.log("length",this.selectedLanguages.length);
                   if(this.selectedLanguages.length >0){
       let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages,  'skill_id' :this.selectedSkills, 'tool_technologies_id':this.selectedTechSkills, 'talent_level': this.selectedTalent, 'english_level':this.selectedProf}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                  }else   if(this.selectedProf.length >0){
       let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages,  'skill_id' :this.selectedSkills, 'tool_technologies_id':this.selectedTechSkills, 'talent_level': this.selectedTalent, 'english_level':this.selectedProf}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                                    
                                    }else   if(this.selectedTalent.length >0){
       let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages,  'skill_id' :this.selectedSkills, 'tool_technologies_id':this.selectedTechSkills, 'talent_level': this.selectedTalent}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                                    
                                    }else     if(this.selectedTechSkills.length >0){
    let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages, 'skill_id' :this.selectedSkills, 'tool_technologies_id':this.selectedTechSkills}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   
                  }else   if(this.selectedSkills.length >0){
                 let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages, 'skill_id' :this.selectedSkills}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   
                  }else   if(this.selectedSector.length >0){
                      let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector }
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                   } else  if(this.selectedServices.length >0){
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices }
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
   
                  }else if(this.selectedItemsList.length>0){
                        console.log('0');
                          let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                  }else{
                    let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID}
                                console.log(param)
                                 this.service.getJObList(param).subscribe(async (res:any) =>{
                                 console.log("getList",res.data)
                                          this.jobDetails=res.data;
                                    })
                  }
{
                  }
  
      }else{
 console.log(event);
  this.languageID=event.source.value._id;
                this.languageValue.push(event.source.value.name);
                          this.selectedLanguages.push(this.languageID)

       let param= {'limit':this.itemsPerPage, 'offset': this.offset, 'discipline_id': this.disciplineID, 'speciality_id': this.selectedItemsList, 'services_id': this.selectedServices,'sector_id':this.selectedSector, 'other_languages':this.selectedLanguages}
   this.service.getJObList(param).subscribe(async (res:any) =>{
           console.log("res",res)
          this.jobDetails=res.data;
    })
    }
}

getDiscipline(){
    this.service.getDiscipline().subscribe(async (res:any) =>{
    console.log("discipline",res.list)
    this.disciplines=res.list;
    console.log(this.disciplines[0]._id)
    this.discipline_id=this.disciplines[0]._id;
    console.log(this.discipline_id)
    })
}

getSpeciality(){

let param =  this.disciplineID
console.log(param)
    this.service.getSpeciality(param).subscribe(async (res:any) =>{
    console.log("speciality",res)
    this.specialities=res.data;
       this.discipline_speciality_id=this.specialities.map(function(a) {return a["_id"];});
    console.log("",this.discipline_speciality_id)

    })
}

getTalentLevel(){


    this.service.getTalent().subscribe(async (res:any) =>{
    console.log("getTalent",res)
    this.talentList=res.data;

    })
}

getServices(){
let param={ 'discipline_speciality_id':this.selectedItemsList}
    this.service.getServices(param).subscribe(async (res:any) =>{
    console.log("services",res)
    this.digitalServices=res.digitalServices;
    this.traditionalServices=res.traditionalServices;
    })
}


closeFilter(event){
    console.log(event)

}
closejob(id){
let obj={
    status: 'closed',
    job_id:id
}
 this.service.changeJobStatus(obj).subscribe(async (res:any) =>{
 console.log(res)
         this.service.showErrorMessage({ message : "Job closed successfully", action : "Okay"});
         this.router.navigate(['/job-listing'])
    })
}

openjob(id){
let obj={
    status: 'open',
    job_id:id
}
 this.service.changeJobStatus(obj).subscribe(async (res:any) =>{
    console.log(res)
             this.service.showErrorMessage({ message : "Job opened successfully", action : "Okay"});
         this.router.navigate(['/job-listing'])
    })
}
getAllSectors(){
    this.service.getAllSectors().subscribe(async (res:any) =>{
    console.log("allcat",res)
     this.allSectors=res.sectors;
    })
}
 
getProfiencydata(){
let param='type'
      this.service.getProficiency(param).subscribe(async (res:any) =>{
    console.log("getProfiencydata",res);
    this.proficiency=res.data
    })
}

getAllLanguage(){
    

      this.service.getLanguage().subscribe(async (res:any) =>{
    console.log("allLanguage",res)
    this.AllLanguage=res.languages;
    })
}

getskills(){
    this.service.getAllSkills().subscribe(async (res:any) =>{
    console.log("allskills",res)
    this.industryKnowledgeSkills=res.industryKnowledgeSkills;
    this.interpersonalSkills=res.interpersonalSkills;
    this.technologySkills=res.technologySkills;
    console.log(this.industryKnowledgeSkills,this.interpersonalSkills)
    })
}
paymentRange(event){
    console.log(this.paymentValue)
    let param={'limit':this.itemsPerPage, 'offset': this.offset, 'hourly_rate' : this.paymentValue};
    console.log(param)

  
    this.service.getJObList(param).subscribe(async (res:any) =>{
      console.log(param)
           console.log("res",res)
           this.jobDetails=res.data;
           console.log(this.jobDetails);
           this.totalLength=res.data.length;
          //  console.log(this.totalLength);
    })
}
timeRange(event){
    console.log(this.timeValue)
    let param={'limit':this.itemsPerPage, 'offset': this.offset, 'timeline' : this.timeValue};
    console.log(param)

  
    this.service.getJObList(param).subscribe(async (res:any) =>{
      console.log(param)
           console.log("res",res)
           this.jobDetails=res.data;
           console.log(this.jobDetails);
           this.totalLength=res.data.length;
          //  console.log(this.totalLength);
    })
}


clearallfilters(event){
this.disciplineValue='';
this.specialityValue=[];
this.serviceValue=[];
this.sectorValue=[];
this.skillValue=[];
this.techSkillValue=[];
this.profValue=[];
this.languageValue=[];

    this.param='';
    // this.param='?limit='+this.itemsPerPage + '&offset='+this.offset;
let newparam={'limit':this.itemsPerPage, 'offset': this.offset, 'talent_level' : this.talent_level};
let filterparam = this.disciplineID


  let param= Object.assign(newparam);
  
    this.service.getJObList(param).subscribe(async (res:any) =>{
      console.log(param)
           console.log("res",res)
           this.jobDetails=res.data;
           console.log(this.jobDetails);
           this.totalLength=res.data.length;
          //  console.log(this.totalLength);
    })}
}
