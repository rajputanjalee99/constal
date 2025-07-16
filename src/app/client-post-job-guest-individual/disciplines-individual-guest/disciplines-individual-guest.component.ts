import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Router, CanActivate } from '@angular/router';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { Service } from "./../../service/service.service";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-disciplines-individual-guest',
  templateUrl: './disciplines-individual-guest.component.html',
  styleUrls: ['./disciplines-individual-guest.component.scss']
})
export class DisciplinesIndividualGuestComponent implements OnInit {

  isLoading: boolean;
  list : [] = []
  items = [1,54,65,5,52,5,2,635,2]
  selected_discipline : String
  env = environment
  totalTalents=[]
  job_talent_id=''
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

    if(localStorage.getItem("discipline")){
        this.selected_discipline = localStorage.getItem("discipline");
        console.log('selectDiscipline',this.selected_discipline)
      }
  }

   getJobDetail(){

		const job_id = localStorage.getItem("job_id");
		if (job_id && job_id!=undefined) {
	    this.service.getJobDetail(job_id).subscribe(async res => {
	      this.isLoading = false 
	      console.log("jobDetail res =================== ",res)
          if(res.details.job_talents.length){
          this.selected_discipline = res.details.job_talents[0].discipline.id;
          localStorage.setItem("discipline",res.details.job_talents[0].discipline.id)

                  localStorage.setItem('job_talent_id',res.details.job_talents[0]._id)
                  console.log("se",this.selected_discipline)
                  if(localStorage.getItem("discipline")==res.details.job_talents[0].discipline.id){
                                        localStorage.removeItem('selectedSpecialities')

                  }else{
                                                          localStorage.removeItem('selectedSpecialities')

                  }
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
      		const job_id = localStorage.getItem("job_id");

    this.selected_discipline = discipline._id;
    localStorage.setItem("discipline",discipline._id);
    localStorage.setItem("discipline_name",discipline.discipline);


      if(localStorage.getItem('job_talent_id')){
        var obj={
        job_id:job_id,

discipline: localStorage.getItem('discipline'),
job_talent_id: localStorage.getItem('job_talent_id')

   
    }
    console.log(obj)
    
    this.service.saveTalentDetails(obj).subscribe(async res => {
       this.router.navigate(["speciality-guest",discipline._id,discipline.discipline_slug]);

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
    
  }else{
          var req={
        job_id:job_id,

discipline: localStorage.getItem('discipline'),
   
    }
    console.log(req)
    
    this.service.saveTalentDetails(req).subscribe(async res => {
    this.job_talent_id=res.resp._id;
    localStorage.setItem('job_talent_id',this.job_talent_id)
       this.router.navigate(["speciality-guest",discipline._id,discipline.discipline_slug]);

    },(err) => {

      this.isLoading = false;
      this.service.handleError(err)

    })
  }
    }

}
