import { Component, OnInit } from '@angular/core';
import { Service } from '../../service/service.service';

@Component({
  selector: 'app-client-left-sidebar-guest',
  templateUrl: './client-left-sidebar-guest.component.html',
  styleUrls: ['./client-left-sidebar-guest.component.scss']
})
export class ClientLeftSidebarGuestComponent implements OnInit {

common_profile
discipline
speciality
dig_services
trad_ser
talent_location
industry
tools_tech
interpersonal
english_level
  constructor(private service : Service) { }

  ngOnInit(): void {
	  var body = document.body;
	  body.classList.remove("mystyle");
	  this.getProfile();
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
	getProfile(){
	    const job_id = localStorage.getItem("job_id");

		this.service.getJobDetail(job_id).subscribe(resp => {
			
			this.common_profile = resp.details;
			if(resp.details.job_talents.length){
				this.discipline= resp.details.job_talents[0].discipline
			this.speciality= resp.details.job_talents[0].specialities
			this.dig_services = resp.details.job_talents[0].digital_service
			this.trad_ser= resp.details.job_talents[0].traditional_service
			this.english_level= resp.details.job_talents[0].english_level
			this.talent_location=resp.details.job_talents[0].talent_location
			this.interpersonal= resp.details.job_talents[0].interpersonal_skills
			this.industry= resp.details.job_talents[0].skills
			this.tools_tech = resp.details.job_talents[0].tool_skills
			}
		

			console.log("common profile ============ ",this.common_profile)
		},(error) => {

			this.service.handleError(error)

		})

	}

}
