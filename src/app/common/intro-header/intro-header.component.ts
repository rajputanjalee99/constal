import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../service/service.service';
import Swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-intro-header',
  templateUrl: './intro-header.component.html',
  styleUrls: ['./intro-header.component.scss']
})
export class IntroHeaderComponent implements OnInit {
  profile = {};
  scroll() {
		document.querySelector('#target').scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
  
  talent_details = null
    client_details="";

  constructor(private router : Router,private service : Service) { }

  ngOnInit(): void {
  this.client_details=localStorage.getItem('f_name')
   

    this.talent_details = this.service.loggedUserDetails();
    // console.log("talent details =============== ",this.talent_details)
      $(window).scroll(function() {    
	        var scroll = $(window).scrollTop();

	        if (scroll >= 10) {
	            $(".header-wrap-add").addClass("narrow");
	        } else {
	            $(".header-wrap-add").removeClass("narrow");
	        }
	    });
        console.log(this.talent_details)
  }

  logout(){
     Swal.fire({
      title: 'Are you sure you want to logout from Constal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
   
  sessionStorage.clear();
    localStorage.clear();
    // this.router.navigate(["/referral-login"]);
    // this.router.navigate(["/"]);
    this.router.navigate(['/'])
    .then(() => {
      window.location.reload();
    });
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

}
