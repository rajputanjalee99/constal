import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Service } from "./../../service/service.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-choose-sectors',
  templateUrl: './choose-sectors.component.html',
  styleUrls: ['./choose-sectors.component.scss']
})
export class ChooseSectorsComponent implements OnInit {

  discipline_id: string;
  sectorName: string;
  sector_list = [];
  activeIndex: number = null;
  selectedIcon: string;
  selectedSectorId: string = '';
  selectedSectors = [];
  showModal = false;
  constructor(public service : Service, public route : ActivatedRoute,
    private sanitizer:DomSanitizer,
    public router: Router) {
      this.service.sideBarHeight = 30;
      this.service.page = "choose-sectors"; }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(){
    this.service.getUserProfile().subscribe(async res => {
      this.discipline_id = res.profile.talent_category_data.discipline_id;
      this.service.profile = res.profile;
      this.getDisciplineSectors();
      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.discipline_id) {
        this.selectedSectors = res.profile.talent_category_data.discipline_sectors;
      }
      
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getDisciplineSectors(){
    this.service.getTalentDisciplineSectors(this.discipline_id).subscribe(res => {
      this.sector_list = res.sectors;
      console.log('res',res);
    },(error) => {
      this.service.handleError(error);
    })
  }
  selectSector(sector, index){
    this.selectedSectorId = sector._id;
    this.activeIndex = index;
        
    const sectors = this.selectedSectors;
    const result = sectors.filter(s => s.includes(sector._id));
    if(!result.length){
      this.selectedSectors.push(sector._id);
    }else{
      this.selectedSectors.splice(sector._id,1);
    }
    
  }

  chooseSector(_id){

    this.selectedSectors.push(_id)
  }

  removeSector(_id){

    let index = this.selectedSectors.findIndex((item) => {
      return item == _id
    });
    this.selectedSectors.splice(index,1)
  }

  saveSector(){
    
    if(!this.selectedSectors.length){
      return this.service.showErrorMessage({ message : "Please choose any one sector", action : "Okay"})
    }
    const obj = {
      discipline_sectors: this.selectedSectors
    }
    this.service.addTalentSector(obj).subscribe(async res => {
      
      this.updateProfilePercentage();
      this.router.navigate(["/qualifications"]);

    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }
  
  saveNewSector(){
    const obj = {
      name: this.sectorName,
      icon: this.selectedIcon,
      discipline_id: this.discipline_id
    }
    this.service.addNewSector(obj).subscribe(async res => {
      this.sector_list.push(res.added);
      console.log(res);
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  closeModal(){
    this.showModal = false;
    this.selectedIcon = '';
    this.sectorName = '';
  }

  updateProfilePercentage(){

    const obj = { 
      percentage: 40
    }
    this.service.updateProfilePercentage(obj).subscribe(async res => {
      // this.isLoading = false 
    },(err) => {
      // this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }


}
