import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Service } from "./../../service/service.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-talent-header',
  templateUrl: './talent-header.component.html',
  styleUrls: ['./talent-header.component.scss']
})
export class TalentHeaderComponent implements OnInit {

  

  talent_details = null
  profile
  constructor(private service : Service,private router : Router) { }

  ngOnInit(): void {
    var body = document.body;
  	body.classList.remove("mystyle");
    this.talent_details = this.service.loggedUserDetails();
    if(this.talent_details){
      this.getProfile();      
    }

  }
  logout(){
    // console.log("talent details ============ ",this.talent_details)
      Swal.fire({
      title: 'Are you sure you want to logout from Constal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
   
    localStorage.clear();
    if(this.talent_details && this.talent_details.role && this.talent_details.role=="talent"){
      this.router.navigate(['talent-login']);
    }else if(this.talent_details && this.talent_details.role && this.talent_details.role=="referral_partner"){
      this.router.navigate(['referral-login']);
    }else{
      this.router.navigate(['login']);
    }
   }else if (result.dismiss === Swal.DismissReason.cancel) {
       return;
      }
    })
   
  }

  getProfile(){
    this.service.getUserProfile().subscribe(resp => {
      this.profile = resp.profile;
      this.talent_details = resp.profile;

      this.service.setLoggedUserDetails(resp.profile)

    },(err) => {
      console.log(err);
      this.service.handleError(err);
    })
  }

  refresh(){
    alert("On refresh");
  }

}
