"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var _1 = require("@angular/platform-browser/");
var banner_component_1 = require("./banner.component");
describe('BannerComponent', function () {
    var fixture;
    var comp;
    var de;
    var el;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [banner_component_1.BannerComponent],
        });
        fixture = testing_1.TestBed.createComponent(banner_component_1.BannerComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(_1.By.css('h1'));
        el = de.nativeElement;
    });
    it('should display an original title', function () {
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.title);
    });
    it('should display a different test title', function () {
        comp.title = 'A New Name';
        fixture.detectChanges();
        expect(el.innerText).toBe('A New Name');
    });
    it("should not have a title because we don't call 'detectChanges'", function () {
        expect(el.innerText).not.toBeDefined;
    });
});
//# sourceMappingURL=banner.component.spec.js.map