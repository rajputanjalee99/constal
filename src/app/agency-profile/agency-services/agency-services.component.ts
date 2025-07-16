import { Component, OnInit } from '@angular/core';
import { Validators , FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../../service/service.service';

declare var $:any 


@Component({
  selector: 'app-agency-services',
  templateUrl: './agency-services.component.html',
  styleUrls: ['./agency-services.component.scss']
})
export class AgencyServicesComponent implements OnInit {
  digital_data: any;
  traditional_data: any;
  selected_digital_services: any;
  selected_traditional_services: any;
  profile: any;
  service_list = []
  category=""
  serviceId = ""
  submitted
  addServices
  addServiceForm : FormGroup
  category_list = [{value: 'traditional', name: 'Traditional'},{value: 'digital',name: 'Digital'}];
  serviceName: any;
  isLoading: boolean;

  constructor(private service : Service,private router : Router,private fb : FormBuilder) { }

  ngOnInit(): void {
    this.getAgencyProfile();

    this.addServiceForm = this.fb.group({
      speciality: ['', [Validators.required]],
      category: ['', [Validators.required]],
      service_name: ['', [Validators.required]]     
    })

  }

 

  getAgencyProfile(){
    this.service.agencyProfile().subscribe(resp => {
      this.profile = resp.profile
      
      this.selected_digital_services = this.profile.agency_category_data.digital_service
      this.selected_traditional_services = this.profile.agency_category_data.traditional_service
      this.service_list = this.profile && this.profile.agency_category_data && this.profile.agency_category_data.discipline_specialities ? this.profile.agency_category_data.discipline_specialities : []
      this.getServices();


    },(err) => {

      this.service.handleError(err)

    })
  }

  getServices(){
    this.service.getAgencyService().subscribe(res => {

      this.digital_data = res.digitalServices;
      this.traditional_data = res.traditionalServices;
      
      res.digitalServices.map((digital_data,index) => {
        this.digital_data[index]['services'] = digital_data.services.map((item => {
          if(this.selected_digital_services.includes(item._id)){
            item.flag = true
          }

          return item
          
        }))        
      })

      res.traditionalServices.map((traditional_data,index) => {
        this.traditional_data[index]['services'] = traditional_data.services.map((item => {

          if(this.selected_traditional_services.includes(item._id)){
            item.flag = true
          }

          return item    
        }))        
      })

    },(err) => {

      this.service.handleError(err);

    })
  }

  onCheckboxChangeTraditional(event,tradition){
    if(event.target.checked){
      this.selected_traditional_services.push(tradition._id);
    }else{
      // this.selected_traditional_services.splice(tradition._id,1);
      let index = this.selected_traditional_services.findIndex((item) => {
        return item == tradition._id
      });
      this.selected_traditional_services.splice(index,1)
    }
  }

  onCheckboxChangeDigital(event,digital){
    if(event.target.checked){
      this.selected_digital_services.push(digital._id);
    }else{
      // this.selected_digital_services.splice(digital._id,1);
      let index = this.selected_digital_services.findIndex((item) => {
        return item == digital._id
      });
      this.selected_digital_services.splice(index,1)
    }
  }

  goToNext(){
    const form = {
      traditional_service : this.selected_traditional_services,
      digital_service : this.selected_digital_services
    }
    this.service.saveAgencyCategoryData(form).subscribe(resp => {

      this.service.showSuccessMessage({
        message : "Services Updated"
      })

      this.router.navigate(['agency-skills'])

    },(err) => {
      this.service.handleError(err)
    })

  }

  addNewServiceModal(){


    $('#addService').modal();
  }

  deleteSpecialityService(type,service_id){
    if(service_id){
      const obj = {
        service_id: service_id,
        type: type,
      }
      this.service.deleteSpecialityService(obj).subscribe(async res => {
        switch(type){
          case 'traditional':
            this.traditional_data.map((tradition,ind) => {
              console.log("traditional data services before =========== ",tradition.services)
              let index = tradition.services.findIndex((item) => {
                return item._id == service_id
              });
              tradition.services.splice(index,1)
              if(!tradition.services.length){
                //this.getDisciplineServices();
              }
            })
            break;

          case 'digital':
            this.digital_data.map((digital,ind) => {
              let index = digital.services.findIndex((item) => {
                return item._id == service_id
              });
              digital.services.splice(index,1)
              if(!digital.services.length){
                //this.getDisciplineServices();
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

  addNewSpeciality(){
    

    if(!this.addServiceForm.valid){
      this.addServiceForm.markAllAsTouched();
      return
    }

    this.serviceName = this.serviceName.trim();
    if(this.serviceName){
      this.isLoading = true;
      const obj = {
        name:this.serviceName,
        discipline_speciality_id: this.serviceId,
        category:this.category
      }   
      this.service.addSpecialityService(obj).subscribe(async res => {
        $('#addService').modal('hide');
        const item = {
          _id : res._id,
          name : res.name,
          status : res.status,
          flag : true,
          talent_user_id : res.talent_user_id ? res.talent_user_id : ""
        }
        switch(this.category){
          case 'traditional':
           // this.traditional_services_List.push({name: this.serviceName,_id: res.data._id});
            this.selected_traditional_services.push(res.data._id)

            this.traditional_data.map((tradition,ind) => {
              console.log("traditional data services before =========== ",tradition.services)
              let index = tradition.services.findIndex((item) => {
                return item._id == this.serviceId
              });
              tradition.services.push(res.data)
              if(!tradition.services.length){
                //this.getDisciplineServices();
              }
            })
            break;
           // this.getDisciplineServices();
            break;

          case 'digital':
           // this.digital_services_List.push({name: this.serviceName,_id: res.data._id});
            this.selected_digital_services.push(res.data._id)
           // this.getDisciplineServices();
           this.digital_data.map((digital,ind) => {
            let index = digital.services.findIndex((item) => {
              return item._id == this.serviceId
            });
            digital.services.push(res.data)
            if(!digital.services.length){
              //this.getDisciplineServices();
            }
          })
            break;
        }
      //  this.closeModal();
        this.isLoading = false
      },(err) => {
        this.isLoading = false
        this.service.handleError(err)
        console.log(err)
      })
    }
}

}
