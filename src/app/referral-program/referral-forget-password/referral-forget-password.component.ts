import { Component, OnInit } from '@angular/core';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-referral-forget-password',
  templateUrl: './referral-forget-password.component.html',
  styleUrls: ['./referral-forget-password.component.scss']
})
export class ReferralForgetPasswordComponent implements OnInit {

  form: FormGroup;
  isLoading = false
  constructor(public router: Router,private service : Service,private _snackBar: MatSnackBar,private fb: FormBuilder) { 
    // this.form = this.fb.group({     
    //   email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],     
    // }) 
    this.form = this.fb.group({     
      email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],     
    }) 
  }

  ngOnInit(): void {
  }

  forgotPassword(){ 
      this.isLoading = true;
      const form = {
        email : this.form.controls['email'].value
      }
      this.service.referralForgotPasword(form).subscribe(async res => {
  
        this.service.showSuccessMessage({
          message : "Link sent to your email Successfully"
        })
        this.isLoading = false;
  
       // this.router.navigate(['login']);
      },(err) => {
        this.isLoading = false;
        this.service.handleError(err)
        console.log(err)
        //this.isLoading = false
      }) 
  }

}
