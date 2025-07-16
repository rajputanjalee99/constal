import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../service/service.service';


@Component({
  selector: 'app-agency-speciality',
  templateUrl: './agency-speciality.component.html',
  styleUrls: ['./agency-speciality.component.scss']
})
export class AgencySpecialityComponent implements OnInit {

  specialities = []
  profile
  speciality_name: any;
  discipline_id: any = "";
  disciplines = []

  constructor(private service : Service,private router : Router) { 


  }

  ngOnInit(): void {
    this.getSpecialities();
    this.getAgencyProfile();
  }

  getAgencyProfile(){
    this.service.agencyProfile().subscribe(resp => {
      this.profile = resp.profile

      this.getSpecialities();

      if(this.profile && this.profile.agency_category_data && this.profile.agency_category_data.discipline_data){
        this.disciplines = this.profile.agency_category_data.discipline_data
      }

     


    },(err) => {

      this.service.handleError(err)

    })
  }

  addSpeciality(){
    const speciality_name = this.speciality_name;
    if(speciality_name && speciality_name.trim()){
      const obj = {
        name: speciality_name,
        discipline_id: this.discipline_id
      }
      
      this.service.addSpeciality(obj).subscribe(async res => {

      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      return this.service.showErrorMessage({ message : "Please enter Speciality Name", action : "Okay"})
    }

    

  }

  getSpecialities(){

    this.service.getAgencySpeciality({}).subscribe(res => {
      this.specialities = res.list

      if(this.profile && this.profile.agency_category_data ){
        this.specialities = this.specialities.map(item => {

          if(this.profile.agency_category_data.discipline_specialities.find(f => f._id == item._id)){
            item.flag = true;
          }
  
          return item
  
        })
      }


    },(err) => {
      this.service.handleError(err);
    })

  }

  goNextPage(){
    const form = {
      speciality : this.specialities.filter(item => item.flag)
    }
    this.service.saveAgencyCategoryData(form).subscribe(resp => {

      this.service.showSuccessMessage({
        message : "Speciality Updated"
      })

      this.router.navigate(['agency-services'])

    },(err) => {
      this.service.handleError(err)
    })


  }

}
