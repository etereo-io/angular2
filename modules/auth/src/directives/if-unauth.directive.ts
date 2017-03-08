import { Directive, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from '../services/auth.service';

import { AuthBaseDirective } from './auth.base.directive';

@Directive({
  selector: '[ifUnauth]'
})
export class IfUnauthDirective extends AuthBaseDirective {

    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef, authService: AuthService) {
      super(templateRef, viewContainerRef, authService);
    }

    handleUserSubscription () {
      if (this.user && this.user.email && this.user.id) {
        if (this.attached) {
          this.removeViewFromDOM();
        }
      }
      else if (!this.attached) {
        this.attachViewToDOM();
      }
    }

}
