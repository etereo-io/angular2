import { Directive, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from '../services/auth.service';

import { User } from '../models/user.interface';

export class AuthBaseDirective {
    attached: boolean;
    user: User;

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) {
      authService.user$.subscribe((user: User) => {
        this.user = user;
        this.handleUserSubscription();
      });

      if (authService.isAuth()) {
        this.user = authService.getUser();
      }

      this.handleUserSubscription();
    }

    handleUserSubscription () {
      if (this.user && this.user.email && !this.attached) {
        this.removeViewFromDOM();
      }
      else if (this.attached) {
        this.attachViewToDOM();
      }
    }

    attachViewToDOM () {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.attached = true;
    }

    removeViewFromDOM () {
      this.viewContainer.clear();
      this.attached = false;
    }

}
