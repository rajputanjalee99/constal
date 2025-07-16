import { Component, OnInit } from '@angular/core';
import { Service } from "./../../service/service.service";
import { Options } from '@angular-slider/ngx-slider';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { environment } from "./../../../environments/environment";
import { yearMonthName } from "./../../common/month_names/names";
import { ExperienceModel } from '../experience/experience';


declare var $;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})

export class MyProfileComponent implements OnInit {
  isLoading: boolean = true;
  
  value: number = 30;
  yearMonthName = yearMonthName

  experienceModel = new ExperienceModel();

  intro_file

  intro_file_name


  env 
  options: Options = {
    floor: 0,
    ceil: 30,
    step: 5,
    showTicks: true,
    showTicksValues: true,
    translate: (value: number): string => {
      if(value==30){
        return value+"+";
      }else{
        return value+"";
      }
    }
  };
  top_skills = []
  tools_skills = []
  profile = null
  skill_list: any;
  industry_list: any;
  tools_list: any;
  interpersonal_skill_list: any;

  skills_add = [];
  industry_knowledge_add = [];
  tools_add = [];
  interpersonal_skill_add = [];

  selected_skills = [];
  selected_industry = [];
  selected_tools = [];
  selected_interpersonal_skill = [];

  occupation_list = [];
  relationship_list = [];
  position_list = [];

  work_history = {
    title : "",
    company_name : "",
    start_month : "", 
    start_year : "", 
    end_month : "",
    end_year : "",
    index : "",
    employment_type : "",
    currently_working : "",
    media : [],
    description : "",
  }

  organization = {
    organization : "",
    company_name : "",
    start_month : "", 
    start_year : "", 
    end_month : "",
    end_year : "",
    index : "",
    additional_note : "",
    position_helds : "",
    occupation : "",
    membership_ongoing : "",
  }

  course = {
    course_name : "",
    start_date : "",
    end_date : "",
    associated_with : "",    
    index : "",
  }

  project = {
    project_name : "",
    associated_with : "",
    project_url : "",
    description : "",
    start_month : "", 
    start_year : "", 
    end_month : "",
    end_year : "",
    index : "",
    is_currently_working : "",
    team_members : [],
    media : [],
  }

  award = {
    title : "",
    issuer : "",
    associated_with : "",   
    description : "",
    start_month : "", 
    start_year : "", 
    index : "",
    media : [],
  }

  recommendation = {
    person_name : "",
    recommendation : "",
    index : "",
    talent_company_name : "",
    talent_position : "",
    relationship : "",
    position_time : "",

  }

  single_fields = {
    portifolio : "",
    visibility : "",
    level_of_talent : "",
    availability : "",
    work_rate : "",
    hourly_from : "",
    salary_from : "",
    video_introduction : "",
  }

  publication = {
    title : "",
    publisher : "",
    publish_date : "",
    authors : [],
    publication_url : "",
    index : "",
  }

  // Div hide show
  hidden_blocks={
    work_history : "", // edit/add
    organization : "", // edit/add
    course : "", // edit/add
    project : "", // edit/add
    award : "", // edit/add
    recommend : "", // edit/add
    publication : "", // edit/add
    profile_details : "", //edit
    regional : "",
  }

  years = []

  months = [
    {
      month : "Jan",
      value : 1,
    },
    {
      month : "Feb",
      value : 2,
    },
    {
      month : "Jan",
      value : 3,
    },
    {
      month : "Jan",
      value : 4,
    },
    {
      month : "Jan",
      value : 5,
    },
    {
      month : "Jan",
      value : 6,
    },
    {
      month : "Jan",
      value : 7,
    },
    {
      month : "Jan",
      value : 8,
    },
    {
      month : "Jan",
      value : 9,
    },
    {
      month : "Jan",
      value : 10,
    },
    {
      month : "Jan",
      value : 11,
    },
    {
      month : "Jan",
      value : 12,
    },
  ]

  changeRegionalNone(event){
    if(event.target.checked){
      this.regional_list = [{name: 'Africa', flag: false},{name: 'Asia', flag: false},{name: 'Europe', flag: false},{name: 'Middle East', flag: false},
      {name: 'North America', flag: false},{name: 'Oceania', flag: false},{name: 'South America', flag: false}];
    }
  }

  changeRegional(event){
    if(event.target.checked){
      this.experienceModel.regional_experience_none = false;
    }
  }


  workForm : FormGroup
  organizationForm : FormGroup
  courseForm : FormGroup
  projectForm : FormGroup
  awardForm : FormGroup
  recommendForm : FormGroup
  publicationForm : FormGroup

  regional_list = [{name: 'Africa', flag: false},{name: 'Asia', flag: false},{name: 'Europe', flag: false},{name: 'Middle East', flag: false},
  {name: 'North America', flag: false},{name: 'Oceania', flag: false},{name: 'South America', flag: false}];
  
  profile_form: any;

  constructor(public service : Service,private datePipe: DatePipe,private fb : FormBuilder) { }

  transformDate(date) {
    var dateToDBthis = this.datePipe.transform(date, 'yyyy-MM-dd'); 
    return dateToDBthis
  }

  ngOnInit(): void {
    this.env = environment
    $(".div-hide").hide();
  	$(document).on('click','.add-new',function(){
      $(this).parents(".main-wrap").hide();
      $(this).parents('.top-head').children(".div-hide").show();
    });

    $(document).on('click','.on-save',function(){
      $(this).parents(".div-hide").hide();
      $(this).parents('.top-head').children(".main-wrap").show();
    });


    this.getProfile();
    this.getSkillsData();
    this.getSkills();
    this.getOccupations();
    this.getRelationships();
    this.getPositions();

    // validate
    this.workForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      company_name: new FormControl('', [Validators.required]),      
      employment_type: new FormControl('', [Validators.required]),      
    })

    // validate
    this.organizationForm = new FormGroup({
      organization: new FormControl('', [Validators.required]),   
      position_helds: new FormControl(''),   
      occupation: new FormControl(''),   
    })
    
    // validate
    this.courseForm = new FormGroup({
      course_name: new FormControl('', [Validators.required]),   
      associated_with : new FormControl(''),   
    })

    // validate
    this.projectForm = new FormGroup({
      project_name: new FormControl('', [Validators.required]),    
    })

    this.awardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),    
      issuer: new FormControl('', [Validators.required]),    
    })

    this.recommendForm = new FormGroup({
      person_name: new FormControl('', [Validators.required]),    
      recommendation : new FormControl('', [Validators.required]),    
      talent_company_name : new FormControl(''),    
      talent_position : new FormControl(''),    
      relationship : new FormControl(''),    
      position_time : new FormControl(''),    
    })

    this.publicationForm = new FormGroup({
      title: new FormControl('', [Validators.required]),    
      publisher : new FormControl('', [Validators.required]),    
      publish_date : new FormControl('', [Validators.required]),    
      publication_url : new FormControl('', []),    
    })

    this.profile_form = this.fb.group({
      profile_headline: [''],    
      contact_number: ['', Validators.required],    
      web_address: [''],    
      country: ['', Validators.required],    
      state: ['', Validators.required],    
      appartment: ['', Validators.required],    
      zipcode: [''],    
      portfolio: [''],    
      city: [''],         
    })


    const now = new Date().getUTCFullYear();    
    this.years = Array(now - (now - 20)).fill('').map((v, idx) => now - idx);    
  }

  get title(): any {
    return this.workForm.get('title');
  }

  get company_name(): any {
    return this.workForm.get('company_name');
  }

  get employment_type(): any {
    return this.workForm.get('employment_type');
  }
  
  get organization_form(): any {
    return this.organizationForm.get('organization');
  }

  get course_name_form(): any {
    return this.courseForm.get('course_name');
  }
  
  get associated_with_form(): any {
    return this.courseForm.get('associated_with');
  }

  get project_name_form(): any {
    return this.projectForm.get('project_name');
  }

  get award_form(): any {
    return this.awardForm.get('title');
  }

  get award_issuer_form(): any {
    return this.awardForm.get('issuer');
  }

  get recommendation_form(): any {
    return this.recommendForm.get('recommendation');
  }

  get person_name_form(): any {
    return this.recommendForm.get('person_name');
  }

  get publication_title_form(): any {
    return this.publicationForm.get('title');
  }

  get publisher_form(): any {
    return this.publicationForm.get('publisher');
  }

  get publish_date_form(): any {
    return this.publicationForm.get('publish_date');
  }

  get publication_url_form(): any {
    return this.publicationForm.get('publication_url');
  }

  getRelationships(){
    const obj = { 
      type: "relationship"
    }
    this.service.getLanguages(obj).subscribe(async res => {                  
      this.relationship_list = res.data;
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  getPositions(){
    const obj = { 
      type: "position"
    }
    this.service.getLanguages(obj).subscribe(async res => {                  
      this.position_list = res.data;
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  getSkillsData(){
    this.service.getSkillsData().subscribe(res => {
      this.skill_list = res.topSkills;
      this.industry_list = res.industryKnowledgeSkills;
      this.tools_list = res.technologySkills;
      this.interpersonal_skill_list = res.interpersonalSkills;
    },(error) => {
      this.service.handleError(error);
      
    })
  }

  postSkillsData(type){
    var payload = null;
    if(type == "top"){

      const newSkills = this.skills_add.map((item => {
        return item.value
      }));

      payload ={
        new_top_skills : newSkills,        
        top_skills : this.selected_skills,       
      }
      
      this.skills_add = []
    }

    if(type == "tool"){

      const new_technology = this.tools_add.map((item => {
        return item.value
      }));

      payload = {       
        new_technology_skills : new_technology,
        technology_skills : this.selected_tools,
      }

    }

    this.service.postMyProfileSkills(payload).subscribe(async res => {
      this.getProfile();
      this.getSkillsData();
      this.getSkills();
      
      this.service.showSuccessMessage({
        message : "Skills updated"
      })
    },(err) => {
      this.service.handleError(err)
    })
  }

  chooseSkills(_id){
    this.selected_skills.push(_id)
  }

  removeSkills(_id){
    this.selected_skills.splice(this.selected_skills.findIndex(ele=>ele === _id));
  }

  chooseIndustry(_id){
    this.selected_industry.push(_id)
  }

  removeIndustry(_id){
    this.selected_industry.splice(this.selected_industry.findIndex(ele=>ele === _id));
  }
  chooseTool(_id){
    this.selected_tools.push(_id)
  }

  removeTools(_id){
    this.selected_tools.splice(this.selected_tools.findIndex(ele=>ele === _id));
  }

  chooseInterSkills(_id){
    this.selected_interpersonal_skill.push(_id)
  }

  removeInterSkills(_id){
    this.selected_interpersonal_skill.splice(this.selected_interpersonal_skill.findIndex(ele=>ele === _id));
  }



  getProfile(){

    this.service.getUserProfile().subscribe(res => {

      this.profile = res.profile;
      console.log(res);      

      if (res.profile && res.profile.talent_skills && res.profile.talent_skills.top_skills && res.profile.talent_skills.top_skills.length) {
       
        this.selected_skills = res.profile.talent_skills.top_skills.map((item => {
          return item._id
        }))
      }

      if (res.profile && res.profile.talent_skills && res.profile.talent_skills.industry_knowledge_skills && res.profile.talent_skills.industry_knowledge_skills.length) {
       
        this.selected_industry = res.profile.talent_skills.industry_knowledge_skills.map((item => {
          return item._id
        }))
      }

      if (res.profile && res.profile.talent_skills && res.profile.talent_skills.technologies_skills && res.profile.talent_skills.technologies_skills.length) {
       
        this.selected_tools = res.profile.talent_skills.technologies_skills.map((item => {
          return item._id
        }))
      }

      if (res.profile && res.profile.talent_skills && res.profile.talent_skills.interpersonal_skills && res.profile.talent_skills.interpersonal_skills.length) {
        
        this.selected_interpersonal_skill = res.profile.talent_skills.interpersonal_skills.map((item => {
          return item._id
        }))
      }

      if(this.profile && this.profile.intro){
        this.intro_file_name = this.profile.intro;
      }

      if(this.profile && this.profile.talent_availability){
        this.value = this.profile.talent_availability;
      }

      // this.single_fields.video_introduction = this.profile && this.profile.video_introduction ? this.profile.video_introduction : ''
      this.single_fields.video_introduction = this.profile && this.profile.intro ? this.profile.intro : ''

      this.single_fields.level_of_talent = this.profile && this.profile.talent_experience && this.profile.talent_experience.level_of_talent ? this.profile && this.profile.talent_experience && this.profile.talent_experience.level_of_talent : "";

      if(this.profile && !this.profile.talent_accomplishment){
        this.profile.talent_accomplishment = {};
      }

      if(this.profile && !this.profile.talent_experience){
        this.profile.talent_experience = {};
      }

      this.single_fields.availability = this.profile.talent_preference ? this.profile.talent_preference.spend_week_hours : 0;

      if(res.profile && res.profile.talent_experience && res.profile.talent_experience.regional_experience && res.profile.talent_experience.regional_experience.length){
        this.regional_list = this.regional_list.map((item => {
          if(res.profile.talent_experience.regional_experience.includes(item.name)){
            return item = {
              name : item.name,
              flag : true
            }
          }else{
            return item = {
              name : item.name,
              flag : false
            }
          }        
        }))
      }

    },(error) => {
      this.service.handleError(error)
    })

  }

  getSkills(){

    this.service.getSkillsData().subscribe(data => {

      this.top_skills = data.topSkills
      this.tools_skills = data.technologySkills

    },(error) => {
      this.service.handleError(error)
    })

  }
  

  hideShow(type1,type2){    

    console.log("Type 1 -> ",type1);
    console.log("Type 2 -> ",type2);
    
    

    if(type1 == "work_history"){
      this.work_history = {
        title : "",
        company_name : "",
        start_month : "", 
        start_year : "", 
        end_month : "",
        end_year : "",
        index : "",
        currently_working : "",
        employment_type : "",
        media : [],
        description : "",
      }  
    }

    if(type1 == "organization"){
      this.organization = {
        organization : "",
        company_name : "",
        start_month : "", 
        start_year : "", 
        end_month : "",
        end_year : "",
        index : "",
        additional_note : "",
        position_helds : "",
        occupation : "",
        membership_ongoing : "",
      }
    }

    if(type1 == "course"){
      this.course = {
        course_name : "",
        start_date : "",
        end_date : "",
        associated_with : "",    
        index : "",
      }
    }

    if(type1 == "project"){
      this.project = {
        project_name : "",
        associated_with : "",
        project_url : "",
        description : "",
        start_month : "", 
        start_year : "", 
        end_month : "",
        end_year : "",
        index : "",
        is_currently_working : "",
        team_members : [],
        media : [],
      }
    }

    if(type1 == "award"){
      this.award = {
        title : "",
        issuer : "",
        associated_with : "",   
        description : "",
        start_month : "", 
        start_year : "", 
        index : "",
        media : [],
      }
    }

    if(type1 == "recommend"){
      this.recommendation = {
        person_name : "",
        recommendation : "",
        index : "",
        talent_company_name : "",
        talent_position : "",
        relationship : "",
        position_time : "",
      }
    }

    if(type1 == "publication"){
      this.publication = {
        title : "",
        publisher : "",
        publish_date : "",
        authors : [],
        publication_url : "",
        index : "",
      }
    }   

    this.hidden_blocks[type1] = type2

    console.log(this.hidden_blocks);
  }

  // Edit Work start

  editWork(index){
    const data = this.profile.talent_experience.work_record[index];
    if(data){
      this.work_history.company_name = data.company_name;
      this.work_history.title = data.title;
      this.work_history.start_month = data.start_month;
      this.work_history.start_year = data.start_year;
      this.work_history.end_month = data.end_month;
      this.work_history.end_year = data.end_year;
      this.work_history.index = index;
      this.work_history.currently_working = data.currently_working;
      this.work_history.employment_type = data.employment_type;
      if(data.media){
        this.work_history.media = data.media;
      }else{
        this.work_history.media = [];
      }
      this.work_history.description = data.description;
    }
    console.log(data); 
  } 
  cancel(){

  }
  updateWork(){
   
    const index = parseInt(this.work_history.index);
    delete this.work_history.index;
    if(this.work_history.start_year > this.work_history.end_year){
      this.service.showErrorMessage({
          message : "End year must be greater than start year"
      });
      return false
    }
    var flag = ""
    if(index < 0 || isNaN(index)){
      if(!this.profile.talent_experience){
        this.profile.talent_experience = {};
        this.profile.talent_experience.work_record = []
      } 
      this.profile.talent_experience.work_record.push(this.work_history)
      flag = "added"
    }else{
      this.profile.talent_experience.work_record[index] = this.work_history;
      flag = "updated"
    }    

    this.updateWorkData(flag);

  }

  updateWorkData(flag){
    console.log("work record req ============== ",this.profile.talent_experience.work_record)
    this.service.editMyProfileExper({
      type : "work_record",
      record : this.profile.talent_experience.work_record
    }).subscribe(resp => {   

      this.hidden_blocks.work_history = "";
      this.service.showSuccessMessage({
        message : `Work experience ${flag} successfully`,
      })

      this.getProfile();

    },(err) => {
      this.service.handleError(err);
    })
  }

  deleteWork(index){

    this.profile.talent_experience.work_record.splice(index,1);
    this.updateWorkData("deleted");

  }

  // Edit Work Done

  // Edit Organization start

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

  editOrganization(index){
    const data = this.profile.talent_accomplishment.organizations[index];
    if(data){
      this.organization.organization = data.organization;
      this.organization.additional_note = data.additional_note;
      this.organization.start_month = data.start_month;
      this.organization.start_year = data.start_year;
      this.organization.end_month = data.end_month;
      this.organization.end_year = data.end_year;
      this.organization.index = index;
      this.organization.position_helds = data.position_helds;
      this.organization.occupation = data.occupation;
      this.organization.membership_ongoing = data.membership_ongoing;
    }
    console.log(data); 
  }

  updateOrganizationData(){

    this.service.editMyProfileAccomplishments({
      type : "organizations",
      record : this.profile.talent_accomplishment.organizations
    }).subscribe(resp => {    

      this.hidden_blocks.organization = "";
      this.service.showSuccessMessage({
        message : "Organization updated successfully",
      })

      this.getProfile();

    },(err) => {
      this.service.handleError(err);
    })

  }

  

  updateOrganization(){
    const index = parseInt(this.organization.index);
    delete this.organization.index;
    
    if(this.organization.start_year > this.organization.end_year){
      this.service.showErrorMessage({
          message : "End year must be greater than start year"
      });
      return false
    }
    if(index < 0 || isNaN(index)){ 
      if(!this.profile.talent_accomplishment.organizations){
        this.profile.talent_accomplishment.organizations = []
      }
      this.profile.talent_accomplishment.organizations.push(this.organization)
    }else{
      console.log(this.profile.talent_accomplishment);
      this.profile.talent_accomplishment.organizations[index] = this.organization;

    }    
    // console.log("update organization data ============= ",this.profile.talent_accomplishment.organizations)
    this.updateOrganizationData();
  }

  deleteOrganization(index){
    this.profile.talent_accomplishment.organizations.splice(index,1)
    this.updateOrganizationData();
  }
  

  // Edit Organization end

  // Edit Course Start
  
  editCourse(index){
    
    const data = this.profile.talent_accomplishment.courses[index];
    console.log(index);
    console.log(data);
    
    if(data){
      this.course.course_name = data.course_name
      this.course.start_date = data.start_date;
      this.course.end_date = data.end_date;
      this.course.associated_with = data.associated_with;
      this.course.index = index;
    }
    console.log(data); 
  
  }

  updateCourseData(){
    

    this.service.editMyProfileAccomplishments({
      type : "courses",
      record : this.profile.talent_accomplishment.courses
    }).subscribe(resp => {    

      this.hidden_blocks.course = "";
      this.service.showSuccessMessage({
        message : "Course updated successfully",
      })

      this.getProfile();

    },(err) => {
      this.service.handleError(err);
    })


  }

  updateCourse(){
    const index = parseInt(this.course.index);
    delete this.course.index; // because we dont want to save index in db. remove before send
    
    if(this.course.start_date > this.course.end_date){
      this.service.showErrorMessage({
          message : "End year must be greater than start year"
      });
      return false
    }

    this.course.start_date = this.transformDate(this.course.start_date);
    this.course.end_date = this.transformDate(this.course.end_date);

    if(index < 0 || isNaN(index)){ 
      if(!this.profile.talent_accomplishment.courses){
        this.profile.talent_accomplishment.courses = []
      }
      this.profile.talent_accomplishment.courses.push(this.course)
    }else{
      console.log(this.profile.talent_accomplishment);
      this.profile.talent_accomplishment.courses[index] = this.course;
    }    

    this.updateCourseData();
  }

  deleteCourse(index){

    this.profile.talent_accomplishment.courses.splice(index,1);
    this.updateCourseData();

  }  

  // Edit course end

  fetchImageFromMedia(array){

    if(array && Array.isArray(array)){
      const index = array.findIndex(item => item.type.includes("image/"))

      if(index >= 0){
        return array[index].url;
      }else{
        return ""
      }
    }else{
      return ""
    }
    

  }

  deleteDocument2(index){

    this.work_history.media.splice(index,1)

  }

  deleteDocumentAward(index){

    this.award.media.splice(index,1)

  }

  uploadFileHistory(evt: any) {
    if (!evt.addedFiles.length) {
        return;
    }
    this.isLoading = true;
    const file = evt.addedFiles[0];
    var img_arr = file.name.split('.');
    const ext = img_arr.pop();

    if (file.size/1024/1024 > 25) {
      this.isLoading = false;
      this.service.showErrorMessage({ message : "The file should not exceed more than 25MB.", action : "Okay"});
      return;
    }
    
    // if (ext == 'jpeg' || ext == 'jpg' || ext == 'png') {
    if(true){
        const fr = new FileReader();
        fr.readAsDataURL(file);
        const formData = new FormData();
        formData.append('media',file);
        this.service.uploadPostJobMedia(formData).subscribe(async res => {
          console.log("history formdata ========= ",formData)
          const obj = {
            name: file.name,
            file_name: res.file_name,
            type: file.type,
          }
          this.work_history.media.push(obj)
         this.isLoading = false;
        },(err) => {
          this.service.handleError(err)
          console.log(err)
          this.isLoading = false;
        })
    }
  }

  uploadFileAward(evt: any) {
    if (!evt.addedFiles.length) {
        return;
    }
    this.isLoading = true;
    const file = evt.addedFiles[0];
    var img_arr = file.name.split('.');
    const ext = img_arr.pop();

    if (file.size/1024/1024 > 25) {
      this.isLoading = false;
      this.service.showErrorMessage({ message : "The file should not exceed more than 25MB.", action : "Okay"});
      return;
    }
    
    // if (ext == 'jpeg' || ext == 'jpg' || ext == 'png') {
    if(true){
        const fr = new FileReader();
        fr.readAsDataURL(file);
        const formData = new FormData();
        formData.append('document',file);
        this.service.uploadPostJobMedia(formData).subscribe(async res => {
          const obj = {
            name: file.name,
            file_name: res.file_name,
            type: file.type,
          }
          this.award.media.push(obj)
         // this.isLoading = false;
        },(err) => {
          this.service.handleError(err)
          console.log(err)
          this.isLoading = false;
        })
    }
  }

  // Edit Project Start

  editProject(index){
    
    const data = this.profile.talent_accomplishment.projects[index];
  
    
    if(data){
      // alert("Data found")
      console.log(data);
      
      this.project.project_name = data.project_name;
      this.project.start_month = data.start_month;
      this.project.start_year = data.start_year;
      this.project.end_month = data.end_month;
      this.project.end_year = data.end_year;
      this.project.index = index;
      this.project.associated_with = data.associated_with;
      this.project.project_url = data.project_url;
      this.project.description = data.description;
      this.project.is_currently_working = data.is_currently_working;
      this.project.team_members = data.team_members;
      this.project.media = data.media ? data.media : [] ;
    } 
  
  }

  updateProjectData(){
    
    // console.log("accomplishment projects ============== ",this.profile.talent_accomplishment.projects)

    this.service.editMyProfileAccomplishments({
      type : "projects",
      record : this.profile.talent_accomplishment.projects
    }).subscribe(resp => {    

      this.hidden_blocks.project = "";
      this.service.showSuccessMessage({
        message : "Project updated successfully",
      })

      this.getProfile();

    },(err) => {
      this.service.handleError(err);
    })


  }

  updateProject(){
    const index = parseInt(this.project.index);
    delete this.project.index; // because we dont want to save index in db. remove before send
    console.log("this project ============ ",this.project)
    if(this.project.start_year > this.project.end_year){
      this.service.showErrorMessage({
          message : "End year must be greater than start year"
      });
      return false
    }

    if(index < 0 || isNaN(index)){ 
      if(!this.profile.talent_accomplishment.projects){
        this.profile.talent_accomplishment.projects = []
      }     

      this.profile.talent_accomplishment.projects.push(this.project)
    }else{
      console.log(this.profile.talent_accomplishment);
      this.profile.talent_accomplishment.projects[index] = this.project;

    }    

    this.updateProjectData();
  }

  deleteProject(index){

    this.profile.talent_accomplishment.projects.splice(index,1);
    this.updateProjectData();
  }  

  addMember(pubIndex){
    const obj= {name:''};
    this.project.team_members.push(obj);
    console.log("pushed member ============= ",this.project)
  }

  deleteMember(authIndex,pubIndex){
    this.project.team_members.splice(authIndex,1)
  }

  uploadFile(evt: any,accomplishment) {
    if (!evt.addedFiles.length) {
      return;
    }
    this.isLoading = true;
    const file = evt.addedFiles[0];
    var img_arr = file.name.split('.');
    const ext = img_arr.pop();

    if (file.size/1024/1024 > 25) {
      this.isLoading = false;
      this.service.showErrorMessage({ message : "The file should not exceed more than 25MB.", action : "Okay"});
      return;
    }
    
    //if (ext == 'jpeg' || ext == 'jpg' || ext == 'png') {
    if(true)
    {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        const formData = new FormData();
        formData.append('media',file);
        this.service.uploadMedia(formData).subscribe(async res => {
          console.log("upload media res ============= ",res)
          const obj = {
            name: file.name,
            url: res.file_name,
            type: file.type,
          }
          console.log("upload media obj ============= ",obj)
          accomplishment.media.push(obj);
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
    this.service.deleteFile(document.url).subscribe(async res => {
      education.splice(education.indexOf(document), 1);
      this.isLoading = false;
    },(err) => {
      this.service.handleError(err)
      this.isLoading = false;
    })
  }

  // edit Project end


  // edit Awards start

   editAward(index){
    
    const data = this.profile.talent_accomplishment.awards[index];  
    
    if(data){
      // alert("Data found")
      console.log(data);
      
      this.award.title = data.title;
      this.award.start_month = data.start_month;
      this.award.start_year = data.start_year;
      this.award.index = index;
      this.award.associated_with = data.associated_with;
      this.award.description = data.description;
      this.award.issuer = data.issuer;

      if(data.media){
        this.award.media = data.media;
      }else{
        this.award.media = [];

      }

    } 
  
  }

  updateAwardData(){
    

    this.service.editMyProfileAccomplishments({
      type : "awards",
      record : this.profile.talent_accomplishment.awards
    }).subscribe(resp => {    

      this.hidden_blocks.award = "";
      this.service.showSuccessMessage({
        message : "Award updated successfully",
      })

      this.getProfile();

    },(err) => {
      this.service.handleError(err);
    })


  }

  updateAward(){
    const index = parseInt(this.award.index);
    delete this.award.index; // because we dont want to save index in db. remove before send
    
   
    if(index < 0 || isNaN(index)){ 
      if(!this.profile.talent_accomplishment.awards){
        this.profile.talent_accomplishment.awards = []
      }
      

      this.profile.talent_accomplishment.awards.push(this.award)
    }else{
      console.log(this.profile.talent_accomplishment);
      this.profile.talent_accomplishment.awards[index] = this.award;

    }    

    this.updateAwardData();
  }

  deleteAward(index){

    this.profile.talent_accomplishment.awards.splice(index,1);
    this.updateAwardData();

  }  

  // edit Award end


  // edit Recommend start

   editRecommend(index){
    
    const data = this.profile.talent_experience.recieved_recommendations[index];
  
    
    if(data){
      // alert("Data found")
      console.log(data);
      
      this.recommendation.person_name = data.person_name;
      this.recommendation.recommendation = data.recommendation;
      this.recommendation.talent_company_name = data.talent_company_name;
      this.recommendation.talent_position = data.talent_position;
      this.recommendation.relationship = data.relationship;
      this.recommendation.position_time = data.position_time;
      this.recommendation.index = index;
    } 
  
  }

  updateRecommendData(){
    

    this.service.editMyProfileExper({
      type : "recieved_recommendations",
      record : this.profile.talent_experience.recieved_recommendations
    }).subscribe(resp => {    

      this.hidden_blocks.recommend = "";
      this.service.showSuccessMessage({
        message : "Recommend updated successfully",
      })

      this.getProfile();

    },(err) => {
      this.service.handleError(err);
    })


  }

  updateRecommend(){
    const index = parseInt(this.recommendation.index);
    delete this.award.index; // because we dont want to save index in db. remove before send
    
    if(index < 0 || isNaN(index)){ 
      if(!this.profile.talent_experience.recieved_recommendations){
        this.profile.talent_experience.recieved_recommendations = []
      }     

      this.profile.talent_experience.recieved_recommendations.push(this.recommendation)
    }else{
      console.log(this.profile.talent_experience.recieved_recommendations);
      this.profile.talent_experience.recieved_recommendations[index] = this.recommendation;

    }    

    this.updateRecommendData();
  }

  deleteRecommend(index){

    this.profile.talent_experience.recieved_recommendations.splice(index,1);
    this.updateRecommendData();

  }  

  // edit Recommend  end


  // Edit Publication 

   editPublication(index){
    
    const data = this.profile.talent_accomplishment.publications[index];
    //alert(index);
    
    if(data){
      // alert("Data found")
      console.log(data);
      
      this.publication.title = data.title;
      this.publication.publisher = data.publisher;
      this.publication.publish_date = data.publish_date;
      this.publication.index = index;
      this.publication.publication_url = data.publication_url;
      this.publication.authors = data.authors
      // .map(item => {
      //   return {
      //     name : item
      //   }
      // });
    } 
  
  }

  updatePublicationData(){

    this.service.editMyProfileAccomplishments({
      type : "publications",
      record : this.profile.talent_accomplishment.publications
    }).subscribe(resp => {    

      this.hidden_blocks.publication = "";
      this.service.showSuccessMessage({
        message : "Publication updated successfully",
      })

      this.getProfile();

    },(err) => {
      this.service.handleError(err);
    })


  }

  updatePublication(){
    const index = parseInt(this.publication.index);
    delete this.publication.index; // because we dont want to save index in db. remove before send
    
    console.log(this.publication.authors);
    

    // this.publication.authors = this.publication.authors.filter(function (el) {
    //                               if(el.value!=null && el.value!=""){
    //                                 return el;
    //                               }
    //                             });
    
    this.publication.authors = this.publication.authors.map((item) => {
      return {
        name : item.name
      }
    })

    this.publication.publish_date = this.transformDate(this.publication.publish_date);
   
    if(index < 0 || isNaN(index)){ 
      if(!this.profile.talent_accomplishment.publications){
        this.profile.talent_accomplishment.publications = []
      }

      this.profile.talent_accomplishment.publications.push(this.publication)
    }else{
      console.log(this.profile.talent_accomplishment);
      this.profile.talent_accomplishment.publications[index] = this.publication;
    }    
    this.updatePublicationData();
  }

  deletePublication(index){

    this.profile.talent_accomplishment.publications.splice(index,1);
    this.updatePublicationData();

  }  

  addAuthor(pubIndex){
    const obj= {value:''};
    this.publication.authors.push(obj);
    console.log("pushed author ============= ",this.publication)
  }

  deleteAuthor(authIndex,pubIndex){
    this.publication.authors.splice(authIndex,1)
  }

  // end Publication 


  // Edit Portifolio
  saveProfileDetails(){

    const form = {
      portfolio : this.profile.porti
    }

    this.service.saveProfileDetails(form).subscribe(res => {

    },(error) => {
      this.service.handleError(error)
    })

  }

  saveTalentVisibility(){
    const form = {
      who_can_see_profile : this.single_fields.visibility
    }

    this.service.addTalentPreferencesNew(form).subscribe(res => {

      this.service.showSuccessMessage({
        message : "Visibility Updated"
      })

      this.getProfile();

    },(error) => {
      this.service.handleError(error)
    })
  }

  saveTalentLevel(){
    const form = {
      level_of_talent : this.single_fields.level_of_talent
    }

    this.service.editTalentLevel(form).subscribe(res => {

      this.service.showSuccessMessage({
        message : "Level of Talent Updated"
      })

      this.getProfile();

    },(error) => {
      this.service.handleError(error)
    })
  }

  editSingleFields(type){

    if(type == "visibility"){
      this.single_fields.visibility = this.profile && this.profile.talent_preference && this.profile.talent_preference.who_can_see_profile ? this.profile.talent_preference.who_can_see_profile : '' ;
    }else if(type == "work_rate"){
   
      // this.single_fields.work_rate = this.profile.talent_preference.hourly_from ? this.profile.talent_preference.hourly_from : this.profile.talent_preference.hourly_from ;
      this.single_fields.hourly_from = this.profile.talent_preference.hourly_from ? this.profile.talent_preference.hourly_from : this.profile.talent_preference.hourly_from ;
      this.single_fields.salary_from = this.profile.talent_preference.salary_from ? this.profile.talent_preference.salary_from : this.profile.talent_preference.salary_from ;
    
    
    }else if(type == "availability"){
   
      this.single_fields.availability = this.profile.talent_preference ? this.profile.talent_preference.spend_week_hours : 0;
    
    }else if(type == "level_of_talent"){
   
      this.single_fields.level_of_talent = this.profile && this.profile.talent_experience && this.profile.talent_experience.level_of_talent ? this.profile && this.profile.talent_experience && this.profile.talent_experience.level_of_talent : "";
    
    }

  }

  saveWorkRate(){
    const form = {
      // work_rate : this.single_fields.hourly_from
      hourly_from : this.single_fields.hourly_from,
      salary_from : this.single_fields.salary_from
    }

    this.service.addTalentPreferencesNew(form).subscribe(res => {

      this.service.showSuccessMessage({
        message : "Work rate Updated"
      })

      this.getProfile();

    },(error) => {
      this.service.handleError(error)
    })
  }

  availabilityTalent(){
    const form = {
      spend_week_hours : this.single_fields.availability
    }

    this.service.addTalentPreferencesNew(form).subscribe(res => {

      this.service.showSuccessMessage({
        message : "Availability Updated"
      })
      
      // this.getProfile();

    },(error) => {
      this.service.handleError(error)
    })
  }


  onSelectUserId(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log('file ',file.size);
      if (file.size/1024/1024 > 25) {
        // this.isLoading = false;
        this.service.showErrorMessage({ message : "The file should not exceed more than 25MB.", action : "Okay"});
        event.srcElement.value = null;
        return;
      }

      if(file.type.split('/')[0] != "video"){ // make sure video file selected
        this.service.showErrorMessage({ message : "File must be in Video Format", action : "Okay"});
        event.srcElement.value = null;
        return;
      }
      this.single_fields.video_introduction = file.name
      // this.profileDetailModel.intro_video = file
      this.intro_file = file
    }
  }

  saveVideoIntro(){

    var form = new FormData();

    form.append('intro',this.intro_file);
    // const form = {
    //   video_introduction : this.single_fields.video_introduction
    // }

    this.service.saveProfileDetails(form).subscribe(res => {

      this.service.showSuccessMessage({
        message : "Video has been updated"
      })

      this.getProfile();

    },(error) => {
      this.service.handleError(error)
    })

  }
  

  updateRegional(){

    const slecRegion = this.regional_list.filter(ele=> ele['flag'] === true);
    
    const sl = slecRegion.map(i => i.name)
    //console.log(slecRegion)
    // return
    this.service.editMyProfileExper({
      type : "regional_experience",
      record : sl
    }).subscribe(resp => {   

      this.hidden_blocks.regional = "";
      this.service.showSuccessMessage({
        message : "Regional updated successfully",
      })

      this.getProfile();

    },(err) => {
      this.service.handleError(err);
    })

  }

  played(){

  }




}
