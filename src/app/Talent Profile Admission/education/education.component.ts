import { Component, OnInit } from '@angular/core';
import { EducationModel, QualificationsModel, LicensesModel } from './education';
import { Service } from '../../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  isLoading: boolean = true;
  qualificationsModel = new QualificationsModel();
  educationModel = new EducationModel();
  licensesModel = new LicensesModel();	   
  myFiles:string [] = [];
  obj

  year_list = [{name: 1990},{name: 1991},{name: 1992},{name: 1993},{name: 1994},{name: 1995},{name: 1996},{name: 1997},{name: 1998},{name: 1999},{name: 2000},{name: 2001},{name: 2002},{name: 2003},{name: 2004},{name: 2005},{name: 2006},{name: 2007},{name: 2008},{name: 2009},{name: 2010}
    ,{name: 2011},{name: 2012},{name: 2013},{name: 2014},{name: 2015},{name: 2016},{name: 2017},{name: 2018},{name: 2019},{name: 2020},
    {name: 2021}];
  year_list1 = [{name: 1990},{name: 1991},{name: 1992},{name: 1993},{name: 1994},{name: 1995},{name: 1996},{name: 1997},{name: 1998},{name: 1999},{name: 2000},{name: 2001},{name: 2003},{name: 2004},{name: 2005},{name: 2006},{name: 2007},{name: 2008},{name: 2009},{name: 2010}
    ,{name: 2011},{name: 2012},{name: 2013},{name: 2014},{name: 2015},{name: 2016},{name: 2017},{name: 2018},{name: 2019},{name: 2020},{name: 2021},{name: 2022},{name: 2023},{name: 2024},{name: 2025},{name: 2026},{name: 2027},{name: 2028},{name: 2029},{name: 2030}
      ,{name: 2031},{name: 2032},{name: 2033},{name: 2034},{name: 2035},{name: 2036},{name: 2037},{name: 2038},{name: 2039},{name: 2040},
      {name: 2041},{name: 2042},{name: 2043},{name: 2044},{name: 2045},{name: 2046},{name: 2047},{name: 2048},{name: 2049},{name: 2050}
      ,{name: 2051},{name: 2052},{name: 2053},{name: 2054},{name: 2055},{name: 2056},{name: 2057},{name: 2058},{name: 2059},{name: 2060},
      {name: 2061},{name: 2062},{name: 2063},{name: 2064},{name: 2065},{name: 2066},{name: 2067},{name: 2068},{name: 2069},{name: 2070}
      ,{name: 2071},{name: 2072},{name: 2073},{name: 2074},{name: 2075},{name: 2076},{name: 2077},{name: 2078},{name: 2079},{name: 2080},
      {name: 2081},{name: 2082},{name: 2083},{name: 2084},{name: 2085},{name: 2086},{name: 2087},{name: 2088},{name: 2089},{name: 2090}
      ,{name: 2091},{name: 2092},{name: 2093},{name: 2094},{name: 2095},{name: 2096},{name: 2097},{name: 2098},{name: 2099}];
  
  month_list = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: 6},{name: 7},
    {name: 8},{name: 9},{name: 10},{name: 11},{name: 12}];

  education_list = [];
  licenses_list = [];
  today:any = new Date(); 
  today1:any = new Date(); 
  // minDate1:any = new Date(); 
  currentYear = new Date().getFullYear()-100;
  minDate = new Date(this.currentYear, 0, 1);
  minDate1 = new Date(this.currentYear, 0, 1);
  // maxDate = new Date(2020, 0, 1);
  selectedIndexBinding = 0;
  university_list = [];
  degree_list = [];
  field_of_study_list = [];
  license_list = [];
  expectedGraduation = false;
  speciality_id: any
  urlRegEx =
    '[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}(.[a-z]{2,4})?\b(/[-a-zA-Z0-9@:%_+.~#?&//=]*)?';
  selected_specialities = []

  constructor(public service : Service,public router : Router) { 
    this.service.sideBarHeight = 40; 
    
  }

  files= [];

  onSelect(event,education) {
    console.log(event);
    this.uploadFile(event,education);
    this.myFiles=education.documents
  }

  ngOnInit(): void {
    this.addExperience();
    this.getUserProfile();
    this.isLoading = false;
  }

  initModel(){
  }

  getUserProfile(){
    this.service.getUserProfile().subscribe(async res => {
      this.service.profile = res.profile;
      if (res.profile && res.profile.talent_qualification && res.profile.talent_qualification.education && res.profile.talent_qualification.education.length) {
        this.service.profile = res.profile;
        this.education_list = res.profile.talent_qualification.education.map((item => {
          
            return item = {
              school_name: item.school_name,
              degree: item.degree,
              field_of_study: item.field_of_study,
              start_date: item.start_date,
              end_date: item.end_date,
              grade: item.grade,
              documents: item.documents ? item.documents : [],
              activities: item.activities,
              expectedGraduation: item.expectedGraduation
          }
          
        })) 
      }

      if (res.profile && res.profile.talent_qualification && res.profile.talent_qualification.licenses && res.profile.talent_qualification.licenses.length) {
        this.licenses_list = res.profile.talent_qualification.licenses.map((item => {
          
            return item = {
              certificate_name: item.certificate_name,
              certification_authority: item.certification_authority,
              license_no: item.license_no,
              is_license_expire: item.is_license_expire,
              start_month: item.start_month,
              start_year: item.start_year,
              end_month: item.end_month,
              end_year: item.end_year,
              certification_url: item.certification_url,
              documents: item.documents ? item.documents : [],
          }
          
        })) 
      }

      // if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.speciality.length && res.profile.talent_category_data.speciality.length==1) {
               
      //   this.speciality_id = res.profile.talent_category_data.speciality[0]._id;
      // }

      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.speciality.length && res.profile.talent_category_data.speciality.length) {
               
        // this.speciality_id = res.profile.talent_category_data.speciality[0]._id;
        this.selected_specialities = res.profile.talent_category_data.speciality.map((item => {
          return item._id
        }))
        console.log("selected specialities ============= ",this.selected_specialities)
      }
       
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  addExperience(){
    this.educationModel = new EducationModel();
    console.log(this.education_list)
    if(this.education_list && this.education_list.length){
      this.education_list.map((item,i) => {
        
        if(item.school_name && item.school_name.trim()!=""){
          item.schoolNameValidation = false
        }else{
          item.schoolNameValidation = true
        }
        if(item.degree && item.degree.trim()!=""){
          item.degreeValidation = false
        }else{
          item.degreeValidation = true
        }
        if(item.field_of_study && item.field_of_study.trim()!=""){
          item.fieldOfStudyValidation = false
        }else{
          item.fieldOfStudyValidation = true
        }
        if(!item.start_date){
          item.startDateValidation = true
        }else{
          item.startDateValidation = false
        }
        if(!item.end_date){
          item.endDateValidation = true
        }else{
          item.endDateValidation = false
        }
        // if(item.documents.length || item.expectedGraduation==true){
        //   item.documentValidation = false
        // }else{
        //   item.documentValidation = true
        // }

        if(item.start_date && item.end_date && item.start_date>=item.end_date){
          item.endDateLessValidation = true
        }else{
          item.endDateLessValidation = false
        }

        // if(item.school_name && item.school_name.trim() && item.degree && item.degree.trim() && item.field_of_study && item.field_of_study.trim() && item.start_date && item.end_date && (item.documents.length || item.expectedGraduation) && (item.start_date<item.end_date) && i==this.education_list.length-1){
        if(item.school_name && item.school_name.trim() && item.degree && item.degree.trim() && item.field_of_study && item.field_of_study.trim() && item.start_date && item.end_date && (item.start_date<item.end_date) && i==this.education_list.length-1){
          
          this.educationModel.documents = [];
          this.education_list.unshift(this.educationModel);
          this.education_list[i].startMinDate = new Date(this.currentYear, 0, 1);
          this.education_list[i].startMaxDate = new Date(); 
          this.education_list[i].endMinDate = new Date(this.currentYear, 0, 1);
          this.education_list[i].endMaxDate = new Date(); 
        }        
      })
    }else{
      this.educationModel.documents = [];
      this.education_list.unshift(this.educationModel);
      console.log("edd list ========== ",this.education_list)
      this.education_list[0].startMinDate = new Date(this.currentYear, 0, 1);
      this.education_list[0].startMaxDate = new Date(); 
      this.education_list[0].endMinDate = new Date(this.currentYear, 0, 1);
      this.education_list[0].endMaxDate = new Date(); 
    }
  }

  addLicenses(){
    this.licensesModel = new LicensesModel();
    
    if(this.licenses_list && this.licenses_list.length){
      this.licenses_list.map((item,i) => {

        if(item.is_license_expire==false){
          if(Number(item.end_year)<Number(item.start_year)){
            item.endYearValidation = true;
          }else{
            item.endYearValidation = false;
          }

          if((Number(item.end_year)==Number(item.start_year)) && (Number(item.end_month)<Number(item.start_month))){
            item.endMonthValidation = true;
          }else{
            item.endMonthValidation = false;
          }
        }
        if(item.certificate_name && item.certificate_name.trim()){
          item.certificateNameValidation = false
        }else{
          item.certificateNameValidation = true
        }
        if(item.certification_url && item.certification_url.trim() && this.validURL(item.certification_url.trim())==false){
          item.certificationUrlValidation = true
        }else{
          item.certificationUrlValidation = false
        }
        if(item.documents.length){
          item.documentValidation = false
        }else{
          item.documentValidation = true
        }
        // if(item.certificate_name && item.certificate_name.trim() && item.documents.length && item.certificationUrlValidation==false && ((item.is_license_expire==false && item.endYearValidation==false && item.endMonthValidation==false) || (item.is_license_expire==true)) && i==this.licenses_list.length-1){
        if(item.certificate_name && item.certificate_name.trim() && item.certificationUrlValidation==false && ((item.is_license_expire==false && item.endYearValidation==false && item.endMonthValidation==false) || (item.is_license_expire==true)) && i==this.licenses_list.length-1){
          this.licensesModel.documents = [];
          this.licenses_list.unshift(this.licensesModel);
        }
      })
    }else{
      
      this.licensesModel.documents = [];
      this.licenses_list.unshift(this.licensesModel);
    } 
  }
  
  removeLicenses(index){
    this.licenses_list.splice(index,1)
  }
  removeExperience(index){
    this.education_list.splice(index,1)
  }

  uploadFile(evt: any,education) {
  console.log("education",education)

    if (!evt.addedFiles.length) {
      return;
    }

    for (var i = 0; i < evt.addedFiles.length; i++) { 
	              this.myFiles.push(evt.addedFiles[i]);

        }
    this.isLoading = true;
    const file = evt.addedFiles[0];
    var img_arr = file.name.split('.');

    if (file.size/1024/1024 > 25) {
      this.isLoading = false;
      this.service.showErrorMessage({ message : "The file should not exceed more than 25MB.", action : "Okay"});

      for (var i = 0; i < evt.addedFiles.length; i++) { 
	              this.myFiles.splice(evt.addedFiles.indexOf(i),1);

        }  
      return;
    }

    var ext = img_arr.pop();
    
    // if (ext == 'jpeg' || ext == 'jpg' || ext == 'png') {
    if(true){
        const fr = new FileReader();
        fr.readAsDataURL(file);
        const formData = new FormData();
for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append("document",this.myFiles[i]);

    }        this.service.uploadFile(formData).subscribe(async res => {
          
          for(let i=0;i<this.myFiles.length;i++){
		   this.obj = {
            name: this.myFiles[i]['name'],
            media: this.myFiles[i]['name'],
            url: res.file_name[i],
            type: this.myFiles[i]['type'],
          } 
             education.documents.push(this.obj);

                    }
console.log("this.obj",this.obj)         

this.isLoading = false;
        },(err) => {
          this.service.handleError(err)
          console.log(err)
          this.isLoading = false;
        })
    }
  }

  deleteDocument(document,education){
    this.isLoading = true;
    console.log(document.name)
    this.service.deleteFile(document.name).subscribe(async res => {      
      education.splice(education.indexOf(document), 1);
      this.myFiles.splice(this.myFiles.indexOf(document), 1)
      this.isLoading = false;
    },(err) => {
      
      this.service.handleError(err)
      this.isLoading = false;
    })
  }

  addEducationData(){
    console.log(this.qualificationsModel);
    console.log(this.education_list)
    this.qualificationsModel.education = this.education_list;
    this.qualificationsModel.licenses = this.licenses_list;
    this.service.addQualifications(this.qualificationsModel).subscribe(async res => {
      
      this.router.navigate(['skills']);

    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  checkEducationData(){
  console.log(this.education_list)
    if(this.education_list.length){
      let gotError = "no";
      
      this.education_list.map((item,i) => {
        
        if(item.school_name && item.school_name.trim()!=""){
          item.schoolNameValidation = false
        }else{
          item.schoolNameValidation = true
        }
        if(item.degree && item.degree.trim()!=""){
          item.degreeValidation = false
        }else{
          item.degreeValidation = true
        }
        if(item.field_of_study && item.field_of_study.trim()!=""){
          item.fieldOfStudyValidation = false
        }else{
          item.fieldOfStudyValidation = true
        }
        if(!item.start_date){
          item.startDateValidation = true
          // console.log("start valid true ======== ")
        }else{
          item.startDateValidation = false
          // console.log("start valid false ======== ")
        }
        if(!item.end_date){
          // console.log("end valid true ======== ")
          item.endDateValidation = true
        }else{
          // console.log("end valid false ======== ")
          item.endDateValidation = false
        }
        // if(item.documents.length || item.expectedGraduation==true){
        //   item.documentValidation = false
        // }else{
        //   item.documentValidation = true
        // }
        console.log(item.documents.length)
        if(item.documents.length){
          item.documentValidation = false
        }else{
          item.documentValidation = true
        }

        if(item.start_date && item.end_date && item.start_date>item.end_date){
          item.endDateLessValidation = true
          // console.log("true dat ==========")
        }else{
          item.endDateLessValidation = false
          // console.log("false dat ==========")
        }
        // console.log("got err ============ ",gotError)
        // if(item.school_name && item.school_name.trim() && item.degree && item.degree.trim() && item.field_of_study && item.field_of_study.trim() && (item.documents.length || item.expectedGraduation) && item.endDateLessValidation==false && item.startDateValidation==false && item.endDateValidation==false && gotError=="no"){
        if(item.school_name && item.school_name.trim() && item.degree && item.degree.trim() && item.field_of_study && item.field_of_study.trim() && item.endDateLessValidation==false && item.startDateValidation==false && item.endDateValidation==false &&  item.documentValidation==false&&gotError=="no"){
          
          if (this.education_list.length === i + 1) {
            this.selectedIndexBinding = this.selectedIndexBinding+1;
          }
        }else{
          // console.log("else edu ============= ")
          this.selectedIndexBinding = this.selectedIndexBinding;
          gotError = "yes";
        }
        
      })
    }else{
      this.service.showErrorMessage({ message : "Please add education.", action : "Okay"});
    }    
  }

  checkLicensesData(){
    if(this.licenses_list.length){
              let gotError = "no";

      this.licenses_list.map((item,i) => {

        if(item.is_license_expire==false){
          if(Number(item.end_year)<Number(item.start_year)){
            item.endYearValidation = true;
          }else{
            item.endYearValidation = false;
          }

          if((Number(item.end_year)==Number(item.start_year)) && (Number(item.end_month)<Number(item.start_month))){
            item.endMonthValidation = true;
          }else{
            item.endMonthValidation = false;
          }          
        }else{
          console.log("else license ============ ")
        }

        if(item.certificate_name && item.certificate_name.trim()){
          item.certificateNameValidation = false
        }else{
          item.certificateNameValidation = true
        }

        if(item.certification_url && item.certification_url.trim() && this.validURL(item.certification_url.trim())==false){
          item.certificationUrlValidation = true
        }else{
          item.certificationUrlValidation = false
        }
          if(item.documents.length){
          item.documentValidation = false
        }else{
          item.documentValidation = true
        }
        // if(item.documents.length){
        //   item.documentValidation = false
        // }else{
        //   item.documentValidation = true
        // }

        // if(item.certificate_name && item.certificate_name.trim() && item.documents.length && item.certificationUrlValidation==false && ((item.is_license_expire==false && item.endYearValidation==false && item.endMonthValidation==false) || (item.is_license_expire==true))){
        if(item.certificate_name && item.certificate_name.trim() && item.certificationUrlValidation==false &&item.documentValidation==false &&gotError=="no" && ((item.is_license_expire==false && item.endYearValidation==false && item.endMonthValidation==false) || (item.is_license_expire==true))){
          if (this.licenses_list.length === i+1) {
            this.addEducationData();
          }
        }else{
 this.selectedIndexBinding = this.selectedIndexBinding;  
                    gotError = "yes";        }
      })
    }else{
      this.addEducationData();
    }    
  }

  getUniversities(i){
    
    if(this.education_list[i].school_name && this.education_list[i].school_name.trim()){
      this.service.getUniversities(this.education_list[i].school_name).subscribe(async res => {
        this.university_list = res.data;
        
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      this.university_list = [];
    }    
  }

  getUniversityText(name,i){
    this.education_list[i].school_name = name;
    this.university_list = [];
  }

  getDegrees(i){
    
    if(this.education_list[i].degree && this.education_list[i].degree.trim()){
      const obj = {
        search:this.education_list[i].degree
      }
      this.service.getDegrees(obj).subscribe(async res => {
        this.degree_list = res.data;
        
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      this.degree_list = [];
    }    
  }

  getDegreeText(name,i){
    this.education_list[i].degree = name;
    this.degree_list = [];
  }

  getFieldOfStudies(i){
    
    if(this.education_list[i].field_of_study && this.education_list[i].field_of_study.trim()){
      const obj = {
        search:this.education_list[i].field_of_study
      }
      this.service.getFieldOfStudies(obj).subscribe(async res => {
        this.field_of_study_list = res.data;
        
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      this.field_of_study_list = [];
    }    
  }

  getFieldOfStudyText(name,i){
    this.education_list[i].field_of_study = name;
    this.field_of_study_list = [];
  }

  getLicenses(i){
    
    // if(this.licenses_list[i].certificate_name && this.licenses_list[i].certificate_name.trim() && this.speciality_id){
    if(this.licenses_list[i].certificate_name && this.licenses_list[i].certificate_name.trim() && this.selected_specialities.length){
      const obj = {
        // speciality_id:this.speciality_id,
        speciality_id:this.selected_specialities,
        search:this.licenses_list[i].certificate_name
      }
      this.service.getLicenses(obj).subscribe(async res => {
        this.license_list = res.data;
        // console.log("license listing ============ ",res)
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      this.license_list = [];
    }    
  }

  getLicenseText(name,i){
    this.licenses_list[i].certificate_name = name;
    this.license_list = [];
  }

  changeExpectedGraduation(event,itr){
    console.log("itr ============= ",itr)
    
    if(event.target.checked){
      // this.today = "";
      // this.today1 = new Date(); 
      // this.minDate1 = new Date();
      // this.expectedGraduation = true;

      this.education_list[itr].startMinDate = new Date(this.currentYear, 0, 1);
      this.education_list[itr].startMaxDate = new Date(); 
      this.education_list[itr].endMinDate = new Date();
      this.education_list[itr].endMaxDate = ""; 
    }else{
      // this.today = new Date(); 
      // this.today1 = new Date(); 
      // this.minDate1 = new Date(this.currentYear, 0, 1);
      // this.expectedGraduation = false;
      
      this.education_list[itr].startMinDate = new Date(this.currentYear, 0, 1);
      this.education_list[itr].startMaxDate = new Date(); 
      this.education_list[itr].endMinDate = new Date(this.currentYear, 0, 1);
      this.education_list[itr].endMaxDate = new Date(); 
    }
    this.education_list[itr].end_date = ""; 
  }

  validURL(str) {
    var res = str.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
    
    return (res !== null)
  }


}
