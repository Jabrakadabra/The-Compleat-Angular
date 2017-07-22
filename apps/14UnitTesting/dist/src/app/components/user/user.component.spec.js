"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var user_component_1 = require("./user.component");
var user_service_1 = require("services/user.service");
var data_service_1 = require("services/data.service");
describe('Component: User', function () {
    var fixture;
    var comp;
    var el;
    beforeEach(function () {
        var userServiceStub = {
            isLoggedIn: true,
            user: {
                name: 'Jordan'
            }
        };
        testing_1.TestBed.configureTestingModule({
            declarations: [user_component_1.UserComponent],
            providers: [data_service_1.DataService]
        });
        testing_1.TestBed.overrideComponent(user_component_1.UserComponent, {
            set: {
                providers: [
                    {
                        provide: user_service_1.UserService,
                        useValue: userServiceStub
                    }
                ]
            }
        });
        fixture = testing_1.TestBed.createComponent(user_component_1.UserComponent);
        comp = fixture.debugElement.componentInstance;
    });
    it('should create the app', function () {
        expect(comp).toBeTruthy();
    });
    it('should use the username from the service', function () {
        var userService = fixture.debugElement.injector.get(user_service_1.UserService);
        fixture.detectChanges();
        expect(userService.user.name).toEqual('Jordan');
    });
    it('shouldn\'t display the user name if user is not logged in', function () {
        var userService = fixture.debugElement.injector.get(user_service_1.UserService);
        userService.isLoggedIn = false;
        fixture.detectChanges();
        el = fixture.debugElement.nativeElement;
        expect(el.querySelector('p').textContent).not.toContain(comp.user.name);
    });
    it('should display the user name if user is logged in', function () {
        var userService = fixture.debugElement.injector.get(user_service_1.UserService);
        userService.isLoggedIn = true;
        fixture.detectChanges();
        el = fixture.debugElement.nativeElement;
        expect(el.querySelector('p').textContent).toContain(comp.user.name);
    });
    it("shouldn't fetch data if not called asynchronously", function () {
        var dataService = fixture.debugElement.injector.get(data_service_1.DataService);
        var spy = spyOn(dataService, 'getDetails')
            .and.returnValue(Promise.resolve('Data'));
        fixture.detectChanges();
        expect(comp.data).toBe(undefined);
    });
    it("shouldn fetch data if called asynchronously", testing_1.async(function () {
        var dataService = fixture.debugElement.injector.get(data_service_1.DataService);
        var spy = spyOn(dataService, 'getDetails')
            .and.returnValue(Promise.resolve('Chiken'));
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            expect(comp.data).toBe('Chiken');
        });
    }));
});
//# sourceMappingURL=user.component.spec.js.map