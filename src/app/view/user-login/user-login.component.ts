import { Component, OnInit } from '@angular/core';
import { fire as firebase } from "../../firebase/firebase";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from "../../../environments/environment";
import { Router, CanActivate } from '@angular/router';
// import {
//     LinkedInService
// } from 'angular-linkedin-sdk';


import { Service } from "./../../service/service.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  form : FormGroup
  isLoading = false;
    linkedInToken = "";
      toggle1: boolean = false;
        password: string = '';
          show = false;

  constructor(public router: Router,private service : Service,private fb: FormBuilder) { 

    this.form = this.fb.group({
      email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]],
      remember_me: [''],
    }) 

  }



  linkedInCredentials = {
    clientId: "86v7z18n2z8qb6",
    redirectUrl: "https://y8pud.codesandbox.io/linkedInLogin",
    scope: "r_liteprofile%20r_emailaddress%20w_member_social" // To read basic user profile data and email
  };

  ngOnInit(): void {
      this.password = 'password';

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
  login(){

    this.isLoading = true

    const form = {
      email : this.form.controls['email'].value,
      password : this.form.controls['password'].value,
    }
    
    this.service.login(form).subscribe(async res => {
      this.isLoading = false

      if(res.user.role == "talent"){        
        this.service.showSuccessMessage({
          message : "Please login using client credentials"
        })
        // this.router.navigate(['choose-discipline']);
      }else if(res.user.role == "client"){    
        
        if(this.form.controls['remember_me'].value){
          localStorage.setItem("user_details",JSON.stringify(res.user))
          localStorage.setItem("token",res.token)
          localStorage.setItem("remember_me","yes")
          localStorage.setItem("client_user_id",res.user._id)
            localStorage.setItem('f_name', res.user.first_name);
            localStorage.setItem('user_image', res.user.image);
        }else{
          sessionStorage.setItem("user_details",JSON.stringify(res.user))
          sessionStorage.setItem("token",res.token)
          localStorage.setItem('token',res.token)
          localStorage.setItem("remember_me","no")
                    localStorage.setItem("client_user_id",res.user._id)
                      localStorage.setItem('f_name', res.user.first_name);
            localStorage.setItem('user_image', res.user.image);

        }

        this.service.showSuccessMessage({
          message : "Logged Successfully"
        })
        // this.router.navigate(['post-job']);
        if(localStorage.getItem('sessionID')){
                let obj={
                    session_id:localStorage.getItem('sessionID')
                }
                  this.service.replaceSessionID(obj).subscribe(async res => {
                                  this.router.navigate(['job-listing']);
                                  localStorage.removeItem('sessionID')
      })
      
      

        }else{
        this.router.navigate(['client-info']);

        }
      }
      
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
      //this.isLoading = false
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
        role : "client",
        social_id : user.providerData[0].uid,
        image : user.providerData[0].photoURL,
      }
      this.service.registerSocialUserTalent(form).subscribe(async res => {
  
        localStorage.setItem("user_details",JSON.stringify(res.user)),
        localStorage.setItem("token",res.token),
        localStorage.setItem("remember_me","yes"),
        
        this.service.showSuccessMessage({
          message : "Logged Successfully."
        })
        this.isLoading = false;
                  this.router.navigate(["client-dashboard"]);

        
        // this.router.navigate(['profile-details']);
      },(err) => {
        this.isLoading = false;
        this.service.handleError(err)
        console.log(err)
        //this.isLoading = false
      })


      // ...
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
         window.location.href = environment.linkedinURLClient;

     console.log()
     
    
  }      
    // return
    // alert(environment.linkedinURLTalent);
  

  
}
