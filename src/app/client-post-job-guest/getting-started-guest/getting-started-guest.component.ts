import { Component, OnInit } from '@angular/core';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from  "@angular/router";
import { Router, CanActivate } from '@angular/router';
import { EmailExistComponent } from "./../../common/snackbar/email_exist/email.component";

import { RightSidebarComponent } from "../../common/right-sidebar/right-sidebar.component";


@Component({
  selector: 'app-getting-started-guest',
  templateUrl: './getting-started-guest.component.html',
  styleUrls: ['./getting-started-guest.component.scss']
})
export class GettingStartedGuestComponent implements OnInit {

 	form: FormGroup;
  isLoading = false;
  jobDetail = null;
  job_post_type = "new";
  totalTalents = [];
  talents = [];
  draftedJobs = [];
  postedJobs = [];
  jobTitle = "";
  existing_job_id = "";
  reuse_job_id = "";
  job_people_type = "team";
  no_of_talent_type = "multiple";
  chartTalents : any;
  talentLevels = [];
  currentIndex = 0;
  totalpositions =[];
  disciplineId: any;
  tPosition='';

  constructor(public router: Router,private service : Service,private _snackBar: MatSnackBar,private fb: FormBuilder) {
    // window.service = this.service
    this.form = this.fb.group({
      // job_post_type: ['', Validators.requiredTrue],    
      total_talents_required: ['', Validators.required],   
              talent_position: ['', Validators.required],   
      talent_level: ['', Validators.required],   
      talent_required: ['', Validators.required]

    }) 

    const total_talents_data = localStorage.getItem("talents");
    if (total_talents_data && total_talents_data!=undefined) {
      console.log("total_talents_data ===================== ",JSON.parse(total_talents_data))
      this.totalTalents = JSON.parse(total_talents_data);
    }

    const job_typ = localStorage.getItem("job_post_type");
    if (job_typ && job_typ!=undefined) {
      this.job_post_type = localStorage.getItem("job_post_type");
    }

    const exist_job_id = localStorage.getItem("existing_job_id");
    if (exist_job_id && exist_job_id!=undefined) {
      this.existing_job_id = localStorage.getItem("existing_job_id");
    }

    const ruse_job_id = localStorage.getItem("reuse_job_id");
    if (ruse_job_id && ruse_job_id!=undefined) {
      this.reuse_job_id = localStorage.getItem("reuse_job_id");
    }

    const no_of_talent_typ = localStorage.getItem("no_of_talent_type");
    if (no_of_talent_typ && no_of_talent_typ!=undefined) {
      this.no_of_talent_type = localStorage.getItem("no_of_talent_type");
    }

  }

  // constructor() { }



  ngOnInit(): void {

  var body = document.body;
  body.classList.remove("mystyle");


  	this.getJobDetail();
    this.getPostedJobs();
    this.getTalentLevels();
    this.getPosition();
      localStorage.removeItem("discipline_name")
      localStorage.removeItem("sector_name")
      localStorage.removeItem("discipline")
      localStorage.removeItem("sector")
      localStorage.removeItem("no_of_talent_type")
      localStorage.removeItem("reuse_job_applied")
      localStorage.removeItem("job_post_type")
      localStorage.removeItem('discipline')
   localStorage.removeItem('whole_project')
localStorage.removeItem('country')
localStorage.removeItem('state')
localStorage.removeItem('city')
localStorage.removeItem('selectedSpecialities')
localStorage.removeItem('TraditionalServices')
localStorage.removeItem('digital_service')
localStorage.removeItem('industryKnowledgeSkills')
localStorage.removeItem('tool_skills')
localStorage.removeItem('talent_location')
localStorage.removeItem('english_level')
localStorage.removeItem('job_success')
localStorage.removeItem('amount_earned')
localStorage.removeItem('talent_pay_type')
localStorage.removeItem('from_hour')
localStorage.removeItem('to_hour')
localStorage.removeItem('fromdate')
localStorage.removeItem('todate')
localStorage.removeItem('job_talent_id')
localStorage.removeItem('selected_sectors')
localStorage.removeItem('interpersonalskill')
localStorage.removeItem('sessionID')
localStorage.removeItem('digitalServices')
localStorage.removeItem('address')
localStorage.removeItem('job_start')
localStorage.removeItem('talent_duration')
localStorage.removeItem('talent_level')
localStorage.removeItem('maximum_hour_week')
localStorage.removeItem('minimum_hour_week')
var id = new Date().getTime() ;    
var sessionId= id.toString()
console.log("id",sessionId)
      localStorage.setItem('sessionID',sessionId)

  
  }
  
  openNav() {
    document.getElementById("mySidenav").style.width = "284px";
    // $(body).addClass("opacity-bg");
    var body = document.body;
    body.classList.add("mystyle");
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    // document.body.addClass("opacity-bg");
    var body = document.body;
    body.classList.remove("mystyle");
  }
  
  getTalentLevels(){
    this.service.getTalentLevels().subscribe(async res => {
      this.isLoading = false 
      console.log("talent levels ============= ",res.data)
      this.talentLevels = res.data;
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }

  getPostedJobs(){
    let formData = {};
    this.service.getPostedJobs(formData).subscribe(async res => {
      this.isLoading = false 
      this.draftedJobs = res.draftedJobs;
      this.postedJobs = res.postedJobs;

    },(err) => {
      console.log("jobDetail err =================== ",err)
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }

  getJobDetail(){

		const job_id = localStorage.getItem("job_id");
		if (job_id && job_id!=undefined) {
	    this.service.getJobDetail(job_id).subscribe(async res => {
	      this.isLoading = false 
	      console.log("jobDetail res =================== ",res)
        this.jobDetail = res.details;

  
        for(let i=1;i<=  res.details.total_talents_required; i++){
              this.form.setValue({
                        total_talents_required:res.details.total_talents_required, 

          talent_position: '',
          talent_level: '',
          talent_required: ''
        });
        }
        console.log('this.form',this.form)
        if (res.details && res.details.job_talents.length) {
          console.log("else if =====================")
          // this.totalTalents = this.getTotalTalentArr(res.details.total_talents_required);
          this.totalTalents = this.addParamsInTotalTalentArr(res.details.job_talents);
          // this.totalTalents = res.details.job_talents;
          localStorage.setItem("talents",JSON.stringify(this.totalTalents))
          console.log("totalTalents detail ================== ",this.totalTalents);
        }else if (res.details && res.details.total_talents_required) {
          console.log("else else if =====================")
          this.totalTalents = this.getTotalTalentArr(res.details.total_talents_required);
          console.log("totalTalents detail ================== ",this.totalTalents)

        }

	    },(err) => {
	      console.log("jobDetail err =================== ",err)
	      this.isLoading = false
	      this.service.handleError(err)
	      console.log(err)
	      //this.isLoading = false
	    })
    }else{
    	console.log("else job id ==============")
    	this.jobDetail = null;
    }
  }

  setJobId(jobId){
    console.log("changed job id =================",jobId)
    localStorage.setItem("job_id",jobId);
    localStorage.setItem("existing_job_id",jobId);
    this.getJobDetail();
  }

  setReuseJobId(jobId){
    console.log("changed job id =================",jobId)
    localStorage.setItem("job_id",jobId);
    localStorage.setItem("reuse_job_id",jobId);
    this.getJobDetail();
  }

  clearPostJob(){
    localStorage.removeItem("job_id");
    localStorage.removeItem("reuse_job_id");
    localStorage.removeItem("existing_job_id");
    this.totalTalents = [];
    this.form.controls['total_talents_required'].setValue("");
    console.log("clear job function =============== ")
  }

  createJobPostStep1(){    
    
    localStorage.setItem("talents",JSON.stringify(this.totalTalents))
    console.log("talents ===================== ",localStorage.getItem("talents"))
    
    this.isLoading = true;  

    const job_id = localStorage.getItem("job_id");
    console.log("job_id ===================== ",job_id)
    
    const form = {
      job_post_type : this.job_post_type,
      total_talents_required : parseInt(this.form.controls['total_talents_required'].value),
      job_id : "",
      no_of_talent_type : this.no_of_talent_type,
      job_type : 'team',
      client_user_id: localStorage.getItem("client_user_id"),
      session_id: localStorage.getItem("sessionID")
    }

    if((this.job_post_type && this.job_post_type!="reuse") || (localStorage.getItem("reuse_job_applied") && localStorage.getItem("reuse_job_applied")=="yes")){
      form.job_id = localStorage.getItem("job_id");
    }
    
    console.log("form data ================ ",form)
    this.service.createJobPostStep1(form).subscribe(async res => {
      
      localStorage.setItem("job_id",res.resp._id);
      localStorage.setItem("reuse_job_applied","yes");

      localStorage.setItem("job_post_type",this.job_post_type);
      
      this.isLoading = false;
      if(this.no_of_talent_type=="single"){
        this.router.navigate(['discipline-guest']);
      }else{
        this.router.navigate(['post-title']);
      }
    },(err) => {
    	console.log("err ================== ",err)
      this.isLoading = false;

      if(err.status == 409){ // if email already exist 
        const snackBarRef = this._snackBar.open("Something went wrong", "Post Job", {
          duration: undefined,
        });
        snackBarRef.onAction().subscribe(() => {
          this.router.navigate(['getting-started']);
          // console.log('The snack-bar action was triggered!');
        });
        
      }else{
        this.service.handleError(err)
        console.log(err)
      }      
      //this.isLoading = false
    })
  }

  changetalentType(type){
    console.log("talent type ========== ",type)
    if(type=="single"){
      this.form.controls['total_talents_required'].setValue(1);
      this.totalTalents = [];
      this.totalTalents = this.getTotalTalentArr(1);
           const job_id = localStorage.getItem("job_id");
    console.log("job_id ===================== ",job_id)
    
    const form = {
      total_talents_required : 1,
      job_id : "",
            job_type : 'individual',
            client_user_id: localStorage.getItem("client_user_id"),
      session_id: localStorage.getItem("sessionID")
    }


    
    console.log("form data ================ ",form)
    this.service.createJobPostStep1(form).subscribe(async res => {
      
      localStorage.setItem("job_id",res.resp._id);
      localStorage.setItem("reuse_job_applied","yes");
      console.log(res.resp._id)
            this.router.navigate(['/discipline-guest/'+res.resp._id])

      this.isLoading = false;
     
    },(err) => {
    	console.log("err ================== ",err)
      this.isLoading = false;

       
      //this.isLoading = false
    })
    }else{
      this.form.controls['total_talents_required'].setValue("");
      this.totalTalents = [];
    }
    localStorage.setItem("no_of_talent_type",type);
  }

  getTalentVal(){
    if (this.form.controls['total_talents_required'].value) {
      console.log("talent val ================= ",parseInt(this.form.controls['total_talents_required'].value));
      console.log("talent val tr ================= ",this.form.controls['total_talents_required'].value);
      this.totalTalents = [];
      this.totalTalents = this.getTotalTalentArr(parseInt(this.form.controls['total_talents_required'].value));
      console.log("total talents ================== ",this.totalTalents)
    }else{
      this.totalTalents = [];
    }
  }

  getTotalTalentArr(totalTalentCount){
    for (let i = 1; i <= totalTalentCount; i++) {
        this.totalTalents.push({
          talent_no : "talent_"+i,
          talent_position : '',
          // level : "",
          talent_required : "",
          traditional_service : [],
          digital_service : [],
          specialities : [], 
          specialities_new : [], 
          new_tool_skills : [], 
          tool_skills : [], 
          skills : [], 
          new_skills : [], 
          talent_level : "", 
          english_level : "any_level",
          talent_location : "remotely",
          amount_earned : 100,
          pay_type : "hourly",
          job_success_score : 30,
          job_talent_id : "",
          job_id : "",
          from_hour : "",
          project_start_date : "",
          to_hour : "",
          project_end_date : "",
          specialities_full : [],
          onsite_location  :'',
          talent_pay_type :'',   
          maximum_hour_week : "",
              languages :{},  
          timeline_start_date:"",
          timeline_end_date:'',
          whole_project: ""
        });
      }
      return this.totalTalents;
  }

  addParamsInTotalTalentArr(totalTalents){
    const totalTalentCnt = totalTalents.length;
    for (let i = 0; i < totalTalentCnt; i++) {
      totalTalents[i].from_hour = "";
       totalTalents[i].talent_position = this.tPosition;
      totalTalents[i].to_hour = "";
      totalTalents[i].job_talent_id = totalTalents[i]._id;
      totalTalents[i].project_start_date = "";
      totalTalents[i].project_end_date = "";
      totalTalents[i].talent_no = "talent_"+i++;
      totalTalents[i].new_skills = [];
      totalTalents[i].new_tool_skills = [];
      totalTalents[i].skills = [];
      totalTalents[i].specialities_full = [];
      totalTalents[i].specialities_new = [];
      totalTalents[i].onsite_location = [];
      totalTalents[i].talent_pay_type = [];
      totalTalents[i].maximum_hour_week = [];
      totalTalents[i].timeline_start_date = [];
      totalTalents[i].timeline_end_date = [];
      totalTalents[i].whole_project = [];
      totalTalents[i].languages={}
    }
    return totalTalents;
  }

  receivename($event: string) {  

    this.chartTalents = $event
    console.log($event);
    
       
  } 

  deleteTalent(key){

    console.log("Delete Key => "+key);
    

  }



  getPosition(){
  this.service.getallPositions().subscribe(async (res:any) => {
      this.totalpositions=res.data;
      console.log(this.totalpositions)
        });
  }

    changePosition(e) {
    console.log(e.target.value)
    this.tPosition=e.target.value;
    console.log(this.tPosition)
    console.log(e.target.options.selectedIndex-1);
    var valueAtIndex1 = this.totalpositions[e.target.options.selectedIndex-1];
    console.log(valueAtIndex1.discipline_id)
    this.disciplineId= valueAtIndex1.discipline_id
    console.log(this.disciplineId)
    localStorage.setItem('disciplineId',this.disciplineId)
  }

  chageTalent(event){
        console.log(event)
  }


}
