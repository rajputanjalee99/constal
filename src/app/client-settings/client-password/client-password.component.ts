import { Component, OnInit } from '@angular/core';
import {Service} from '../../service/service.service';
import { NgForm } from "@angular/forms";
declare var $: any;
import { ActivatedRoute, Router } from "@angular/router";
import { checkPassStrength } from "../../determine-password/check-weak-password";

@Component({
  selector: 'app-client-password',
  templateUrl: './client-password.component.html',
  styleUrls: ['./client-password.component.scss']
})
export class ClientPasswordComponent implements OnInit {
changePassword:any={};
password_status;
  show = false;
  oldpassword: string = '';
  newpassword: string ='';
  c_password: string = '';
  toggle1: boolean = false;
  toggle2: boolean = false;
    toggle3: boolean = false;

  constructor(private service: Service,private router:Router) { }

  ngOnInit(): void {

  }
 changeType(input_field_password, num){
 console.log(input_field_password)
    if(input_field_password.type=="password"){
       input_field_password.type = "text";
      console.log(input_field_password.type)
    }
   
    else{

          input_field_password.type = "password";
                console.log(input_field_password.type)

    }

    if(num == 1)
      this.toggle1 = !this.toggle1;
    else if (num==2)
          this.toggle2 = !this.toggle2;
     else
     this.toggle3 = !this.toggle3
  }

  changeUserPassword(userPasswordForm: NgForm){
  if(userPasswordForm.invalid){
        return;
            alert('Somethong went wrong')
  }
  console.log(this.changePassword);
  let old_p= this.changePassword.old_password;
  let new_p= this.changePassword.new_password;

  let param= {'old_password':this.changePassword.old_password, 'new_password': this.changePassword.new_password}
  console.log(param)
     this.service.changeUserPassword(param).subscribe(async (res:any) =>{
      console.log(res)
      if(res.errors){
            alert('Somethong went wrong')
      }else{
                      alert("password changed successfully");
                      this.changePassword={};
                          $("#password").modal("hide");

      }
    //  console.log(this.totalLength);
    })
}

cancel(userPasswordForm: NgForm){
userPasswordForm.resetForm();
this.router.navigate[('/client-password')]
}

  password(){

    const password = this.changePassword.new_password;
    const status = checkPassStrength(password)

    console.log(status,password);
    this.password_status = status

  }

}
