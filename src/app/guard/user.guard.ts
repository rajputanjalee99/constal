import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Service } from "./../service/service.service";


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  
  constructor(private service : Service,private router : Router){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.service.getToken()){
        this.service.showErrorMessage({
          message : "Please Login First"
        })
        this.router.navigate(['/']);
        return false;
      }else{
        return true;
      }
    
  }
  
}
