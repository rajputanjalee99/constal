import { Component, OnInit } from '@angular/core';
import { Service } from '../../service/service.service';


@Component({
  selector: 'app-talent-sidebar',
  templateUrl: './talent-sidebar.component.html',
  styleUrls: ['./talent-sidebar.component.scss']
})
export class TalentSidebarComponent implements OnInit {

  constructor(public service: Service) { }

  common_profile

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

		this.service.getUserProfile().subscribe(resp => {
			
			this.common_profile = resp.profile;
			console.log("common profile ============ ",this.common_profile)
		},(error) => {

			this.service.handleError(error)

		})

	}

}
