import { Component, OnInit } from '@angular/core';
import { Service } from "./../../service/service.service";
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { environment } from "./../../../environments/environment";
import { environment as envProd } from "./../../../environments/environment";
import { env } from 'process';
declare var $;
declare global {
  interface Window {
    showLoader:any;
  }
}

let FB = window.showLoader; // ok now

@Component({
  selector: 'app-linkedin-talent',
  templateUrl: './linkedin-talent.component.html',
  styleUrls: ['./linkedin-talent.component.scss']
})
export class LinkedinTalentComponent implements OnInit {
  isLoading: boolean;
  code:String
  error
  error_desciption
  user_details = {
    first_name : "",
    last_name : "",
    email : "",
    user_type : "linkedin",
    role : "talent",
    social_id : "",
    image : "",
  }
  constructor(private service : Service,private router : Router,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      this.error = params['error'];
      this.error_desciption = params['error_description'];
    });    

    if(this.code){
      this.fetchDetails(); 
    }else{
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
      redirect_uri : environment.talent_callback_url
    }
    this.service.getUserDetailsLinkedIN(form).subscribe(async r => {

      this.user_details.first_name = r.profileRES.firstName.localized.en_US;
      this.user_details.last_name = r.profileRES.lastName.localized.en_US;
      this.user_details.email = r.emailRes.elements[0]["handle~"].emailAddress;
      this.user_details.image = r.profileRES.profilePicture ? r.profileRES.profilePicture["displayImage~"].elements[r.profileRES.profilePicture["displayImage~"].elements.length - 1].identifiers[0].identifier : "";
      this.user_details.social_id = r.profileRES.id;
      this.isLoading = false;
      this.loginWithLinkedIn()      
      //this.router.navigate(['profile-details']);
    },(err) => {
      this.isLoading = false;
      this.service.handleError(err)
      this.router.navigate(['']);
      console.log(err)
      //this.isLoading = false
    })
    
  }

  loginWithLinkedIn(){

    const form = this.user_details
    this.service.registerSocialUserTalent(form).subscribe(async res => {

      this.isLoading = false;

      if(res.user && res.user.is_profile_submitted_to_admin && res.user.admin_profile_status && res.user.admin_profile_status=="pending"){
        // $('.restrctd_modal').modal('show');
        // this.router.navigate(['talent-login']);
        this.service.showSuccessMessage({
          message : "Your Profile is under Review."
        })
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['/'])
      }else if(res.user && res.user.is_profile_submitted_to_admin && res.user.admin_profile_status && res.user.admin_profile_status=="rejected"){
        // $('.ops_modal').modal('show');
        // this.router.navigate(['talent-login']);
        this.service.showSuccessMessage({
          message : "Your profile was not approved. Kindly re-submit your application after 6 months to apply again."
        })
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['/'])
      }else if(res.user.is_profile_submitted_to_admin){
        $('.restrctd_modal').modal('hide');
        $('.ops_modal').modal('hide');
        // alert("3")

        localStorage.setItem("user_details",JSON.stringify(res.user)),
        localStorage.setItem("token",res.token),
        localStorage.setItem("remember_me","yes"),

        this.service.showSuccessMessage({
          message : "Logged Successfully"
        })
        this.router.navigate(["talent-dashboard"]);
      }else{
        $('.restrctd_modal').modal('hide');
        $('.ops_modal').modal('hide');

        localStorage.setItem("user_details",JSON.stringify(res.user)),
        localStorage.setItem("token",res.token),
        localStorage.setItem("remember_me","yes"),
        console.log("session storage token =========== ",sessionStorage.getItem("token"))

        this.service.showSuccessMessage({
          message : "Logged Successfully"
        })
        this.router.navigate(['choose-discipline']);
      }

      // localStorage.setItem("user_details",JSON.stringify(res.user)),
      // localStorage.setItem("token",res.token),
      // localStorage.setItem("remember_me","yes"),

      // this.service.showSuccessMessage({
      //   message : "Logged Successfully."
      // })

      
      // if(res.user.is_profile_submitted_to_admin){
      //   // redirect to dashboard
      //   this.router.navigate(["talent-dashboard"]);
      // }else{
      //   this.router.navigate(['choose-discipline']);
      // }

      // this.router.navigate(['profile-details']);
    },(err) => {
      this.isLoading = false;
      this.service.handleError(err)
      console.log(err)
      this.router.navigate(['']);
      //this.isLoading = false
    })

    
  }


}
