import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../service/service.service';
declare var $ : any
@Component({
  selector: 'app-choose-services',
  templateUrl: './choose-services.component.html',
  styleUrls: ['./choose-services.component.scss']
})
export class ChooseServicesComponent implements OnInit {
  isLoading = false;
  discipline_id: String;
  digital_services_List = [];
  traditional_services_List = [];
  selected_digital_services = [];
  selected_traditional_services = [];
  serviceId: string = '';
  category: string = '';
  serviceName: string;
  service_list = [];
  showModal = false;
  category_list = [{value: 'traditional', name: 'Traditional'},{value: 'digital',name: 'Digital'}];
  speciality:any
  speciality_id:any
  selected_specialities = []
  digital_data = []
  traditional_data = []
  trad = []
  digi = []
  selected_traditional_data = []
  selected_digital_data = []

  config = {
    displayFn:(item: any) => { return item.name},
    displayKey:"name", 
  }

  constructor(
    public _service : Service,
    public router: Router,
    private route : ActivatedRoute) { 
      this._service.sideBarHeight = 20;
      this._service.page = "choose-services"; }

  ngOnInit(): void {
        // alert(this.route.snapshot.paramMap.get("descipline_slug"))  getUserProfile
        this.discipline_id = this.route.snapshot.paramMap.get("descipline_id");
        this.getUserProfile();
        // this.getDisciplineServices();
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

  getUserProfile(){
    this._service.getUserProfile().subscribe(async res => {
      this._service.profile = res.profile;
      // console.log("profile resp =========== ",res.profile)
      this.service_list = res.profile.talent_category_data.speciality;
      this.discipline_id = res.profile.talent_category_data.discipline_id;
      // this.selected_digital_services = res.profile.talent_category_data.digital_service;
      // this.selected_traditional_services = res.profile.talent_category_data.traditional_service;
      this.selected_digital_services = res.profile.talent_category_data.digital_service.map((item => {
        return item._id
      }))

      this.selected_traditional_services = res.profile.talent_category_data.traditional_service.map((item => {
        return item._id
      }))

      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.speciality.length) {        
        this.speciality = res.profile.talent_category_data.speciality[0].name;
        this.speciality_id = res.profile.talent_category_data.speciality[0]._id;
        this.selected_specialities = [];
        // this.selected_specialities.push(res.profile.talent_category_data.speciality[0]._id)
        this.selected_specialities = res.profile.talent_category_data.speciality.map((item => {
          return item._id
        }))
        this.getDisciplineServices();
      }

    },(err) => {
      this._service.handleError(err)
      console.log(err)
    })
  }

  getDisciplineServices(){
    const discipline_id = this.discipline_id;
    // console.log("selected spe =============== ",this.selected_specialities)
    this._service.getDisciplineServicestalent(this.selected_specialities).subscribe(async res => {
      // this.digital_services_List = res.digitalServices;
      // this.traditional_services_List = res.traditionalServices;
      this.digital_data = res.digitalServices;
      this.traditional_data = res.traditionalServices;
      console.log("services resp ================ ",res)
      
      res.digitalServices.map((digital_data,index) => {
        this.digital_data[index]['services'] = digital_data.services.map((item => {
          if(this.selected_digital_services.includes(item._id)){
            return item = {
              _id : item._id,
              name : item.name,
              status : item.status,
              flag : true,
              talent_user_id : item.talent_user_id ? item.talent_user_id : ""
            }
          }else{
            return item = {
              _id : item._id,
              name : item.name,
              status : item.status,
              flag : false,
              talent_user_id : item.talent_user_id ? item.talent_user_id : ""
            }
          }        
        }))        
      })

      res.traditionalServices.map((traditional_data,index) => {
        this.traditional_data[index]['services'] = traditional_data.services.map((item => {
          if(this.selected_traditional_services.includes(item._id)){
            return item = {
              _id : item._id,
              name : item.name,
              status : item.status,
              flag : true,
              talent_user_id : item.talent_user_id ? item.talent_user_id : ""
            }
          }else{
            return item = {
              _id : item._id,
              name : item.name,
              status : item.status,
              flag : false,
              talent_user_id : item.talent_user_id ? item.talent_user_id : ""
            }
          }        
        }))        
      })

      // this.traditional_services_List = res.traditionalServices.map((item => {
      //   if(this.selected_traditional_services.includes(item._id)){
      //     return item = {
      //       _id : item._id,
      //       name : item.name,
      //       status : item.status,
      //       flag : true
      //     }
      //   }else{
      //     return item = {
      //       _id : item._id,
      //       name : item.name,
      //       status : item.status,
      //       flag : false
      //     }
      //   }        
      // }))
      
      // this.digital_services_List = res.digitalServices.map((item => {
      //   if(this.selected_digital_services.includes(item._id)){
      //     return item = {
      //       _id : item._id,
      //       name : item.name,
      //       status : item.status,
      //       flag : true
      //     }
      //   }else{
      //     return item = {
      //       _id : item._id,
      //       name : item.name,
      //       status : item.status,
      //       flag : false
      //     }
      //   }
      // }))
      
    },(err) => {

      this._service.handleError(err)
      console.log(err)
    })
  }

  addNewSpeciality(){
    
      this.serviceName = this.serviceName.trim();
      if(this.serviceName){
        this.isLoading = true;
        const obj = {
          name:this.serviceName,
          discipline_speciality_id: this.serviceId,
          category:this.category
        }   
        this._service.addSpecialityServicetalent(obj).subscribe(async res => {
          console.log("added service resp ============= ",res)
          const item = {
            _id : res._id,
            name : res.name,
            status : res.status,
            flag : true,
            talent_user_id : res.talent_user_id ? res.talent_user_id : ""
          }
          switch(this.category){
            case 'traditional':
              this.traditional_services_List.push({name: this.serviceName,_id: res.data._id});
              this.selected_traditional_services.push(res.data._id)
             
              this.getDisciplineServices();
              break;

            case 'digital':
              this.digital_services_List.push({name: this.serviceName,_id: res.data._id});
              this.selected_digital_services.push(res.data._id)
              this.getDisciplineServices();
              break;
          }
          this.closeModal();
          this.isLoading = false
        },(err) => {
          this.isLoading = false
          this._service.handleError(err)
          console.log(err)
        })
      }
  }

  deleteSpecialityService(type,service_id){
    if(service_id){
      const obj = {
        service_id: service_id,
        type: type,
      }
      this._service.deleteSpecialityService(obj).subscribe(async res => {
        switch(type){
          case 'traditional':
            this.traditional_data.map((tradition,ind) => {
              console.log("traditional data services before =========== ",tradition.services)
              let index = tradition.services.findIndex((item) => {
                return item._id == service_id
              });
              tradition.services.splice(index,1)
              if(!tradition.services.length){
                this.getDisciplineServices();
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
                this.getDisciplineServices();
              }
            })
            break;
        }
        // this.getDisciplineSpeciality();
      },(err) => {
        this._service.handleError(err)
        console.log(err)
      })
    }
  }

  addTalentServices(){
    this.selected_traditional_data = [];
    this.selected_digital_data = [];
    this.traditional_data.map((traditional_data,index) => {
      this.trad = [];
      this.trad = traditional_data.services.filter(ele=> ele.flag? ele.flag === true: '');
      if(this.trad.length){
        this.trad.map((item => {
          this.selected_traditional_data.push(item)
        }))
      }
    })

    this.digital_data.map((digital_data,index) => {
      this.digi = [];
      this.digi = digital_data.services.filter(ele=> ele.flag? ele.flag === true: '');
      if(this.digi.length){
        this.digi.map((item => {
          this.selected_digital_data.push(item)
        }))
      }
    })

    const selected_traditional = this.selected_traditional_data;
    const selected_digital = this.selected_digital_data;

    // const selected_traditional = this.traditional_services_List.filter(ele=> ele.flag? ele.flag === true: '');
    // const selected_digital = this.digital_services_List.filter(ele=> ele.flag? ele.flag === true: '');
    const checkArray = [];
    checkArray.push(...selected_traditional, ...selected_digital)
    if(!checkArray.length){
      return this._service.showErrorMessage({ message : "Please choose atleast one service", action : "Okay"})
    }
    const obj = {
      traditional_service: selected_traditional,
      digital_service: selected_digital
    }
    
    this._service.addTalentSpecialityService(obj).subscribe(async res => {
      console.log(res);
      
      // this.router.navigate(["/choose-sectors"]);
      this.router.navigate(["/qualifications"]);
    },(err) => {
      this.isLoading = false
      this._service.handleError(err)
      console.log(err)
    })
  }

  clearForm(form: FormGroup) {
    form.setErrors({
      touched : false,
    })
    }
  closeModal(){
    // console.log("I am in");
    // form.setControl("service")
    // form.controls["service"].setErrors({'required': false});
    // form.reset();
    // form.updateValueAndValidity();
    this.showModal = false;
    // this.addServices.resetForm();
    $('#addService').modal('hide')
    // alert(this.showModal);
    this.serviceId = '';
    this.category = '';
    this.serviceName = '';
  }
  showAddNewServiceModal(){
    if(this.showModal == false){
      this.showModal = true;
    }
  }
}
