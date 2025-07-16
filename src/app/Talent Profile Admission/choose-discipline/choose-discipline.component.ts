import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Router, CanActivate } from '@angular/router';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { Pipe, Sanitizer } from '@angular/core';

import { Service } from "./../../service/service.service";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-choose-discipline',
  templateUrl: './choose-discipline.component.html',
  styleUrls: ['./choose-discipline.component.scss']
})
export class ChooseDisciplineComponent implements OnInit {
  isLoading: boolean;
  list : [] = []
  items = [1,54,65,5,52,5,2,635,2]
  selected_discipline : String
  selected_discipline_slug : String
  profile:any
  env = environment
  // page = "choose-discipline";
  constructor(
    public service : Service,
    public router: Router,
    private _snackbar : MatSnackBar,
    private sanitizer:DomSanitizer
    ) {
      this.service.sideBarHeight = 0;
      this.service.page = "choose-discipline";
       }

  ngOnInit(): void {

    this.getDisciplineList();
    this.getUserProfile();

    if (localStorage.getItem("talent_discipline")) {
      this.selected_discipline = localStorage.getItem("talent_discipline");
    }

  }

  getUserProfile(){
    this.service.getUserProfile().subscribe(async res => {
      this.isLoading = false 
      
      this.service.profile = res.profile;
      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.discipline_id) {
        
        this.selected_discipline = res.profile.talent_category_data.discipline_id;
      }

    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }

  getDisciplineList(){
    this.service.getDisciplineList().subscribe(async res => {
      this.isLoading = false 
      this.list = res.list;
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  selectDiscipline(discipline){
    this.selected_discipline = discipline._id;
    this.selected_discipline_slug = discipline.discipline_slug;
    this.addTalentDiscipline();
  }
  
  addTalentDiscipline(){
    
    const obj = { 
      discipline_id: this.selected_discipline
    }
    
    this.service.addTalentDiscipline(obj).subscribe(async res => {
      this.isLoading = false 
      this.router.navigate(["choose-speciality",this.selected_discipline,this.selected_discipline_slug]);
      this.updateProfilePercentage();
      this.getUserProfile();
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }

  updateProfilePercentage(){

    const obj = { 
      percentage: 10
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
