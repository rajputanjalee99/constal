import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../service/service.service';
import { ProfileDetailsModel } from "./profile-details";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';


declare let $ : any

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})


export class ProfileDetailsComponent implements OnInit {

  talent_details = null
  profileDetailModel = new ProfileDetailsModel()
  countryArray = []
  statesArray = []
  cityArray = []
  country_code
  image
  countryName
  stateName
  openModal = false
  profileImage
  profileImageSrc : any = "assets/imgs/no-image.png"
  introFileName = "Choose file"
  portFolioFileName = "Choose file"
  phone : any

  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});
  introFileNameUserID: any;
  timezones_list: any;

  isLoading = false

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}

  addProfileDetailsForm : FormGroup

  profileDetail = {
    // timezone : "",
    country : "",
    // street_address : "",
    state : "",
    // postal_code : "",
    city : "",
    // phone : "",
  }

  constructor(public service : Service,private router : Router,private fb : FormBuilder) {
    this.router = router;
    this.service.sideBarHeight = 90;
   }
  
  files: File[] = []
  files1: File[] = []

onSelect(event) {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    console.log('file ',file.size);
    if (file.size/1024/1024 > 25) {
      // this.isLoading = false;
      this.service.showErrorMessage({ message : "The file should not exceed more than 25MB.", action : "Okay"});
      return;
    }
    this.introFileName = file.name
    this.profileDetailModel.intro_video = file
  }
}

resetIntro(){
  this.introFileName = "";
  this.profileDetailModel.intro_video = "";
}

onSelectUserId(event) {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    console.log('file ',file.size);
    if (file.size/1024/1024 > 25) {
      // this.isLoading = false;
      this.service.showErrorMessage({ message : "The file should not exceed more than 25MB.", action : "Okay"});
      return;
    }
    this.introFileNameUserID = file.name
    // this.profileDetailModel.intro_video = file
    this.profileDetailModel.userID = file
  }
}

timezones(){

  this.service.timezones().subscribe(res => {

    this.timezones_list = res.data

  },(error) => {

    this.service.handleError(error)

  })

}

resetUserId(){
  this.introFileNameUserID = "";
  this.profileDetailModel.userID = "";
}

uploadImage(event) {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    console.log('file ',file.size);
    
    const reader = new FileReader();
    
    reader.onload = e => this.profileImageSrc = reader.result;

    reader.onloadend = (loadEvent) => {
      console.log(reader)
      let mainImage = reader.result;
      this.profileImage = file
    };
    reader.readAsDataURL(file);
  }
}

onSelect1(event) {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    console.log('file ',file.size);  
    if (file.size/1024/1024 > 25) {
      // this.isLoading = false;
      this.service.showErrorMessage({ message : "The file should not exceed more than 25MB.", action : "Okay"});
      return;
    }  
    this.portFolioFileName = file.name
    this.profileDetailModel.port_folio = file
  }
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

onRemove1(event) {
  console.log(event);
  this.files1.splice(this.files1.indexOf(event), 1);
}

  ngOnInit(): void {    
    this.profileDetailModel.country = ''
    this.profileDetailModel.state = ''
    this.profileDetailModel.city =''
    this.talent_details = this.service.loggedUserDetails();
    this.timezones()

    console.log("Talent Detail: ",this.talent_details)
    this.addProfileDetailsForm = this.fb.group({
      // timezone: ['', Validators.required],    
      country: ['', Validators.required],    
      // street_address: ['', Validators.required],    
      state: ['', Validators.required],    
      city: ['', Validators.required],    
      timezone: ['',],    
      // phone: ['', Validators.required],         
      // postal: ['', Validators.required],         
    })
    this.getAllCountry();
    this.getUserProfile();
  }

  getUserProfile(){
    this.service.getUserProfile().subscribe(async res => {    
      console.log("profile resp ============ ",res)
      this.service.profile = res.profile;
      this.profileDetailModel = res.profile;
      if(res.profile && res.profile.image){
        this.profileImageSrc = res.profile.image;
      }

      if(res.profile && res.profile.identity_document){
        this.introFileNameUserID = res.profile.identity_document
      }

      if(res.profile && res.profile.intro && res.profile.intro!="undefined"){
        this.introFileName = res.profile.intro;
      }
      if(res.profile && res.profile.portfolio && res.profile.portfolio!="undefined"){
        this.portFolioFileName = res.profile.portfolio;
      }     

      if(res.profile && res.profile.country){
        this.addProfileDetailsForm.controls['country'].setValue(res.profile.country.isoCode)
      }

      if(res.profile && res.profile.state){
        this.addProfileDetailsForm.controls['state'].setValue(res.profile.state.isoCode)
        this.getStates({          
            target : {
              value : res.profile.country.isoCode
            }          
        })
      }

      if(res.profile && res.profile.city){
        this.addProfileDetailsForm.controls['city'].setValue(res.profile.city.name)
        this.getCity({          
            target : {
              value : res.profile.state.isoCode
            }          
        })
      }

      if(res.profile && res.profile.timezone){
        // alert(res.profile.timezone);
        this.addProfileDetailsForm.controls['timezone'].setValue(res.profile.timezone)
      }



    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  getAllCountry(){
    var data
    this.service.getCountryWiseData(data).subscribe(data => {
     console.log(data)
     this.countryArray = data.countries
    },err => {
      this.service.handleError(err)
      console.log(err);
    })
  }

  getStates(e){

    this.statesArray = [];
    this.cityArray = [];
    var obj = {
      country_code:e.target.value
    }
    this.service.getCountryWiseData(obj).subscribe(data => {
      console.log("country wise data ============= ",data);
      if(data.states && data.states.length){
        this.statesArray = data.states
      }else{
      console.log(this.profileDetailModel.country)
      this.profileDetailModel.state=this.countryArray.find(item => item.isoCode == this.addProfileDetailsForm.controls['country'].value)
      this.statesArray.push(this.profileDetailModel.state)
      console.log(this.statesArray)
}
    },err => {
      this.service.handleError(err)
    })
  }

  getCity(e){
    
    this.cityArray = [];
    var obj = {
      country_code:this.addProfileDetailsForm.controls['country'].value,
      state_code: e.target.value
    }
    this.service.getCountryWiseData(obj).subscribe(data => {
      console.log(data);
            if(data.cities && data.cities.length){

     this.cityArray = data.cities
     }else{
           this.profileDetailModel.city=this.countryArray.find(item => item.isoCode == this.addProfileDetailsForm.controls['country'].value)
                 this.cityArray.push(this.profileDetailModel.city)

     }
    },err => {
      this.service.handleError(err)
    })
  }

  getCityData(e){
    let text = e.target.options[e.target.options.selectedIndex].text;
    this.profileDetailModel.city = text
  }

  addProfileDetailsData(){


    
    this.profileDetailModel.timezone = this.addProfileDetailsForm.controls['timezone'].value;
    
    if(this.profileDetailModel.profile_headline){
      this.profileDetailModel.profile_headline = this.profileDetailModel.profile_headline;
    }else{
      this.profileDetailModel.profile_headline = "";
    }

    if(this.profileDetailModel.web_address){
      this.profileDetailModel.web_address = this.profileDetailModel.web_address;
    }else{
      this.profileDetailModel.web_address = "";
    }

    if(this.profileDetailModel.appartment){
      this.profileDetailModel.appartment = this.profileDetailModel.appartment;
    }else{
      this.profileDetailModel.appartment = "";
    }

    if(this.profileDetailModel.zip_code){
      this.profileDetailModel.zip_code = this.profileDetailModel.zip_code;
    }else{
      this.profileDetailModel.zip_code = "";
    }

    if(this.profileDetailModel.port_folio){
      this.profileDetailModel.port_folio = this.profileDetailModel.port_folio;
    }else{
      this.profileDetailModel.port_folio = "";
    }

    if(this.profileDetailModel.intro_video){
      this.profileDetailModel.intro_video = this.profileDetailModel.intro_video;
    }else{
      this.profileDetailModel.intro_video = "";
    }

    var form = new FormData();

    form.append('isd_code',this.profileDetailModel.isd_code);
    form.append('profile_headline',this.profileDetailModel.profile_headline);
    form.append('phone',this.profileDetailModel.contact_number);
    form.append('web_address',this.profileDetailModel.web_address);
    form.append('appartment',this.profileDetailModel.appartment);
    form.append('zip_code',this.profileDetailModel.zip_code);
    form.append('portfolio',this.profileDetailModel.port_folio);
    form.append('country',JSON.stringify(this.countryArray.find(item => item.isoCode == this.addProfileDetailsForm.controls['country'].value)));
    form.append('state',JSON.stringify(this.statesArray.find(item => item.isoCode == this.addProfileDetailsForm.controls['state'].value)));
    if(JSON.stringify(this.cityArray.find(item => item.name == this.addProfileDetailsForm.controls['city'].value))){
      form.append('city',JSON.stringify(this.cityArray.find(item => item.name == this.addProfileDetailsForm.controls['city'].value)));
    }

    if(this.profileDetailModel.timezone){
      form.append('timezone',this.profileDetailModel.timezone);
    }

    // if(this.profileDetailModel.userID){
    //   form.append('userID',this.profileDetailModel.userID);      
    // }else{
    //   if(!this.profileDetailModel.identity_document){
    //     this.service.showErrorMessage({
    //       message : "Please upload your ID first"
    //     })
    //     return
    //   }        
    // }

    if(this.profileDetailModel.intro_video){
      form.append('intro',this.profileDetailModel.intro_video);
    }
    
    if(this.profileImage){
      form.append('image',this.profileImage);
    }

    form.append('submitted',"true");
    this.isLoading = true
    // return
    this.service.saveProfileDetails(form).subscribe(data => {
      console.log(data);

      const loggedUser = this.service.loggedUserDetails();
      loggedUser.image = data.flag.image;
      this.service.setLoggedUserDetails(loggedUser);
      $('#profileCompleted').modal();
      const self = this
      setTimeout(function(){
        $('#profileCompleted').modal('hide');
        // self.router.navigate(['talent-dashboard'])
        self.service.showSuccessMessage({
          message : "Your Profile is under Review."
        })
        this.isLoading = false
        sessionStorage.clear();
        localStorage.clear();
        self.router.navigate(['/'])
      },5000)
    },err => {
      this.isLoading = false
      this.service.handleError(err)
    })
  }

  checkNumber(){
    if(this.phone){
      this.profileDetailModel.isd_code = this.phone.dialCode;
      this.profileDetailModel.contact_number = this.phone.number;
    }else{
      this.profileDetailModel.contact_number = "";
    }
  }

  checkProfileDetails(){
    if(this.countryArray.find(item => item.isoCode == this.addProfileDetailsForm.controls['country'].value)){
      this.profileDetailModel.countryValidation = false;
    }else{
      this.profileDetailModel.countryValidation = true;
    }

    if(this.statesArray.find(item => item.isoCode == this.addProfileDetailsForm.controls['state'].value)){
      this.profileDetailModel.stateValidation = false;
    }else{
      this.profileDetailModel.stateValidation = true;
    }

    if(this.cityArray.find(item => item.name == this.addProfileDetailsForm.controls['city'].value)){
      // this.profileDetailModel.cityValidation = false;
      this.profileDetailModel.cityValidation = true; // not mandatory field
    }else{
      this.profileDetailModel.cityValidation = true;
    }
    
    // console.log("contact length ============ ",this.profileDetailModel.contact_number.trim().length)

    if(this.profileDetailModel.contact_number && this.profileDetailModel.contact_number.trim()!=""){
      this.profileDetailModel.contactNumberValidation = false;
    }else{
      this.profileDetailModel.contactNumberValidation = true;
    }

    if(this.profileDetailModel.contact_number && this.profileDetailModel.contact_number.trim()!="" && this.profileDetailModel.contact_number.trim().length<8){
      this.profileDetailModel.contactNumberLengthValidation = true;
    }else{
      this.profileDetailModel.contactNumberLengthValidation = false;      
    }

    if(this.profileDetailModel.web_address && this.profileDetailModel.web_address.trim() && this.validURL(this.profileDetailModel.web_address.trim())==false){
      this.profileDetailModel.webAddressValidation = true
    }else{
      this.profileDetailModel.webAddressValidation = false
    }

    if(this.profileDetailModel.port_folio && this.profileDetailModel.port_folio.trim() && this.validURL(this.profileDetailModel.port_folio.trim())==false){
      this.profileDetailModel.portFolioValidation = true
    }else{
      this.profileDetailModel.portFolioValidation = false
    }

    // if(this.introFileNameUserID){
    //   this.profileDetailModel.userIdValidation = false     
    // }else{
    //   this.profileDetailModel.userIdValidation = true       
    // }

    if(this.profileDetailModel.countryValidation == false && 
      this.profileDetailModel.stateValidation == false  && 
      this.profileDetailModel.contactNumberValidation == false  && 
      this.profileDetailModel.contactNumberLengthValidation == false && 
      this.profileDetailModel.webAddressValidation == false && 
      this.profileDetailModel.portFolioValidation == false 
      // this.profileDetailModel.userIdValidation == false
      ){
      this.addProfileDetailsData();
      // alert("Validated");
    }

  }

  validURL(str) {
    var res = str.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
    return (res !== null)
  }  
  
  addProfileDetailsDataOnBackButton(){
    
    console.log("addProfileDetailsDataOnBackButton() clicked ============ ")
    
    var form = new FormData();
    
    if(this.profileDetailModel.profile_headline){
      form.append('profile_headline',this.profileDetailModel.profile_headline);
    }
    
    if(this.profileDetailModel.web_address){
      form.append('web_address',this.profileDetailModel.web_address);
    }
    
    if(this.profileDetailModel.appartment){
      form.append('appartment',this.profileDetailModel.appartment);
    }
    
    if(this.profileDetailModel.zip_code){
      form.append('zip_code',this.profileDetailModel.zip_code);
    }
    
    if(this.profileDetailModel.port_folio){
      form.append('portfolio',this.profileDetailModel.port_folio);
    }
    
    if(this.profileDetailModel.intro_video){
      form.append('intro',this.profileDetailModel.intro_video);
    }
    
    if(this.profileImage){
      form.append('image',this.profileImage);
    }
    
    if(this.profileDetailModel.userID){
      form.append('userID',this.profileDetailModel.userID);      
    }
    
    if(this.profileDetailModel.isd_code){
      form.append('isd_code',this.profileDetailModel.isd_code);      
    }
    
    if(this.profileDetailModel.contact_number){
      form.append('phone',this.profileDetailModel.contact_number);      
    }
    
    if(JSON.stringify(this.countryArray.find(item => item.name == this.addProfileDetailsForm.controls['country'].value))){
      form.append('country',JSON.stringify(this.countryArray.find(item => item.name == this.addProfileDetailsForm.controls['country'].value)));
    }
    
    if(JSON.stringify(this.statesArray.find(item => item.name == this.addProfileDetailsForm.controls['state'].value))){
      form.append('state',JSON.stringify(this.statesArray.find(item => item.name == this.addProfileDetailsForm.controls['state'].value)));
    }
    
    if(JSON.stringify(this.cityArray.find(item => item.name == this.addProfileDetailsForm.controls['city'].value))){
      form.append('city',JSON.stringify(this.cityArray.find(item => item.name == this.addProfileDetailsForm.controls['city'].value)));
    }
    
    console.log("addProfileDetailsDataOnBackButton() clicked form ============ ",form)
    // form.append('submitted',"true");
    
    this.service.saveProfileDetails(form).subscribe(data => {
        console.log("save profile ================= ", data);
      //   const loggedUser = this.service.loggedUserDetails();
      //   loggedUser.image = data.flag.image;
      //   this.service.setLoggedUserDetails(loggedUser);
      // $('#profileCompleted').modal();
      // const self = this
      // setTimeout(function(){
      //   $('#profileCompleted').modal('hide');
      //   self.service.showSuccessMessage({
      //     message : "Your Profile is under Review."
      //   })
      //   sessionStorage.clear();
      //   localStorage.clear();
      //   self.router.navigate(['/'])
      // },5000)
    },err => {
      this.service.handleError(err)
    })

  }


}