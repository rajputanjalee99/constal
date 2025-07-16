import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from  "@angular/router";
import { Router, CanActivate } from '@angular/router';
import { EmailExistComponent } from "./../../common/snackbar/email_exist/email.component";
declare let $ : any
@Component({
  selector: 'app-review-post-guest',
  templateUrl: './review-post-guest.component.html',
  styleUrls: ['./review-post-guest.component.scss']
})
export class ReviewPostGuestComponent implements OnInit {

 	panelOpenState = false;
  isLoading = false
	jobDetail
  totalTalents = []
  constructor(public router: Router,private service : Service,private _snackBar: MatSnackBar,private fb: FormBuilder) {
    // // window.service = this.service
    // this.form = this.fb.group({
    //   // pay_type: ['', Validators.required],
    //   job_start_date: ['', Validators.required],
    //   job_end_date: ['', Validators.required],
    // })

    if(localStorage.getItem("talents")){

      this.totalTalents = JSON.parse(localStorage.getItem("talents"))

    }

  }

  ngOnInit(): void {
    this.getJobDetail();
  }

  saveJob(status){
    const job_id = localStorage.getItem("job_id");

    const obj = {
      job_id : job_id,
      status : status,
    }

    this.service.saveTalentDetails(obj).subscribe(async res => {

      console.log("save job section =============== ")
      this.router.navigate(["job-listing"])

      localStorage.removeItem('job_id')
      localStorage.removeItem("talents")

      this.isLoading = false;
      this.service.showErrorMessage({
        message:"Success.."
      })

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })


  }

  getJobDetail(){

    const job_id = localStorage.getItem("job_id");
    if (job_id && job_id!=undefined) {
      this.service.getJobDetail(job_id).subscribe(async res => {
        this.isLoading = false
        this.jobDetail = res.details;
        console.log("jobdetails",this.jobDetail)
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
