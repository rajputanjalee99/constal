import { Component, OnInit } from '@angular/core';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-review-individual-guest',
  templateUrl: './post-review-individual-guest.component.html',
  styleUrls: ['./post-review-individual-guest.component.scss']
})
export class PostReviewIndividualGuestComponent implements OnInit {

  panelOpenState = false;
  currentIndex = 0;
  isLoading = false
	jobDetail
    jobtalent
    workers = []
    links=[]
  totalTalents = []
  disciplineName
  sectorName
  selectedSpecialities = []
  currentTalent
  files = []
  selectedTraditionalServices = []
  job_success_score
  english_level
  amtEarned
  location
  selectedDigitalServices = []
  timeline_start
  timeline_end
  address
  sectors
  additional_req
  talent_level
  skills
  tool_skills
  interpersonalskill
  country
  state
  city
  timeend
  talent_pay_type
  timestart
  from_hour
  to_hour
  
  salary_based_type
  constructor(public router: Router,private service : Service,private _snackBar: MatSnackBar,private fb: FormBuilder) {
    // // window.service = this.service
    // this.form = this.fb.group({
    //   // pay_type: ['', Validators.required],
    //   job_start_date: ['', Validators.required],
    //   job_end_date: ['', Validators.required],
    // })

    if(localStorage.getItem("talents")){
      this.totalTalents = JSON.parse(localStorage.getItem("talents"))
      console.log("total talents ================= ",this.totalTalents)
      this.selectedSpecialities = JSON.parse(localStorage.getItem('selectedSpecialities'))
    }

   

    if(localStorage.getItem("sector_name")){
      this.sectorName = localStorage.getItem("sector_name");
    }

  }

  ngOnInit(): void {
    this.getJobDetail();
  }

  saveJob(status){
    const job_id = localStorage.getItem("job_id");
    Swal.fire({
      title: 'Do you want to continue?',
      text: 'You will have to signup first',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
    const obj = {
      job_id : job_id,
      status : status,
    }

    this.service.saveTalentDetails(obj).subscribe(async res => {
       
      console.log("save job section =============== ")
      this.router.navigate(["sign-up-user-email"])

      localStorage.removeItem('job_id')
      localStorage.removeItem("talents")
      localStorage.removeItem("discipline_name")
      localStorage.removeItem("sector_name")
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
localStorage.removeItem('amtEarned')
localStorage.removeItem('todate')
localStorage.removeItem('job_talent_id')
localStorage.removeItem('digitalServices')
localStorage.removeItem('timeline_start_date')
localStorage.removeItem('timeline_end_date')
localStorage.removeItem('disciplineId')
localStorage.removeItem('selected_sectors')
localStorage.removeItem('interpersonalskill')

localStorage.removeItem('job_start')
localStorage.removeItem('talent_duration')
localStorage.removeItem('talent_level')
localStorage.removeItem('maximum_hour_week')
localStorage.removeItem('minimum_hour_week')


      this.isLoading = false;
      

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
   }else if (result.dismiss === Swal.DismissReason.cancel) {
       return;
      }
    })

  }

  getJobDetail(){

    const job_id = localStorage.getItem("job_id");
    if (job_id && job_id!=undefined) {
      this.service.getJobDetail(job_id).subscribe(async res => {
        this.isLoading = false
        this.jobDetail = res.details;
                        this.disciplineName=this.jobDetail.job_talents[0]["discipline"].discipline

                this.jobtalent = this.jobDetail.job_talents[0]["specialities"];
                  this.selectedTraditionalServices = this.jobDetail.job_talents[0]["traditional_service"];
        this.selectedDigitalServices = this.jobDetail.job_talents[0]["digital_service"];
                this.job_success_score = this.jobDetail.job_talents[0]["job_success_score"];
        this.english_level = this.jobDetail.job_talents[0]["english_level"].value;
        this.amtEarned = this.jobDetail.job_talents[0]["amount_earned"];
        this.location= this.jobDetail.job_talents[0]["talent_location"];
        this.timeline_start =   this.jobDetail.job_talents[0]["timeline_start_date"];
        this.timeline_end =this.jobDetail.job_talents[0]["timeline_end_date"];
        this.address= this.jobDetail.job_talents[0]["address"];
                this.workers= this.jobDetail["co_workers"];
                this.sectors=this.jobDetail.job_talents[0]["sectors"];
                this.talent_level=this.jobDetail.job_talents[0]["level_of_talent"];
                this.additional_req=this.jobDetail.job_talents[0]["additional_requirements"]
                this.skills=this.jobDetail.job_talents[0]["skills"]
                                this.tool_skills=this.jobDetail.job_talents[0]["tool_skills"]
                this.interpersonalskill=this.jobDetail.job_talents[0]["interpersonal_skills"]
                this.talent_pay_type=this.jobDetail.job_talents[0]["talent_pay_type"]
                this.links=this.jobDetail["links"]
                this.timestart=this.jobDetail.job_talents[0]['job_start']
                this.timeend=this.jobDetail.job_talents[0]['talent_duration']
                 this.from_hour= this.jobDetail.job_talents[0]["from_hour"]
                                this.to_hour= this.jobDetail.job_talents[0]["to_hour"]
                                this.salary_based_type=this.jobDetail.job_talents[0]["salary_based_type"]
                                this.country=this.jobDetail.job_talents[0]["country"].name

              
                                                this.city=this.jobDetail.job_talents[0]["city"].name


                                this.state= this.jobDetail.job_talents[0]["state"].name

                                                               

                
        console.log("w",this.jobDetail)
        if(res.details && res.details.project_files.length){
				  this.files = res.details.project_files
			  }
        console.log("job detail ====================== ",this.jobDetail)
        console.log("job detail files ====================== ",this.jobDetail.job_talents[this.currentIndex])

      },(err) => {
        this.isLoading = false
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      this.jobDetail = null;
    }
  }

}
