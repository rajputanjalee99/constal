import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit {
username:any='';
userImage:any='';
  client_details='';

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.client_details=localStorage.getItem('f_name')

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
