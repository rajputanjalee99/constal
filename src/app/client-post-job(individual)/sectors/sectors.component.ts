import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { Service } from "./../../service/service.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {

  discipline_id: string;
  sectorName: string;
  sector_list = [];
  activeIndex: number = null;
  selectedIcon: string;
  selectedSectorId: string = '';
  showModal = false;

  constructor(public service : Service, public route : ActivatedRoute,
    private sanitizer:DomSanitizer,
    public router: Router) {
      this.service.sideBarHeight = 40; 
      if(localStorage.getItem("sector")){
        this.selectedSectorId = localStorage.getItem("sector");
      }
    }

  ngOnInit(): void {
    this.getDisciplineSectors();
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getDisciplineSectors(){
    console.log("discipline ======== ",localStorage.getItem("discipline"))
    this.service.getTalentDisciplineSectors(localStorage.getItem("discipline")).subscribe(res => {
      this.sector_list = res.sectors;
      console.log('res ======== ',res);
    },(error) => {
      this.service.handleError(error);
    })
  }

  selectSector(sector, index){
    this.selectedSectorId = sector._id
    this.activeIndex = index;
    localStorage.setItem("sector",sector._id)
    localStorage.setItem("sector_name",sector.name)
  }
  
  saveSector(){
    if(!this.selectedSectorId){
      return this.service.showErrorMessage({ message : "Please choose any one sector", action : "Okay"})
    }
    const obj = {
      discipline_sectors: this.selectedSectorId
    }
    this.service.addTalentSector(obj).subscribe(async res => {
      console.log(res);
      this.router.navigate(["/qualifications"]);
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

}
