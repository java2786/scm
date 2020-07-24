import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: "root" })
export class LoginGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): boolean {
    if (this.userService.auth) {
      // alert("You are already logged in.");
    } else {
      alert("You are not logged in.");
      this.router.navigate(['/', 'login']);
    }
    return this.userService.auth;
  }
}