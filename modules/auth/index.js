var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@etereo/http';
import { AuthService } from './src/services/auth.service';
import { AuthEndpoints } from './src/models/auth.endpoints';
import { AuthGuard } from './src/guards/auth.guard';
import { UnauthGuard } from './src/guards/unauth.guard';
import { IfAuthDirective } from './src/directives/if-auth.directive';
import { IfUnauthDirective } from './src/directives/if-unauth.directive';
export * from './src/directives/if-auth.directive';
export * from './src/directives/if-unauth.directive';
export * from './src/guards/auth.guard';
export * from './src/guards/unauth.guard';
export * from './src/models/auth.endpoints';
export * from './src/services/auth.service';
import { throwIfAlreadyLoaded } from '@etereo/core'; //extract as a 
var AuthModule = AuthModule_1 = (function () {
    function AuthModule(parentModule) {
        // This prevent the module to be instantiated twice by the user
        throwIfAlreadyLoaded(parentModule, 'AuthModule');
    }
    AuthModule.forRoot = function (endpoints) {
        var providers = [AuthService];
        if (endpoints)
            providers.push({ provide: AuthEndpoints, useValue: endpoints });
        return {
            ngModule: AuthModule_1,
            providers: providers
        };
    };
    return AuthModule;
}());
__decorate([
    __param(0, Optional()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthEndpoints]),
    __metadata("design:returntype", Object)
], AuthModule, "forRoot", null);
AuthModule = AuthModule_1 = __decorate([
    NgModule({
        // Components, Pipes, Directive
        declarations: [
            IfAuthDirective,
            IfUnauthDirective
        ],
        providers: [
            AuthService,
            AuthEndpoints,
            AuthGuard,
            UnauthGuard
        ],
        // Modules
        imports: [
            CommonModule,
            HttpModule
        ],
        exports: [
            IfAuthDirective,
            IfUnauthDirective
        ]
    }),
    __param(0, Optional()), __param(0, SkipSelf()),
    __metadata("design:paramtypes", [AuthModule])
], AuthModule);
export { AuthModule };
var AuthModule_1;
//# sourceMappingURL=index.js.map