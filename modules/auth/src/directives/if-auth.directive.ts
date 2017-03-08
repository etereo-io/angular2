import { Directive, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from '../services/auth.service';

import { AuthBaseDirective } from './auth.base.directive';

@Directive({
  selector: '[ifAuth]'
})
export class IfAuthDirective extends AuthBaseDirective {

    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef, authService: AuthService) {
      super(templateRef, viewContainerRef, authService);
    }

    handleUserSubscription () {
      if (this.user && this.user.email && this.user.id && !this.attached) {
        this.attachViewToDOM();
      }
      else if ((!this.user || !this.user.email || !this.user.id) && this.attached) {
        this.removeViewFromDOM();
      }
    }

}
