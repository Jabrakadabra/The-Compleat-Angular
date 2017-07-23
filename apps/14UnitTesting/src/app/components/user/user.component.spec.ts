import { TestBed, async } from '@angular/core/testing';
import { UserComponent } from './user.component';
import {UserService} from 'services/user.service';
import {DataService} from 'services/data.service';

describe('Component: User', () => {
	// let fixture: ComponentFixture<UserComponent>;
	let comp: UserComponent;
	// let el: HTMLElement;
	beforeEach(() => {
		let userServiceStub = {
			isLoggedIn: true,
			user: {
				name: 'Jordan'
			}
		}
		TestBed.configureTestingModule({
			declarations: [UserComponent],
			providers: [DataService]
		});
		TestBed.overrideComponent(UserComponent, {
			set: {
				providers: [
					{
						provide: UserService,
						useValue: userServiceStub
					}
				]
			}
		});
	// 	fixture = TestBed.createComponent(UserComponent);
	// 	comp = fixture.debugElement.componentInstance;
	});
	it ('should create the app', () => {
		let fixture = TestBed.createComponent(UserComponent);
		let myComponent = fixture.debugElement.componentInstance;
		expect(myComponent).toBeTruthy();
	});
	it ('should use the username from the service', () => {
		let fixture = TestBed.createComponent(UserComponent);
		let myComponent = fixture.debugElement.componentInstance;
		let userService = fixture.debugElement.injector.get(UserService);
		fixture.detectChanges( );
		expect(userService.user.name).toEqual(myComponent.user.name);
		expect(userService.user.name).toEqual('Jordan');
	});
	it ('shouldn\'t display the user name if user is not logged in', () => {
		let fixture = TestBed.createComponent(UserComponent);
		let myComponent = fixture.debugElement.componentInstance;
		let userService = fixture.debugElement.injector.get(UserService);
		userService.isLoggedIn = false;
		fixture.detectChanges();
		let el = fixture.debugElement.nativeElement;
		expect(el.querySelector('p').textContent).not.toContain(myComponent.user.name);
	});
	it ('should display the user name if user is logged in', () => {
		let fixture = TestBed.createComponent(UserComponent);
		let myComponent = fixture.debugElement.componentInstance;
		myComponent.isLoggedIn = true;
		fixture.detectChanges();
		let el = fixture.debugElement.nativeElement;
		expect(el.querySelector('p').textContent).toContain(myComponent.user.name);
	});

	it (`shouldn't fetch data if not called asynchronously`, () => {
		let fixture = TestBed.createComponent(UserComponent);
		let myComponent = fixture.debugElement.componentInstance;
		let dataService = fixture.debugElement.injector.get(DataService);
		let spy = spyOn(dataService, 'getDetails')
			.and.returnValue(Promise.resolve('Data'));
		fixture.detectChanges();
		expect(myComponent.data).toBe(undefined);
	});

	it (`should fetch data if called asynchronously`, async(() => {
		let fixture = TestBed.createComponent(UserComponent);
		let myComponent = fixture.debugElement.componentInstance;
		let dataService = fixture.debugElement.injector.get(DataService);
		let spy = spyOn(dataService, 'getDetails')
			.and.returnValue(Promise.resolve('Chiken'));
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			expect(myComponent.data).toBe('Chiken');
		});
	}));
});
