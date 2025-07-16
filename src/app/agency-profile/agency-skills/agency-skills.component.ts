import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../service/service.service';

@Component({
  selector: 'app-agency-skills',
  templateUrl: './agency-skills.component.html',
  styleUrls: ['./agency-skills.component.scss']
})
export class AgencySkillsComponent implements OnInit {

  activeIndex: number;
  activeIndex2: number;

  @ViewChildren('childTabs') childTabs: QueryList<MatTabGroup>;

  onTabChange(event: any){
    this.activeIndex = event.index;

    this.childTabs.forEach(childTab => {
       childTab.realignInkBar();
    });
  }

  onTabChange2(event: any){
    this.activeIndex2 = event.index;
    
  }

  skills_add = [];
  industry_knowledge_add = [];
  tools_add = [];
  interpersonal_skill_add = [];

  skill_list = [];
  industry_list = [];
  tools_list = [];
  interpersonal_skill_list = [];

  selected_skills = [];
  selected_industry = [];
  selected_tools = [];
  selected_interpersonal_skill = [];

  skills_valid = true;
  speciality
  speciality_id: any
  selected_specialities = []

  constructor(public service : Service, public route : ActivatedRoute,
    public router: Router) {  
      this.service.sideBarHeight = 50; }

  ngOnInit(): void {
    this.getUserProfile();
    // this.getSkillsData();
  }

  getUserProfile(){
    this.service.agencyProfile().subscribe(async res => {
      this.getSkillsData();
      this.service.profile = res.profile;
      if (res.profile && res.profile.agency_skills && res.profile.agency_skills.top_skills && res.profile.agency_skills.top_skills.length) {
        
        this.selected_skills = res.profile.agency_skills.top_skills.map((item => {
          return item
        }))        
      }

      if (res.profile && res.profile.agency_skills && res.profile.agency_skills.industry_knowledge_skills && res.profile.agency_skills.industry_knowledge_skills.length) {
        
        this.selected_industry = res.profile.agency_skills.industry_knowledge_skills.map((item => {
          return item._id
        }))      
      }
      
      if (res.profile && res.profile.agency_skills && res.profile.agency_skills.technologies_skills && res.profile.agency_skills.technologies_skills.length) {
        
        this.selected_tools = res.profile.agency_skills.technologies_skills.map((item => {
          return item._id
        }))        
      }
      
      if (res.profile && res.profile.agency_skills && res.profile.agency_skills.interpersonal_skills && res.profile.agency_skills.interpersonal_skills.length) {
        
        this.selected_interpersonal_skill = res.profile.agency_skills.interpersonal_skills.map((item => {
          return item._id
        }))        
      }

      if (res.profile && res.profile.talent_category_data && res.profile.talent_category_data.speciality.length) {
                
        this.speciality = res.profile.talent_category_data.speciality[0].name;
        this.selected_specialities = res.profile.talent_category_data.speciality.map((item => {
          return item._id
        }))
      }

    },(err) => {
      // this.isLoading = false
      this.service.handleError(err)
      console.log(err)
    })
  }

  getSkillsData(){
    const obj = {
      speciality_id : this.speciality
    }
    this.service.getAgencySkills().subscribe(res => {
      console.log("skill resp =========== ",res)
      this.skill_list = res.topSkills;
      this.industry_list = res.industryKnowledgeSkills;
      this.tools_list = res.technologySkills;
      this.interpersonal_skill_list = res.interpersonalSkills;
    },(error) => {
      this.service.handleError(error);
    })
  }

  chooseSkills(_id){
    this.selected_skills.push(_id)
    
  }

  removeSkills(_id){
    // this.selected_skills.splice(this.selected_skills.findIndex(ele=>ele === _id));
    let index = this.selected_skills.findIndex((item) => {
      return item == _id
    });
    this.selected_skills.splice(index,1)
  }

  chooseIndustry(_id){
    this.selected_industry.push(_id)
  }

  removeIndustry(_id){
    // this.selected_industry.splice(this.selected_industry.findIndex(ele=>ele === _id));
    let index = this.selected_industry.findIndex((item) => {
      return item == _id
    });
    this.selected_industry.splice(index,1)
  }

  chooseTool(_id){
    this.selected_tools.push(_id)
  }

  removeTools(_id){
    // this.selected_tools.splice(this.selected_tools.findIndex(ele=>ele === _id));
    let index = this.selected_tools.findIndex((item) => {
      return item == _id
    });
    this.selected_tools.splice(index,1)
  }

  chooseInterSkills(_id){
    this.selected_interpersonal_skill.push(_id)
  }

  removeInterSkills(_id){
    // this.selected_interpersonal_skill.splice(this.selected_interpersonal_skill.findIndex(ele=>ele === _id));
    let index = this.selected_interpersonal_skill.findIndex((item) => {
      return item == _id
    });
    this.selected_interpersonal_skill.splice(index,1)
  }

  postSkillsData(){
    const newSkills = this.skills_add.map((item => {
      return item.value
    }));
    const new_industry = this.industry_knowledge_add.map((item => {
      return item.value
    }));
    const new_technology = this.tools_add.map((item => {
      return item.value
    }));
    const new_interpersonal = this.interpersonal_skill_add.map((item => {
      return item.value
    }));
    const payload ={
      new_top_skills : newSkills,
      new_industry_skills : new_industry,
      new_technology_skills : new_technology,
      new_interpersonal_skills: new_interpersonal,
      top_skills : this.selected_skills,
      industry_skills : this.selected_industry,
      technology_skills : this.selected_tools,
      interpersonal_skills : this.selected_interpersonal_skill
    }  
    // console.log("post skill obj ================= ",payload)
    this.service.postAgencySkills(payload).subscribe(async res => {
      this.updateProfilePercentage();
      this.router.navigate(["create-agency-profile"]);
    },(err) => {
      this.service.handleError(err)
    })
  }

  updateProfilePercentage(){
    const obj = { 
      percentage: 60
    }
    this.service.updateProfilePercentage(obj).subscribe(async res => {
      
    },(err) => {
      this.service.handleError(err)
      console.log(err)
    })
  }

  addIndustry(speciality_id){
    
    const industry_name = this.industry_knowledge_add; 
    // if(industry_name.length==1 && this.selected_specialities.length){
    if(industry_name.length==1){
      const obj = {
        name: industry_name[0].value,
        type: "industry",
        discipline_speciality_id: speciality_id
      }
      this.service.addNewSkill(obj).subscribe(async res => {
        this.selected_industry.push(res.data._id)
        this.getSkillsData();
        this.industry_knowledge_add = [];
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }

  addTool(speciality_id){
    
    const tool_name = this.tools_add; 
    // if(tool_name.length==1 && this.speciality_id){
    if(tool_name.length==1){
      const obj = {
        name: tool_name[0].value,
        type: "tool_technology",
        discipline_speciality_id: speciality_id
      }
      
      this.service.addAgencySkill(obj).subscribe(async res => {
        
        this.selected_tools.push(res.data._id)
        this.getSkillsData();
        this.tools_add = [];
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }

  addInterpersonal(){    
    const interpersonal_name = this.interpersonal_skill_add; 
    // if(interpersonal_name.length==1 && this.speciality_id){
    if(interpersonal_name.length==1){
      const obj = {
        name: interpersonal_name[0].value,
        type: "interpersonal",
        // discipline_speciality_id: speciality_id
      }
      
      this.service.addNewSkill(obj).subscribe(async res => {    
        // console.log("add interp resp ============ ",res)    
        this.selected_interpersonal_skill.push(res.data._id)
        this.getSkillsData();
        this.interpersonal_skill_add = [];
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }

  deleteSkill(skill_id){
    if(skill_id){
      const obj = {
        skill_id: skill_id,
        // type: type,
      }
      // console.log("delete skill obj ================ ",obj)
      this.service.deleteSkill(obj).subscribe(async res => {
        // console.log("delete skill resp ================ ",res)
        this.getSkillsData();
      },(err) => {
        this.service.handleError(err)
        console.log(err)
      })
    }
  }

}
