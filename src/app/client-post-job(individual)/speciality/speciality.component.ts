import { Component, OnInit } from '@angular/core';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent implements OnInit {

  isLoading = false;
  specialities = [];
  selectedSpecialities = [];
  specialitiesAdd = [];
  specialityIds = {};
  clientSpecialityDigitalServices = [];
  clientSpecialityTraditionalServices = [];
  jobDetail = null;
  totalTalents = [];
    speciality: any;
    flag: boolean = false;
    profile:any;
  currentIndex = 0;
  disName='';
  disc= [];
  speciality_name='';
  selected_specialities=[];
  did='';
  job_talent_id=''
  constructor(public router: Router,private service : Service,private _snackBar: MatSnackBar,private fb: FormBuilder) { 
    const job_id = localStorage.getItem("job_id");

    if(!job_id){
        this.router.navigate(['getting-started']);
        this.service.showErrorMessage({
          message : "Please complete 1 step first"
        })
        
    if(localStorage.getItem('selectedSpecialities')){
        this.selectedSpecialities=JSON.parse(localStorage.getItem('selectedSpecialities'));

    }
    }
  }

  ngOnInit(): void {
    this.disName=localStorage.getItem('discipline_name')
        this.getJobDetail();

    if(localStorage.getItem('selectedSpecialities')){
                                                                       localStorage.setItem('selectedSpecialities',JSON.stringify(this.selectedSpecialities))


    }
     this.profile= JSON.parse(sessionStorage.getItem("user_details"))
     console.log(this.profile)
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
       
                                             if(res.details.job_talents && res.details.job_talents[0].specialities){
                                              this.disc = res.details.job_talents[0].specialities.map((item => {
          this.did=item.discipline_id
        }))
         if(localStorage.getItem('discipline')==this.did){
            this.selectedSpecialities = res.details.job_talents[0].specialities.map((item => {
          return item._id

        }))
                                                                   localStorage.setItem('selectedSpecialities',JSON.stringify(this.selectedSpecialities))

         }else{
                                                                                  this.selectedSpecialities=[]
                                                                                localStorage.setItem('selectedSpecialities',JSON.stringify(this.selectedSpecialities))


         }

        }
        
      

        console.log("jobDetail response dd ================== ",res)
        console.log(this.selectedSpecialities)
  if(localStorage.getItem('selectedSpecialities')){
        this.selectedSpecialities=JSON.parse(localStorage.getItem('selectedSpecialities'));

    }
    
        console.log("total talents ================== ",this.totalTalents)
 
        if(localStorage.getItem('discipline')){
                       this.getJobSpecialities();

        }
      },(err) => {
        this.isLoading = false
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      this.jobDetail = null;
    }
  }
    onCheckboxChangeSpeciality(event,speciality){
    if(event.target.checked){
      this.selectedSpecialities.push(speciality._id);
                 localStorage.setItem('selectedSpecialities',JSON.stringify(this.selectedSpecialities))
    }else{
      // this.selected_specialities.splice(speciality._id,1);
      let index = this.selectedSpecialities.findIndex((item) => {
        return item == speciality._id
      });
      this.selectedSpecialities.splice(index,1)
                 localStorage.setItem('selectedSpecialities',JSON.stringify(this.selectedSpecialities))

    }
  }

  getJobSpecialities(){
  let param= localStorage.getItem('discipline')
  console.log(param)

    this.service.getJobSpecialities(param).subscribe(async res => {
      this.isLoading = false
      this.specialities = res.list
        console.log('getjobspe')
      this.specialities = res.list.map((item => {
        
        if(this.selectedSpecialities.includes(item._id)){
          return item = {
            _id : item._id,
            name : item.name,
            status : item.status,
            flag : true,
            client_user_id : item.client_user_id ? item.client_user_id : ""
          }
        }else{
          return item = {
            _id : item._id,
            name : item.name,
            status : item.status,
            flag : false,
            client_user_id : item.client_user_id ? item.client_user_id : ""
          }
        }
      }))
      console.log("specialities ============= ",this.selectedSpecialities)
  
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })

  }
    addSpeciality(){
    const selectedSpecialities = this.specialities.filter(ele=> ele.flag? ele.flag === true: '');

    const disc=localStorage.getItem('discipline')
    const speciality_name = this.speciality_name; 
    console.log(speciality_name)
    if(speciality_name && speciality_name.trim()){
      const obj = {
        name: speciality_name,
        discipline_id: disc,
        role: 'client'

      }
      
      this.service.addSpecialityIndividual(obj).subscribe(async res => {
        console.log(res)
        // this.selected_specialities = [];
        // this.specialities.push({name: res.data.name,_id: res.data._id});
        // this.speciality = res.data.name;
                this.selectedSpecialities.push(res.data._id)
                 localStorage.setItem('selectedSpecialities',JSON.stringify(this.selectedSpecialities))

        this.getJobSpecialities();
        this.speciality_name = "";
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      return this.service.showErrorMessage({ message : "Please enter Speciality Name", action : "Okay"})
    }
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
  chooseSpeciality(speciality_id,index,speciality){
    // this.selectedSpecialities.push(speciality_id);
    console.log(speciality_id)
    this.selectedSpecialities.push(speciality_id);
    console.log(this.selectedSpecialities)
        localStorage.setItem('selectedSpecialities',JSON.stringify(this.selectedSpecialities))

    //console.log("speciality_ids =============== ",this.selectedSpecialities)
    // this.specialityIds.clientSpecialities = this.selectedSpecialities;
 
  }

  removeSpeciality(_id,ind){
   let index = this.selectedSpecialities.findIndex((item) => {
      return item == _id
    });
    this.selectedSpecialities.splice(index,1);
    console.log(this.selectedSpecialities)
            localStorage.setItem('selectedSpecialities',JSON.stringify(this.selectedSpecialities))

  }

  getClientSpecialityServices(){
    const obj = {
      clientSpecialities : this.disName
    }

    this.service.getClientSpecialityServices(obj).subscribe(async res => {

      this.clientSpecialityDigitalServices = res.digitalServices;
      this.clientSpecialityTraditionalServices = res.traditionalServices;
      this.isLoading = false;

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
  }
  

  saveTalentDetails(){
    const job_id = localStorage.getItem("job_id");

  
      if(localStorage.getItem('job_talent_id')){
        var obj={
        job_id:job_id,

discipline: localStorage.getItem('discipline'),
specialities: JSON.parse(localStorage.getItem('selectedSpecialities')),
job_talent_id: localStorage.getItem('job_talent_id')


   
    }
    console.log(obj)
    
    this.service.saveTalentDetails(obj).subscribe(async res => {
       this.router.navigate(["services"]);

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
    
  }else{
          var req={
        job_id:job_id,

discipline: localStorage.getItem('discipline'),
   specialities: JSON.parse(localStorage.getItem('selectedSpecialities')),

    }
    console.log(req)
    
    this.service.saveTalentDetails(req).subscribe(async res => {
    this.job_talent_id=res.resp._id;
    localStorage.setItem('job_talent_id',this.job_talent_id)
       this.router.navigate(["services"]);

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
  }
    }

}
