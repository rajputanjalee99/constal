import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-settings-sidebar',
  templateUrl: './client-settings-sidebar.component.html',
  styleUrls: ['./client-settings-sidebar.component.scss']
})
export class ClientSettingsSidebarComponent implements OnInit {

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
