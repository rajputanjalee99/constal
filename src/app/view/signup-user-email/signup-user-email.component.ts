import { Component, OnInit } from '@angular/core';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from  "@angular/router";
import { Router, CanActivate } from '@angular/router';
import { EmailExistComponent } from "./../../common/snackbar/email_exist/email.component";
import { fire as firebase } from "../../firebase/firebase";
import { environment } from "../../../environments/environment";
import { checkPassStrength } from "../../determine-password/check-weak-password";

@Component({
  selector: 'app-signup-user-email',
  templateUrl: './signup-user-email.component.html',
  styleUrls: ['./signup-user-email.component.scss']
})
export class SignupUserEmailComponent implements OnInit {
  password;
  show = false;
  form: FormGroup;
  isLoading = false
  password_status
  referralCode = "";

  constructor(public router: Router,private service : Service,private route: ActivatedRoute,private _snackBar: MatSnackBar,private fb: FormBuilder) {
    // window.service = this.service
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      terms: ['', [Validators.requiredTrue]],
      password: ['', [Validators.required,Validators.minLength(8)]],      
    }) 

  }

  ngOnInit(): void {
    this.password = 'password';
    // console.log(this.route.snapshot.params)
    if(this.route.snapshot.params && this.route.snapshot.params.code){
      this.referralCode = this.route.snapshot.params.code;
    }
  }
  
  async emailExistValidator(control: FormControl) {
    let value = control.value;
    try{
      var flag = false
      // const res = await window.service.checkEmailExist().subscribe();

      // console.log(res)

      // alert(flag);
    }catch(err){
      console.log("error ---------",err);
    }
    
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
  registerUser(){
    console.log()
    this.isLoading = true;   

    const form = {
      first_name : this.form.controls['first_name'].value,
      last_name : this.form.controls['last_name'].value,
      email : this.form.controls['email'].value,
      password : this.form.controls['password'].value,
      referral_code : this.referralCode
    }
    this.service.registerUser(form).subscribe(async res => {
    
      const snackBarRef = this._snackBar.open("Registered Successully, Verify your email to Continue.", "Go to Login", {
        duration: undefined,
      });
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['login']);
      });
      this.isLoading = false;
      

      // this.router.navigate(['login']);
    },(err) => {
      this.isLoading = false;

      if(err.status == 409){ // if email already exist 
        const snackBarRef = this._snackBar.open("We’re sorry. This login email already exists. Please try a different email address to register, or login to your existing account.", "Login", {
          duration: undefined,
        });
        snackBarRef.onAction().subscribe(() => {
          this.router.navigate(['login']);
          // console.log('The snack-bar action was triggered!');
        });
        
      }else{
        this.service.handleError(err)
        console.log(err)
      }

      
      //this.isLoading = false
    })

  }
    loginWithLinkedIn(){
         window.location.href = environment.linkedinURLClient;

     console.log()
     
    
  }  

  changePassword(){

    const password = this.form.controls['password'].value
    const status = checkPassStrength(password)

    console.log(status);
    this.password_status = status
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
