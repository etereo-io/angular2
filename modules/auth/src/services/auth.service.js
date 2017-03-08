var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpService } from '@etereo/http'; // TODO: Change for @etereo/HTTP
import { AuthEndpoints } from '../models/auth.endpoints';
import 'rxjs/add/operator/map';
var AuthService = (function () {
    function AuthService(http, endpoints) {
        this.http = http;
        this.endpoints = endpoints;
        this.userSubject = new BehaviorSubject(null);
        this.user$ = this.userSubject.asObservable();
    }
    AuthService.prototype.register = function (user) {
        var _this = this;
        var observable = this.http
            .post(this.endpoints.REGISTER, user);
        observable.subscribe(function (usr) {
            if (usr && usr.id) {
                _this.loginSuccess(usr);
            }
        });
        return observable;
    };
    AuthService.prototype.login = function (user) {
        var _this = this;
        var observable = this.http
            .post(this.endpoints.LOGIN, user);
        observable
            .subscribe(function (usr) {
            _this.loginSuccess(usr);
        });
        return observable;
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        var observable = this.http
            .post('logout', {});
        observable
            .subscribe(function () {
            _this.logged = false;
            _this.userSubject.next(null);
        });
        return observable;
    };
    AuthService.prototype.isAuth = function () {
        return this.logged;
    };
    AuthService.prototype.getUser = function () {
        return this.user;
    };
    AuthService.prototype.loginSuccess = function (user) {
        this.user = user;
        this.logged = true;
        this.userSubject.next(user);
    };
    AuthService.prototype.logOutSuccess = function (user) {
        this.user = null;
        this.logged = false;
        this.userSubject.next(null);
    };
    return AuthService;
}());
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpService, AuthEndpoints])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map