"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var welcome_component_1 = require("./welcome.component");
var _1 = require("@angular/platform-browser/");
describe('WelcomeComponent', function () {
    var fixture;
    var comp;
    var de;
    var el;
    var userServiceStub;
    var UserService;
    var userService = UserService;
    beforeEach(function () {
        userServiceStub = {
            isLoggedIn: true,
            user: {
                name: 'Test User'
            }
        };
        testing_1.TestBed.configureTestingModule({
            declarations: [welcome_component_1.WelcomeComponent],
            providers: [
                {
                    provide: UserService,
                    userValue: userServiceStub
                }
            ]
        });
        var userService = testing_1.TestBed.get(UserService);
        fixture = testing_1.TestBed.createComponent(welcome_component_1.WelcomeComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(_1.By.css('.welcome'));
        el = de.nativeElement;
    });
    it('stub object and injected UserService should not be the same', function () {
        expect(userServiceStub === userService).toBe(false);
    });
    it('should welcome the user', function () {
        fixture.detectChanges();
        var content = el.textContent;
        console.log('content', content);
        expect(content).toContain('Welcome', '"Welcome ..."');
        expect(content).toContain('Test User', 'expected name');
    });
});
//# sourceMappingURL=welcome.component.spec.js.map