import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from "./../../service/service.service";

import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { Location } from '@angular/common';

import { yearMonthName } from "./../../common/month_names/names";


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  talent_user_id
  date = new Date()
  profile
  verified
  yearMonthName = yearMonthName

  videoUrl

  isLoading = true

  inviteForJob = true
  sanitizer: any;

  constructor(private location : Location,private route : ActivatedRoute,private service : Service,private dm : DomSanitizer ) { 
    this.sanitizer = dm;

  }

  ngOnInit(): void {

    this.talent_user_id = this.route.snapshot.paramMap.get('talent_user_id');
    const loggedUser = this.service.loggedUserDetails();
    
    console.log(loggedUser);
    

    if(loggedUser){
      if(loggedUser._id == this.talent_user_id){
        this.inviteForJob = false
      }
    }
    this.getPublicProfile()

  }

  getPublicProfile(){
    const form = {
      talent_user_id : this.talent_user_id
    }
    

    this.service.getPublicProfile(form).subscribe(res => {
      this.isLoading = false
      this.profile = res.profileById;
      if(res.profileById.verified)
      {
            this.verified=true
      }
      if(this.profile && this.profile.video_introduction){
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.profile.video_introduction);
      }
    },(error) => {
      this.isLoading = false
      this.service.handleError(error)
    })

  }

  byPassURL(url){
    return this.dm.bypassSecurityTrustResourceUrl(url);
  }

  emp_type(type){
    switch (type) {
      case "full_time":
        return "Full Time"
        break;
      case "part_time":
        return "Part Time"
        break;
      case "self_employed":
        return "Self Employed"
        break;
      case "freelance":
        return "Freelance"
        break;
      case "internship":
        return "Internship"
        break;
    
      default:
        return ""
        break;
    }
  }

  getTitleFromExp(array){
    const s = array.find(item => item.currently_working)

    return s ? s.title : ""
  }

  backClicked() {
    this.location.back();
  }

  played(){
    
  }

}
