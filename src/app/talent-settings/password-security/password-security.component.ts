import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Service } from "./../../service/service.service";
declare let $ : any; 
import { checkPassStrength } from '../../determine-password/check-weak-password';
import { Router } from '@angular/router';


@Component({
  selector: 'app-password-security',
  templateUrl: './password-security.component.html',
  styleUrls: ['./password-security.component.scss']
})
export class PasswordSecurityComponent implements OnInit {

  profile: any
  passwordForm
  password_status
  two_step_verification = {
    authenticator_app_code : false,
    mobile_app_prompt : false,
    text_message : false,
}

  constructor(private service : Service,private fb: FormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      old_password: ['', Validators.required],    
      password: ['', [Validators.required,Validators.minLength(8)]],      
      confirm_password: ['', [Validators.required,Validators.minLength(8)]],      
    }) 

    this.passwordForm.valueChanges.subscribe(field => {
      console.log(field);
      
      if (field.password !== field.confirm_password) {
        console.log(this.passwordForm);
        
        // this.passwordForm.confirm_password.setErrors({ mismatch: true });
        this.passwordForm.controls['confirm_password'].setErrors({ mismatch: true });
      } else {
        this.passwordForm.controls['confirm_password'].setErrors(null);
        // this.passwordForm.confirm_password.setErrors(null);
      }
    });
    this.getTalentProfile();
  } 

  getTalentProfile(){

    this.service.getUserProfile().subscribe(res => {

      
      this.profile = res.profile;
      if(this.profile.two_step_verification){
        this.two_step_verification = this.profile.two_step_verification
      }
      

    },(error) => {

      this.service.handleError(error)

    })

  }

  

  changePassword(){

    if(this.passwordForm.valid){

      if(this.passwordForm.controls['password'].value != this.passwordForm.controls['confirm_password'].value){
        this.service.showErrorMessage({
          message : "Password and Confirm password did not matched."
        });
        return;
      }


      const form = {
        new_password : this.passwordForm.controls['password'].value,
        old_password : this.passwordForm.controls['old_password'].value
      }

      this.service.changeUserPassword(form).subscribe(res => {

        $("#password").modal('hide')
        
        this.service.showSuccessMessage({
          message : "Password has been changed"
        });

        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate([""])

      },(error) => {
        $("#password").modal('hide')
        this.service.handleError(error)

      })


    }


  }

  typePassword(){

    const password = this.passwordForm.controls['password'].value
    const status = checkPassStrength(password)

    console.log(status);
    this.password_status = status

  }
  editTwoStepVerification(type,flag){
    this.two_step_verification[type] = flag
    const form = {
      two_step_verification : this.two_step_verification
    }
    
    this.service.saveProfileDetails(form).subscribe(resp => {

      

    },(err) => {

      this.service.handleError(err);

    })


  }

}
