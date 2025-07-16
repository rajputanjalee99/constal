import { Component, OnInit } from '@angular/core';
declare var $;
import {Service} from '../../service/service.service';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {
userInfo:any={};
username:any='';
user_img:any='';
  formData = new FormData();
  profile
   timezones_list
  countries_list
  states_list
  cities_list
  noSpacesRegex = /.*\S.*/;

accountForm : FormGroup

  account = {
    timezone : "",
    country : "",
    street_address : "",
    state : "",
    postal_code : "",
    city : "",
    phone : "",
  }

  constructor(private service:Service, private router:Router,private fb : FormBuilder,    private toastr: ToastrService,private _snackBar : MatSnackBar
) { }

  ngOnInit(): void {
    $(".hide-div").hide();
  	$(document).on('click','.edit-info',function(){
      $(this).parents(".info-card").find(".frnt-div").hide();
      $(this).parents('.info-card').find(".hide-div").show();
      $(this).parents(".info-card").find(".edit-info").hide();
    });

    $(document).on('click','.on-update',function(){
      $(this).parents(".hide-div").hide();
      $(this).parents('.info-card').find(".frnt-div").show();
      $(this).parents('.info-card').find(".edit-info").show();
    });

    this.getUserInfo();
     this.accountForm = this.fb.group({
      timezone: ['', Validators.required],    
      country: ['', Validators.required],    
      street_address: ['', Validators.required],    
      state: ['', Validators.required],    
      city: [''],    
      phone: ['', Validators.required],         
      postal: ['', Validators.required],         
    })

    this.timezones()
    this.countries()
   localStorage.getItem('f_name');
  localStorage.getItem('user_image');
  }
 AvoidSpace(event) {
    var k = event ? event.which : event.keyCode;
    if (k == 32) return false;
}


    getUserInfo(){
 

     this.service.getUserProfile().subscribe(async (res:any) =>{
      console.log(res)
      this.userInfo=res.profile;
      console.log("profile",this.userInfo);
       localStorage.setItem('f_name', this.userInfo.first_name);
            localStorage.setItem('user_image', this.userInfo.image);
      if(this.userInfo){
            this.accountForm.controls['timezone'].setValue(this.userInfo.timezone)
            this.accountForm.controls['street_address'].setValue(this.userInfo.street_address)
            this.accountForm.controls['phone'].setValue(this.userInfo.phone)
            this.accountForm.controls['postal'].setValue(this.userInfo.zip_code)


          }

          if(this.userInfo && this.userInfo.country){
            this.accountForm.controls['country'].setValue(this.userInfo.country.isoCode)
          }

          if(this.userInfo && this.userInfo.state){
            this.accountForm.controls['state'].setValue(this.userInfo.state.isoCode)
            this.changeCountry({
              
                target : {
                  value : this.userInfo.country.isoCode
                }
              
            })

          }

          if(this.userInfo && this.userInfo.city){
            this.accountForm.controls['city'].setValue(this.userInfo.city.name)
            this.changeState({
              
                target : {
                  value : this.userInfo.state.isoCode
                }
              
            })
          }


      },(error) => {
        this.service.handleError(error)
      })

    }

    updateProfile(userForm: NgForm){
      if(userForm.invalid){
        return;
            alert('Somethong went wrong')
  }
    this.formData.append("image", this.userInfo["image"]);
    this.formData.append("first_name", this.userInfo["first_name"]);
    this.formData.append("last_name", this.userInfo["last_name"]);
    console.log(this.userInfo)
      this.service.editUserProfile(this.formData).subscribe(async (res:any) =>{
      console.log(res)
            this.userInfo=res.flag;
            console.log(this.userInfo);
            window.location.href="/client-info";
            localStorage.setItem('f_name',this.userInfo.first_name);
            localStorage.setItem('user_image',this.userInfo.image);
              const snackBarRef = this._snackBar.open("Profile updated successFully", "Ok", {
          duration: undefined,
        });
        snackBarRef.onAction().subscribe(() => {
          this.router.navigate(['/client-info']);
          // console.log('The snack-bar action was triggered!');
        });
    });

    }

      timezones(){

    this.service.timezones().subscribe(res => {

      this.timezones_list = res.data

    },(error) => {

      this.service.handleError(error)

    })

  }

  countries(){

    this.service.getCountryWiseData({}).subscribe(res => {
      this.countries_list = res.countries
    },(error) => {
      this.service.handleError(error)
    })
  }

   changeCountry(event){
    console.log(event);
    const form = {
      country_code : event.target.value
    }
    this.service.getCountryWiseData(form).subscribe(res => {
      this.states_list = res.states
    },(error) => {
      this.service.handleError(error)
    })

  }

  changeState(event){
    console.log(event.target.value);
    const form = {
      state_code : event.target.value,
      country_code : this.accountForm.controls['country'].value,
    }
    this.service.getCountryWiseData(form).subscribe(res => {
      this.cities_list = res.cities
    },(error) => {
      this.service.handleError(error)
    })
  }

 saveAccountDetails(){

    const form = {

      country : this.countries_list.find(item => item.isoCode == this.accountForm.controls['country'].value),
      state : this.states_list.find(item => item.isoCode == this.accountForm.controls['state'].value),
      city : this.cities_list.find(item => item.name == this.accountForm.controls['city'].value),
      street_address : this.accountForm.controls['street_address'].value,
      zip_code : this.accountForm.controls['postal'].value,
      phone : this.accountForm.controls['phone'].value,
      timezone : this.accountForm.controls['timezone'].value
    }

    this.service.saveProfileDetails(form).subscribe(res => {

      const u = document.getElementById("upButton");
      if(u){
        u.click()

      }

      this.service.showErrorMessage({
        message : "Account updated."
      })  
      
      this.getUserInfo()

    },(error) => {
      this.service.handleError(error)
    })
  }
}
