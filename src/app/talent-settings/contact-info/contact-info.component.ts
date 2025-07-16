import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Service } from "./../../service/service.service";
declare var $;

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {

  profile
  timezones_list
  countries_list
  states_list
  cities_list

  form = {
    first_name : "",
    last_name : "",
    email : "",
  }

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
  constructor(private service : Service,private fb : FormBuilder,private router : Router) { }

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

    this.accountForm = this.fb.group({
      timezone: ['', ],    
      country: ['', Validators.required],    
      street_address: ['',],    
      state: ['', Validators.required],    
      city: [''],    
      phone: ['', Validators.required],         
      postal: ['', ],         
    })

    this.getProfile();
    this.timezones()
    this.countries()
  }

  getProfile(){
      this.service.getUserProfile().subscribe(res => {
          this.profile = res.profile;

          if(this.profile){
            this.accountForm.controls['timezone'].setValue(this.profile.timezone)
            // this.accountForm.controls['street_address'].setValue(this.profile.street_address)
            this.accountForm.controls['street_address'].setValue(this.profile.appartment)
            this.accountForm.controls['phone'].setValue(this.profile.phone)
            this.accountForm.controls['postal'].setValue(this.profile.zip_code)


          }

          if(this.profile && this.profile.country){
            this.accountForm.controls['country'].setValue(this.profile.country.isoCode)
          }

          if(this.profile && this.profile.state){
            this.accountForm.controls['state'].setValue(this.profile.state.isoCode)
            this.changeCountry({
              
                target : {
                  value : this.profile.country.isoCode
                }
              
            })

          }

          if(this.profile && this.profile.city){
            this.accountForm.controls['city'].setValue(this.profile.city.name)
            this.changeState({
              
                target : {
                  value : this.profile.state.isoCode
                }
              
            })
          }


      },(error) => {
        this.service.handleError(error)
      })
  }

  replaceEmail(){
    if(this.profile && this.profile.email){
      // return this.profile.email.replace(/(?<=^\d{0,4})\d/g, '*')
      return this.profile.email
    }    

    
  }

  edit(){
    this.form.first_name = this.profile.first_name;
    this.form.last_name = this.profile.last_name;
    this.form.email = this.profile.email;

    console.log(this.form, " ---> Form Data");

    
    
    
  }

  editTalentUser(){

    console.log(this.form);
    
    if(!this.form.first_name || !this.form.last_name){
      this.service.showErrorMessage({
        message : "First name and Last name required."
      });
      return
    }

    const obj = {
      first_name : this.form.first_name,
      last_name : this.form.last_name,
    }
    this.service.saveProfileDetails(obj).subscribe(res => {
      this.getProfile();
      this.service.showSuccessMessage({
        message : "Profile Updated"
      })

      const oldProfileData = this.service.loggedUserDetails();

      if(oldProfileData){
        oldProfileData.first_name = obj.first_name
        oldProfileData.last_name = obj.last_name;
        
        this.service.updateLoginDetails(oldProfileData);

        // change the name of nav bar
        const dropDownHeader = document.getElementsByClassName('navbarDropdown-cl');
        console.log(dropDownHeader);
        
        
        if(dropDownHeader){
          dropDownHeader[0].childNodes[5]['innerText'] = "Hi! "+obj.first_name
        }
      }

      // $('').trigger('click')
      document.getElementById("cancel-up").click();
    },(error) => {
      this.service.handleError(error)
    })

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
      appartment : this.accountForm.controls['street_address'].value, // edit from street address
      // street_address : this.accountForm.controls['street_address'].value,
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
      
      this.getProfile()

    },(error) => {
      this.service.handleError(error)
    })
  }

  closeAccount(){
    $("#close-account").modal('hide')
    // const flag = confirm("are you sure to close account ?");
    this.service.saveProfileDetails({
      is_account_closed : true
    }).subscribe(res => {

      this.service.showSuccessMessage({
        message : "Account Closed"
      });

      // clear localstorage and session storage
      localStorage.clear();
      sessionStorage.clear();

      this.router.navigate(['']);


    },(err) => {
      this.service.handleError(err)
    })
    

  }


}
