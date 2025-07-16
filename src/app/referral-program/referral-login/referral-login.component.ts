import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from "../../../environments/environment";
import { Router, CanActivate } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { fire as firebase } from "../../firebase/firebase";
import { Service } from "./../../service/service.service";

declare var $;

@Component({
  selector: 'app-referral-login',
  templateUrl: './referral-login.component.html',
  styleUrls: ['./referral-login.component.scss']
})
export class ReferralLoginComponent implements OnInit {
  password;
  show = false;
  form : FormGroup
  isLoading = false
  constructor(private _snackbar : MatSnackBar, public router: Router,private service : Service,private fb: FormBuilder) { 
    this.form = this.fb.group({
      // email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],     
      password: ['', [Validators.required,]],
      remember_me: ['',[]],
    }) 
  }

  ngOnInit(): void {
    this.password = 'password';
    // this.isLoading = true
  }

  login(){

    this.isLoading = true

    const form = {
      email : this.form.controls['email'].value,
      password : this.form.controls['password'].value,
      remember_me : this.form.controls['remember_me'].value,
    }
    
    this.service.login(form).subscribe(async res => {
      console.log("login res ====================== ",res)
      this.isLoading = false   

      if(res.user.role == "referral_partner"){
        if(this.form.controls['remember_me'].value){
          localStorage.setItem("user_details",JSON.stringify(res.user))
          localStorage.setItem("token",res.token)
          localStorage.setItem("remember_me","yes")
        }else{
          sessionStorage.setItem("user_details",JSON.stringify(res.user))
          sessionStorage.setItem("token",res.token)
          localStorage.setItem("remember_me","no")
        }

        this.service.showSuccessMessage({
          message : "Logged Successfully"
        })
        this.router.navigate(['referral-db']);
      }else{
        this._snackbar.open("Please login with Referral", "CLOSE", {
          duration: 3000,
          horizontalPosition: "center",
          verticalPosition: "bottom",
        });
      }   

      // if(res.user.role == "talent"){      
      //   if(res.user && res.user.is_profile_submitted_to_admin && res.user.admin_profile_status && res.user.admin_profile_status=="not_sumbitted"){
      //     $('.restrctd_modal').modal('show');
      //   }else if(res.user && res.user.is_profile_submitted_to_admin && res.user.admin_profile_status && res.user.admin_profile_status=="rejected"){
      //     $('.ops_modal').modal('show');
      //   }else if(res.user.is_profile_submitted_to_admin){
      //     $('.restrctd_modal').modal('hide');
      //     $('.ops_modal').modal('hide');

      //     if(this.form.controls['remember_me'].value){
      //       localStorage.setItem("user_details",JSON.stringify(res.user))
      //       localStorage.setItem("token",res.token)
      //       localStorage.setItem("remember_me","yes")
      //     }else{
      //       sessionStorage.setItem("user_details",JSON.stringify(res.user))
      //       sessionStorage.setItem("token",res.token)
      //       localStorage.setItem("remember_me","no")
      //     }

      //     this.service.showSuccessMessage({
      //       message : "Logged Successfully"
      //     })
      //     this.router.navigate(["talent-dashboard"]);
      //   }else{
      //     $('.restrctd_modal').modal('hide');
      //     $('.ops_modal').modal('hide');

      //     if(this.form.controls['remember_me'].value){
      //       localStorage.setItem("user_details",JSON.stringify(res.user))
      //       localStorage.setItem("token",res.token)
      //       localStorage.setItem("remember_me","yes")
      //     }else{
      //       sessionStorage.setItem("user_details",JSON.stringify(res.user))
      //       sessionStorage.setItem("token",res.token)
      //       localStorage.setItem("remember_me","no")
      //     }
      //     console.log("session storage token =========== ",sessionStorage.getItem("token"))

      //     this.service.showSuccessMessage({
      //       message : "Logged Successfully"
      //     })
      //     this.router.navigate(['choose-discipline']);
      //   }
        
      // }else if(res.user.role == "client"){
      //   this._snackbar.open("Please login with Talent", "CLOSE", {
      //     duration: 3000,
      //     horizontalPosition: "center",
      //     verticalPosition: "bottom",
      //   });
      // }
      
    },(err) => {
      this.isLoading = false
      if(err.status == 406){ // if email already exist 
        const snackBarRef = this._snackbar.open("Did not receive the verificiation email? Please click on the resend option", "Resend", {
          duration: undefined,
        });
        snackBarRef.onAction().subscribe(() => {
          // alert("Resend clicked");
          this.resendEmail();
          // this.router.navigate(['login']);
        });        
      }else{
        this.service.handleError(err)
        console.log(err)
      }
    })
  }

  resendEmail(){ 
    this.isLoading = true;
    const form = {
      email : this.form.controls['email'].value
    }
    this.service.resendEmail(form).subscribe(async res => {

      this.service.showSuccessMessage({
        message : "Link sent to your email Successfully"
      })
      this.isLoading = false;
     // this.router.navigate(['login']);
    },(err) => {
      this.isLoading = false;
      this.service.handleError(err)
      console.log(err)
    }) 
  }

  loginWithGoogle(){
    // alert("sd");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebaseNew.auth.OAuthCredential} */
      var credential = result.credential;
      console.log(credential)

      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user.providerData[0])

      this.isLoading = true;
      const form = {
        first_name : user.providerData[0].displayName,
        last_name : "",
        email : user.providerData[0].email,
        user_type : "google",
        role : "referral_partner",
        social_id : user.providerData[0].uid,
        image : user.providerData[0].photoURL,
      }
      this.service.registerSocialUserTalent(form).subscribe(async res => {
        
        this.isLoading = false;

        localStorage.setItem("user_details",JSON.stringify(res.user)),
        localStorage.setItem("token",res.token),
        localStorage.setItem("remember_me","yes"),

        this.service.showSuccessMessage({
          message : "Logged Successfully"
        })
        this.router.navigate(["referral-db"]);

        // if(res.user && res.user.is_profile_submitted_to_admin && res.user.admin_profile_status && res.user.admin_profile_status=="not_sumbitted"){
        //   $('.restrctd_modal').modal('show');
        // }else if(res.user && res.user.is_profile_submitted_to_admin && res.user.admin_profile_status && res.user.admin_profile_status=="rejected"){
        //   $('.ops_modal').modal('show');
        // }else if(res.user.is_profile_submitted_to_admin){
        //   $('.restrctd_modal').modal('hide');
        //   $('.ops_modal').modal('hide');

        //   localStorage.setItem("user_details",JSON.stringify(res.user)),
        //   localStorage.setItem("token",res.token),
        //   localStorage.setItem("remember_me","yes"),

        //   this.service.showSuccessMessage({
        //     message : "Logged Successfully"
        //   })
        //   this.router.navigate(["referral-db"]);
        // }else{
        //   $('.restrctd_modal').modal('hide');
        //   $('.ops_modal').modal('hide');

        //   localStorage.setItem("user_details",JSON.stringify(res.user)),
        //   localStorage.setItem("token",res.token),
        //   localStorage.setItem("remember_me","yes"),
        //   console.log("session storage token =========== ",sessionStorage.getItem("token"))

        //   this.service.showSuccessMessage({
        //     message : "Logged Successfully"
        //   })
        //   this.router.navigate(['choose-discipline']);
        // }

      },(err) => {
        this.isLoading = false;
        this.service.handleError(err)
        console.log(err)
        //this.isLoading = false
      })
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      this.service.showSuccessMessage({
        message : errorMessage
      })

      // The email of the user's account used.
      var email = error.email;
      // The firebaseNew.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  loginWithLinkedIn(){
    // return
    // alert(environment.linkedinURLTalent);
    window.location.href = environment.linkedinURLReferral;
  }

  onClickEye() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

}
