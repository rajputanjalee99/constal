import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import {MatTabGroup} from '@angular/material/tabs';
declare let $ : any


@Component({
  selector: 'app-talent-budget-individual-guest',
  templateUrl: './talent-budget-individual-guest.component.html',
  styleUrls: ['./talent-budget-individual-guest.component.scss']
})
export class TalentBudgetIndividualGuestComponent implements OnInit {

 activeIndex: number;

  activeIndex2: number;
  @ViewChildren('childTabs') childTabs: QueryList<MatTabGroup>;
    onTabChange(event: any){
    this.activeIndex = event.index;

    this.childTabs.forEach(childTab => {
       childTab.realignInkBar();
    });
  }
    onTabChange2(event: any){
    console.log(event)
    this.activeIndex2 = event.index;
    
  }
        minDate = new Date();
  error:any={isError:false,errorMessage:''};

  value: number = 0;
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

  form: FormGroup;
  sector:any;
  sectorName:'';
  isLoading = false;
  jobDetail = null;
  totalTalents = [];
  currentIndex = 0;
  talentLocation = "remotely";
  industryKnowlegde=[];
  tool_skills=[];
   english_level=[];
   talent_level:'';
   additional_req:'';
    languages='';
    amount_earned='';
    job_success_score='';
    speciality_id:any;
    city:any;
    state:any;
  selectedSpecialities = [];
    interpersonal_skill_list = [];
  selected_interpersonal_skill = [];
  selectedSectors=[];
    interpersonal_skill_add = [];
    address:'';
    newselection=[];
selected_skills=[];
selected_tool_skills=[];
  talent_location='';
   country_list=[];
    states_list=[];
    cities_list=[];
      countryCode:any;
      country:any
      talent_pay_type:any;
      from_hour:any;
      to_hour:any;
      job_start='';
      maximum_hour_week:any;
      minimum_hour_week:any;
      whole_project='';
      timeline_start_date:any;
      timeline_end_date:any;
      newAddskill=[];
      tools_add=[];
      all_sectors=[];
      job_talent_id=""
      talent_duration:any;
      profile:any;
      sliderval;
      salary_based_type:'';
      fromhoursalary:any;
      tohoursalary:any;
      fromhourlumpsum:any;
      tohourlumpsum:any;
  constructor(public router: Router,private service : Service,private _snackBar: MatSnackBar,private fb: FormBuilder) {
    
    const job_id = localStorage.getItem("job_id");

    if(!job_id){
        this.router.navigate(['getting-started']);
        this.service.showErrorMessage({
          message : "Please complete 1 step first"
        })
    }
  }

  ngOnInit(): void {
         this.profile= JSON.parse(sessionStorage.getItem("user_details"))
    this.getJobDetail();
    this.selectedSpecialities=JSON.parse(localStorage.getItem('selectedSpecialities'));
    this.getSkills();
        this.countries();
        this.getLanguageData();
        this.speciality_id=localStorage.getItem('discipline');
         if(JSON.parse(localStorage.getItem('interpersonalskill'))){
        this.selected_interpersonal_skill=JSON.parse(localStorage.getItem('interpersonalskill'));

    }
       if(JSON.parse(localStorage.getItem('industryKnowledgeSkills'))){
        this.selected_skills=JSON.parse(localStorage.getItem('industryKnowledgeSkills'));

    }
    if(JSON.parse(localStorage.getItem('maximum_hour_week'))){
        this.maximum_hour_week=JSON.parse(localStorage.getItem('maximum_hour_week'));

    }
      if(JSON.parse(localStorage.getItem('skills'))){
        this.selected_skills=JSON.parse(localStorage.getItem('skills'));

    }
     if(JSON.parse(localStorage.getItem('tool_skills'))){
        this.selected_tool_skills=JSON.parse(localStorage.getItem('tool_skills'));

    }
       if(localStorage.getItem('talent_location')){
        this.talent_location=localStorage.getItem('talent_location')

    }
      if(localStorage.getItem('amount_earned')){
        this.amount_earned=localStorage.getItem('amount_earned')

    }
      if(localStorage.getItem('job_success')){
        this.job_success_score=localStorage.getItem('job_success')

    }
       if(localStorage.getItem('english_level')){
        this.languages=localStorage.getItem('english_level')

    }
       if(localStorage.getItem('talent_pay_type')){
        this.talent_pay_type=localStorage.getItem('talent_pay_type')

    }
    if(localStorage.getItem('whole_project')){
            this.whole_project=localStorage.getItem('whole_project')
 

    }
       if(localStorage.getItem('selected_sectors')){
            this.selectedSectors=JSON.parse(localStorage.getItem('selected_sectors'))
 

    }
    if(localStorage.getItem('country')){
              this.country=JSON.parse(localStorage.getItem('country'))
            console.log('this.state',this.country.isoCode)
    }
     if(localStorage.getItem('state')){
            this.state=JSON.parse(localStorage.getItem('state'))
            console.log('this.state',this.state.isoCode)
            this.state=this.state.name

    }
     if(localStorage.getItem('city')){
            this.city=JSON.parse(localStorage.getItem('city'))

    }
     if(localStorage.getItem('talent_duration')){
            this.talent_duration=JSON.parse(localStorage.getItem('talent_duration'))

    }
    this.getSectors();

  }

     countries(){

    this.service.getLocationData({}).subscribe(res => {
    console.log('countries',res)
      this.country_list = res.countries
    },(error) => {
      this.service.handleError(error)
    })
  }
    changeCountry(event){
    console.log(event.target.value);
    console.log(this.country);
    this.countryCode= event.target.value
    const form = {
      country_code : event.target.value
    }

    this.service.getLocationData(form).subscribe(res => {
      this.states_list = res.states
    },(error) => {
      this.service.handleError(error)
    })
    let newArr = this.country_list.find(item => item.isoCode == this.country);
        localStorage.setItem('country',JSON.stringify( newArr))

   console.log("newarry",newArr)
  }
  enteredTime(){
        console.log(this.from_hour)
        localStorage.setItem("from_hour",this.from_hour)
  }
  toenteredTime(){
          console.log(this.to_hour)
         
                  localStorage.setItem("to_hour",this.to_hour)

  }
    enteredTimelump(){
        console.log(this.from_hour)
        localStorage.setItem("from_hour",this.fromhourlumpsum)
  }
  toenteredTimelump(){
          console.log(this.to_hour)
         
                  localStorage.setItem("to_hour",this.tohourlumpsum)

  }
    enteredTimesalary(){
        console.log(this.from_hour)
        localStorage.setItem("from_hour",this.fromhoursalary)
  }
  toenteredTimesalary(){
          console.log(this.to_hour)
         
                  localStorage.setItem("to_hour",this.tohoursalary)

  }
  payType(event){
        console.log(event)
        localStorage.setItem("talent_pay_type",event)
  }
   changeCity(event){
    console.log('evevnt',event.target.value);
    console.log(this.city)
            let newArr = this.cities_list.find(item => item.name == this.city);
            console.log("newarr",newArr)
                    localStorage.setItem('city',JSON.stringify(newArr))

        }
    changeState(event){
    console.log('evevnt',event.target.value);
    console.log(this.state)


    const form = {
      state_code : event.target.value,
      country_code : this.countryCode
    }
    this.service.getLocationData(form).subscribe(res => {
      this.cities_list = res.cities
    },(error) => {
      this.service.handleError(error)
    })
    let newArr = this.states_list.find(item => item.isoCode == this.state);
    console.log('newarray',newArr)
            localStorage.setItem('state', JSON.stringify(newArr))
  }

  getSliderValue(event) {
   console.log(event.target.value);
}

    onCheckboxChangeSector(event,speciality){
    console.log(event,speciality)
    if(event.target.checked){
      this.selectedSectors.push(speciality._id);
                 localStorage.setItem('selected_sectors',JSON.stringify(this.selectedSectors))
    }else{
      // this.selected_specialities.splice(speciality._id,1);
      let index = this.selectedSectors.findIndex((item) => {
        return item == speciality._id
      });
      this.selectedSectors.splice(index,1)
                 localStorage.setItem('selected_sectors',JSON.stringify(this.selectedSectors))

    }
  }

  changeduration(event){
  console.log(this.talent_duration)
  localStorage.setItem('talent_duration',this.talent_duration)

  }
  getSectors(){
  let param= {
        session_id:localStorage.getItem('sessionID')
  }

  console.log(param)
    this.service.getSectorsGuest(param).subscribe(async res => {
    console.log('sector',res)
      this.isLoading = false
      this.sector = res.sectors
    
      
    this.sector =  res.sectors.map((item => {
        
        if(this.selectedSectors.includes(item._id)){
                 return item = {
            _id : item._id,
            name : item.name,
            status : item.status,
            flag : true,
                        session_id : item.session_id ? item.session_id : ""

          }
        }else{
          return item = {
            _id : item._id,
            name : item.name,
            status : item.status,
            flag : false,
                        session_id : item.session_id ? item.session_id : ""

          }
        }
      }))

    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
    })
  }

  getSkills(){
  var obj={
        speciality:this.selectedSpecialities,
        session_id:localStorage.getItem('sessionID')
  }
      this.service.getSpecialitySkillsIndividualGuest(obj).subscribe(res => {
      console.log(res);
      this.industryKnowlegde = res.industryKnowledgeSkills;
      this.tool_skills = res.technologySkills;    
      console.log("testin",res.technologySkills)
      this.newselection=res.specialities;
      console.log('0',res.industryKnowledgeSkills[0])
      console.log('sp', this.newselection)
      this.interpersonal_skill_list=res.interpersonalSkills
      console.log(this.interpersonal_skill_list)
      this.isLoading = false;
    },(error) => {
      this.service.handleError(error);

    })
  }
  date(e) {
      var convertDate = new Date(e.target.value);
     console.log(convertDate)
     localStorage.setItem('fromdate',e.target.value)
    }
      Todate(e) {
      var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
     console.log(convertDate)
     localStorage.setItem('todate',e.target.value)
    }
  
   chooseSkills(skill_id){
    this.selected_skills.push(skill_id)
    console.log(this.selected_skills);
    console.log("speciality_ids =============== ",this.selectedSpecialities)
        localStorage.setItem("industryKnowledgeSkills",JSON.stringify(this.selected_skills))
  }

    jobSuccess(event){
        console.log(this.job_success_score)
        localStorage.setItem('job_success',this.job_success_score)
  }
  amtEarned(event){
        console.log(this.amount_earned)
                localStorage.setItem('amount_earned',this.amount_earned)

  }
  talentLevel(e){
        console.log(this.talent_level)
                        localStorage.setItem('talent_level',this.talent_level)

  }
  removeSkills(skill_id){

     let index = this.selected_skills.findIndex((item) => {
      return item == skill_id
    });
    this.selected_skills.splice(index,1)
        localStorage.setItem("industryKnowledgeSkills",JSON.stringify(this.selected_skills))

  }
    chooseInterSkills(_id){
    this.selected_interpersonal_skill.push(_id)
            localStorage.setItem("interpersonalskill",JSON.stringify(this.selected_interpersonal_skill))

  }
  salaryType(){
        localStorage.setItem('salary_based_type',this.salary_based_type)
  }
  change2(){
        if(!(this.talent_pay_type)){
          this.service.showErrorMessage({
        message:"Please select talent pay type"
      })
        }  else if(this.talent_pay_type=='hourly' && !this.from_hour){
             this.service.showErrorMessage({
        message:"Please enter payment range"
      })
        }else if(this.talent_pay_type=='hourly' && !this.to_hour){
          this.service.showErrorMessage({
        message:"Please enter payment range"
      })
        }else if(this.talent_pay_type=='salary_based' && !this.fromhoursalary){
          this.service.showErrorMessage({
        message:"Please enter payment range"
      })
        }else if(this.talent_pay_type=='salary_based' && !this.tohoursalary){
          this.service.showErrorMessage({
        message:"Please enter payment range"
      })
        }else if(this.talent_pay_type=='lumpsum' && !this.fromhourlumpsum){
          this.service.showErrorMessage({
        message:"Please enter payment range"
      })
        }else if(this.talent_pay_type=='lumpsum' && !this.tohourlumpsum){
          this.service.showErrorMessage({
        message:"Please enter payment range"
      })
        }
        else if(!this.job_start){
          this.service.showErrorMessage({
        message:"Please select when do you need the talent to start"
      })
      }else if(!this.talent_duration){
          this.service.showErrorMessage({
        message:"Please select How long do you need the talent"
      })}    else  if(this.talent_pay_type=='hourly' && parseInt(this.from_hour)>=(this.to_hour)){
 this.service.showErrorMessage({
        message:"Please enter correct payment range "
      }) 
       }else  if(this.talent_pay_type=='lumpsum' && parseInt(this.fromhourlumpsum)>=(this.tohourlumpsum)){
 this.service.showErrorMessage({
        message:"Please enter correct payment range "
      })          }else  if(this.talent_pay_type=='salary_based' && parseInt(this.fromhoursalary)>=(this.tohoursalary)){
 this.service.showErrorMessage({
        message:"Please enter correct payment range "
      })     }
        else  if(parseInt(this.minimum_hour_week)>=(this.maximum_hour_week)){
 this.service.showErrorMessage({
        message:"Mininum hours/week can not be greater than Maximum hours/week "
      })}else if(this.maximum_hour_week>168){
       this.service.showErrorMessage({
        message:"Maximum hours should be less than 168 "
      })
      }else if(this.minimum_hour_week>168){
       this.service.showErrorMessage({
        message:"Minimum hours should be less than 168 "
      })
      }
        else  if(parseInt(this.maximum_hour_week)-(this.minimum_hour_week)>168){
 this.service.showErrorMessage({
        message:"Total hours should be less than 168 "
      })}
     
          else{
                     this.activeIndex= 2;
                                        const job_id = localStorage.getItem("job_id");

        if(localStorage.getItem('job_talent_id')){
        var obj={
        job_id:job_id,

discipline: localStorage.getItem('discipline'),
    whole_project:localStorage.getItem('whole_project'),
country:JSON.parse(localStorage.getItem('country')),
state:JSON.parse(localStorage.getItem('state')),
city:JSON.parse(localStorage.getItem('city')),
specialities: JSON.parse(localStorage.getItem('selectedSpecialities')),
traditional_service:JSON.parse(localStorage.getItem('TraditionalServices')),
digital_service:JSON.parse(localStorage.getItem('digitalServices')),
skills:JSON.parse(localStorage.getItem('industryKnowledgeSkills')),
tool_skills: JSON.parse(localStorage.getItem('tool_skills')),

talent_required:1,
    talent_location:localStorage.getItem('talent_location'),
english_level:localStorage.getItem('english_level'),
    job_success_score:localStorage.getItem('job_success'),
    amount_earned :localStorage.getItem('amount_earned'),
    talent_pay_type:localStorage.getItem('talent_pay_type'),
from_hour: localStorage.getItem('from_hour'),
to_hour :localStorage.getItem('to_hour'),
timeline_start_date:localStorage.getItem('fromdate'),
timeline_end_date: localStorage.getItem('todate'),
job_talent_id: localStorage.getItem('job_talent_id'),
interpersonal_skills: JSON.parse(localStorage.getItem('interpersonalskill')),
address: localStorage.getItem('address'),
job_start:localStorage.getItem('job_start'),
maximum_hour_week:localStorage.getItem('maximum_hour_week'),
sectors:JSON.parse(localStorage.getItem('selected_sectors')),
level_of_talent: localStorage.getItem('talent_level'),
additional_requirements: this.additional_req,
salary_based_type:localStorage.getItem('salary_based_type'),
minimum_hour_week:localStorage.getItem('minimum_hour_week'),
talent_duration:localStorage.getItem('talent_duration')

    }
    console.log(obj)

    
    this.service.saveTalentDetails(obj).subscribe(async res => {
    this.router.navigate(['/talent-budget-guest'])

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
    
  }else{
          var req={
        job_id:job_id,

discipline: localStorage.getItem('discipline'),
    whole_project:localStorage.getItem('whole_project'),
country:JSON.parse(localStorage.getItem('country')),
state:JSON.parse(localStorage.getItem('state')),
city:JSON.parse(localStorage.getItem('city')),
specialities: JSON.parse(localStorage.getItem('selectedSpecialities')),
traditional_service:JSON.parse(localStorage.getItem('TraditionalServices')),
digital_service:JSON.parse(localStorage.getItem('digitalServices')),
skills:JSON.parse(localStorage.getItem('industryKnowledgeSkills')),
tool_skills: JSON.parse(localStorage.getItem('tool_skills')),
talent_required:1,
    talent_location:localStorage.getItem('talent_location'),
english_level:localStorage.getItem('english_level'),
    job_success_score:localStorage.getItem('job_success'),
    amount_earned :localStorage.getItem('amount_earned'),
    talent_pay_type:localStorage.getItem('talent_pay_type'),
from_hour: localStorage.getItem('from_hour'),
to_hour :localStorage.getItem('to_hour'),
timeline_start_date:localStorage.getItem('fromdate'),
timeline_end_date: localStorage.getItem('todate'),
interpersonal_skills: JSON.parse(localStorage.getItem('interpersonalskill')),
address: localStorage.getItem('address'),
job_start:localStorage.getItem('job_start'),
maximum_hour_week:localStorage.getItem('maximum_hour_week'),
sectors:JSON.parse(localStorage.getItem('selected_sectors')),
level_of_talent: localStorage.getItem('talent_level'),
additional_requirements: this.additional_req,
salary_based_type:localStorage.getItem('salary_based_type'),
minimum_hour_week:localStorage.getItem('minimum_hour_week'),
talent_duration:localStorage.getItem('talent_duration')


    }
    console.log(req)
    
    this.service.saveTalentDetails(req).subscribe(async res => {
    this.job_talent_id=res.resp._id;
    localStorage.setItem('job_talent_id',this.job_talent_id)
    this.router.navigate(['/talent-budget-guest'])

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
  }

        }
  }
  change1(){
         if(!(this.talent_location)){
      
    this.service.showErrorMessage({
        message:"Please select job location"
      })
         }else if(this.talent_location=="onsite" && !this.address){
       this.service.showErrorMessage({
        message:"Please enter address"
      })
      }else if(this.talent_location=="onsite" && !this.country){
      this.service.showErrorMessage({
        message:"Please select country"
      })
      }else if(this.talent_location=="onsite" && !this.state){
        this.service.showErrorMessage({
        message:"Please select state"
      })
      }else if(this.talent_location=="onsite" && !this.city){
        this.service.showErrorMessage({
        message:"Please select city"
      })
      }else if(!(this.selected_skills.length)){
  this.service.showErrorMessage({
        message:"Please select at least one industry knowledge skill"
      })
        }else if (!(this.selected_tool_skills.length)){
  this.service.showErrorMessage({
        message:"Please select at least one tools and technology skill"
      })
        }else if(!(this.selected_interpersonal_skill.length)){
  this.service.showErrorMessage({
        message:"Please select at least one interpersonal skill"
      })
        }else if(!(this.languages)){
  this.service.showErrorMessage({
        message:"Please select language"
      })
        }
        else{
             this.activeIndex= 1;
                   const job_id = localStorage.getItem("job_id");

        if(localStorage.getItem('job_talent_id')){
        var obj={
        job_id:job_id,

discipline: localStorage.getItem('discipline'),
    whole_project:localStorage.getItem('whole_project'),
country:JSON.parse(localStorage.getItem('country')),
state:JSON.parse(localStorage.getItem('state')),
city:JSON.parse(localStorage.getItem('city')),
specialities: JSON.parse(localStorage.getItem('selectedSpecialities')),
traditional_service:JSON.parse(localStorage.getItem('TraditionalServices')),
digital_service:JSON.parse(localStorage.getItem('digitalServices')),
skills:JSON.parse(localStorage.getItem('industryKnowledgeSkills')),
tool_skills: JSON.parse(localStorage.getItem('tool_skills')),
talent_required:1,
    talent_location:localStorage.getItem('talent_location'),
english_level:localStorage.getItem('english_level'),
    job_success_score:localStorage.getItem('job_success'),
    amount_earned :localStorage.getItem('amount_earned'),
    talent_pay_type:localStorage.getItem('talent_pay_type'),
from_hour: localStorage.getItem('from_hour'),
to_hour :localStorage.getItem('to_hour'),
timeline_start_date:localStorage.getItem('fromdate'),
timeline_end_date: localStorage.getItem('todate'),
job_talent_id: localStorage.getItem('job_talent_id'),
interpersonal_skills: JSON.parse(localStorage.getItem('interpersonalskill')),
address: localStorage.getItem('address'),
job_start:localStorage.getItem('job_start'),
maximum_hour_week:localStorage.getItem('maximum_hour_week'),
sectors:JSON.parse(localStorage.getItem('selected_sectors')),
level_of_talent: localStorage.getItem('talent_level'),
additional_requirements: this.additional_req,
salary_based_type:localStorage.getItem('salary_based_type'),
minimum_hour_week:localStorage.getItem('minimum_hour_week'),
talent_duration:localStorage.getItem('talent_duration')
    }
    console.log(obj)
    
    this.service.saveTalentDetails(obj).subscribe(async res => {
    this.router.navigate(['/talent-budget-guest'])

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
    
  }else{
          var req={
        job_id:job_id,

discipline: localStorage.getItem('discipline'),
    whole_project:localStorage.getItem('whole_project'),
country:JSON.parse(localStorage.getItem('country')),
state:JSON.parse(localStorage.getItem('state')),
city:JSON.parse(localStorage.getItem('city')),
specialities: JSON.parse(localStorage.getItem('selectedSpecialities')),
traditional_service:JSON.parse(localStorage.getItem('TraditionalServices')),
digital_service:JSON.parse(localStorage.getItem('digitalServices')),
skills:JSON.parse(localStorage.getItem('industryKnowledgeSkills')),
tool_skills: JSON.parse(localStorage.getItem('tool_skills')),
talent_required:1,
    talent_location:localStorage.getItem('talent_location'),
english_level:localStorage.getItem('english_level'),
    job_success_score:localStorage.getItem('job_success'),
    amount_earned :localStorage.getItem('amount_earned'),
    talent_pay_type:localStorage.getItem('talent_pay_type'),
from_hour: localStorage.getItem('from_hour'),
to_hour :localStorage.getItem('to_hour'),
timeline_start_date:localStorage.getItem('fromdate'),
timeline_end_date: localStorage.getItem('todate'),
interpersonal_skills: JSON.parse(localStorage.getItem('interpersonalskill')),
address: localStorage.getItem('address'),
job_start:localStorage.getItem('job_start'),
maximum_hour_week:localStorage.getItem('maximum_hour_week'),
sectors:JSON.parse(localStorage.getItem('selected_sectors')),
level_of_talent: localStorage.getItem('talent_level'),
additional_requirements: this.additional_req,
salary_based_type:localStorage.getItem('salary_based_type'),
minimum_hour_week:localStorage.getItem('minimum_hour_week'),
talent_duration:localStorage.getItem('talent_duration')


    }
    console.log(req)
    
    this.service.saveTalentDetails(req).subscribe(async res => {
    this.job_talent_id=res.resp._id;
    localStorage.setItem('job_talent_id',this.job_talent_id)
    this.router.navigate(['/talent-budget-guest'])

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
  }
        }
  }
    deleteInterSkill(id){
       const obj = {
        skill_id: id,
        session_id:localStorage.getItem('sessionID')
      }
      
      this.service.deleteSkillGuest(obj).subscribe(async res => {    
             let index = this.selected_interpersonal_skill.findIndex((item) => {
      return item == id
    });
    this.selected_interpersonal_skill.splice(index,1)
                localStorage.setItem("interpersonalskill",JSON.stringify(this.selected_interpersonal_skill))


        this.getSkills();

      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
  }

    deleteToolSkill(id){
       const obj = {
        skill_id: id,
        session_id:localStorage.getItem('sessionID')
      }
      
      this.service.deleteSkillGuest(obj).subscribe(async res => {    
             let index = this.selected_tool_skills.findIndex((item) => {
      return item == id
    });
    this.selected_tool_skills.splice(index,1)
                localStorage.setItem("tool_skills",JSON.stringify(this.selected_tool_skills))


        this.getSkills();

      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
  }

  deleteSkill(id){
       const obj = {
        skill_id: id,
        session_id:localStorage.getItem('sessionID')
      }
      
      this.service.deleteSkillGuest(obj).subscribe(async res => {    
             let index = this.selected_skills.findIndex((item) => {
      return item == id
    });
    this.selected_skills.splice(index,1)
                localStorage.setItem("industryKnowledgeSkills",JSON.stringify(this.selected_skills))


        this.getSkills();

      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
  }

  removeInterSkills(_id){
    // this.selected_interpersonal_skill.splice(this.selected_interpersonal_skill.findIndex(ele=>ele === _id));
    let index = this.selected_interpersonal_skill.findIndex((item) => {
      return item == _id
    });
    this.selected_interpersonal_skill.splice(index,1)
                localStorage.setItem("interpersonalskill",JSON.stringify(this.selected_interpersonal_skill))

  }
    addInterpersonal(){    
    const interpersonal_name = this.interpersonal_skill_add; 
    // if(interpersonal_name.length==1 && this.speciality_id){
    if(interpersonal_name.length==1){
      const obj = {
        name: interpersonal_name[0].value,
        type: "interpersonal",
        session_id:localStorage.getItem('sessionID')
        // discipline_speciality_id: speciality_id
      }
      
      this.service.addNewClientSkillGuest(obj).subscribe(async res => {    
        // console.log("add interp resp ============ ",res)    
          const item = {
            _id : res.id,
       
            session_id : res.session_id ? res.session_id : ""
          }

        this.selected_interpersonal_skill.push(res.data._id)
        localStorage.setItem('interpersonalskill',JSON.stringify(this.selected_interpersonal_skill))
        this.getSkills();
        this.interpersonal_skill_add = [];
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }

  chooseToolSkills(skill_id){
  this.selected_tool_skills.push(skill_id)
    console.log(this.selected_tool_skills);
        localStorage.setItem("tool_skills",JSON.stringify(this.selected_tool_skills))

  }

  removeToolSkills(skill_id){

    let index = this.selected_tool_skills.findIndex((item) => {
      return item == skill_id
    });
    this.selected_tool_skills.splice(index,1);
        localStorage.setItem("tool_skills",JSON.stringify(this.selected_tool_skills))

  }
  location(value){
        console.log(this.talent_location)
        localStorage.setItem('talent_location',this.talent_location)
  }
    changeJob(value){
        console.log(this.job_start)
        localStorage.setItem('job_start',this.job_start)
  }


  getJobDetail(){

    if(localStorage.getItem("talents")){

      this.totalTalents = JSON.parse(localStorage.getItem("talents"))

    }


    // const job_id = localStorage.getItem("job_id");
    let job_id;
		if(localStorage.getItem("reuse_job_id")){
			job_id = localStorage.getItem("reuse_job_id");
		}else{
			job_id = localStorage.getItem("job_id");
		}
    if (job_id && job_id!=undefined) {
      this.service.getJobDetail(job_id).subscribe(async res => {
        this.isLoading = false
        this.jobDetail = res.details;
        if(res.details.job_talents[0]){
              this.talent_location=res.details.job_talents[0].talent_location;
                localStorage.setItem('talent_location',this.talent_location)
                if(res.details.job_talents[0].job_success_score){
                  this.job_success_score=res.details.job_talents[0].job_success_score;
                
                this.job_success_score=this.job_success_score.toString()
                      localStorage.setItem('job_success',this.job_success_score)
                }
                if(res.details.job_talents[0].specialities.length){
                   this.selectedSpecialities = res.details.job_talents[0].specialities.map((item => {
          return item._id

        }))
                    localStorage.setItem('selectedSpecialities',JSON.stringify(this.selectedSpecialities))
                }
                                if(res.details.job_talents[0].country){
                                this.country=res.details.job_talents[0].country.isoCode
                        this.changeCountry({          
            target : {
              value : res.details.job_talents[0].country.isoCode
            }          
        })
                              localStorage.setItem('country',JSON.stringify(res.details.job_talents[0].country))

                }
                                if(res.details.job_talents[0].state){

        this.state=res.details.job_talents[0].state.isoCode

        console.log("this.state",res.details.job_talents[0].state.name)
         this.changeState({          
            target : {
              value : res.details.job_talents[0].state.isoCode
            }          
        })
                              localStorage.setItem('state',JSON.stringify(res.details.job_talents[0].state))

                }
                           if(res.details.job_talents[0].city){
                           this.city=res.details.job_talents[0].city.name
                      localStorage.setItem('city',JSON.stringify(res.details.job_talents[0].city))
                }
              if(res.details.job_talents[0].amount_earned){
              this.amount_earned=res.details.job_talents[0].amount_earned;
                       this.amount_earned=this.amount_earned.toString()
                      localStorage.setItem('amount_earned',this.amount_earned)
                console.log(this.job_success_score,this.amount_earned)
              }
         if(res.details.job_talents[0].maximum_hour_week){

                this.maximum_hour_week= res.details.job_talents[0].maximum_hour_week;
                                      localStorage.setItem('maximum_hour_week',this.maximum_hour_week)
                                      }
                                      if(res.details.job_talents[0].minimum_hour_week){

                this.minimum_hour_week= res.details.job_talents[0].minimum_hour_week;
                                      localStorage.setItem('minimum_hour_week',this.minimum_hour_week)
                                      }
         if(res.details.job_talents[0].salary_based_type){

                this.salary_based_type= res.details.job_talents[0].salary_based_type;
                                      localStorage.setItem('salary_based_type',this.salary_based_type)
                                      }
                                         if(res.details.job_talents[0].talent_duration){

                this.talent_duration= res.details.job_talents[0].talent_duration;
                                      localStorage.setItem('talent_duration',this.talent_duration)
                                      }
        if(res.details.job_talents[0].talent_pay_type){

                this.talent_pay_type= res.details.job_talents[0].talent_pay_type;
                                      localStorage.setItem('talent_pay_type',this.talent_pay_type)
                                      }
                         if(res.details.job_talents[0].additional_requirements){

                this.additional_req= res.details.job_talents[0].additional_requirements;
                                      localStorage.setItem('additional_req',this.additional_req)
                                      }
                       
                                                  if(res.details.job_talents[0].talent_pay_type){

                this.talent_pay_type= res.details.job_talents[0].talent_pay_type;
                                      localStorage.setItem('talent_pay_type',this.talent_pay_type)
                                      }
                                                                          if(res.details.job_talents[0].talent_pay_type=='hourly'&&res.details.job_talents[0].from_hour){

                                      this.from_hour= res.details.job_talents[0].from_hour
                                      localStorage.setItem('from_hour',this.from_hour)
                                      }
                                                                          if(res.details.job_talents[0].talent_pay_type=='hourly'&&res.details.job_talents[0].to_hour){

                                       this.to_hour= res.details.job_talents[0].to_hour
                                      localStorage.setItem('to_hour',this.to_hour)
                                      }
                                                                    if(res.details.job_talents[0].talent_pay_type=='salary_based'&&res.details.job_talents[0].from_hour){

                                      this.fromhoursalary= res.details.job_talents[0].from_hour
                                      localStorage.setItem('from_hour',this.fromhoursalary)
                                      }
                                                                          if(res.details.job_talents[0].talent_pay_type=='salary_based'&&res.details.job_talents[0].to_hour){

                                       this.tohoursalary= res.details.job_talents[0].to_hour
                                      localStorage.setItem('to_hour',this.tohoursalary)
                                      }                              if(res.details.job_talents[0].talent_pay_type=='lumpsum'&&res.details.job_talents[0].from_hour){

                                      this.fromhourlumpsum= res.details.job_talents[0].from_hour
                                      localStorage.setItem('from_hour',this.fromhourlumpsum)
                                      }
                                                                          if(res.details.job_talents[0].talent_pay_type=='lumpsum'&&res.details.job_talents[0].to_hour){

                                       this.tohourlumpsum= res.details.job_talents[0].to_hour
                                      localStorage.setItem('to_hour',this.tohourlumpsum)
                                      }
                                                               if(res.details.job_talents[0].job_start){

                                      this.job_start= res.details.job_talents[0].job_start
                                                  localStorage.setItem('job_start',this.job_start)
                                                  }
                                                                          if(res.details.job_talents[0].job_talent_id){

                                      this.job_talent_id= res.details.job_talents[0]._id
                                                  localStorage.setItem('job_talent_id',this.job_talent_id)
                                                  }
                                                                                      if(res.details.job_talents[0].whole_project){

this.whole_project= res.details.job_talents[0].whole_project
                                                  localStorage.setItem('whole_project',this.whole_project)
                                                  }
                                  if(res.details.job_talents[0].timeline_start_date){

                                 this.timeline_start_date=res.details.job_talents[0].timeline_start_date
                                  localStorage.setItem('fromdate',this.timeline_start_date)
                                  }
                                   if(res.details.job_talents[0].address){

                                 this.address=res.details.job_talents[0].address
                                  localStorage.setItem('address',this.address)
                                  }
                                    if(res.details.job_talents[0].timeline_end_date){

                                   this.timeline_end_date=res.details.job_talents[0].timeline_end_date
                                  localStorage.setItem('todate',this.timeline_end_date)
                                  }
                                                             if(res.details.job_talents[0].level_of_talent){

                                   this.talent_level= res.details.job_talents[0].level_of_talent;
                                  console.log(this.languages)
                                    localStorage.setItem('talent_level',this.talent_level)
                                    }
                                     
                                                                    if(res.details.job_talents[0].english_level){

                                   this.languages= res.details.job_talents[0].english_level._id;
                                  console.log(this.languages)
                                    localStorage.setItem('english_level',this.languages)
                                    }
                                           if(res.details.job_talents[0].skills){
                  this.selected_skills = res.details.job_talents[0].skills;

                           this.selected_skills = this.selected_skills.map((item => {
          return item._id
        }))
                localStorage.setItem("industryKnowledgeSkills",JSON.stringify(this.selected_skills))
                }
                     if(res.details.job_talents[0].sectors){
                  this.selectedSectors = res.details.job_talents[0].sectors;

                           this.selectedSectors = this.selectedSectors.map((item => {
          return item._id
        }))
                        localStorage.setItem("selected_sectors",JSON.stringify(this.selectedSectors))

        }
                                  if(res.details.job_talents[0].tool_skills){

       this.selected_tool_skills = res.details.job_talents[0].tool_skills;

                           this.selected_tool_skills = this.selected_tool_skills.map((item => {
          return item._id
        }))
                localStorage.setItem("tool_skills",JSON.stringify(this.selected_tool_skills))
      }
                                      if(res.details.job_talents[0].interpersonal_skills){

       this.selected_interpersonal_skill = res.details.job_talents[0].interpersonal_skills;

                           this.selected_interpersonal_skill = this.selected_interpersonal_skill.map((item => {
          return item._id
        }))
                localStorage.setItem("interpersonalskill",JSON.stringify(this.selected_interpersonal_skill))
      }
      if(localStorage.getItem('discipline')){
          this.getSectors();

                       } 
    
        
                       
                

        }
  
              

        console.log("jobDetail response dd ================== ",res)
    
        console.log("total talents ================== ",this.totalTalents)
        // this.form.setValue({
        //   title: res.details && res.details.title ? res.details.title : "",
        //   description: res.details && res.details.description ? res.details.description : "",
        // });

        // if(res.details && res.details.visibility){
        //   this.visibility = res.details.visibility;
        // }

        // if(res.details && res.details.co_workers.length){
        //   this.co_workers = res.details.co_workers
        // }

        // if(res.details && res.details.project_files.length){
        //   this.files = res.details.project_files
        // }

      },(err) => {
        this.isLoading = false
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      this.jobDetail = null;
    }
  }
  isWhole_project(event){
  console.log(event)
  console.log(this.whole_project);

  var wholep= new Boolean(this.whole_project).toString()


  localStorage.setItem('whole_project',wholep)
  }
    deleteSector(sector_id){
      const obj = {
        sector_id: sector_id,
        session_id: localStorage.getItem('sessionID')
      }
      this.service.deleteSectorGuest(obj).subscribe(async res => {
          let index = this.selectedSectors.findIndex((item) => {
      return item == sector_id
    });
    this.selectedSectors.splice(index,1)
                localStorage.setItem("selected_sectors",JSON.stringify(this.selectedSectors))
                  this.getSectors();
        // this.getDisciplineSpeciality();
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    
  }
  addsector(){
      const selectedSectors = this.sector.filter(ele=> ele.flag? ele.flag === true: '');

        console.log(this.sectorName)
            if(this.sectorName ){

        const obj={
        name: this.sectorName,
        session_id:localStorage.getItem('sessionID')
        }
        this.service.addNewSectorGuest(obj).subscribe(async res => {
            const item = {
            _id : res._id,
            name : res.name,
            status : res.status,
            flag : true,
            session_id : res.session_id ? res.session_id : ""
          }
    console.log(res)
    this.selectedSectors.push(res.added._id)
                         localStorage.setItem('selected_sectors',JSON.stringify(this.selectedSectors))
        this.getSectors();

           $('#addService').modal('hide')

        this.isLoading = false;
        this.sectorName = '';
  

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
    }
    else{
              return this.service.showErrorMessage({ message : "Please enter Sector Name", action : "Okay"})

    }
  }
  addReq(){
        console.log(this.additional_req)
        localStorage.setItem('additional_req',this.additional_req)
  }
  getLanguageData(){
     const obj = {
      type : 'proficiency'
    }
    console.log("obj",obj)
    this.service.getLanguages(obj).subscribe(async res => {
    console.log(res)
        this.english_level=res.data
      
          this.languages=res.data[0]._id
          localStorage.setItem('english_level',res.data[0]._id)

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
        
  }
    addIndustry(speciality_id){
    console.log(speciality_id)
    const skill_name = this.newAddskill; 
    // if(industry_name.length==1 && this.selected_specialities.length){
    if(skill_name.length==1){
      const obj = {
        name: skill_name[0].value,
        type: "industry",
        discipline_speciality_id: speciality_id,
        session_id:localStorage.getItem('sessionID')
      }
      this.service.addNewClientSkillGuest(obj).subscribe(async res => {
        this.selected_skills.push(res.data._id)
        localStorage.setItem('industryKnowledgeSkills',JSON.stringify(this.selected_skills))
        this.newAddskill = [];
            let id=[];
            id.push(speciality_id)
    this.getSkills()
    console.log(obj)
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }
  max_week(){
        localStorage.setItem('maximum_hour_week',this.maximum_hour_week)

  }
  min_week(){               
  localStorage.setItem('minimum_hour_week',this.minimum_hour_week)


  }
  addressentered(){
        console.log(this.address)
        localStorage.setItem('address', this.address)
  }
   addTool(speciality_id){
    
    const tool_name = this.tools_add; 
    // if(tool_name.length==1 && this.speciality_id){
    if(tool_name.length==1){
      const obj = {
        name: tool_name[0].value,
        type: "tool_technology",
        discipline_speciality_id: speciality_id,
        session_id:localStorage.getItem('sessionID')
      }
      
      this.service.addNewClientSkillGuest(obj).subscribe(async res => {
        
        this.selected_tool_skills.push(res.data._id)
        localStorage.setItem('tool_skills',JSON.stringify(this.selected_tool_skills))
            let id=[];
            id.push(speciality_id)
            this.getSkills()       
            this.tools_add = [];
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }
  onItemChange(id){
        console.log(id)
        this.english_level.forEach(item=>{
    console
    .log(item.id)
    localStorage.setItem('english_level',id)
  })
  }
  saveTalentDetails(){
      if(!(this.talent_location)){
      
    this.service.showErrorMessage({
        message:"Please select job location"
      })
         }else if(this.talent_location=="onsite" && !this.address){
       this.service.showErrorMessage({
        message:"Please enter address"
      })
      }else if(this.talent_location=="onsite" && !this.country){
      this.service.showErrorMessage({
        message:"Please select country"
      })
      }else if(this.talent_location=="onsite" && !this.state){
        this.service.showErrorMessage({
        message:"Please select state"
      })
      }else if(this.talent_location=="onsite" && !this.city){
        this.service.showErrorMessage({
        message:"Please select city"
      })
      }else if(!(this.selected_skills.length)){
  this.service.showErrorMessage({
        message:"Please select at least one industry knowledge skill"
      })
        }else if (!(this.selected_tool_skills.length)){
  this.service.showErrorMessage({
        message:"Please select at least one tools and technology skill"
      })
        }else if(!(this.selected_interpersonal_skill.length)){
  this.service.showErrorMessage({
        message:"Please select at least one interpersonal skill"
      })
        }else if(!(this.languages)){
  this.service.showErrorMessage({
        message:"Please select language"
      })
        } else if(!this.talent_level ){
  
    this.service.showErrorMessage({
        message:"Please select talent level"
      })}else if(!this.selectedSectors.length){
        this.service.showErrorMessage({
        message:"Please select at least one sector"
      })
      } else         if(!(this.talent_pay_type)){
          this.service.showErrorMessage({
        message:"Please select talent pay type"
      })
        }  else if(this.talent_pay_type=='hourly' && !this.from_hour){
             this.service.showErrorMessage({
        message:"Please enter payment range"
      })
        }else if(this.talent_pay_type=='hourly' && !this.to_hour){
          this.service.showErrorMessage({
        message:"Please enter payment range"
      })
        }else if(this.talent_pay_type=='salary_based' && !this.fromhoursalary){
          this.service.showErrorMessage({
        message:"Please enter payment range"
      })
        }else if(this.talent_pay_type=='salary_based' && !this.tohoursalary){
          this.service.showErrorMessage({
        message:"Please enter payment range"
      })
        }else if(this.talent_pay_type=='lumpsum' && !this.fromhourlumpsum){
          this.service.showErrorMessage({
        message:"Please enter payment range"
      })
        }else if(this.talent_pay_type=='lumpsum' && !this.tohourlumpsum){
          this.service.showErrorMessage({
        message:"Please enter payment range"
      })
        
        }else if(!this.job_start){
          this.service.showErrorMessage({
        message:"Please select when do you need the talent to start"
      })
      }else if(!this.talent_duration){
          this.service.showErrorMessage({
        message:"Please select How long do you need the talent"
      })}   else  if(this.talent_pay_type=='hourly' && parseInt(this.from_hour)>=(this.to_hour)){
 this.service.showErrorMessage({
        message:"Please enter correct payment range "
      }) 
       }else  if(this.talent_pay_type=='lumpsum' && parseInt(this.fromhourlumpsum)>=(this.tohourlumpsum)){
 this.service.showErrorMessage({
        message:"Please enter correct payment range "
      })          }else  if(this.talent_pay_type=='salary_based' && parseInt(this.fromhoursalary)>=(this.tohoursalary)){
 this.service.showErrorMessage({
        message:"Please enter correct payment range "
      })     }
        else  if(parseInt(this.minimum_hour_week)>=(this.maximum_hour_week)){
 this.service.showErrorMessage({
        message:"Mininum hours/week can not be greater than Maximum hours/week "
      })}
        else  if(parseInt(this.maximum_hour_week)-(this.minimum_hour_week)>168){
 this.service.showErrorMessage({
        message:"Total hours should be less than 168 "
      })
      }
      else if(this.maximum_hour_week>168){
       this.service.showErrorMessage({
        message:"Maximum hours should be less than 168 "
      })
      }else if(this.minimum_hour_week>168){
       this.service.showErrorMessage({
        message:"Minimum hours should be less than 168 "
      })
      }else {
      const job_id = localStorage.getItem("job_id");
    if(localStorage.getItem('job_talent_id')){
        var obj={
        job_id:job_id,

discipline: localStorage.getItem('discipline'),
    whole_project:localStorage.getItem('whole_project'),
country:JSON.parse(localStorage.getItem('country')),
state:JSON.parse(localStorage.getItem('state')),
city:JSON.parse(localStorage.getItem('city')),
specialities: JSON.parse(localStorage.getItem('selectedSpecialities')),
traditional_service:JSON.parse(localStorage.getItem('TraditionalServices')),
digital_service:JSON.parse(localStorage.getItem('digitalServices')),
skills:JSON.parse(localStorage.getItem('industryKnowledgeSkills')),
tool_skills: JSON.parse(localStorage.getItem('tool_skills')),
talent_required:1,
    talent_location:localStorage.getItem('talent_location'),
english_level:localStorage.getItem('english_level'),
    job_success_score:localStorage.getItem('job_success'),
    amount_earned :localStorage.getItem('amount_earned'),
    talent_pay_type:localStorage.getItem('talent_pay_type'),
from_hour: localStorage.getItem('from_hour'),
to_hour :localStorage.getItem('to_hour'),
timeline_start_date:localStorage.getItem('fromdate'),
timeline_end_date: localStorage.getItem('todate'),
job_talent_id: localStorage.getItem('job_talent_id'),
interpersonal_skills: JSON.parse(localStorage.getItem('interpersonalskill')),
address: localStorage.getItem('address'),
job_start:localStorage.getItem('job_start'),
maximum_hour_week:localStorage.getItem('maximum_hour_week'),
sectors:JSON.parse(localStorage.getItem('selected_sectors')),
level_of_talent: localStorage.getItem('talent_level'),
additional_requirements: this.additional_req,
salary_based_type:localStorage.getItem('salary_based_type'),
minimum_hour_week:localStorage.getItem('minimum_hour_week') ,
talent_duration:localStorage.getItem('talent_duration')
}
    console.log(obj)
    
    this.service.saveTalentDetails(obj).subscribe(async res => {
    this.router.navigate(['/project-title-guest'])

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
    
  }else{
          var req={
        job_id:job_id,

discipline: localStorage.getItem('discipline'),
    whole_project:localStorage.getItem('whole_project'),
country:JSON.parse(localStorage.getItem('country')),
state:JSON.parse(localStorage.getItem('state')),
city:JSON.parse(localStorage.getItem('city')),
specialities: JSON.parse(localStorage.getItem('selectedSpecialities')),
traditional_service:JSON.parse(localStorage.getItem('TraditionalServices')),
digital_service:JSON.parse(localStorage.getItem('digitalServices')),
skills:JSON.parse(localStorage.getItem('industryKnowledgeSkills')),
tool_skills: JSON.parse(localStorage.getItem('tool_skills')),
talent_required:1,
    talent_location:localStorage.getItem('talent_location'),
english_level:localStorage.getItem('english_level'),
    job_success_score:localStorage.getItem('job_success'),
    amount_earned :localStorage.getItem('amount_earned'),
    talent_pay_type:localStorage.getItem('talent_pay_type'),
from_hour: localStorage.getItem('from_hour'),
to_hour :localStorage.getItem('to_hour'),
timeline_start_date:localStorage.getItem('fromdate'),
timeline_end_date: localStorage.getItem('todate'),
interpersonal_skills: JSON.parse(localStorage.getItem('interpersonalskill')),
address: localStorage.getItem('address'),
job_start:localStorage.getItem('job_start'),
maximum_hour_week:localStorage.getItem('maximum_hour_week'),
sectors:JSON.parse(localStorage.getItem('selected_sectors')),
level_of_talent: localStorage.getItem('talent_level'),
additional_requirements:this.additional_req,
salary_based_type:localStorage.getItem('salary_based_type'),
minimum_hour_week:localStorage.getItem('minimum_hour_week'),
talent_duration:localStorage.getItem('talent_duration')




    }
    console.log(req)
    
    this.service.saveTalentDetails(req).subscribe(async res => {
    this.job_talent_id=res.resp._id;
    localStorage.setItem('job_talent_id',this.job_talent_id)
    this.router.navigate(['/project-title-guest'])

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
  }
    }
  }
     compareMxTwoDates(){
  console.log("test")
   if(new Date(this.minimum_hour_week) >= new Date(this.maximum_hour_week)){
      this.error={isError:true,errorMessage:'Start date and End date can not be same'};
      console.log(this.error)
   }else{
   this.error={isError:false};
      console.log(this.error)
   }
}

    compareTwoDates(){
  console.log("test")
   if(new Date(this.from_hour) >= new Date(this.to_hour)){
      this.error={isError:true,errorMessage:'Start date and End date can not be same'};
      console.log(this.error)
   }else{
   this.error={isError:false};
      console.log(this.error)
   }
}
}
