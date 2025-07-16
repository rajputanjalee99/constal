import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Service } from "./../../service/service.service";
import { Router, CanActivate } from '@angular/router';
import { checkPassStrength } from '../../determine-password/check-weak-password';

@Component({
  selector: 'app-referral-reset-password',
  templateUrl: './referral-reset-password.component.html',
  styleUrls: ['./referral-reset-password.component.scss']
})
export class ReferralResetPasswordComponent implements OnInit {
  password;
  show = false;
  password1;
  show1 = false;
  code:String
  token:String
  isLoading : Boolean = false
  form: FormGroup;
  password_status

  constructor(public router: Router,private toastr: ToastrService,private route: ActivatedRoute,private service : Service,private fb: FormBuilder) {
    this.form = this.fb.group({     
      password: ['', [Validators.required,Validators.minLength(8)]],     
      confirm_password: ['', [Validators.required,Validators.minLength(8),this.checkPasswords]],     
    }) 

  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.code)
    // alert(this.route.snapshot.params)
    this.code = this.route.snapshot.params.code
    this.token = this.route.snapshot.params.token
    this.checkTokenValidOrNot();
    this.password = 'password';
    this.password1 = 'password';

  }

  changePassword(){

    const password = this.form.controls['password'].value
    const status = checkPassStrength(password)

    console.log(status);
    this.password_status = status

  }

  checkTokenValidOrNot(){
    
    //this.isLoading = true;
    const form = {
      code : this.code,
      token : this.token
    }
    this.service.validateTokenCode(form).subscribe(async res => {  
    },(err) => {
      this.isLoading = false;
      this.service.handleError(err)
      this.router.navigate(['referral-login']);
      console.log(err)
      //this.isLoading = false
    })
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    console.log(group)

    const confirmPassword = group.value;
    var password = "10";
    var cP = (<HTMLInputElement>document.getElementById("password"))
    if(cP){
      password = cP.value;
    }    
    console.log(password == confirmPassword)
    return password === confirmPassword ? null : { notSame: true }     
  }
  
  showSuccess() {

    console.log(this.form.controls['confirm_password'])

    this.toastr.success('You have set your password successfully Now you can login with your new password', '', {
      closeButton: true,
      timeOut: 0,
      extendedTimeOut:0
    });
  }

  resetPassword(){
    this.isLoading = true;
    const form = {
      code : this.code,
      token : this.token,
      password : this.form.controls['password'].value
    }
    this.service.resetPassword(form).subscribe(async res => {

      this.service.showSuccessMessage({
        message : "Password Reset Successfully"
      })
      this.isLoading = false;
      this.router.navigate(['referral-login']);

    },(err) => {
      this.isLoading = false;
      this.service.handleError(err)
      // this.router.navigate(['login']);
      console.log(err)
      //this.isLoading = false
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
