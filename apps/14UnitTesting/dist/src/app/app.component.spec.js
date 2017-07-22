"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var app_component_1 = require("./app.component");
var banner_1 = require("./components/banner");
var user_1 = require("./components/user");
var user_service_1 = require("services/user.service");
var data_service_1 = require("services/data.service");
describe('Our home component', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                app_component_1.AppComponent,
                banner_1.BannerComponent,
                user_1.UserComponent
            ],
            providers: [
                user_service_1.UserService,
                data_service_1.DataService,
            ]
        });
    });
    it("should create the app component", testing_1.async(function () {
        var comp = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        var inst = comp.debugElement.componentInstance;
        expect(inst).toBeDefined();
    }));
    it("should have as its title 'Goodbye, Cruel World!'", testing_1.async(function () {
        var comp = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        var inst = comp.debugElement.componentInstance;
        expect(inst.title).toEqual('Goodbye, Cruel World!');
    }));
    it("should render title in a h1 tag", testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Goodbye, Cruel World!');
    }));
});
//# sourceMappingURL=app.component.spec.js.map