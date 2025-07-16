import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Router, CanActivate } from '@angular/router';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { Service } from "./../../service/service.service";
import { DomSanitizer } from '@angular/platform-browser';
import { AccomplishmentsModel, EducationModel, QualificationsModel, LicensesModel, LanguagesModel, LanguageModel } from './profile-settings';
import { _languagesData } from '../../languages/languages';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ExperienceModel } from './../../Talent Profile Admission/experience/experience';
declare var $ : any
import { yearMonthName } from "./../../common/month_names/names";
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  isLoading: boolean = true;
  
  value: number = 30;
  yearMonthName = yearMonthName

  experienceModel = new ExperienceModel();

  intro_file

  intro_file_name
  currentSelectedTab = 0


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
  // skill_list: any;
  // industry_list: any;
  // tools_list: any;
  // interpersonal_skill_list: any;

  // skills_add = [];
  // industry_knowledge_add = [];
  // tools_add = [];
  // interpersonal_skill_add = [];

  // selected_skills = [];
  // selected_industry = [];
  // selected_tools = [];
  // selected_interpersonal_skill = [];

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

  // constructor(public service : Service,private datePipe: DatePipe,private fb : FormBuilder) { }

  transformDate(date) {
    var dateToDBthis = this.datePipe.transform(date, 'yyyy-MM-dd'); 
    return dateToDBthis
  }



















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
  
  accomplishmentsModel = new AccomplishmentsModel();
  qualificationsModel = new QualificationsModel();
  educationModel = new EducationModel();
  licensesModel = new LicensesModel();
  languagesModel = new LanguagesModel();
  languageModel = new LanguageModel();
  // env = environment

  // isLoading: boolean;
  list : [] = []
  items = [1,54,65,5,52,5,2,635,2]
  selected_discipline : String
  specialities:any = []
  specialities_add:any = []
  selected_specialities = []
  speciality_name
  speciallity
  speciallity_id
  digital_services_List = []
  traditional_services_List = []
  selected_digital_services = []
  selected_traditional_services = []
  serviceId: string = '';
  category: string = '';
  serviceName: string;
  service_list = [];
  showModal = false;
  category_list = [{value: 'traditional', name: 'Traditional'},{value: 'digital',name: 'Digital'}];
  sector_list = [];
  selectedSectors = [];
  education_list = [];
  licenses_list = [];
  university_list = [];
  degree_list = [];
  field_of_study_list = [];
  license_list = [];
  expectedGraduation = false;
  languages = [];
  proficiencies = [];
  speciality:any
  speciality_id:any
  today:any = new Date(); 
  today1:any = new Date(); 
  minDate1:any = new Date(); 
  currentYear = new Date().getFullYear()-100;
  minDate = new Date(this.currentYear, 0, 1);
  // profile:any

  skills_add = [];
  industry_knowledge_add = [];
  tools_add = [];
  interpersonal_skill_add = [];

  skill_list = [];
  industry_list = [];
  tools_list = [];
  interpersonal_skill_list = [];

  selected_skills = [];
  selected_industry = [];
  selected_tools = [];
  selected_interpersonal_skill = [];

  skills_valid = true;
  disciplineValidation:boolean = false;
  specialityValidation:boolean = false;
  serviceValidation:boolean = false;
  sectorValidation:boolean = false;
  toolValidation:boolean = false;
  interpersonalValidation:boolean = false;
  traditional_data: any;
  digital_data: any;
  sector_name: any;

  constructor(
    public service : Service,
    public router: Router,
    // private _snackbar : MatSnackBar,
    private sanitizer:DomSanitizer,
    private datePipe: DatePipe,
    private fb : FormBuilder
    ) { }

  ngAfterViewInit(){
    $(".div-hide").hide();
  }  

  ngOnInit(): void {

    
    
  	$(document).on('click','.add-new',function(){
      $(this).parents(".main-wrap").hide();
      $(this).parents('.top-head').children(".div-hide").show();
    });

    $(document).on('click','.on-save',function(){
      $(this).parents(".div-hide").hide();
      $(this).parents('.top-head').children(".main-wrap").show();
    });

    



    this.getDisciplineList();
    this.getUserProfile();
    this.getLanguages();
    this.getProficiencies();
    this.getSkillsData();

    this.getProfile();
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
    
    // $(".div-hide").hide();
  	// $(document).on('click','.add-new',function(){
    //   $(this).parents(".main-wrap").hide();
    //   $(this).parents('.top-head').children(".div-hide").show();
    // });

    // $(document).on('click','.on-save',function(){
    //   $(this).parents(".div-hide").hide();
    //   $(this).parents('.top-head').children(".main-wrap").show();
    // });
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
      this.proficiencies = res.data;
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  getUserProfile(){
    this.service.getUserProfile().subscribe(async res => {
      this.isLoading = false 
      this.profile = res.profile;
      console.log("prof resp ================== ",res)
      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.discipline_id) {
        this.selectedSectors = res.profile.talent_category_data.discipline_sectors;
      }
      
      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.discipline_id) {
        this.selected_discipline = res.profile.talent_category_data.discipline_id;
        this.getDisciplineSpeciality();
        this.getDisciplineSectors();
      }

      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.speciality.length && res.profile.talent_category_data.speciality.length==1) {        
        this.speciality = res.profile.talent_category_data.speciality[0].name;
        this.speciality_id = res.profile.talent_category_data.speciality[0]._id;
      }

      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.speciality) {
        this.service_list = res.profile.talent_category_data.speciality;
      }

      if (res.profile && res.profile.talent_qualification && res.profile.talent_qualification.education && res.profile.talent_qualification.education.length) {
        this.education_list = res.profile.talent_qualification.education.map((item => {
          // return item._id
            return item = {
              school_name: item.school_name,
              degree: item.degree,
              field_of_study: item.field_of_study,
              start_date: item.start_date,
              end_date: item.end_date,
              grade: item.grade,
              documents: item.documents,
              activities: item.activities,
              expectedGraduation : item.expectedGraduation
          }
        })) 
      }

      if (res.profile && res.profile.talent_qualification && res.profile.talent_qualification.licenses && res.profile.talent_qualification.licenses.length) {
        this.licenses_list = res.profile.talent_qualification.licenses.map((item => {
          // return item._id
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
              documents: item.documents,
          }
        })) 
      }

      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.speciality.length) {
        
        this.speciallity = res.profile.talent_category_data.speciality[0].name;
        this.speciallity_id = res.profile.talent_category_data.speciality[0]._id;
        this.selected_specialities = [];
        // this.selected_specialities.push(res.profile.talent_category_data.speciality[0]._id)
        this.selected_specialities = res.profile.talent_category_data.speciality.map((item => {
          return item._id
        }))
        this.getDisciplineServices(this.selected_specialities);
      }

      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.digital_service.length) {
        // this.selected_digital_services = res.profile.talent_category_data.digital_service;
        this.selected_digital_services = res.profile.talent_category_data.digital_service.map((item => {
          return item._id
        }))
      }

      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.traditional_service.length) {
        // this.selected_traditional_services = res.profile.talent_category_data.traditional_service;
        this.selected_traditional_services = res.profile.talent_category_data.traditional_service.map((item => {
          return item._id
        }))
      }

      if (res.profile && res.profile.talent_accomplishment && res.profile.talent_accomplishment.languages && res.profile.talent_accomplishment.languages.other_language && res.profile.talent_accomplishment.languages.other_language.length) {
        this.languagesModel.other_language = res.profile.talent_accomplishment.languages.other_language;
      } 

      if (res.profile && res.profile.talent_accomplishment && res.profile.talent_accomplishment.languages && res.profile.talent_accomplishment.languages.english_proficiency) {
        this.languagesModel.english_proficiency = res.profile.talent_accomplishment.languages.english_proficiency;
      } 
      
      if (res.profile && res.profile.talent_skills && res.profile.talent_skills.top_skills && res.profile.talent_skills.top_skills.length) {
        
        this.selected_skills = res.profile.talent_skills.top_skills.map((item => {
          return item
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

      this.selected_digital_services = res.profile.talent_category_data.digital_service.map((item => {
        return item._id
      }))

      this.selected_traditional_services = res.profile.talent_category_data.traditional_service.map((item => {
        return item._id
      }))

    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }

  // Discipline section start
  getDisciplineList(){
    this.service.getDisciplineList().subscribe(async res => {
      this.isLoading = false 
      this.list = res.list;
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  selectDiscipline(discipline){
    this.selected_discipline = discipline._id;
    this.addTalentDiscipline();
    this.getDisciplineSpeciality();
  }

  addTalentDiscipline(){    
    const obj = { 
      discipline_id: this.selected_discipline
    }
    this.service.addTalentDiscipline(obj).subscribe(async res => {
      this.isLoading = false 
      this.getUserProfile();
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }
  // Discipline section end


  // Speciality section start
  getDisciplineSpeciality(){
    const discipline_id = this.selected_discipline;
    this.service.getDisciplineSpeciality(discipline_id).subscribe(async res => {
      this.isLoading = false 
      this.specialities = res.list.map((item => {
        if(this.selected_specialities.includes(item._id)){
          return item = {
            _id : item._id,
            name : item.name,
            status : item.status,
            flag : true
          }
        }else{
          return item = {
            _id : item._id,
            name : item.name,
            status : item.status,
            flag : false
          }
        }
      }))
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }

  onCheckboxChangeSpeciality(event,speciality){
    if(event.target.checked){
      this.selected_specialities.push(speciality._id);
    }else{
      // this.selected_specialities.splice(speciality._id,1);
      let index = this.selected_specialities.findIndex((item) => {
        return item == speciality._id
      });
      this.selected_specialities.splice(index,1)
    } 
    

    
    this.getSpecialityDetails(this.selected_specialities);
    this.addTalentSpecialityNew();
  }

  addTalentSpecialityNew(){

    // const selected_speciality = this.selected_specialities;
    const selected_speciality = this.specialities.filter(ele=> ele.flag? ele.flag === true: '');
    const checkArray = [];
    checkArray.push(...selected_speciality)
    if(!checkArray.length){
    }
    const t = this.specialities_add.map((item => {
      return item.value
    }))
    const obj = {
      new_specialities : t,
      specialities: selected_speciality,
      discipline_id: this.selected_discipline
    }
    this.service.addTalentSpeciality(obj).subscribe(async res => {
      this.ngOnInit()
      this.getDisciplineServices(this.selected_specialities);
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }

  getSpecialityDetails(spe){
    const obj = {
      speciality_ids:spe
    }
    this.service.getSpecialityDetails(obj).subscribe(async res => {
      console.log("selected specialities ================= ",obj)
      console.log("speciality details resp ================= ",res)
      this.service_list = res.data;
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  chooseSpeciality(item){

    this.selected_specialities = [];
    this.selected_specialities.push(item._id)
    this.speciallity_id = item._id;
    this.speciallity = item.name;
    this.getDisciplineServices(this.selected_specialities);
  }

  removeSpeciality(_id){

    let index = this.selected_specialities.findIndex((item) => {
      return item == _id
    });

    this.selected_specialities.splice(index,1)

  }

  addSpeciality(){
    const speciality_name = this.speciality_name; 
    if(speciality_name && speciality_name.trim()){
      const obj = {
        name: speciality_name,
        discipline_id: this.selected_discipline
      }
      this.service.addSpeciality(obj).subscribe(async res => {
        // this.selected_specialities = [];
        this.selected_specialities.push(res.data._id)
        // this.speciallity = res.data.name;
        this.getDisciplineSpeciality();
        this.speciality_name = "";
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      return this.service.showErrorMessage({ message : "Please enter Speciality Name", action : "Okay"})
    }
  }

  addTalentSpeciality(){

    // const selected_speciality = this.selected_specialities;
    const selected_speciality = this.specialities.filter(ele=> ele.flag? ele.flag === true: '');
    const checkArray = [];
    checkArray.push(...selected_speciality)
    if(!checkArray.length){
    }
    const t = this.specialities_add.map((item => {
      return item.value
    }))
    const obj = {
      new_specialities : t,
      specialities: selected_speciality,
      discipline_id: this.selected_discipline
    }
    this.service.addTalentSpeciality(obj).subscribe(async res => {
      this.isLoading = false 
      this.addTalentServices();
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }
  // Speciality section start

  // Services section start

  onCheckboxChangeTraditional(event,tradition){
    if(event.target.checked){
      this.selected_traditional_services.push(tradition._id);
    }else{
      // this.selected_traditional_services.splice(tradition._id,1);
      let index = this.selected_traditional_services.findIndex((item) => {
        return item == tradition._id
      });
      this.selected_traditional_services.splice(index,1)
    }
  }

  onCheckboxChangeDigital(event,digital){
    if(event.target.checked){
      this.selected_digital_services.push(digital._id);
    }else{
      // this.selected_digital_services.splice(digital._id,1);
      let index = this.selected_digital_services.findIndex((item) => {
        return item == digital._id
      });
      this.selected_digital_services.splice(index,1)
    }
  }
  
  // getDisciplineServices(spe){
  //   const discipline_id = this.selected_discipline;
  //   const obj = {
  //     speciality:spe
  //   }
  //   this.service.getDisciplineServices(obj).subscribe(async res => {
  //     console.log("selected services ================= ",obj)
  //     console.log("discipline services resp ================= ",res)
  //     this.traditional_services_List = res.traditionalServices.map((item => {
  //       // return item._id
  //       if(this.selected_traditional_services.includes(item._id)){
  //         return item = {
  //           _id : item._id,
  //           name : item.name,
  //           status : item.status,
  //           flag : true
  //         }
  //       }else{
  //         return item = {
  //           _id : item._id,
  //           name : item.name,
  //           status : item.status,
  //           flag : false
  //         }
  //       }        
  //     }))

  //     this.digital_services_List = res.digitalServices.map((item => {
  //       // return item._id
  //       if(this.selected_digital_services.includes(item._id)){
  //         return item = {
  //           _id : item._id,
  //           name : item.name,
  //           status : item.status,
  //           flag : true
  //         }
  //       }else{
  //         return item = {
  //           _id : item._id,
  //           name : item.name,
  //           status : item.status,
  //           flag : false
  //         }
  //       }        
  //     }))
  //   },(err) => {
  //     this.service.handleError(err)
  //     console.log(err)
  //   })
  // }
  getDisciplineServices(selected_specialities){
    // const discipline_id = this.discipline_id;
    // console.log("selected spe =============== ",this.selected_specialities)
    this.service.getDisciplineServices(this.selected_specialities).subscribe(async res => {
      // this.digital_services_List = res.digitalServices;
      // this.traditional_services_List = res.traditionalServices;
      this.digital_data = res.digitalServices;
      this.traditional_data = res.traditionalServices;
      console.log("services resp ================ ",res)
      
      res.digitalServices.map((digital_data,index) => {
        this.digital_data[index]['services'] = digital_data.services.map((item => {
          if(this.selected_digital_services.includes(item._id)){
            return item = {
              _id : item._id,
              name : item.name,
              status : item.status,
              flag : true,
              talent_user_id : item.talent_user_id ? item.talent_user_id : ""
            }
          }else{
            return item = {
              _id : item._id,
              name : item.name,
              status : item.status,
              flag : false,
              talent_user_id : item.talent_user_id ? item.talent_user_id : ""
            }
          }        
        }))        
      })

      res.traditionalServices.map((traditional_data,index) => {
        this.traditional_data[index]['services'] = traditional_data.services.map((item => {
          if(this.selected_traditional_services.includes(item._id)){
            return item = {
              _id : item._id,
              name : item.name,
              status : item.status,
              flag : true,
              talent_user_id : item.talent_user_id ? item.talent_user_id : ""
            }
          }else{
            return item = {
              _id : item._id,
              name : item.name,
              status : item.status,
              flag : false,
              talent_user_id : item.talent_user_id ? item.talent_user_id : ""
            }
          }        
        }))        
      })
      
    },(err) => {

      this.service.handleError(err)
      console.log(err)
    })
  }

  addNewSpeciality(){
    if(this.serviceName && this.serviceName.trim()){
      // alert("lciuck")
      this.isLoading = true;
      const obj = {
        name:this.serviceName,
        // discipline_speciality_id: this.speciality_id,
        discipline_speciality_id: this.serviceId,
        category:this.category
      }     
      this.service.addSpecialityService(obj).subscribe(async res => {
        console.log("add spe resp ============== ",res);
        switch(this.category){
          case 'traditional':
            this.traditional_services_List.push({name: this.serviceName,_id: res.data._id});
            this.selected_traditional_services.push(res.data._id)
            this.getDisciplineServices(this.selected_specialities);
            break;
  
          case 'digital':
            this.digital_services_List.push({name: this.serviceName,_id: res.data._id});
            this.selected_digital_services.push(res.data._id)
            this.getDisciplineServices(this.selected_specialities);
            break;
        }
        this.closeModal();
        this.isLoading = false
      },(err) => {
        this.isLoading = false
        this.service.handleError(err)
        console.log(err)
      }) 
    }
  }

  addTalentServices(){
    const selected_traditional = this.traditional_services_List.filter(ele=> ele.flag? ele.flag === true: '');
    const selected_digital = this.digital_services_List.filter(ele=> ele.flag? ele.flag === true: '');
    const checkArray = [];
    checkArray.push(...selected_traditional, ...selected_digital)

    this.selected_traditional_services.length
    this.selected_digital_services.length

    if(!this.selected_traditional_services.length && this.selected_digital_services.length){
      return this.service.showErrorMessage({ message : "Please choose atleast one service", action : "Okay"})
    }
    const obj = {
      traditional_service: this.selected_traditional_services,
      digital_service: this.selected_digital_services
    }
    this.service.addTalentSpecialityService(obj).subscribe(async res => {
      this.saveSector();
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }

  closeModal(){
    this.showModal = false;
    $('#addService').modal('hide')
    // alert(this.showModal);
    this.serviceId = '';
    this.category = '';
    this.serviceName = '';
  }
  // Services section end


  // Sectors section start
  getDisciplineSectors(){
    this.service.getTalentDisciplineSectors(this.selected_discipline).subscribe(res => {
      this.sector_list = res.sectors;

      this.sector_list = res.sectors.map((item => {
        // return item._id
        if(this.selectedSectors.includes(item._id)){
          return item = {
            _id : item._id,
            name : item.name,
            status : item.status,
            talent_user_id : item.talent_user_id,
            is_approved_by_admin : item.is_approved_by_admin,
            
            flag : true
          }
        }else{
          return item = {
            _id : item._id,
            name : item.name,
            status : item.status,
            talent_user_id : item.talent_user_id,
            is_approved_by_admin : item.is_approved_by_admin,
            flag : false
          }
        }      
      }))
    },(error) => {
      this.service.handleError(error);
    })
  }

  chooseSector(_id){
    this.selectedSectors.push(_id)
  }

  removeSector(_id){
    let index = this.selectedSectors.findIndex((item) => {
      return item == _id
    });
    this.selectedSectors.splice(index,1)
  }

  saveSector(){

    const selected_sectors = this.sector_list.filter(ele=> ele.flag? ele.flag === true: '');
    const checkArray = [];
    checkArray.push(...selected_sectors)
    if(!checkArray.length){
      return this.service.showErrorMessage({ message : "Please choose any one sector", action : "Okay"})
    }

    const obj = {
      discipline_sectors: selected_sectors
    }
    this.service.addTalentSector(obj).subscribe(async res => {
      console.log("add sectors res ============ ",res);
      this.addEducationData();
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  addExperience(){
    this.educationModel = new EducationModel();
    
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
        if(item.documents.length || item.expectedGraduation==true){
          item.documentValidation = false
        }else{
          item.documentValidation = true
        }

        if(item.start_date && item.end_date && item.start_date>=item.end_date){
          item.endDateLessValidation = true
        }else{
          item.endDateLessValidation = false
        }
        if(item.school_name && item.school_name.trim() && item.degree && item.degree.trim() && item.field_of_study && item.field_of_study.trim() && item.start_date && item.end_date && (item.documents.length || item.expectedGraduation) && (item.start_date<item.end_date) && i==this.education_list.length-1){
          
          this.educationModel.documents = [];
          this.education_list.push(this.educationModel);
          this.education_list[i].startMinDate = new Date(this.currentYear, 0, 1);
          this.education_list[i].startMaxDate = new Date(); 
          this.education_list[i].endMinDate = new Date(this.currentYear, 0, 1);
          this.education_list[i].endMaxDate = new Date(); 
        }        
      })
    }else{
      this.educationModel.documents = [];
      this.education_list.push(this.educationModel);
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
        if(item.certificate_name && item.certificate_name.trim() && item.documents.length && item.certificationUrlValidation==false && ((item.is_license_expire==false && item.endYearValidation==false && item.endMonthValidation==false) || (item.is_license_expire==true)) && i==this.licenses_list.length-1){
          this.licensesModel.documents = [];
          this.licenses_list.push(this.licensesModel);
        }
      })
    }else{
      
      this.licensesModel.documents = [];
      this.licenses_list.push(this.licensesModel);
    } 
  }

  onSelect(event,education) {
    console.log(event);
    this.uploadFile(event,education);
  }
  
  removeLicenses(index){
    this.licenses_list.splice(index,1)
  }
  removeExperience(index){
    this.education_list.splice(index,1)
  }
  uploadFileN(evt: any,education) {
    console.log(evt)
   
    if (!evt.addedFiles.length) {
        return;
    }
    const file = evt.addedFiles[0];
    var img_arr = file.name.split('.');

    var ext = img_arr.pop();
    
    if (ext == 'jpeg' || ext == 'jpg' || ext == 'png') {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        const formData = new FormData();
        formData.append('document',file);
        
        this.service.uploadFile(formData).subscribe(async res => {
          
          const obj = {
            name: file.name,
            document: file.name,
            file_name: res.file_name,
            type: file.type,
          }
          
          education.documents.push(obj);
        },(err) => {
          this.service.handleError(err)
          console.log(err)
        })
    } else {
        evt.target.value = ""
        window.alert("Please select valid file")
    }
  }
  // deleteDocument(document,education){
  //   this.service.deleteFile(document.file_name).subscribe(async res => {
  //     education.splice(education.indexOf(document), 1);
  //   },(err) => {
  //     this.service.handleError(err)
  //   })
  // }
  getUniversities(i){
    if(this.education_list[i].school_name){
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
    if(this.education_list[i].degree){
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
    if(this.education_list[i].field_of_study){
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
    
    if(this.licenses_list[i].certificate_name && this.licenses_list[i].certificate_name.trim() && this.speciality_id){
      const obj = {
        speciality_id:this.speciality_id,
        search:this.licenses_list[i].certificate_name
      }
      this.service.getLicenses(obj).subscribe(async res => {
        this.license_list = res.data;
        
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

  changeExpectedGraduation(event,ind){
    
    if(event.target.checked){
      this.today = "";
      this.today1 = new Date(); 
      this.minDate1 = new Date();
      this.education_list[ind].expectedGraduation = true;
    }else{
      this.today = new Date(); 
      this.today1 = new Date(); 
      this.minDate1 = new Date(this.currentYear, 0, 1);
      this.education_list[ind].expectedGraduation = false;
    }
  }

  addLanguage(){
    this.languageModel = new LanguageModel();
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
          this.languagesModel.other_language.push(this.languageModel);
        }      
      })
    }else{      
      this.languagesModel.other_language.push(this.languageModel);
    }    
  }

  deleteLanguage(index){
    this.languagesModel.other_language.splice(this.languagesModel.other_language.indexOf(index), 1);
  }

  addEducationData(){
    console.log(this.qualificationsModel);
    this.qualificationsModel.education = this.education_list;
    this.qualificationsModel.licenses = this.licenses_list;
    this.service.addQualifications(this.qualificationsModel).subscribe(async res => {
      this.postSkillsData();
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  checkEducationData(){
    if(this.education_list.length){
      this.education_list.map((item,i) => {
        if(
          item.school_name && 
          item.degree && 
          item.field_of_study && 
          item.start_date && 
          item.end_date //&& 
          // item.documents.length
          ){
          if (this.education_list.length === i + 1) {
            // last one
            this.checkLicensesData();
          }
        }else{
          this.service.showErrorMessage({ message : "Please fill required fields.", action : "Okay"});
        }
      })
    }else{
      this.service.showErrorMessage({ message : "Please add education.", action : "Okay"});
    }    
  }

  checkLicensesData(){
    if(this.licenses_list.length){
      this.licenses_list.map((item,i) => {
        if(item.certificate_name && item.documents.length){
          if (this.licenses_list.length === i+1) {
            this.checkTool();
          }
        }else{
          this.service.showErrorMessage({ message : "Please fill required fields.", action : "Okay"});
        }
      })
    }else{
      this.checkTool();
    }    
  }  
  // Education section end

  // Skills section start
  getSkillsData(){
    const obj = {
      speciality_id : this.speciality
    }
    this.service.getSkillsData().subscribe(res => {
  
      this.skill_list = res.topSkills;
      this.industry_list = res.industryKnowledgeSkills;
      this.tools_list = res.technologySkills;
      this.interpersonal_skill_list = res.interpersonalSkills;
    },(error) => {
      this.service.handleError(error);
      
    })
  }

  onTabChange2(event: any){
    // this.activeIndex2 = event.index;
    
  }

  getSkillsAccToSpeciality(){
    const obj = {
      speciality_id : this.selected_specialities
    }
    this.service.getSkillsAccToSpeciality(obj).subscribe(res => {
  
      this.skill_list = res.topSkills;
      this.industry_list = res.industryKnowledgeSkills;
      this.tools_list = res.technologySkills;
      this.interpersonal_skill_list = res.interpersonalSkills;
    },(error) => {
      this.service.handleError(error);
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

  postSkillsData(){
    const newSkills = this.skills_add.map((item => {
      return item.value
    }));
    const new_industry = this.industry_knowledge_add.map((item => {
      return item.value
    }));
    const new_technology = this.tools_add.map((item => {
      return item.value
    }));
    const new_interpersonal = this.interpersonal_skill_add.map((item => {
    return item.value
    }));
    const payload ={
      new_top_skills : newSkills,
      new_industry_skills : new_industry,
      new_technology_skills : new_technology,
      new_interpersonal_skills: new_interpersonal,
      top_skills : this.selected_skills,
      industry_skills : this.selected_industry,
      technology_skills : this.selected_tools,
      interpersonal_skills : this.selected_interpersonal_skill
    }  
    
    this.service.postSkills(payload).subscribe(async res => {
      this.addAccomplishmentData();
    },(err) => {
      this.service.handleError(err)
    })
  }

  deleteSkill(skill_id){
    if(skill_id){
      const obj = {
        skill_id: skill_id,
        // type: type,
      }
      // console.log("delete skill obj ================ ",obj)
      this.service.deleteSkill(obj).subscribe(async res => {
        // console.log("delete skill resp ================ ",res)
        this.getSkillsData();
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }


  addIndustry(speciality_id){
    
    const industry_name = this.industry_knowledge_add; 
    // if(industry_name.length==1 && this.speciality_id){
    if(industry_name.length==1){
      const obj = {
        name: industry_name[0].value,
        type: "industry",
        discipline_speciality_id: speciality_id
      }
      
      this.service.addNewSkill(obj).subscribe(async res => {
        
        this.selected_industry.push(res.data._id)
        this.getSkillsData();
        this.industry_knowledge_add = [];
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }

  addTool(speciality_id){
    
    const tool_name = this.tools_add; 
    // if(tool_name.length==1 && this.speciality_id){
    if(tool_name.length==1){
      const obj = {
        name: tool_name[0].value,
        type: "tool_technology",
        discipline_speciality_id: speciality_id
      }
      
      this.service.addNewSkill(obj).subscribe(async res => {
        
        this.selected_tools.push(res.data._id)
        this.getSkillsData();
        this.tools_add = [];
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }

  addInterpersonal(){
    
    const interpersonal_name = this.interpersonal_skill_add; 
    // if(interpersonal_name.length==1 && this.speciality_id){
    if(interpersonal_name.length==1){
      const obj = {
        name: interpersonal_name[0].value,
        type: "interpersonal",
        // discipline_speciality_id: speciality_id
      }
      
      this.service.addNewSkill(obj).subscribe(async res => {
        
        this.selected_interpersonal_skill.push(res.data._id)
        this.getSkillsData();
        this.interpersonal_skill_add = [];
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }
  // Skills section end

  addAccomplishmentData(){
    this.accomplishmentsModel.languages = this.languagesModel;
    this.service.postAccomplishmentLanguage(this.accomplishmentsModel).subscribe(async res => {
      this.service.showSuccessMessage({ message : "Request Sent successfully", action : "Okay"})
      this.router.navigate(['talent-dashboard']);
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  // Save Profile Data start
  checkDiscipline(){
    if(this.selected_discipline){
      this.checkSpeciality();
      this.disciplineValidation = false;
    }else{
      this.disciplineValidation = true;
    }
  }
  
  checkSpeciality(){
    if(this.selected_specialities.length){
      this.checkServices();
      this.specialityValidation = false;
    }else{
      this.specialityValidation = true;
    }
  }
  
  checkServices(){
    const selected_traditional = this.traditional_services_List.filter(ele=> ele.flag? ele.flag === true: '');
    const selected_digital = this.digital_services_List.filter(ele=> ele.flag? ele.flag === true: '');
    const checkArray = [];
    checkArray.push(...selected_traditional, ...selected_digital)

    
    this.selected_traditional_services.length
    this.selected_digital_services.length

    if(!this.selected_traditional_services.length && this.selected_digital_services.length){
      this.serviceValidation = true;
    }else{
      this.serviceValidation = false;
      this.checkSectors();
    }
  }
  
  checkSectors(){

    const selected_sectors = this.sector_list.filter(ele=> ele.flag? ele.flag === true: '');
    const checkArray = [];
    checkArray.push(...selected_sectors)
    if(!checkArray.length){
      this.sectorValidation = true;
    }else{
      this.sectorValidation = false;
      this.checkEducationData();
    }

  }
  
  checkIndustryKnowledge(){
    if(!this.selected_industry.length){
      return this.service.showErrorMessage({ message : "Please choose any one industry knowledge", action : "Okay"})
    }else{
      this.checkTool();
    }
  }
  
  checkTool(){
    if(!this.selected_tools.length){
      this.toolValidation = true;
    }else{
      this.toolValidation = false;
      this.checkInterpersonal();
    }
  }
  
  checkInterpersonal() {
    if(!this.selected_interpersonal_skill.length){
      this.interpersonalValidation = true;
    }else{
      this.interpersonalValidation = false;
      this.checkLanguagesData();
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
            this.addTalentSpeciality();
          }      
        })
      }else{
        this.addTalentSpeciality();
      }
    }else{
      console.log("else check languages ============== ")
      this.languagesModel.englishProficiencyValidation = true
    }   
  }
  
  checkProfileData(){
    this.checkDiscipline();    
  }
  
  saveProfileData(){
    this.addTalentSpeciality();
    this.addTalentServices();
    this.saveSector();   
  }
  // Save Profile Data end
  
  validURL(str) {
    var res = str.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
    return (res !== null)
  }

  addSector(){
    const sector_name = this.sector_name; 
    if(sector_name && sector_name.trim()){
      const obj = {
        name: sector_name,
        // discipline_id: this.discipline_id
      }
      this.service.addNewSector(obj).subscribe(async res => {
        this.selectedSectors.push(res.added._id)

        this.sector_list.push({
          _id : res.added._id,
          name : sector_name,
          status : "active",
          talent_user_id : this.profile._id,
          is_approved_by_admin : false,          
          flag : true
        })
        // this.getDisciplineSectors();
        this.sector_name = "";
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      return this.service.showErrorMessage({ message : "Please enter Sector Name", action : "Okay"})
    }
  }

  deleteSector(_id,i){
    this.service.deleteSector({
      sector_id : _id
    }).subscribe(resp => {

      this.sector_list.splice(i,1);

      const index = this.selectedSectors.findIndex(item => item == _id)

      this.selectedSectors.splice(index,1);
      // this.ngOnInit();
    },(err => {
      this.service.handleError(err);
    }))

  }




  // Talent Profile
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

  // getSkillsData(){
  //   this.service.getSkillsData().subscribe(res => {
  //     this.skill_list = res.topSkills;
  //     this.industry_list = res.industryKnowledgeSkills;
  //     this.tools_list = res.technologySkills;
  //     this.interpersonal_skill_list = res.interpersonalSkills;
  //   },(error) => {
  //     this.service.handleError(error);
      
  //   })
  // }

  // postSkillsData(type){
  //   var payload = null;
  //   if(type == "top"){

  //     const newSkills = this.skills_add.map((item => {
  //       return item.value
  //     }));

  //     payload ={
  //       new_top_skills : newSkills,        
  //       top_skills : this.selected_skills,       
  //     }
      
  //     this.skills_add = []
  //   }

  //   if(type == "tool"){

  //     const new_technology = this.tools_add.map((item => {
  //       return item.value
  //     }));

  //     payload = {       
  //       new_technology_skills : new_technology,
  //       technology_skills : this.selected_tools,
  //     }

  //   }

  //   this.service.postMyProfileSkills(payload).subscribe(async res => {
  //     this.getProfile();
  //     this.getSkillsData();
  //     this.getSkills();
      
  //     this.service.showSuccessMessage({
  //       message : "Skills updated"
  //     })
  //   },(err) => {
  //     this.service.handleError(err)
  //   })
  // }

  // chooseSkills(_id){
  //   this.selected_skills.push(_id)
  // }

  // removeSkills(_id){
  //   this.selected_skills.splice(this.selected_skills.findIndex(ele=>ele === _id));
  // }

  // chooseIndustry(_id){
  //   this.selected_industry.push(_id)
  // }

  // removeIndustry(_id){
  //   this.selected_industry.splice(this.selected_industry.findIndex(ele=>ele === _id));
  // }
  // chooseTool(_id){
  //   this.selected_tools.push(_id)
  // }

  // removeTools(_id){
  //   this.selected_tools.splice(this.selected_tools.findIndex(ele=>ele === _id));
  // }

  // chooseInterSkills(_id){
  //   this.selected_interpersonal_skill.push(_id)
  // }

  // removeInterSkills(_id){
  //   this.selected_interpersonal_skill.splice(this.selected_interpersonal_skill.findIndex(ele=>ele === _id));
  // }



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
         // this.isLoading = false;
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

  tabClick(){
    $(".div-hide").hide();
  }

  changeTab(tab){
    this.currentSelectedTab = tab
  }

  
  
  
}
