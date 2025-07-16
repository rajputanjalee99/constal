import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../service/service.service';
import { AccomplishmentsModel, PublicationsModel, CoursesModel, ProjectsModel, AwardsModel, LanguagesModel, OrganizarionModel, OrganizationsModel, MediaModel, LanguageModel } from './accomplishments';
import { _languagesData } from '../../languages/languages';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-accomplishments',
  templateUrl: './accomplishments.component.html',
  styleUrls: ['./accomplishments.component.scss']
})
export class AccomplishmentsComponent implements OnInit {

  isLoading: boolean = true;
  accomplishmentsModel = new AccomplishmentsModel();
  publicationsModel = new PublicationsModel();
  coursesModel = new CoursesModel();
  projectsModel = new ProjectsModel();
  awardsModel = new AwardsModel();
  languagesModel = new LanguagesModel();
  organizarionModel = new OrganizarionModel();
  organizationsModel = new OrganizationsModel();
  mediaModel = new MediaModel();
  languageModel = new LanguageModel();

  publications_list = [];
  courses_list = [];
  projects_list = [];
  organizarion_list = [];
  awards_list = [];
  userName;
  organizations_list = [];
  languages = [];
  proficiencies = [];
  selectedIndexBinding = 0;
  occupation_list = [];
  organization_list = [];

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

  config = {
    displayFn:(item: any) => { return item.name},
    displayKey:"name", 
  }
  constructor(public service : Service,private router : Router,private datePipe: DatePipe) {
    this.service.sideBarHeight = 60; }
      myFiles:string [] = [];

  files= [];

  ngOnInit(): void {
    this.getLanguages();
    this.getProficiencies();
    this.getOccupations();
    this.getUserProfile();
    this.isLoading = false;
  }

  getOccupations(){
    const obj = { 
      type: "occupation"
    }
    this.service.getLanguages(obj).subscribe(async res => {                  
      
      this.occupation_list = res.data;
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  getLanguages(){
    const prs = JSON.parse(_languagesData);
    
    var gp2 = [];
    for (var i = 0; i < Object.keys(prs).length; i++) {
      const value = prs[Object.keys(prs)[i]];
            
      gp2[i] = {
        name: value.name,
        nativeName: value.nativeName,
      }        
    }
       
    this.languages = gp2;
    
  }

  getProficiencies(){
    const obj = { 
      type: "proficiency"
    }
    this.service.getProficiencies(obj).subscribe(async res => {                  
      console.log("proficiencies resp ============== ",res.data)
      this.proficiencies = res.data;
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  getUserProfile(){
    this.service.getUserProfile().subscribe(async res => {
      this.service.profile = res.profile;
      console.log("profile res ============ ",res.profile)
      if (res.profile && res.profile.talent_accomplishment && res.profile.talent_accomplishment.publications && res.profile.talent_accomplishment.publications.length) {
        this.publications_list = res.profile.talent_accomplishment.publications.map((item => {
                   
          return item = {
              title : item.title,
              publisher : item.publisher,
              publish_date : item.publish_date,
              authors : item.authors ? item.authors : [],
              publication_url : item.publication_url
          }
          
        })) 
      }

      if (res.profile && res.profile.talent_accomplishment && res.profile.talent_accomplishment.courses && res.profile.talent_accomplishment.courses.length) {
        this.courses_list = res.profile.talent_accomplishment.courses.map((item => {
            return item = {
              course_name : item.course_name,
              start_date : item.start_date,
              end_date : item.end_date,
              associated_with : item.associated_with
            }          
        })) 
        console.log("course list =========== ",this.courses_list)
      }

      if (res.profile && res.profile.talent_accomplishment && res.profile.talent_accomplishment.projects && res.profile.talent_accomplishment.projects.length) {
        this.projects_list = res.profile.talent_accomplishment.projects.map((item => {          
          return item = {
              project_name : item.project_name,
              start_month : item.start_month,
              start_year : item.start_year,
              end_month : item.end_month,
              end_year : item.end_year,
              team_members : item.team_members ? item.team_members : [],
              associated_with : item.associated_with,
              is_currently_working : item.is_currently_working,
              project_url : item.project_url,
              description : item.description,
              media :  item.media ? item.media : []
          }          
        })) 
        console.log("project list =========== ",this.projects_list)
      }

      if (res.profile && res.profile.talent_accomplishment && res.profile.talent_accomplishment.awards && res.profile.talent_accomplishment.awards.length) {
        this.awards_list = res.profile.talent_accomplishment.awards.map((item => {
          
          return item = {
              title : item.title,
              associated_with : item.associated_with,
              issuer : item.issuer,
              start_month : item.start_month,
              start_year : item.start_year,
              end_month : item.end_month,
              end_year : item.end_year,
              description : item.description,
              media : item.media ? item.media : []
          }
          
        })) 
      }

      if (res.profile && res.profile.talent_accomplishment && res.profile.talent_accomplishment.organizations && res.profile.talent_accomplishment.organizations.length) {
        this.organizations_list = res.profile.talent_accomplishment.organizations.map((item => {
          
          return item = {
              organization : item.organization,
              start_month : item.start_month,
              start_year : item.start_year,
              end_month : item.end_month,
              end_year : item.end_year,
              position_helds : item.position_helds,
              membership_ongoing : item.membership_ongoing,
              additional_note : item.additional_note,
              occupation : item.occupation
          }

        })) 
      }

      if (res.profile && res.profile.talent_accomplishment && res.profile.talent_accomplishment.languages && res.profile.talent_accomplishment.languages.other_language && res.profile.talent_accomplishment.languages.other_language.length) {
        this.languagesModel.other_language = res.profile.talent_accomplishment.languages.other_language;
      } 

      if (res.profile && res.profile.talent_accomplishment && res.profile.talent_accomplishment.languages && res.profile.talent_accomplishment.languages.english_proficiency) {
        this.languagesModel.english_proficiency = res.profile.talent_accomplishment.languages.english_proficiency;
      }

      this.userName = res.profile.first_name+" "+res.profile.last_name;
      
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  addPublication(){
    this.publicationsModel = new PublicationsModel();
    if(this.publications_list && this.publications_list.length){
      this.publications_list.map((item,i) => {
        if(item.title && item.title.trim()){
          item.titleValidation = false
        }else{
          item.titleValidation = true
        } 
        
        if(item.publication_url && item.publication_url.trim() && this.validURL(item.publication_url.trim())==false){
          item.publicationUrlValidation = true
        }else{
          item.publicationUrlValidation = false
        }

        if(item.title && item.title.trim() && item.publicationUrlValidation==false && i==this.publications_list.length-1){
          this.publications_list.unshift(this.publicationsModel);
        }
      })
    }else{
      this.publications_list.unshift(this.publicationsModel);
    } 
  }
  addAuthor(publicationsModel){
    const obj= {
      name : ""
    }; 
    publicationsModel.authors.push(obj);
  }
  removeAuthor(index,publication){
    publication.authors.splice(publication.authors.indexOf(index), 1);
  }

  addCourses(){
    this.coursesModel = new CoursesModel();
    if(this.courses_list && this.courses_list.length){
      this.courses_list.map((item,i) => {
        if(item.course_name && item.course_name.trim()){
          item.courseValidation = false
        }else{
          item.courseValidation = true
        }

        if(item.start_date && item.end_date && item.start_date>item.end_date){
          item.endDateLessValidation = true
        }else{
          item.endDateLessValidation = false
        }

        if(item.course_name && item.course_name.trim() && item.endDateLessValidation==false && i==this.courses_list.length-1){
          this.courses_list.unshift(this.coursesModel);
        }
      })
    }else{
      this.courses_list.unshift(this.coursesModel);
    } 
  }

  addProjects(){
    this.projectsModel = new ProjectsModel();
    
    if(this.projects_list && this.projects_list.length){
      this.projects_list.map((item,i) => {
        
        if(item.is_currently_working==false){
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
          item.endYearValidation = false;
          item.endMonthValidation = false;
        }

        if(item.project_name && item.project_name.trim()){
          item.projectNameValidation = false;
        }else{
          item.projectNameValidation = true;
        }

        if(item.project_url && item.project_url.trim() && this.validURL(item.project_url.trim())==false){
          item.projectUrlValidation = true
        }else{
          item.projectUrlValidation = false
        }

        if(item.project_name && item.project_name.trim() && item.projectUrlValidation==false && ((!item.is_currently_working) || (item.is_currently_working && item.is_currently_working==false && item.endYearValidation==false && item.endMonthValidation==false) || (item.is_currently_working && item.is_currently_working==true)) && i==this.projects_list.length-1){
          this.projects_list.unshift(this.projectsModel);
        }
      })
    }else{
      this.projects_list.unshift(this.projectsModel);
    } 
  }

  addTeamMember(projectsModel){
    const obj= {name:''};
    projectsModel.team_members.push(obj);
  }
  addLanguage(){
    this.languageModel = new LanguageModel();
    console.log(this.languagesModel.other_language)
    if(this.languagesModel.other_language && this.languagesModel.other_language.length){
      this.languagesModel.other_language.map((item,i) => {
                
        if(item.language && item.language.trim()){
          item.otherLanguageValidation = false;
        }else{
          item.otherLanguageValidation = true;
        }
        if(item.proficiency && item.proficiency.trim()){
          item.otherProficiencyValidation = false;
        }else{
          item.otherProficiencyValidation = true;
        }
        if(item.otherLanguageValidation==false && item.otherProficiencyValidation==false && i==this.languagesModel.other_language.length-1){
          
          this.languagesModel.other_language.unshift(this.languageModel);
        }      
      })
    }else{
      
      this.languagesModel.other_language.unshift(this.languageModel);
    }    
  }

  addOrganization(){
    this.organizationsModel = new OrganizationsModel();
    if(this.organizations_list && this.organizations_list.length){
      this.organizations_list.map((item,i) => {
        
        if(item.membership_ongoing==false){
          // console.log("if start year =======",Number(item.start_year))
          // console.log("if end year =======",Number(item.end_year))
          // console.log("if start month =======",Number(item.start_month))
          // console.log("if end month =======",Number(item.end_month))
          if(Number(item.end_year) < Number(item.start_year)){
          // if(2030 < 2021){
            // console.log("if year ========== ")
            item.endYearValidation = true;
          }else{
            // console.log("else year ========== ")
            item.endYearValidation = false;
          }
          
          if((Number(item.end_year)==Number(item.start_year)) && (Number(item.end_month)<Number(item.start_month))){
            // console.log("if month ========== ")
            item.endMonthValidation = true;
          }else{
            // console.log("else month ========== ")
            item.endMonthValidation = false;
          }
          
        }else{
          // console.log("else =======")
          item.endYearValidation = false;
          item.endMonthValidation = false;
        }
        // console.log("end year validation ============ ",item.endYearValidation)
        // console.log("end month validation ============ ",item.endMonthValidation)

        if(item.organization && item.organization.trim()){
          item.organizationValidation = false;
        }else{
          item.organizationValidation = true;
        }

        if(item.organization && item.organization.trim() && ((!item.membership_ongoing) || (item.membership_ongoing==false && item.endYearValidation==false && item.endMonthValidation==false) || (item.membership_ongoing==true)) && i==this.organizations_list.length-1){
          this.organizations_list.unshift(this.organizationsModel);
        }
      })
    }else{
      this.organizations_list.unshift(this.organizationsModel);
    } 
  }
  addAward(){
    this.awardsModel = new AwardsModel();
    
    if(this.awards_list && this.awards_list.length){
      this.awards_list.map((item,i) => {
        if(item.title && item.title.trim()){
          item.titleValidation = false
        }else{
          item.titleValidation = true
        }
        if(item.issuer && item.issuer.trim()){
          item.issuerValidation = false
        }else{
          item.issuerValidation = true
        }
        if(item.title && item.title.trim() && item.issuer && item.issuer.trim() && i==this.awards_list.length-1){
          this.awards_list.unshift(this.awardsModel);
        }
      })
    }else{
      this.awards_list.unshift(this.awardsModel);
    } 
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  removeAward(index){
    this.awards_list.splice(index,1);
  }
  removeCourses(index){
    this.courses_list.splice(index,1);
  }
  removeProjects(index){
    this.projects_list.splice(index,1);
  }
  removeTeamMember(index,project){
      project.team_members.splice(project.team_members.indexOf(index), 1);
  }
  deleteLanguage(index){
    this.languagesModel.other_language.splice(this.languagesModel.other_language.indexOf(index), 1);
  }
  removeOrganization(index){
    this.organizations_list.splice(index,1);
  }
  removeAccomplishment(index){
    this.publications_list.splice(index,1);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  deleteDocument(document,education){
    this.isLoading = true;
    this.service.deleteFile(document.url).subscribe(async res => {
      education.splice(education.indexOf(document), 1);
      this.isLoading = false;
    },(err) => {
      this.service.handleError(err)
      this.isLoading = false;
    })
  }

  transformDate(date) {
    var dateToDBthis = this.datePipe.transform(date, 'yyyy-MM-dd'); 
    return dateToDBthis
  }

  addAccomplishmentData(){
        
   // this.accomplishmentsModel.publications = this.publications_list;
    // this.accomplishmentsModel.courses = this.courses_list;
    this.accomplishmentsModel.projects = this.projects_list;
    this.accomplishmentsModel.awards = this.awards_list;
    this.accomplishmentsModel.languages = this.languagesModel;
    this.accomplishmentsModel.organizations = this.organizations_list;
    
    this.accomplishmentsModel.publications = this.publications_list.map(item => {
      item.publish_date = this.transformDate(item.publish_date)
      return item;
    });

    this.accomplishmentsModel.courses = this.courses_list.map(item => {
      
      item.start_date = this.transformDate(item.start_date)
      item.end_date = this.transformDate(item.end_date)
      
      return item;
    })

    // start_date : item.start_date,
    //           end_date : item.end_date,

    console.log(this.accomplishmentsModel);
   

    

    this.service.postAccomplishment(this.accomplishmentsModel).subscribe(async res => {
        this.router.navigate(['experience'])
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  uploadFile(evt: any,accomplishment) {

    if (!evt.addedFiles.length) {
      return;
    }
        for (var i = 0; i < evt.addedFiles.length; i++) { 
	              this.myFiles.push(evt.addedFiles[i]);

        }
    this.isLoading = true;
    const file = evt.addedFiles[0];
    var img_arr = file.name.split('.');
    const ext = img_arr.pop();

    if (file.size/1024/1024 > 25) {
      this.isLoading = false;
      this.service.showErrorMessage({ message : "The file should not exceed more than 25MB.", action : "Okay"});
       for (var i = 0; i < evt.addedFiles.length; i++) { 
	              this.myFiles.splice(evt.addedFiles.indexOf(i),1);

        }  
      return;
    }
    
    //if (ext == 'jpeg' || ext == 'jpg' || ext == 'png') {
    if(true)
    {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        const formData = new FormData();
for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append("media",this.myFiles[i]);

    }         this.service.uploadMedia(formData).subscribe(async res => {
          console.log("upload media res ============= ",res)
           for(let i=0;i<this.myFiles.length;i++){
		   const obj = {
            name: this.myFiles[i]['name'],
            media: this.myFiles[i]['name'],
            url: res.file_name[i],
            type: this.myFiles[i]['type'],
          } 
          console.log("upload media obj ============= ",obj)
          accomplishment.media.push(obj);
          }
          this.isLoading = false;
        },(err) => {
          this.service.handleError(err)
          console.log(err)
          this.isLoading = false;
        })
    } 
  }
  // validationFlag = false
  checkPublicationsData(){
    if(this.publications_list.length){
              let gotError = "no";

      this.publications_list.map((item,i) => {
        if(item.title && item.title.trim()){
          item.titleValidation = false
        }else{
          item.titleValidation = true
        }

        if(item.publication_url && item.publication_url.trim() && this.validURL(item.publication_url.trim())==false ){
          item.publicationUrlValidation = true
        }else{
          item.publicationUrlValidation = false
        }

        if(item.title && item.title.trim() && item.publicationUrlValidation==false  &&gotError=="no"){
          if (this.publications_list.length === i+1) {
            this.selectedIndexBinding = this.selectedIndexBinding+1;
          }
        }else{
this.selectedIndexBinding = this.selectedIndexBinding;  
                    gotError = "yes";        }
      })
    }else{
      this.selectedIndexBinding = this.selectedIndexBinding+1;
    }    
  }

  checkCoursesData(){
    if(this.courses_list.length){
    let gotError="no";
      this.courses_list.map((item,i) => {
        if(item.course_name && item.course_name.trim()){
          item.courseValidation = false
        }else{
          item.courseValidation = true
        }

        if(item.start_date && item.end_date && item.start_date>item.end_date){
          item.endDateLessValidation = true
        }else{
          item.endDateLessValidation = false
        }

        if(item.course_name && item.course_name.trim() && item.endDateLessValidation==false&& gotError=="no"){
          if (this.courses_list.length === i+1) {
            this.selectedIndexBinding = this.selectedIndexBinding+1;
          }
        }else{
          this.selectedIndexBinding = this.selectedIndexBinding;  
                    gotError = "yes";
        }
      })
    }else{
      this.selectedIndexBinding = this.selectedIndexBinding+1;
    }    
  }

  checkProjectsData(){
    console.log(this.projects_list)
    if(this.projects_list.length){
      this.projects_list.map((item,i) => {
        if(item.is_currently_working==false){
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
          // console.log("else project ============ ")
        }

        
        if(item.project_name && item.project_name.trim()){
          item.projectNameValidation = false;
        }else{
          item.projectNameValidation = true;
        }

        if(item.project_url && item.project_url.trim() && this.validURL(item.project_url.trim())==false){
          item.projectUrlValidation = true
        }else{
          item.projectUrlValidation = false
        }
         if(item.media.length){
          item.documentValidation = false
        }else{
          item.documentValidation = true
        }

        if(
          item.project_name && item.project_name.trim() && item.projectUrlValidation==false &&  item.documentValidation==false &&
          ((
            item.is_currently_working==false 
            && item.endYearValidation==false 
            && item.endMonthValidation==false) 
            || (item.is_currently_working==true)
          )){
          if (this.projects_list.length === i+1) {
            this.selectedIndexBinding = this.selectedIndexBinding+1;
          }          
        }else{
          this.selectedIndexBinding = this.selectedIndexBinding;
          item.projectNameValidation = true
        }
      })
    }else{
      this.selectedIndexBinding = this.selectedIndexBinding+1;
    }    
  }

  checkAwardsData(){
    if(this.awards_list.length){
              let gotError = "no";

      this.awards_list.map((item,i) => {
        if(item.title && item.title.trim()){
          item.titleValidation = false
        }else{
          item.titleValidation = true
        }
        if(item.issuer && item.issuer.trim()){
          item.issuerValidation = false
        }else{
          item.issuerValidation = true
        }

        if(item.media.length){
          item.documentValidation = false
        }else{
          item.documentValidation = true
        }
        if(item.title && item.title.trim() && item.issuer && item.issuer.trim()&&gotError=="no"  &&item.documentValidation==false){
          if (this.awards_list.length === i+1) {
            this.selectedIndexBinding = this.selectedIndexBinding+1;
          }
        }else{
 this.selectedIndexBinding = this.selectedIndexBinding;  
                    gotError = "yes";
        }
      })
    }else{
      this.selectedIndexBinding = this.selectedIndexBinding+1;
    }    
  }

  checkLanguagesData(){
    if(this.languagesModel.english_proficiency){
      this.languagesModel.englishProficiencyValidation = false
      if(this.languagesModel.other_language && this.languagesModel.other_language.length){
        this.languagesModel.other_language.map((item,i) => {
          
          if(item.language && item.language.trim()){
            item.otherLanguageValidation = false;
          }else{
            item.otherLanguageValidation = true;
          }
          if(item.proficiency && item.proficiency.trim()){
            item.otherProficiencyValidation = false;
          }else{
            item.otherProficiencyValidation = true;
          }
          if(item.otherLanguageValidation==false && item.otherProficiencyValidation==false && i==this.languagesModel.other_language.length-1){
            this.selectedIndexBinding = this.selectedIndexBinding+1;
          }      
        })
      }else{
        this.selectedIndexBinding = this.selectedIndexBinding+1;
      }
    }else{
      this.selectedIndexBinding = this.selectedIndexBinding;
      this.languagesModel.englishProficiencyValidation = true
    }   
  }

  
  checkOrganizationsData(){
    if(this.organizations_list.length){
              let gotError = "no";

      this.organizations_list.map((item,i) => {
        if(!item.membership_ongoing || item.membership_ongoing==false){
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
          // console.log("else organization ============ ")
        }

        if(item.organization && item.organization.trim()){
          item.organizationValidation = false;
        }else{
          item.organizationValidation = true;
        }

        if(item.organization && item.organization.trim() && (( (!item.membership_ongoing || item.membership_ongoing==false) && item.endYearValidation==false && item.endMonthValidation==false &&gotError=="no") || (item.membership_ongoing==true))){
          if (this.organizations_list.length === i+1) {
            this.addAccomplishmentData();
          }
        }else{
                    this.selectedIndexBinding = this.selectedIndexBinding;  
                    gotError = "yes";        }
      })
    }else{
      this.addAccomplishmentData();
    }    
  }

  getOrganizations(i){
    if(this.organizations_list[i].organization && this.organizations_list[i].organization.trim()){
      const obj = {
        search:this.organizations_list[i].organization
      }
      this.service.getOrganizations(obj).subscribe(async res => {
        this.organization_list = res.data;
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })      
    }else{
      this.organization_list = [];
    }    
  }

  getOrganizationText(name,i){
    this.organizations_list[i].organization = name;
    this.organization_list = [];
  }

  validURL(str) {
    var res = str.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
    return (res !== null)
  }

}