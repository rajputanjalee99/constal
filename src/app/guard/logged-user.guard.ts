import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Service } from "./../service/service.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedUserGuard implements CanActivate {

  constructor(private service : Service,private router : Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.service.getToken()){
        // this.service.showErrorMessage({
        //   message : "Please Login First"
        // })
        const userDetail = this.service.loggedUserDetails();
        if(userDetail.role == "talent"){
          if(userDetail.is_profile_submitted_to_admin==false){
            this.router.navigate(['/choose-discipline']);
          }else{
            this.router.navigate(['/talent-dashboard']);
          }
        }else if(userDetail.role == "client"){
          this.router.navigate(['/post-job']);
        }else{
          this.router.navigate(['/referral-db']);
        }
        return false;
      }else{
        return true;
      }
    
  }
  
}
