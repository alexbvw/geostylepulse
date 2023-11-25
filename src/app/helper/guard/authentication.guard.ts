import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenticationService.isLoggedIn !== true) {
      // window.alert("Access not allowed!");
      this.router.navigate(['authenticate'])
    }
    return true;
  }
}