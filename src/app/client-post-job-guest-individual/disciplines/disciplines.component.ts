import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Router, CanActivate } from '@angular/router';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { Service } from "./../../service/service.service";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss']
})
export class DisciplinesComponent implements OnInit {

  isLoading: boolean;
  list : [] = []
  items = [1,54,65,5,52,5,2,635,2]
  selected_discipline : String
  env = environment
  totalTalents=[]
  constructor(
    public service : Service,
    public router: Router,
    private _snackbar : MatSnackBar,
    private sanitizer:DomSanitizer
    ) {
      this.service.sideBarHeight = 10; 
      if(localStorage.getItem("discipline")){
        this.selected_discipline = localStorage.getItem("discipline");
      }
      console.log("selected discipline =============== ",this.selected_discipline)
    }
  // constructor() { }

  ngOnInit(): void {
    this.getDisciplineList();
    this.getJobDetail();
  }

   getJobDetail(){

		const job_id = localStorage.getItem("job_id");
		if (job_id && job_id!=undefined) {
	    this.service.getJobDetail(job_id).subscribe(async res => {
	      this.isLoading = false 
	      console.log("jobDetail res =================== ",res)
                  this.selected_discipline = res.details.job_talents[0].discipline;
                  console.log(this.selected_discipline)
	    },(err) => {
	      console.log("jobDetail err =================== ",err)
	      this.isLoading = false
	      this.service.handleError(err)
	      console.log(err)
	      //this.isLoading = false
	    })
    }else{
    	console.log("else job id ==============")
    }
  }
  getDisciplineList(){

    this.service.getDisciplineList().subscribe(async res => {
      this.isLoading = false 
      this.list = res.list;
      console.log("discipline list ==================== ",this.list)
    },(err) => {
      this.isLoading = false
      this.service.handleError(err)
      console.log(err)
      //this.isLoading = false
    })

  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  selectDiscipline(discipline){
      localStorage.setItem("talents",JSON.stringify(this.totalTalents))

    this.selected_discipline = discipline._id;
    localStorage.setItem("discipline",discipline._id);
    localStorage.setItem("discipline_name",discipline.discipline);

    this.router.navigate(["speciality",discipline._id,discipline.discipline_slug]);
  }
}
