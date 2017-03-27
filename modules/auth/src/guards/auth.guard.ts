import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.checkLogin();
  }

  checkLogin () {
    let subscription = this.authService.isAuth();
    
    subscription.subscribe((is: boolean) => {
      if (!is) {
        this.router.navigate(['/login']);
      }
    });

    return subscription;
  }
}
