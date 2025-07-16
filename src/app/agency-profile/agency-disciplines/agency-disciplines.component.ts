import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../service/service.service';



@Component({
  selector: 'app-agency-disciplines',
  templateUrl: './agency-disciplines.component.html',
  styleUrls: ['./agency-disciplines.component.scss']
})
export class AgencyDisciplinesComponent implements OnInit {
  profile
  disciplines =  []
  selected_disciplines: Array<String>;
  constructor(private service : Service,private router : Router) {

  }

  ngOnInit(): void {
    this.getDisciplines();
    this.getAgencyProfile();
  }

  getAgencyProfile(){
    this.service.agencyProfile().subscribe(resp => {
      this.profile = resp.profile

      if(this.profile && this.profile.agency_category_data ){

        this.disciplines = this.disciplines.map(item => {

          if( this.profile.agency_category_data.discipline_data.find(f =>  f._id == item._id) ){
            item.flag = true;
          }

          return item

        })


      }

    },(err) => {

      this.service.handleError(err)

    })
  }

  getDisciplines(){
    this.service.getDisciplineList().subscribe(resp => {

      console.log(resp);
      this.disciplines = resp.list

    },(err) => {

      this.service.handleError(err)

    })
  }

  goToNext(){

    const form = {
      disciplines : this.disciplines.filter(item => item['flag'])
    }

    this.service.saveAgencyCategoryData(form).subscribe(resp => {
      
      this.service.showSuccessMessage({
        message : "Disciplines added Successfully."
      })
      this.router.navigate(['agency-specialities']);
    },(err) => {
      this.service.handleError(err);
    })
  }



}
