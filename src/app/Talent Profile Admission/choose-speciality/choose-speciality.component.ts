import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { Service } from "./../../service/service.service";

@Component({
  selector: 'app-choose-speciality',
  templateUrl: './choose-speciality.component.html',
  styleUrls: ['./choose-speciality.component.scss']
})
export class ChooseSpecialityComponent implements OnInit {

  isLoading: boolean = true;
  discipline_id: String;
  list : [] = []
  specialities:any = []
  specialities_add:any = []
  selected_specialities = []
  speciality_name
  speciality
  discipline_name = "";
  profile:any
  constructor(
    public service : Service,
    public router: Router,
    private _snackbar : MatSnackBar,
    private route : ActivatedRoute
    ) { 
      this.service.sideBarHeight = 10;
      this.service.page = "choose-speciality";
    }

  ngOnInit(): void {
    

    this.getUserProfile();

  }

  getUserProfile(){
    this.service.getUserProfile().subscribe(async res => {
      this.isLoading = false 
      console.log(res);
      this.service.profile = res.profile;
      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.discipline_id) {
        
        this.discipline_id = res.profile.talent_category_data.discipline_id;
      }

      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.discipline_data && res.profile.talent_category_data.discipline_data.discipline) {
        
        this.discipline_name = res.profile.talent_category_data.discipline_data.discipline;
      }

      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.speciality.length) {
        
        this.selected_specialities = res.profile.talent_category_data.speciality.map((item => {
          return item._id
        }))
        this.speciality = res.profile.talent_category_data.speciality[0].name;
        // console.log("prof selected speciality =============== ",this.selected_specialities)
      }

      if(this.discipline_id){
        this.getDisciplineSpeciality();
      }else{
        this.service.showErrorMessage({ message : "Please select discipline first", action : "Okay"});
        this.router.navigate(["choose-discipline"]);
      } 
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }

  getDisciplineSpeciality(){
    const discipline_id = this.discipline_id;
    this.service.getDisciplineSpeciality(discipline_id).subscribe(async res => {
      this.isLoading = false 
      this.list = res.list;
      console.log("speciality list ============= ",res)
      this.specialities = res.list.map((item => {
        
        if(this.selected_specialities.includes(item._id)){
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
      console.log("specialities ============= ",this.specialities)
  
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })

  }

  onCheckboxChangeSpeciality(event,speciality){
    if(event.target.checked){
      this.selected_specialities.push(speciality._id);
    }else{
      // this.selected_specialities.splice(speciality._id,1);
      let index = this.selected_specialities.findIndex((item) => {
        return item == speciality._id
      });
      this.selected_specialities.splice(index,1)
    }
  }


  chooseSpeciality(_id){

    // this.selected_specialities = [];
    this.selected_specialities.push(_id)
    // console.log("selected specialities ============= ",this.selected_specialities)
  }

  removeSpeciality(_id){

    let index = this.selected_specialities.findIndex((item) => {
      return item == _id
    });

    this.selected_specialities.splice(index,1)

  }

  

  addTalentSpeciality(){

    // const selected_speciality = this.selected_specialities;
    const selected_speciality = this.specialities.filter(ele=> ele.flag? ele.flag === true: '');
    console.log("selected speciality ============== ",selected_speciality)
    const checkArray = [];
    checkArray.push(...selected_speciality)
    if(!checkArray.length){
      return this.service.showErrorMessage({ message : "Please select atleast one Speciality", action : "Okay"})
    }
    const t = this.specialities_add.map((item => {
      return item.value
    }))
    const obj = {
      new_specialities : t,
      specialities: selected_speciality,
      discipline_id: this.discipline_id
    }
    this.isLoading = true; 
    // console.log("speciality obj ========== ",obj)
    this.service.addTalentSpeciality(obj).subscribe(async res => {
      this.isLoading = false ;
      // this.list = res.list;
      // this.specialities = res.list;
      // console.log("specialities res =======",res)
      this.updateProfilePercentage();
      this.router.navigate(["choose-services"])
    },(err) => {
      this.isLoading = false;
      this.service.handleError(err)
      console.log(err)
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
        
        // this.selected_specialities = [];
        // this.specialities.push({name: res.data.name,_id: res.data._id});
        this.selected_specialities.push(res.data._id)
        // this.speciality = res.data.name;
        this.getDisciplineSpeciality();
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
        this.getDisciplineSpeciality();
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }

  updateProfilePercentage(){

    const obj = { 
      percentage: 20
    }
    this.service.updateProfilePercentage(obj).subscribe(async res => {
      this.isLoading = false 
      
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }

}
