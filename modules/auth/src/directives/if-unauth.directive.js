var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthBaseDirective } from './auth.base.directive';
var IfUnauthDirective = (function (_super) {
    __extends(IfUnauthDirective, _super);
    function IfUnauthDirective(templateRef, viewContainerRef, authService) {
        return _super.call(this, templateRef, viewContainerRef, authService) || this;
    }
    IfUnauthDirective.prototype.handleUserSubscription = function () {
        if (this.user && this.user.email && this.user.id) {
            if (this.attached) {
                this.removeViewFromDOM();
            }
        }
        else if (!this.attached) {
            this.attachViewToDOM();
        }
    };
    return IfUnauthDirective;
}(AuthBaseDirective));
IfUnauthDirective = __decorate([
    Directive({
        selector: '[ifUnauth]'
    }),
    __metadata("design:paramtypes", [TemplateRef, ViewContainerRef, AuthService])
], IfUnauthDirective);
export { IfUnauthDirective };
//# sourceMappingURL=if-unauth.directive.js.map