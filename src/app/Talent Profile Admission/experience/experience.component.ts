import { Component, OnInit } from '@angular/core';
import { Service } from '../../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienceModel, RecievedRecommendationsModel, WorkRecordModel } from './experience';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  isLoading: boolean = true;
  experienceModel = new ExperienceModel();
  workRecordModel = new WorkRecordModel();
  recievedRecommendationsModel = new RecievedRecommendationsModel();

  sector_name: any

  experience_list = [];
  recommendations_list = [];
  employment_list = [];
  relationship_list = [];
  position_list = [];
  talent_level_list = [];
  selectedIndexBinding = 0;
    myFiles:string [] = [];

  profile
  
  regional_list = [{name: 'Africa', flag: false},{name: 'Asia', flag: false},{name: 'Europe', flag: false},{name: 'Middle East', flag: false},
  {name: 'North America', flag: false},{name: 'Oceania', flag: false},{name: 'South America', flag: false}];

  year_list = [{name: 1990},{name: 1991},{name: 1992},{name: 1993},{name: 1994},{name: 1995},{name: 1996},{name: 1997},{name: 1998},{name: 1999},{name: 2000},{name: 2001},{name: 2002},{name: 2003},{name: 2004},{name: 2005},{name: 2006},{name: 2007},{name: 2008},{name: 2009},{name: 2010}
    ,{name: 2011},{name: 2012},{name: 2013},{name: 2014},{name: 2015},{name: 2016},{name: 2017},{name: 2018},{name: 2019},{name: 2020},
    {name: 2021}];

  year_list1 = [{name: 1990},{name: 1991},{name: 1992},{name: 1993},{name: 1994},{name: 1995},{name: 1996},{name: 1997},{name: 1998},{name: 1999},{name: 2000},{name: 2001},{name: 2003},{name: 2004},{name: 2005},{name: 2006},{name: 2007},{name: 2008},{name: 2009},{name: 2010}
    ,{name: 2011},{name: 2012},{name: 2013},{name: 2014},{name: 2015},{name: 2016},{name: 2017},{name: 2018},{name: 2019},{name: 2020},{name: 2021},{name: 2022},{name: 2023},{name: 2024},{name: 2025},{name: 2026},{name: 2027},{name: 2028},{name: 2029},{name: 2030}
      ,{name: 2031},{name: 2032},{name: 2033},{name: 2034},{name: 2035},{name: 2036},{name: 2037},{name: 2038},{name: 2039},{name: 2040},
      {name: 2041},{name: 2042},{name: 2043},{name: 2044},{name: 2045},{name: 2046},{name: 2047},{name: 2048},{name: 2049},{name: 2050}
      ,{name: 2051},{name: 2052},{name: 2053},{name: 2054},{name: 2055},{name: 2056},{name: 2057},{name: 2058},{name: 2059},{name: 2060},
      {name: 2061},{name: 2062},{name: 2063},{name: 2064},{name: 2065},{name: 2066},{name: 2067},{name: 2068},{name: 2069},{name: 2070}
      ,{name: 2071},{name: 2072},{name: 2073},{name: 2074},{name: 2075},{name: 2076},{name: 2077},{name: 2078},{name: 2079},{name: 2080},
      {name: 2081},{name: 2082},{name: 2083},{name: 2084},{name: 2085},{name: 2086},{name: 2087},{name: 2088},{name: 2089},{name: 2090}
      ,{name: 2091},{name: 2092},{name: 2093},{name: 2094},{name: 2095},{name: 2096},{name: 2097},{name: 2098},{name: 2099}];

  month_list = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: 6},{name: 7},
    {name: 8},{name: 9},{name: 10},{name: 11},{name: 12}];
    
  constructor(public service : Service, public route : ActivatedRoute,
    public router: Router,private sanitizer:DomSanitizer) {  

      this.service.sideBarHeight = 70; 
      this.service.sideBarHeight = 30;

      this.profile = this.service.loggedUserDetails();
      
      // this.service.page = "choose-sectors";
    
    }  

  files= [];

  ngOnInit(): void {
    // this.addMoreExperience();
    // this.addMoreRecommendation();
    this.getUserProfile();
    this.getRelationships();
    this.getPositions();
    this.getTalentLevels();
    this.experienceModel.level_of_talent = "entry_level";
    this.isLoading = false;
    // this.getUserProfile();
  }

  getRelationships(){
    const obj = { 
      type: "relationship"
    }
    this.service.getLanguages(obj).subscribe(async res => {                  
      this.relationship_list = res.data;
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  getPositions(){
    const obj = { 
      type: "position"
    }
    this.service.getLanguages(obj).subscribe(async res => {                  
      this.position_list = res.data;
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  getTalentLevels(){
    
    this.service.getTalentLevels().subscribe(async res => {      
      console.log("get talent levels ============= ",res)            
      this.talent_level_list = res.data;
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  getUserProfile(){
    this.service.getUserProfile().subscribe(async res => {
      this.service.profile = res.profile;
      if (res.profile && res.profile.talent_experience && res.profile.talent_experience.work_record && res.profile.talent_experience.work_record.length) {
        this.experience_list = res.profile.talent_experience.work_record.map((item => {
            return item = {
              title: item.title,
              employment_type: item.employment_type,
              company_name: item.company_name,
              start_month: item.start_month,
              start_year: item.start_year,
              end_month: item.end_month,
              end_year: item.end_year,
              currently_working: item.currently_working,
              location: item.location,
              description: item.description,
              industry: item.industry,
              media: item.media ? item.media : []
          }
        })) 
      }

      if (res.profile && res.profile.talent_experience && res.profile.talent_experience.recieved_recommendations && res.profile.talent_experience.recieved_recommendations.length) {
        this.recommendations_list = res.profile.talent_experience.recieved_recommendations.map((item => {
            return item = {
              person_name: item.person_name,
              relationship: item.relationship,
              position_time: item.position_time,
              recommendation: item.recommendation,
              talent_company_name: item.talent_company_name,
              talent_position: item.talent_position,
          }
        })) 
      }

      // if (res.profile && res.profile.talent_experience && res.profile.talent_experience.level_of_talent) {
      //   this.experienceModel.level_of_talent = res.profile.talent_experience.level_of_talent._id;
      // }

      if (res.profile && res.profile.talent_experience && res.profile.talent_experience.level_of_talent) {
        this.experienceModel.level_of_talent = res.profile.talent_experience.level_of_talent;
      }

      if (res.profile && res.profile.talent_experience && res.profile.talent_experience.regional_experience_none) {
        this.experienceModel.regional_experience_none = res.profile.talent_experience.regional_experience_none;
      }

      if(res.profile && res.profile.talent_experience && res.profile.talent_experience.regional_experience && res.profile.talent_experience.regional_experience.length){
        this.regional_list = this.regional_list.map((item => {
          if(res.profile.talent_experience.regional_experience.includes(item.name)){
            return item = {
              name : item.name,
              flag : true
            }
          }else{
            return item = {
              name : item.name,
              flag : false
            }
          }        
        }))
      }

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
 
  uploadFile(evt: any,experience) {
  console.log(evt,experience)
    if (!evt.addedFiles.length) {
        return;
    }
     for (var i = 0; i < evt.addedFiles.length; i++) { 
	              this.myFiles.push(evt.addedFiles[i]);

        }
    this.isLoading = true;
    const file = evt.addedFiles[0];
    var img_arr = file.name.split('.');
    const ext = img_arr.pop();

    if (file.size/1024/1024 > 25) {
      this.isLoading = false;
      this.service.showErrorMessage({ message : "The file should not exceed more than 25MB.", action : "Okay"});
      return;
       for (var i = 0; i < evt.addedFiles.length; i++) { 
	              this.myFiles.splice(evt.addedFiles.indexOf(i),1);

        }  
    }
    
    // if (ext == 'jpeg' || ext == 'jpg' || ext == 'png') {
    if(true){
        const fr = new FileReader();
        fr.readAsDataURL(file);
        const formData = new FormData();
        for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append("media",this.myFiles[i]);

    } 
        console.log("formdata ============= ",formData)
        this.service.uploadPostJobMedia(formData).subscribe(async res => {
          console.log("formdata resp ============= ",res)
          for(let i=0;i<this.myFiles.length;i++){
		   const obj = {
            name: this.myFiles[i]['name'],
            media: this.myFiles[i]['name'],
            url: res.file_name[i],
            type: this.myFiles[i]['type'],
          } 
          experience.media.push(obj);
          }
          this.isLoading = false;

        },(err) => {
          this.service.handleError(err)
          console.log(err)
          this.isLoading = false;
        })

    }
  }
  
  deleteDocument(document,experience){
    this.isLoading = true;
    console.log(document,experience)
    this.service.removePostJobMedia(document.name).subscribe(async res => {
      experience.splice(experience.indexOf(document), 1)

      this.isLoading = false;
          console.log(document,experience)

    },(err) => {
      this.service.handleError(err)
      this.isLoading = false;
    })

  }

  addMoreExperience(){
    this.workRecordModel = new WorkRecordModel();
    if(this.experience_list && this.experience_list.length){
      this.experience_list.map((item,i) => {
        if(!item.currently_working || item.currently_working==false){
          if(Number(item.end_year)<Number(item.start_year)){
            item.endYearValidation = true;
          }else{
            item.endYearValidation = false;
          }

          if((Number(item.end_year)==Number(item.start_year)) && (Number(item.end_month)<Number(item.start_month))){
            item.endMonthValidation = true;
          }else{
            item.endMonthValidation = false;
          }
        }else{
          // console.log("else experience ============ ")
        }
        
        if(item.title && item.title.trim()!=""){
          item.titleValidation = false
        }else{
          item.titleValidation = true
        }
        if(item.employment_type && item.employment_type.trim()!=""){
          item.employmentTypeValidation = false
        }else{
          item.employmentTypeValidation = true
        }
        if(item.company_name && item.company_name.trim()!=""){
          item.companyNameValidation = false
        }else{
          item.companyNameValidation = true
        }
        if(item.title && item.title.trim() && item.employment_type && item.employment_type.trim() && item.company_name && item.company_name.trim() && (((!item.currently_working || item.currently_working==false) && item.endYearValidation==false && item.endMonthValidation==false) || (item.currently_working==true)) && i==this.experience_list.length-1){
          this.workRecordModel.media = [];
          this.experience_list.unshift(this.workRecordModel);
        }
      })
    }else{
      this.workRecordModel.media = [];
            console.log("edd list ========== ",this.workRecordModel)

      this.experience_list.unshift(this.workRecordModel);
    }
  }

  removeExperience(index){
    this.experience_list.splice(index,1)
  }

  addMoreRecommendation(){
    this.recievedRecommendationsModel = new RecievedRecommendationsModel();
    console.log(this.recommendations_list)
    if(this.recommendations_list.length){
      this.recommendations_list.map((item,i) => {
        if(item.person_name && item.person_name.trim()){
          item.personNameValidation = false
        }else{
          item.personNameValidation = true
        }
        if(item.recommendation && item.recommendation.trim()){
          item.recommendationsValidation = false
        }else{
          item.recommendationsValidation = true
        }
        if(item.person_name && item.person_name.trim() && item.recommendation && item.recommendation.trim() ){
          this.recommendations_list.unshift(this.recievedRecommendationsModel);
        }
      })
    }else{
      this.recommendations_list.unshift(this.recievedRecommendationsModel);
    }  
  }

  removeRecommendation(index){
    this.recommendations_list.splice(index,1)
  }

  addExperienceData(){
    const slecRegion = this.regional_list.filter(ele=> ele['flag'] === true)
    if(slecRegion.length || this.experienceModel.regional_experience_none){
      this.experienceModel.regionalExperienceValidation = false;
      const selectedRegional = slecRegion.map(((item: any) => {
        return item.name
        // return item._id
      }));
      this.experienceModel.work_record = this.experience_list;
      this.experienceModel.recieved_recommendations = this.recommendations_list;
      this.experienceModel.regional_experience = selectedRegional;
      this.service.postExperince(this.experienceModel).subscribe(async res => {
          this.router.navigate(["/visibility-preferences"]);
        },(err) => {
            this.service.handleError(err)
          })
    }else{
      this.experienceModel.regionalExperienceValidation = true;
    } 
  }

  checkExperienceData(){

    if(this.experience_list.length){
    for(let i=1;i<=this.experience_list.length;i++){
          let gotError = "no";

         this.experience_list.map((item,i) => {
        if(!item.currently_working || item.currently_working==false){
          if(Number(item.end_year)<Number(item.start_year)){
            item.endYearValidation = true;
          }else{
            item.endYearValidation = false;
          }

          if((Number(item.end_year)==Number(item.start_year)) && (Number(item.end_month)<Number(item.start_month))){
            item.endMonthValidation = true;
          }else{
            item.endMonthValidation = false;
          }
        }else{
          // console.log("else experience ============ ")
        }
          if(item.media.length){
          item.documentValidation = false
        }else{
          item.documentValidation = true
        }
        
        if(item.title && item.title.trim()){
          item.titleValidation = false
        }else{
          item.titleValidation = true
        }
        if(item.employment_type && item.employment_type.trim()){
          item.employmentTypeValidation = false
        }else{
          item.employmentTypeValidation = true
        }
        if(item.company_name && item.company_name.trim()){
          item.companyNameValidation = false
        }else{
          item.companyNameValidation = true
        }
        if(item.title && item.title.trim() && item.employment_type && item.employment_type.trim() && item.company_name && item.company_name.trim() && (((!item.currently_working || item.currently_working==false) && item.endYearValidation==false && item.endMonthValidation==false &&item.documentValidation==false &&gotError=="no") || (item.currently_working==true))){
          if (this.experience_list.length === i+1) {
            this.selectedIndexBinding = this.selectedIndexBinding+1;
          }
        }else{
          this.selectedIndexBinding = this.selectedIndexBinding;  
                    gotError = "yes";

        }
      })}
 
    }else{
            this.selectedIndexBinding = this.selectedIndexBinding+1;
    }    
  }

  checkRecommendationData(){
    if(this.recommendations_list.length){
                  let gotError = "no";

      this.recommendations_list.map((item,i) => {
        if(item.person_name && item.person_name.trim()){
          item.personNameValidation = false
        }else{
          item.personNameValidation = true
        }
        if(item.recommendation && item.recommendation.trim()){
          item.recommendationsValidation = false
        }else{
          item.recommendationsValidation = true
        }
        if(item.person_name && item.person_name.trim() && item.recommendation && item.recommendation.trim() &&gotError=="no" ){
          if (this.recommendations_list.length === i+1) {
            this.selectedIndexBinding = this.selectedIndexBinding+1;
          }
        }else{
this.selectedIndexBinding = this.selectedIndexBinding;  
                    gotError = "yes";          }
      })
    }else{
      this.selectedIndexBinding = this.selectedIndexBinding+1;
    }    
  }

  checkTalentLevel(){
    if(this.experienceModel.level_of_talent){
      console.log("talent level clicked ============== ",this.experienceModel.level_of_talent)
      this.selectedIndexBinding = this.selectedIndexBinding+1;
    }else{
      return this.service.showErrorMessage({ message : "Please choose any one Level of Talent", action : "Okay"})
    }
  }

  changeRegionalNone(event){
    if(event.target.checked){
      this.regional_list = [{name: 'Africa', flag: false},{name: 'Asia', flag: false},{name: 'Europe', flag: false},{name: 'Middle East', flag: false},
      {name: 'North America', flag: false},{name: 'Oceania', flag: false},{name: 'South America', flag: false}];
    }
  }

  changeRegional(event){
    if(event.target.checked){
      this.experienceModel.regional_experience_none = false;
    }
  }

  // Sectors data
  discipline_id: string;
  sectorName: string;
  sector_list = [];
  activeIndex: number = null;
  selectedIcon: string;
  selectedSectorId: string = '';
  selectedSectors = [];
  showModal = false;

  // ngOnInit(): void {
  //   this.getUserProfile();
  // }

  // getUserProfile(){
  //   this.service.getUserProfile().subscribe(async res => {
  //     this.discipline_id = res.profile.talent_category_data.discipline_id;
  //     this.service.profile = res.profile;
  //     this.getDisciplineSectors();
  //     if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.discipline_id) {
  //       this.selectedSectors = res.profile.talent_category_data.discipline_sectors;
  //     }
      
  //   },(err) => {
  //     this.service.handleError(err)
  //     console.log(err)
  //   })
  // }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  deleteSector(_id,i){
    this.service.deleteSector({
      sector_id : _id
    }).subscribe(resp => {

      this.sector_list.splice(i,1);

      const index = this.selectedSectors.findIndex(item => item == _id)

      this.selectedSectors.splice(index,1);
      // this.ngOnInit();
    },(err => {
      this.service.handleError(err);
    }))

  }

  getDisciplineSectors(){
    this.service.getTalentDisciplineSectors(this.discipline_id).subscribe(res => {
      // this.sector_list = res.sectors;
      this.sector_list = res.sectors.map((item => {
        if(this.selectedSectors.includes(item._id)){
          return item = {
            _id : item._id,
            name : item.name,
            status : item.status,
            talent_user_id : item.talent_user_id,
            is_approved_by_admin : item.is_approved_by_admin,
            
            flag : true
          }
        }else{
          return item = {
            _id : item._id,
            name : item.name,
            status : item.status,
            talent_user_id : item.talent_user_id,
            is_approved_by_admin : item.is_approved_by_admin,
            flag : false
          }
        }        
      }))
      // console.log('res',res);
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

  // saveSector(){
    
  //   if(!this.selectedSectors.length){
  //     return this.service.showErrorMessage({ message : "Please choose any one sector", action : "Okay"})
  //   }
  //   const obj = {
  //     discipline_sectors: this.selectedSectors
  //   }
  //   this.service.addTalentSector(obj).subscribe(async res => {
      
  //     this.updateProfilePercentage();
  //     this.selectedIndexBinding = this.selectedIndexBinding+1;

  //   },(err) => {
  //     this.service.handleError(err)
  //     console.log(err)
  //   })
  // }

  saveSector(){

    const selected_sectors = this.sector_list.filter(ele=> ele.flag? ele.flag === true: '');
    const checkArray = [];
    checkArray.push(...selected_sectors)
    if(!checkArray.length){
      return this.service.showErrorMessage({ message : "Please choose any one sector", action : "Okay"})
    }

    const obj = {
      discipline_sectors: selected_sectors
    }
    this.service.addTalentSector(obj).subscribe(async res => {
      this.updateProfilePercentage();
      this.selectedIndexBinding = this.selectedIndexBinding+1;
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

  addSector(){
    const sector_name = this.sector_name; 
    if(sector_name && sector_name.trim()){
      const obj = {
        name: sector_name,
        // discipline_id: this.discipline_id
      }
      this.service.addNewSector(obj).subscribe(async res => {
        this.selectedSectors.push(res.added._id)

        this.sector_list.push({
          _id : res.added._id,
          name : sector_name,
          status : "active",
          talent_user_id : this.profile._id,
          is_approved_by_admin : false,          
          flag : true
        })
        // this.getDisciplineSectors();
        this.sector_name = "";
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }else{
      return this.service.showErrorMessage({ message : "Please enter Sector Name", action : "Okay"})
    }
  }

}