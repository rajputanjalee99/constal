import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from  "@angular/router";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpHandler  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import {  environment as env  } from "../../environments/environment.prod";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Service {
  
  SERVER_URL = environment.SERVER_URL;
  sideBarHeight: number = 0;
  page
  profile
  constructor(private route:ActivatedRoute,private router:Router,private http:HttpClient,private _snackBar: MatSnackBar) {
    
    // alert(env.production)
  }

  getToken(){

    if(localStorage.getItem("remember_me") && localStorage.getItem("remember_me") == "yes"){
      
      return localStorage.getItem("token")

    } if(localStorage.getItem("remember_me") && localStorage.getItem("remember_me") == "no") {
      
      return sessionStorage.getItem("token")

    }else{

      return null
      
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const locale = localStorage.getItem("locale") ? localStorage.getItem("locale") : "en"; // -----> By Default `en` 
    // Get the auth token from the service.
    const headers = {
      "Access-Control-Allow-Origin" : "*",
      "Accept-Language": locale,
    };

    if(this.getToken()){  
      headers["Authorization"] = this.getToken()
    }

    // if(req.url.includes("edit/profile")){
    //   headers["Content-Type"] = "multipart/form-data"
    // }

    const authReq = req.clone({ 
      setHeaders: headers
    });
    
    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }

  isAuthenticated(){

    if(localStorage.getItem("remember_me") && localStorage.getItem("remember_me") == "yes"){     
      
      return localStorage.getItem('isLogged') == "true"

    } if(localStorage.getItem("remember_me") && localStorage.getItem("remember_me") == "no") {
      
      return localStorage.getItem('isLogged') == "true"

    }else{

      return false
      
    }
  }


  loggedUserDetails(){

    // if(localStorage.getItem("user_details")){
    //   return JSON.parse(localStorage.getItem("user_details"))
    // }else{
    //   return null
    // }


    if(localStorage.getItem("remember_me") && localStorage.getItem("remember_me") == "yes"){

      return JSON.parse(localStorage.getItem("user_details"))  

    } if(localStorage.getItem("remember_me")){

      return JSON.parse(sessionStorage.getItem("user_details"))

    } else {

      return null

    }

  }

  setLoggedUserDetails(object){   

    if(localStorage.getItem("remember_me") && localStorage.getItem("remember_me") == "yes"){

      localStorage.setItem("user_details",JSON.stringify(object))

    } if(localStorage.getItem("remember_me")){


      sessionStorage.setItem("user_details",JSON.stringify(object))

    } else {

    }

  }

  showSuccessMessage(object){

    this._snackBar.open(object.message, object.action ? object.action : "CLOSE", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });

  }
  showErrorMessage(object){

    this._snackBar.open(object.message, object.action ? object.action : "CLOSE", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });

  }
  
  handleError(error) {
    let errorMessage = '';
    if (error.error) {
      // client-side error and server side
      if(Array.isArray(error.error.errors.msg)){ // validation error message
        
        if(error.error.errors.msg.length){
          const ob = error.error.errors.msg[0]
          if(ob.msg == "IS_EMPTY"){
            errorMessage = `${ob.param} missing`
          }else{
            errorMessage = "Parameters missing"

          }
        }
        
      }else{
        errorMessage = error.error.errors.msg;
      }
    } else {
      // server-side error
      errorMessage = `${error.message}`;
    }
    this._snackBar.open(errorMessage,"CLOSE", {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
    return throwError(errorMessage);
  }

  login(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}login`;
    console.log(API_URL)
    return this.http.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    replaceSessionID(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/replace/sessionId/in/job`;
    console.log(API_URL)
    return this.http.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  registerUser(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}register/user`;
    // console.log(API_URL)
    return this.http.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  registerTalent(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}register/talent`;
    // console.log(API_URL)
    return this.http.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    getSkillsAccToSpeciality(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/skills/accTo/speciality`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    sendProfileRequest(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/send/profile/request`;
    // console.log(API_URL)
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }
      editSector(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/edit/talent/categorydata`;
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    addTalentPreferencesNew(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/save/talent/preferences/selected`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    getTalentLevels(): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/talentLevels`;
    console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

    editMyProfileQualification(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/edit/talent/myProfile/qualification`;
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    uploadPortfolioImage(file): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/uploadPortfolio`;
    // console.log(API_URL)
    return this.http.post(API_URL,file)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    getAgencySpeciality(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/agency/disciplines/specialities`;
    // console.log(API_URL)
    return this.http.post(API_URL,data)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    saveAgencyCategoryData(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/save/agency/category/data`;
    // console.log(API_URL)
    return this.http.post(API_URL,data)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    agencyProfile(): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/agency/profile`;
    // console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

    addEditAgency(file): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/add/edit/agency`;
    // console.log(API_URL)
    return this.http.post(API_URL,file)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    uploadAgencyProfile(file): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/uploadProfile`;
    // console.log(API_URL)
    return this.http.post(API_URL,file)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    addAgencySkill(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/add/agency/Skill/accToType`;
    // console.log(API_URL)
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  addSkill(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/add/new/skill/talent`;
    // console.log(API_URL)
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    postAgencySkills(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/save/agency/skills`;
    // console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    getAgencySkills(): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/agency/skills`;
    // console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  getAgencyService(): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/agency/services`;
    // console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    getTalentCountToDiscipline(obj): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/talentCountAccToDiscipline`;
    console.log(API_URL)
    return this.http.post(API_URL, obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    editTalentLevel(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/update/talent/level`;
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    deleteSpecialityService(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/delete/service`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    getSpecialityDetails(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/speciality/details`;
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  
  updateLoginDetails(details){ // whenever talent/talent edit name and name will reflect

    if(localStorage.getItem("remember_me") && localStorage.getItem("remember_me") == "yes"){

      return localStorage.setItem("user_details",JSON.stringify(details))

    } if(localStorage.getItem("remember_me")){

      return sessionStorage.setItem("user_details",JSON.stringify(details))

    }

  }
    resendEmail(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}resend/email/verification`;
    // console.log(API_URL)
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  registerSocialUserTalent(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}register/social/user/talent`;
    // console.log(API_URL)
    return this.http.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  getUserDetailsLinkedIN(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}get/user/details/linkedIn`;
    // console.log(API_URL)
    return this.http.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  checkEmailExist(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}check/email/exist/user`;
    // console.log(API_URL)
    return this.http.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  talentCategories(): Observable<any> {
    let API_URL = `${this.SERVER_URL}talent/categories`;
    // console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  forgotPasword(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}forgot/password`;
    // console.log(API_URL)
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  validateTokenCode(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}validate/code/forgot/password`;
    // console.log(API_URL)
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  resetPassword(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}reset/password`;
    // console.log(API_URL)
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  deleteSectorGuest(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/delete/sector/guest`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
        deleteSector(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/delete/sector`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    addSector(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/save/discipline/sectors`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
      deleteSpecialityGuest(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/delete/speciality/guest`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    deleteSpeciality(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/delete/speciality`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
     deleteSkillGuest(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/remove/skill/guest`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
      deleteSkill(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/remove/skill`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getUserProfile(): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/profile`;
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getDisciplineList(): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/discipline`;
    // console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getDisciplineSpeciality(discipline_id): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/discipline/speciality/${discipline_id}`;
    // console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }
   getDisciplineServicestalent(spe): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/services/accTo/speciality`;
    // console.log(API_URL)
    return this.http.post(API_URL,spe)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getDisciplineServices(spe): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/speciality/services/${spe}`;
    // console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getDisciplineSectors(discipline_id): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/discipline/sectors/${discipline_id}`;
    // console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getTalentDisciplineSectors(discipline_id): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/discipline/sectors/${discipline_id}`;
    // console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    addSpecialityServiceGuest(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/add/new/job/speciality/guest`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    addSpeServicesGuest(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/add/client/speciality/services/guest`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    addSpecialityServicetalent(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/add/speciality/services`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  addSpecialityService(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/add/client/speciality/services`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    addSpecialityIndividual(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/add/new/job/speciality`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addTalentSpecialityService(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/add/talent/speciality/services`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addTalentDiscipline(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/add/edit/disciplineId`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addSpeciality(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/add/new/speciality`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addTalentSpeciality(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/submit-talent-speciality`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addTalentSector(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/save/talent/discipline/sectors`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addNewSector(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/save/discipline/sectors`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    addNewSectorGuest(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/save/discipline/sectors/guest`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  
  addQualifications(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/save/talent/qualifications`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  uploadFile(file): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/upload/talent/qualifications/documents`;
    // console.log(API_URL)
    return this.http.post(API_URL,file)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  deleteFile(file_name): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/unlink/document`;
    // console.log(API_URL)
    return this.http.post(API_URL,{document:file_name})
      .pipe(
        map(res => {
          return res
        })
      )
  }

  // skills
    getSectorsGuest(param): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/discipline/sectors/guest`;
    // console.log(API_URL)
    return this.http.post(API_URL,param)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getSectors(): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/discipline/sectors/client`;
    // console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

    getSkillsData(): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/skills`;
    // console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  postSkills(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/save/skills`;
    // console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  addNewSkill(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/add/Skill/accToType`;
    // console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }

    addNewClientSkill(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/add/new/skill/client`;
    // console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }

      addNewClientSkillGuest(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/add/new/skill/client/guest`;
    // console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  // accomplishment
  postAccomplishment(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/save/talent/accomplishments`;
    // console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  postAccomplishmentLanguage(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/save/languages/inTalentAccomplishment`;
    // console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  postExperince(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/save/talent/experience`;
    // console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }
   uploadMedia(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/upload/talent/media`;
    // console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
   }
   removeFile(file_name): Observable<any>{
     let API_URL = `${this.SERVER_URL}users/unlink/media`;
     // console.log(API_URL)
     return this.http.post(API_URL,{document:file_name})
       .pipe(
         map(res => {
           return res
         })
       )
   }

   addTalentPreferences(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/save/talent/preferences`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  getCountryWiseData(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/country/states/city`;
    // console.log(API_URL)
    return this.http.post(API_URL,data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  saveProfileDetails(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/edit/talent/user`;
    // console.log(API_URL)
    return this.http.post(API_URL,data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  createJobPostStep1(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/create/job/step1`;
    console.log(API_URL)
    return this.http.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  createJobPostStep2(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/create/job/step2`;
    console.log(API_URL)
    return this.http.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

    getLocationData(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/country/states/city`;
    console.log(API_URL)
    return this.http.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  createJobPostStep3(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/create/job/step3`;
    console.log(API_URL)
    return this.http.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getCurrencies(): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/currencies`;
    console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  uploadPostJobMedia(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/upload/job/documents`;
    console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  removePostJobMedia(file_name): Observable<any>{
     let API_URL = `${this.SERVER_URL}users/unlink/job/document`;
     // console.log(API_URL)
     return this.http.post(API_URL,{document:file_name})
       .pipe(
         map(res => {
           return res
         })
       )
  }

  getJobDetail(job_id): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/job/details/${job_id}`;
    // console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getJobSpecialities(discipline_id): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/specialities/${discipline_id}`;
    console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    getJobSpecialitiesGuest(param): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/specialityAccToDiscipline/${param}`;
    console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

    getClientSpecialityServicesGuest(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/get/client/speciality/services/guest`;
    console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  getClientSpecialityServices(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/get/client/speciality/services`;
    console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }
     getSpecialitySkillsIndividualGuest(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/client/skills/guest`;
    console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }
      getSpecialitySkillsIndividual(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/client/skills`;
    console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    getClientSpecialitySkills(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/get/client/speciality/skills`;
    console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  saveTalentDetails(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/save/job/talent`;
    console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getPostedJobs(formData): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/posted/jobs`;
    // console.log(API_URL)
    return this.http.post(API_URL,formData)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getProfileVisibility(): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/profileVisibility`;
    console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }



  updateProfilePercentage(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/update/profile/percent`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getUniversities(value): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/university/list?search=${value}`;
    // let API_URL = `http://universities.hipolabs.com/search?search=${value}`;
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getDegrees(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/degree/list`;
    // let API_URL = `http://universities.hipolabs.com/search?search=${value}`;
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getFieldOfStudies(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/fieldStudy/list`;
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getOrganizations(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/organization/list`;
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getLicenses(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/license/list`;
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getLanguages(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/language/proficiency`;
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getProficiencies(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/language/proficiency`;
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  // Raj -> My Profile
  editMyProfileExper(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/edit/talent/myProfile/experience`;
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  
  editMyProfileAccomplishments(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/edit/talent/myProfile/accomplishments`;
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  
  editMyProfilePreferences(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/edit/talent/myProfile/preferences`;
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  
  postMyProfileSkills(request_payload): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/save/my-profile/skills`;
    // console.log(API_URL)
    return this.http.post(API_URL,request_payload)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  changeUserPassword(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}change/password`;
    // console.log(API_URL)
    return this.http.post(API_URL,data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  timezones(): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/timezones`;
    // console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  uploadTalentVerification(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/identity/verification`;
    // console.log(API_URL)
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getPublicProfile(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/profileById`;
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  registerReferral(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}register/referralPartner`;
    // console.log(API_URL)
    return this.http.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  editPartner(data): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/edit/partner`;
    // console.log(API_URL)
    return this.http.post(API_URL,data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  referralForgotPasword(form): Observable<any> {
    let API_URL = `${this.SERVER_URL}referral/forgot/password`;
    // console.log(API_URL)
    return this.http.post(API_URL,form)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  generateReferralCode(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/generate/referral/code`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }

    duplicatePost(data): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/createDuplicateJob`;
    console.log(API_URL)
    return this.http.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }

  getReferredUsersPagination(data): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/my/referred/users`;
    console.log(API_URL)
    return this.http.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }
    getJobsUserslist(params){
    let API_URL = `${this.SERVER_URL}users/my/posted/jobs`;
    console.log(API_URL)
    return this.http.post(API_URL , params)
      .pipe(
        map(res => {
          return res;
        })
      )
  }
  getJObList(params){
    let API_URL = `${this.SERVER_URL}users/talent/list`;
    console.log(API_URL)
    return this.http.post(API_URL , params)
      .pipe(
        map(res => {
          return res;
        })
      )
  }
    editUserProfile(params){
    let API_URL = `${this.SERVER_URL}users/edit/client/user`;
    console.log(API_URL)
    return this.http.post(API_URL , params)
      .pipe(
        map(res => {
          return res;
        })
      )
  }

      getDiscipline(){
    let API_URL = `${this.SERVER_URL}users/discipline`;
    console.log(API_URL)
    return this.http.get(API_URL )
      .pipe(
        map(res => {
          return res;
        })
      )

  }
 
        getAllSectors(){
    let API_URL = `${this.SERVER_URL}users/get/all/sectors`;
    console.log(API_URL)
    return this.http.get(API_URL )
      .pipe(
        map(res => {
          return res;
        })
      )
  }
 

    getSpeciality(discipline_id): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/get/specialityAccToDiscipline/${discipline_id}`;
    // console.log(API_URL)
    return this.http.get(API_URL)
      .pipe(
        map(res => {
          return res
        })
      )
  }
      deleteJob(param): Observable<any>{
    let API_URL = `${this.SERVER_URL}users/delete/job`;
    // console.log(API_URL)
    return this.http.post(API_URL,param)
      .pipe(
        map(res => {
          return res
        })
      )
  }
      deleteSpecialityServiceGuest(params){
    let API_URL = `${this.SERVER_URL}users/delete/service/guest`;
    console.log(API_URL)
    return this.http.post(API_URL , params )
      .pipe(
        map(res => {
          return res;
        })
      )

  }
      deleteSpecialityServiceclient(params){
    let API_URL = `${this.SERVER_URL}users/delete/service`;
    console.log(API_URL)
    return this.http.post(API_URL , params )
      .pipe(
        map(res => {
          return res;
        })
      )

  }

      getServices(params){
    let API_URL = `${this.SERVER_URL}users/get/approved/services`;
    console.log(API_URL)
    return this.http.post(API_URL , params )
      .pipe(
        map(res => {
          return res;
        })
      )

  }

  getProficiency(params){
   let API_URL = `${this.SERVER_URL}users/get/language/proficiency`;
    console.log(API_URL)
    return this.http.post(API_URL , params )
      .pipe(
        map(res => {
          return res;
        })
      )
  }

       getLanguage(){
    let API_URL = `${this.SERVER_URL}users/languages`;
    console.log(API_URL)
    return this.http.get(API_URL )
      .pipe(
        map(res => {
          return res;
        })
      )

  }
       getallPositions(){
    let API_URL = `${this.SERVER_URL}users/get/all/positions`;
    console.log(API_URL)
    return this.http.get(API_URL )
      .pipe(
        map(res => {
          return res;
        })
      )

  }

     getTalent(){
    let API_URL = `${this.SERVER_URL}users/talentLevels`;
    console.log(API_URL)
    return this.http.get(API_URL )
      .pipe(
        map(res => {
          return res;
        })
      )

  }
  
    changeJobStatus(obj): Observable<any> {
    let API_URL = `${this.SERVER_URL}users/change/job/status`;
    // console.log(API_URL)
    return this.http.post(API_URL,obj)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  
        getAllSkills(){
    let API_URL = `${this.SERVER_URL}users/get/allSkills`;
    console.log(API_URL)
    return this.http.get(API_URL )
      .pipe(
        map(res => {
          return res;
        })
      )

  }
}
  