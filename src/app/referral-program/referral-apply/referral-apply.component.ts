import { Component, OnInit } from '@angular/core';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-referral-apply',
  templateUrl: './referral-apply.component.html',
  styleUrls: ['./referral-apply.component.scss']
})
export class ReferralApplyComponent implements OnInit {

  subscription: Subscription;
  form: FormGroup;
  isLoading = false
  countries_list
  cities_list
  phone : any
  otherCity = false
  cityData : any

  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	// phoneForm = new FormGroup({
	// 	phone: new FormControl(undefined, [Validators.required])
	// });

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}

  constructor(public router: Router,private service : Service,private _snackBar: MatSnackBar,private fb: FormBuilder) { 
    this.form = this.fb.group({ 
      country: ['', Validators.required],    
      city: ['', ''],    
      other_city: ['', ''],    
      phone: ['', [Validators.required,Validators.minLength(10)]],              
      about_me: ['', Validators.required],       
    }, { validator: [this.noWhitespaceValidator] }) 
  }

  noWhitespaceValidator(group: FormGroup) {
    const isWhitespace = (group.controls.about_me.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  ngOnInit(): void {
    this.countries()

    const city = <FormControl>this.form.get('city');
    const other_city = <FormControl>this.form.get('other_city');

    this.subscription = city.valueChanges.subscribe(value => {
      if (value=="other") {
        other_city.setValidators([Validators.required, ])
      }
      else {
        other_city.setValidators(null);
      }
      other_city.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get f() {
    return this.form.controls;
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
      this.cities_list = res.cities
      this.form.controls['city'].setValue("");
      console.log("states response ============= ",res)
    },(error) => {
      this.service.handleError(error)
    })
  }

  changeCity(event){
    console.log("change city event ============ ",event.target.value);
    this.form.controls['other_city'].setValue("");
    if(event.target.value=="other"){
      this.otherCity = true;
    }else{
      this.otherCity = false;
    }

  }

  updateReferral(){
    console.log("form update ============== ",this.form.controls['city'].value)
    console.log("form update dial code ============== ",this.form.controls['other_city'].value)
    this.isLoading = true;   

    if(this.form.controls['city'].value=="other"){
      this.cityData = {
        name: this.form.controls['other_city'].value
      }
    }else{
      this.cityData = this.cities_list.find(item => item.name == this.form.controls['city'].value);
    }

    const form = {
      country : JSON.stringify(this.countries_list.find(item => item.isoCode == this.form.controls['country'].value)),
      // city : JSON.stringify(this.cities_list.find(item => item.name == this.form.controls['city'].value)),
      city : JSON.stringify(this.cityData),
      phone : this.form.controls['phone'].value.number,
      isd_code : this.form.controls['phone'].value.dialCode,
      about_me : this.form.controls['about_me'].value,
      full_name : localStorage.getItem("full_name"),
      email : localStorage.getItem("email"),
      password : localStorage.getItem("password"),
    }

    console.log("referral form ============== ",form)
    // return;
    this.service.registerReferral(form).subscribe(async res => {
      console.log("register response ==============  ",res)
      localStorage.clear();
      const snackBarRef = this._snackBar.open("Registered Successully, Verify your email to Continue.", "", {
        duration: 3000,
      });
      this.router.navigate(['referral-login']);
      this.isLoading = false;
      
    },(err) => {
      this.isLoading = false;
      if(err.status == 409){ // if email already exist 
        const snackBarRef = this._snackBar.open("We’re sorry. This login email already exists. Please try a different email address to register, or login to your existing account.", "Login", {
          duration: undefined,
        });
        snackBarRef.onAction().subscribe(() => {
          // this.router.navigate(['login']);
        });        
      }if(err.status == 406){ // if email already exist 
        const snackBarRef = this._snackBar.open("We’re sorry. Please This login email already exists. Please try a different email address to register, or login to your existing account.", "Login", {
          duration: undefined,
        });
        snackBarRef.onAction().subscribe(() => {
          // this.router.navigate(['login']);
        });        
      }else{
        this.service.handleError(err)
        console.log(err)
      }
    })
  }

  checkNumber(){
    // if(this.phone){
    //   this.profileDetailModel.isd_code = this.phone.dialCode;
    //   this.profileDetailModel.contact_number = this.phone.number;
    // }else{
    //   this.profileDetailModel.contact_number = "";
    // }
  }

}
