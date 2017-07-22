import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser/';
import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
	let fixture: ComponentFixture<BannerComponent>;
	let comp: BannerComponent;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ BannerComponent ],
		})
		fixture = TestBed.createComponent(BannerComponent);
		comp = fixture.debugElement.componentInstance;
		de = fixture.debugElement.query(By.css('h1'));
		el = de.nativeElement;
	});
	it('should display an original title', () => {
		fixture.detectChanges();
		expect(el.textContent).toContain(comp.title);
	});
	it('should display a different test title', () => {
		comp.title = 'A New Name';
		fixture.detectChanges();
		expect(el.innerText).toBe('A New Name');
	});
	it(`should not have a title because we don't call 'detectChanges'`, () => {
		expect(el.innerText).not.toBeDefined;
	})
});
