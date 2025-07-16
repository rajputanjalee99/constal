import { Component, OnInit } from '@angular/core';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import { checkPassStrength } from "../../determine-password/check-weak-password";

@Component({
  selector: 'app-referral-signup',
  templateUrl: './referral-signup.component.html',
  styleUrls: ['./referral-signup.component.scss']
})
export class ReferralSignupComponent implements OnInit {
  password;
  show = false;
  password1;
  show1 = false;
  form: FormGroup;
  isLoading = false
  password_status
  constructor(public router: Router,private service : Service,private _snackBar: MatSnackBar,private fb: FormBuilder) {
    this.form = this.fb.group({
      full_name: ['', [Validators.required]],
      // email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      // email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],  
      email: ['', [Validators.required,Validators.email,Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@myconstal.com$')]],   
      terms: ['', [Validators.requiredTrue]],
      password: ['', [Validators.required,Validators.minLength(8)]],      
      // confirm_password: ['', [Validators.required,Validators.minLength(8)]],      
      confirm_password: [''],      
    }, { validator: [this.checkPasswords,this.noWhitespaceValidator] }) 
  }
  
  noWhitespaceValidator(group: FormGroup) {
    const isWhitespace = (group.controls.full_name.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirm_password.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit(): void {
    this.password = 'password';
    this.password1 = 'password';
  }

  changePassword(){

    const password = this.form.controls['password'].value
    const status = checkPassStrength(password)
    console.log(status);
    this.password_status = status
  }

  checkRegisterReferral(){
    if(this.form.controls['full_name'].value && this.form.controls['full_name'].value.trim()){
      console.log("check if ============== ")
      this.registerReferral();
    }else{
      console.log("check else ============== ")
    }
  }

  registerReferral(){
    console.log("form submitted ============== ")
    this.isLoading = true;   
    
    const form = {
      // full_name : this.form.controls['full_name'].value,
      email : this.form.controls['email'].value,
      // password : this.form.controls['password'].value,
    }
    console.log("referral form ============== ",form)
    this.service.checkEmailExist(form).subscribe(async res => {
      console.log("register response ==============  ",res)

      localStorage.setItem("full_name",this.form.controls['full_name'].value)
      localStorage.setItem("email",this.form.controls['email'].value)
      localStorage.setItem("password",this.form.controls['password'].value)
      this.router.navigate(['referral-apply']);
      // localStorage.setItem("user_details",JSON.stringify(res.user))
      // localStorage.setItem("token",res.token)
      // localStorage.setItem("remember_me","yes")
      // console.log("token get =========== ",localStorage.getItem("token"))
      // this.router.navigate(['referral-apply']);
      this.isLoading = false;      
    },(err) => {
      this.isLoading = false;
      if(err.status == 422){ 
        const snackBarRef = this._snackBar.open("We’re sorry. This login email already exists. Please try a different email address to register, or login to your existing account.", "Login", {
          duration: undefined,
        });
        snackBarRef.onAction().subscribe(() => {
          this.router.navigate(['referral-login']);
        });        
      }else{
        this.service.handleError(err)
        console.log(err)
      }
    })
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

  onClickEye1() {
    if (this.password1 === 'password') {
      this.password1 = 'text';
      this.show1 = true;
    } else {
      this.password1 = 'password';
      this.show1 = false;
    }
  }

}
