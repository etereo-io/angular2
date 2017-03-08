var AuthBaseDirective = (function () {
    function AuthBaseDirective(templateRef, viewContainer, authService) {
        var _this = this;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.authService = authService;
        authService.user$.subscribe(function (user) {
            _this.user = user;
            _this.handleUserSubscription();
        });
        if (authService.isAuth()) {
            this.user = authService.getUser();
        }
        this.handleUserSubscription();
    }
    AuthBaseDirective.prototype.handleUserSubscription = function () {
        if (this.user && this.user.email && !this.attached) {
            this.removeViewFromDOM();
        }
        else if (this.attached) {
            this.attachViewToDOM();
        }
    };
    AuthBaseDirective.prototype.attachViewToDOM = function () {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.attached = true;
    };
    AuthBaseDirective.prototype.removeViewFromDOM = function () {
        this.viewContainer.clear();
        this.attached = false;
    };
    return AuthBaseDirective;
}());
export { AuthBaseDirective };
//# sourceMappingURL=auth.base.directive.js.map