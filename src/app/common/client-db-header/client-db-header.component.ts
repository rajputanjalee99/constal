import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-db-header',
  templateUrl: './client-db-header.component.html',
  styleUrls: ['./client-db-header.component.scss']
})
export class ClientDbHeaderComponent implements OnInit {
username:any='';
userImage:any='';
  constructor(private router:Router) { }

  ngOnInit(): void {
  this.username= localStorage.getItem('f_name');
  this.userImage=localStorage.getItem('user_image');
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
   
   console.log('clear')
    // console.log("talent details ============ ",this.talent_details)
    localStorage.clear();
      this.router.navigate(['']);
   }else if (result.dismiss === Swal.DismissReason.cancel) {
       return;
      }
    })
   
  }

}
