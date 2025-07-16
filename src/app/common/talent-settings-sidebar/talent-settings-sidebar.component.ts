import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-talent-settings-sidebar',
  templateUrl: './talent-settings-sidebar.component.html',
  styleUrls: ['./talent-settings-sidebar.component.scss']
})
export class TalentSettingsSidebarComponent implements OnInit {

  @Input()  activeModule: any;
  @Input()  currentM: any;
  @Input()  tab: any = 0;
  @Output() newItemEvent = new EventEmitter<string>();

  constructor() { }

  //tab = 0

  ngOnInit(): void {
  var body = document.body;
  	body.classList.remove("mystyle");
  }

  goToTab(tab){
	  this.tab = tab
    console.log("Gone to -> ",tab);
	  this.newItemEvent.emit(tab);
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
