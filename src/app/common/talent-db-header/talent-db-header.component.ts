import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../src/app/service/service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-talent-db-header',
  templateUrl: './talent-db-header.component.html',
  styleUrls: ['./talent-db-header.component.scss']
})
export class TalentDbHeaderComponent implements OnInit {

  talent_details = null
  constructor(private router : Router,private service : Service) { }
  
  ngOnInit(): void {
    this.talent_details = this.service.loggedUserDetails();
    console.log("talent detail ========== ",this.talent_details)
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
    this.router.navigate(["/"]);
   }else if (result.dismiss === Swal.DismissReason.cancel) {
       return;
      }
    })
    }
   

  
}
