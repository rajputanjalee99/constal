import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Service } from '../service/service.service';


@Injectable({
  providedIn: 'root'
})
export class MyProfieGuard implements CanActivate {

  constructor(private service : Service,private router : Router,private _location : Location){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const profile = this.service.loggedUserDetails();
      
      if(profile && profile.role == 'talent' && profile.admin_profile_status == 'accepted'){
       return true;
      }else{

        this.service.showErrorMessage({
          message : "You dont' have permission"
        })
        this._location.back();
        return false;

      }
    
  }
  
}
