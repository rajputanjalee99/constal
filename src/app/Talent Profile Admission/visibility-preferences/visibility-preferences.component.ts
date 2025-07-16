import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { VisibilityPreferencesModel } from "./visibility-prefereneces";
import { Service } from '../../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visibility-preferences',
  templateUrl: './visibility-preferences.component.html',
  styleUrls: ['./visibility-preferences.component.scss']
})
export class VisibilityPreferencesComponent implements OnInit {

  visibilityPreferencesModel = new VisibilityPreferencesModel();
  comparisonFromTo = false

  value: number = 0;
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
  profileVisibilities = [];
  profileVisibilityIndex = 0;
  currencies = [];

  constructor(public service: Service,private router : Router) {
    this.service.sideBarHeight = 80;
   }

  ngOnInit(): void {
    this.visibilityPreferencesModel.hourly = ''
    this.visibilityPreferencesModel.salary_based = ''
    this.visibilityPreferencesModel.see_your_profile = 'anyone'
    this.visibilityPreferencesModel.currency = ''
    this.visibilityPreferencesModel.symbol = ''
    this.getProfileVisibility();
    this.getCurrencies();
    this.getUserProfile();
  }

  getCurrencies(){

    this.service.getCurrencies().subscribe(async res => {
      this.currencies = res.currencies;
      // if(this.currencies.length){
      //   this.visibilityPreferencesModel.symbol = this.currencies[0].symbol;
      //   this.visibilityPreferencesModel.currency = this.currencies[0].code;
      // }

    },(err) => {
      this.service.handleError(err)
      console.log(err)
      //this.isLoading = false
    })

  }

  getUserProfile(){
    this.service.getUserProfile().subscribe(async res => {
      this.service.profile = res.profile;
      if (res.profile && res.profile.talent_preference && res.profile.talent_preference.currency) {
        this.visibilityPreferencesModel.currency = res.profile.talent_preference.currency;
      }

      if (res.profile && res.profile.talent_preference && res.profile.talent_preference.currency) {
        this.visibilityPreferencesModel.symbol = res.profile.talent_preference.symbol;
      }

      if (res.profile && res.profile.talent_preference && res.profile.talent_preference.who_can_see_profile) {
        this.visibilityPreferencesModel.see_your_profile = res.profile.talent_preference.who_can_see_profile;
      }

      if (res.profile && res.profile.talent_preference && res.profile.talent_preference.hourly) {
        this.visibilityPreferencesModel.hourly = res.profile.talent_preference.hourly;
      }

      if (res.profile && res.profile.talent_preference && res.profile.talent_preference.hourly_from) {
        this.visibilityPreferencesModel.hourly_from = res.profile.talent_preference.hourly_from;
      }

      if (res.profile && res.profile.talent_preference && res.profile.talent_preference.hourly_to) {
        this.visibilityPreferencesModel.hourly_to = res.profile.talent_preference.hourly_to;
      }

      if (res.profile && res.profile.talent_preference && res.profile.talent_preference.salary_based) {
        this.visibilityPreferencesModel.salary_based = res.profile.talent_preference.salary_based;
      }

      if (res.profile && res.profile.talent_preference && res.profile.talent_preference.salary_from) {
        this.visibilityPreferencesModel.salary_from = res.profile.talent_preference.salary_from;
      }

      if (res.profile && res.profile.talent_preference && res.profile.talent_preference.salary_to) {
        this.visibilityPreferencesModel.salary_to = res.profile.talent_preference.salary_to;
      }

      if (res.profile && res.profile.talent_preference && res.profile.talent_preference.spend_week_hours) {
        this.value = res.profile.talent_preference.spend_week_hours;
      }
      
    },(err) => {
      // this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }

  getProfileVisibility(){
    this.service.getProfileVisibility().subscribe(async res => {
      this.profileVisibilities = res.data;
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  seeYourProfile(value){
    console.log(value)
    this.visibilityPreferencesModel.see_your_profile = value
    console.log(this.visibilityPreferencesModel)
  }

  checkGreater(e){
    console.log(e.target.value);
    if(Number(this.visibilityPreferencesModel.hourly_from) > Number(this.visibilityPreferencesModel.hourly_to)){
      this.comparisonFromTo = true
      console.log(this.comparisonFromTo)
    }else{
      this.comparisonFromTo = false
      console.log(this.comparisonFromTo)
    }
  }

  addVisibilityPreferencesData(){  
    
      this.visibilityPreferencesModel.time_spend_in_a_week = this.value
      if(this.visibilityPreferencesModel.hourly == "true"){
        this.visibilityPreferencesModel.hourly = "yes";
      }else{
        this.visibilityPreferencesModel.hourly = "no";
      }
      if(this.visibilityPreferencesModel.salary_based == "true"){
        this.visibilityPreferencesModel.salary_based = "yes";
      }else{
        this.visibilityPreferencesModel.salary_based = "no";
      }
      var obj = {
        who_can_see_profile: this.visibilityPreferencesModel.see_your_profile,
        hourly: this.visibilityPreferencesModel.hourly,
        salary_based: this.visibilityPreferencesModel.salary_based,
        currency: this.visibilityPreferencesModel.currency,
        symbol: this.visibilityPreferencesModel.symbol,
        hourly_from: Number(this.visibilityPreferencesModel.hourly_from),
        hourly_to: Number(this.visibilityPreferencesModel.hourly_to),
        salary_from: Number(this.visibilityPreferencesModel.salary_from),
        salary_to: Number(this.visibilityPreferencesModel.salary_to),
        spend_week_hours: Number(this.visibilityPreferencesModel.time_spend_in_a_week)
      }
      
      if(this.visibilityPreferencesModel.hourly_from){
        this.visibilityPreferencesModel.hourlyFromValidation = false
      }else{
        this.visibilityPreferencesModel.hourlyFromValidation = true
      }
      if(this.visibilityPreferencesModel.salary_from){
        this.visibilityPreferencesModel.SalaryFromValidation = false
      }else{
        this.visibilityPreferencesModel.SalaryFromValidation = true
      }

      if(this.value>0){
        this.visibilityPreferencesModel.timeRangeValidation = false
      }else{
        this.visibilityPreferencesModel.timeRangeValidation = true
      }

      if(this.visibilityPreferencesModel.hourly_from && this.visibilityPreferencesModel.salary_from && this.value>0){
        this.service.addTalentPreferences(obj).subscribe(data => {
          console.log("Add Data: ",data)
          this.updateProfilePercentage();
          this.router.navigate(["profile-details"]);
        },err => {
           console.log("Err: ",err);
        })
      }
     
  }

  updateProfilePercentage(){

    const obj = { 
      percentage: 90
    }
    this.service.updateProfilePercentage(obj).subscribe(async res => {
    },(err) => {
      this.service.handleError(err)
      console.log(err)
      //this.isLoading = false
    })
  }

  changeCurrency(code){
    this.currencies.map((item,i) => {      
      if(item.code==code){
        this.visibilityPreferencesModel.symbol = item.symbol;
        return;
      }
    })
  }

}
