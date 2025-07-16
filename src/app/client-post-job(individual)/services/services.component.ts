import { Component, OnInit } from '@angular/core';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
declare let $ : any

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  specialities = [];
  selectedSpecialities = [];
  specialitiesAdd = [];
  specialityIds = {};
  clientSpecialityDigitalServices = [];
  clientSpecialityTraditionalServices = [];
  specialityData=[];
  jobDetail = null;
  totalTalents = [];
  currentIndex = 0;
  category="traditional"
  speciality
  selected_services=[];
  selected_digital_specialities=[];
  service_name
  sp:any
  selected_sp=[]
    job_talent_id=''
        profile:any;


  category_list = [{value: 'Select category', name: 'Select category'},{value: 'traditional', name: 'Traditional'},{value: 'digital',name: 'Digital'}];
  
  constructor(public router: Router,private service : Service,private _snackBar: MatSnackBar,private fb: FormBuilder) { 
    const job_id = localStorage.getItem("job_id");

    if(!job_id){
        this.router.navigate(['getting-started']);
        this.service.showErrorMessage({
          message : "Please complete 1 step first"
        })
    }

    if(localStorage.getItem("talents")){

      this.totalTalents = JSON.parse(localStorage.getItem("talents"))
      console.log("total talents ============== ",this.totalTalents)
    }
  }
  // constructor() { }

  ngOnInit(): void {
       this.profile= JSON.parse(sessionStorage.getItem("user_details"))
     console.log(this.profile)
   this.sp = JSON.parse(localStorage.getItem("selectedSpecialities"))
    console.log('sp',this.sp)
    this.getJobDetail();

       if(JSON.parse(localStorage.getItem('digitalServices'))){

        this.selected_digital_specialities=JSON.parse(localStorage.getItem('digitalServices'));
  }

    
   if(JSON.parse(localStorage.getItem('TraditionalServices'))){
        this.selected_services=JSON.parse(localStorage.getItem('TraditionalServices'));


    }
  }

  getJobDetail(){
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

                                                 if(res.details.job_talents){
                                                 if(res.details.job_talents[0].digital_service)
                                                 {
                                                   this.selected_digital_specialities = res.details.job_talents[0].digital_service;

                           this.selected_digital_specialities = this.selected_digital_specialities.map((item => {
          return item._id
           
        }))
             
                                                           localStorage.setItem('digitalServices',JSON.stringify(this.selected_digital_specialities))

  
                                                 }

                                         
                                         if(res.details.job_talents[0].traditional_service){
                                         this.selected_services = res.details.job_talents[0].traditional_service;

                           this.selected_services = this.selected_services.map((item => {
          return item._id
        }))
                        
        localStorage.setItem('TraditionalServices',JSON.stringify(this.selected_services))

        if(localStorage.getItem('selectedSpecialities')){
                      this.getClientSpecialityServices();

        }

    }
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

  onCheckboxChangeTraditional(event,id,index){
  console.log(event.target.checked)
  if(event.target.checked){
this.selected_services.push(id)
    console.log(this.selected_services); 
    localStorage.setItem('TraditionalServices',JSON.stringify(this.selected_services))
    }else{
             let index3 = this.selected_services.findIndex((item) => {
          return item == id.id
        });
        
        let index4 = this.selected_services.findIndex((item) => {
          return item == id._id
        });
        console.log(index3)
        // this.specialities.splice(indexx,1)
        this.selected_services.splice(index3,1)
       console.log(this.selected_services)
           localStorage.setItem('TraditionalServices',JSON.stringify(this.selected_services))

    }
    }

     onCheckboxChangeDigital(event,id,index){
     console.log(id)
       if(event.target.checked){

     this.selected_digital_specialities.push(id)
    console.log(this.selected_digital_specialities); 
        localStorage.setItem('digitalServices',JSON.stringify(this.selected_digital_specialities))
        }
        else{
             let index3 = this.selected_digital_specialities.findIndex((item) => {
          return item == id.id
        });
        
        let index4 = this.selected_digital_specialities.findIndex((item) => {
          return item == id._id
        });
        console.log(index3)
        // this.specialities.splice(indexx,1)
        this.selected_digital_specialities.splice(index3,1)
       console.log(this.selected_digital_specialities)
        localStorage.setItem('digitalServices',JSON.stringify(this.selected_digital_specialities))

    }
    }

  getClientSpecialityServices(){
    const obj = {
      clientSpecialities : this.sp
    }
    console.log("sp",obj)
    this.service.getClientSpecialityServices(obj).subscribe(async res => {
    console.log(res)
      this.clientSpecialityDigitalServices = res.digitalServices;
      this.clientSpecialityTraditionalServices = res.traditionalServices;
      this.specialityData = res.specialityData;

      res.digitalServices.map((clientSpecialityDigitalServices,index) => {
        this.clientSpecialityDigitalServices[index]['services'] = clientSpecialityDigitalServices.services.map((item => {
          if(this.selected_digital_specialities.includes(item._id)){
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
      })

      res.traditionalServices.map((clientSpecialityTraditionalServices,index) => {
        this.clientSpecialityTraditionalServices[index]['services'] = clientSpecialityTraditionalServices.services.map((item => {
          if(this.selected_services.includes(item._id)){
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
      })
      this.isLoading = false;
      console.log("res digital services ================== ",this.clientSpecialityDigitalServices)
      console.log("res traditional services ================== ",this.clientSpecialityTraditionalServices)
 

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
  }

  addSpecialityService(){
  console.log(this.speciality,this.service_name,this.category)
    if(this.speciality && this.service_name && this.category){
      const obj = {
        discipline_speciality_id : this.speciality,
        name : this.service_name,
        category : this.category,
      }

      this.service.addSpecialityService(obj).subscribe(async res => {
         const item = {
            _id : res._id,
            name : res.name,
            status : res.status,
            flag : true,
            client_user_id : res.client_user_id ? res.client_user_id : ""
          }

   if(this.category == "traditional"){

          this. selected_services.push( this.speciality);
                        this.selected_services.push(res.data._id)
                      localStorage.setItem('TraditionalServices',JSON.stringify(this.selected_services))

          let id=[];
            id.push(this.speciality)
    this.getClientSpecialityServices()
    console.log(obj)
        }else{

          this.selected_digital_specialities.push( this.speciality);
                                  this.selected_digital_specialities.push(res.data._id)
                                          localStorage.setItem('digitalServices',JSON.stringify(this.selected_digital_specialities))



          let id=[];
            id.push(this.speciality)
    this.getClientSpecialityServices()
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

  saveTalentDetails(){

      const job_id = localStorage.getItem("job_id");

        if(localStorage.getItem('job_talent_id')){
        var obj={
        job_id:job_id,

discipline: localStorage.getItem('discipline'),
   
specialities: JSON.parse(localStorage.getItem('selectedSpecialities')),
traditional_service:JSON.parse(localStorage.getItem('TraditionalServices')),
digital_service:JSON.parse(localStorage.getItem('digitalServices')),

job_talent_id: localStorage.getItem('job_talent_id')
    }
    console.log(obj)
    
    this.service.saveTalentDetails(obj).subscribe(async res => {
    this.router.navigate(['/talent-budget'])

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
    
  }else{
          var req={
        job_id:job_id,

discipline: localStorage.getItem('discipline'),
    
specialities: JSON.parse(localStorage.getItem('selectedSpecialities')),
traditional_service:JSON.parse(localStorage.getItem('TraditionalServices')),
digital_service:JSON.parse(localStorage.getItem('digitalServices')),

    }
    console.log(req)
    
    this.service.saveTalentDetails(req).subscribe(async res => {
    this.job_talent_id=res.resp._id;
    localStorage.setItem('job_talent_id',this.job_talent_id)
    this.router.navigate(['/talent-budget'])

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
  }
  

    
  }

  
  deleteSpecialityService(type,service_id){
    if(service_id){
      const obj = {
        service_id: service_id,
        type: type,
      }
      this.service.deleteSpecialityServiceclient(obj).subscribe(async res => {
        switch(type){
          case 'traditional':
            this.clientSpecialityTraditionalServices.map((tradition,ind) => {
              console.log("traditional data services before =========== ",tradition.services)
              let index = tradition.services.findIndex((item) => {
                return item._id == service_id
              });
              tradition.services.splice(index,1)
              if(!tradition.services.length){
                this.getClientSpecialityServices();
              }
            })
            break;

          case 'digital':
            this.clientSpecialityDigitalServices.map((digital,ind) => {
              let index = digital.services.findIndex((item) => {
                return item._id == service_id
              });
              digital.services.splice(index,1)
              if(!digital.services.length){
                this.getClientSpecialityServices();
              }
            })
            break;
        }
        // this.getDisciplineSpeciality();
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }

}
