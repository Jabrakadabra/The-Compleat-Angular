import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from  './app.component';
import { BannerComponent } from './components/banner';
import { UserComponent } from './components/user';
import { UserService } from 'services/user.service';
import { DataService } from 'services/data.service';

describe('Our home component', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent,
			],
		});
	});

	it(`should create the app component`, async(() => {
		let fixture = TestBed.createComponent(AppComponent);
		let comp = fixture.debugElement.componentInstance;
		expect (comp).toBeDefined();
	}));

	it (`should have as its title 'Goodbye, Cruel World!'`, async(() => {
		let fixture = TestBed.createComponent(AppComponent);
		let comp = fixture.debugElement.componentInstance;
		expect(comp.title).toEqual('Goodbye, Cruel World!');
	}));

	it(`should render title in a h1 tag`, async(() => {
		let fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		let compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('h1').textContent).toContain('Goodbye, Cruel World!');
	}));
});
