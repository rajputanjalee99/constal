import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-agency-sidebar',
  templateUrl: './create-agency-sidebar.component.html',
  styleUrls: ['./create-agency-sidebar.component.scss']
})
export class CreateAgencySidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  	var body = document.body;
  	body.classList.remove("mystyle");

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

}
