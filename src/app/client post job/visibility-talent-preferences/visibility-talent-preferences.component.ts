import { Component, OnInit } from '@angular/core';
import { Service } from "../../service/service.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from  "@angular/router";
import { Router, CanActivate } from '@angular/router';
import { EmailExistComponent } from "./../../common/snackbar/email_exist/email.component";
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-visibility-talent-preferences',
  templateUrl: './visibility-talent-preferences.component.html',
  styleUrls: ['./visibility-talent-preferences.component.scss']
})
export class VisibilityTalentPreferencesComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  currencies = [];
  currency = "";
  jobDetail = null;
  pay_type = "hourly";
  totalTalents = [];
  error:any={isError:false,errorMessage:''};

  minDate = new Date();
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
  constructor(public router: Router,private service : Service,private _snackBar: MatSnackBar,private fb: FormBuilder) {
    // window.service = this.service
    this.form = this.fb.group({
      // pay_type: ['', Validators.required],
      job_start_date: ['', Validators.required],
      job_end_date: ['', Validators.required],
    })

  

    if(localStorage.getItem("talents")){

      this.totalTalents = JSON.parse(localStorage.getItem("talents"))

    }

  }

  // constructor() { }

  ngOnInit(): void {
    this.getCurrencies();
    this.getJobDetail();
  
  }




  getJobDetail(){

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
		  console.log(res)

			// this.form.setValue({
			// 	title: res.details && res.details.title ? res.details.title : "",
			// 	description: res.details && res.details.description ? res.details.description : "",
			// });

			if(res.details){
        // pay_type = res.details.pay_type;
        this.form.setValue({
          // pay_type: res.details && res.details.pay_type ? res.details.pay_type : "",
          job_start_date: res.details && res.details.job_start_date ? res.details.job_start_date : "",
          job_end_date: res.details && res.details.job_end_date ? res.details.job_end_date : "",
        });
      }

      if(res.details && res.details.currency){
        this.currency = res.details.currency;
      }

      if(res.details && res.details.pay_type){
        this.pay_type = res.details.pay_type;
      }

		//   if(res.details.description){
		// 	  alert(res.details.description)
		// 	this.form.setValue({
		// 		description: res.details.description,
		// 	});
		//   }

		//   if(res.details.visibility){
		// 	this.visibility = res.details.visibility;
		//   }



	    },(err) => {
	      this.isLoading = false
	      this.service.handleError(err)
	      console.log(err)
	    })
    }else{
    	this.jobDetail = null;
    }
  }

  getCurrencies(){

    this.service.getCurrencies().subscribe(async res => {
      this.isLoading = false
      console.log("currencies res =================== ",res)
      this.currencies = res.currencies;

    },(err) => {
      console.log("currencies err =================== ",err)
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
      //this.isLoading = false
    })

  }
  compareTwoDates(){
  console.log("test")
   if(new Date(this.form.controls['job_start_date'].value) >= new Date(this.form.controls['job_end_date'].value)){
      this.error={isError:true,errorMessage:'Start date and End date can not be same'};
      console.log(this.error)
   }else{
   this.error={isError:false};
      console.log(this.error)
   }
}
  createJobPostStep3(){
    console.log("here step3 ===================== ")
    this.isLoading = true;

     if(new Date(this.form.controls['job_start_date'].value) >= new Date(this.form.controls['job_end_date'].value)){
      this.error={isError:true,errorMessage:'Start date and End date can not be same'};
   }
    else{
        const form = {
      // pay_type : this.form.controls['pay_type'].value,
      pay_type : this.pay_type,
      job_start_date : this.form.controls['job_start_date'].value,
      job_end_date : this.form.controls['job_end_date'].value,
      job_id : localStorage.getItem("job_id"),
      currency : this.currency,
    }
    	console.log("form ================== ",form)

    this.service.createJobPostStep3(form).subscribe(async res => {
    	console.log("res ================== ",res)
      // const snackBarRef = this._snackBar.open("Job created successfully","Post Job", {
      //   duration: undefined,
      // });
      // // localStorage.setItem("job_id",res._id),
      // snackBarRef.onAction().subscribe(() => {
      //   this.router.navigate(['talent-preferences']);
      // });
      // this.service.showSuccessMessage({
      //   message : "Job posted successfully"
      // })

       this.router.navigate(['talent-preferences']);

      // localStorage.removeItem("job_id");

      // this.router.navigate(['/']);

      this.isLoading = false;


      // this.router.navigate(['login']);
    },(err) => {
      this.isLoading = false;
        this.service.handleError(err)
        console.log(err)
    })
  }
    }


}
