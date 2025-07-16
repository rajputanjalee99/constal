import { Component, OnInit } from '@angular/core';
import { Service } from "./../../service/service.service";
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { environment } from "./../../../environments/environment";

declare global {
  interface Window {
    showLoader:any;
  }
}

@Component({
  selector: 'app-linkedin-client',
  templateUrl: './linkedin-client.component.html',
  styleUrls: ['./linkedin-client.component.scss']
})
export class LinkedinClientComponent implements OnInit {

  isLoading: boolean;
  code:String
  error
  error_desciption
  user_details = {
    first_name : "",
    last_name : "",
    email : "",
    user_type : "linkedin",
    role : "client",
    social_id : "",
    image : "",
  }

  constructor(private service : Service,private router : Router,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      this.error = params['error'];
      this.error_desciption = params['error_description'];
    });    

    if(this.code){ // if code got from linkedIN
      this.fetchDetails(); 
    }else{ // if did not got code, then linkedin will give `error_desciption`, so we will show same message to user
      this.service.showErrorMessage({
        message : this.error_desciption
      })
      this.router.navigate(['']);
    }
    
  }

  ngOnInit(): void {
  }  

  fetchDetails(){

    this.isLoading = true;
    window.showLoader()    
    const form = {
      code : this.code,
      redirect_uri : environment.client_callback_url
    }
    this.service.getUserDetailsLinkedIN(form).subscribe(async r => {

      this.user_details.first_name = r.profileRES.firstName.localized.en_US;
      this.user_details.last_name = r.profileRES.lastName.localized.en_US;
      this.user_details.email = r.emailRes.elements[0]["handle~"].emailAddress; // linkedin provide array of email address, maybe there is option for add multiple email in linkedin.
      this.user_details.image = r.profileRES.profilePicture ? r.profileRES.profilePicture["displayImage~"].elements[r.profileRES.profilePicture["displayImage~"].elements.length - 1].identifiers[0].identifier : "";// LinkedIn provides of diff diff image resolution, so we need high resolution user_image and will get from last array of index.
      this.user_details.social_id = r.profileRES.id;
      this.isLoading = false;
      this.loginWithLinkedIn()      

    },(err) => {
      this.isLoading = false;
      this.service.handleError(err)
      this.router.navigate(['']);
      console.log(err)
    })
    
  }

  loginWithLinkedIn(){

    const form = this.user_details
    this.service.registerSocialUserTalent(form).subscribe(async res => {

      this.service.showSuccessMessage({
        message : "Logged Successfully."
      })

      localStorage.setItem("user_details",JSON.stringify(res.user))
      localStorage.setItem("token",res.token)
      localStorage.setItem("remember_me","yes")

      this.isLoading = false;
      this.router.navigate(['post-job']);
    },(err) => {
      this.isLoading = false;
      this.service.handleError(err)
      console.log(err)
      this.router.navigate(['']);
      //this.isLoading = false
    })
    
  }

}
