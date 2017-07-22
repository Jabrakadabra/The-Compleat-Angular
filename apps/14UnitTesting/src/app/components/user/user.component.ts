import { Component, OnInit } from '@angular/core';
import { UserService } from 'services/user.service';
import { DataService } from 'services/data.service';

@Component({
	selector: 'user-comp',
	templateUrl: './user.component.html',
	styleUrls: [
		'./user.component.css'
	],
})

export class UserComponent implements OnInit {
	user:{name: string};
	isLoggedIn = false;
	data: string;

	constructor(
		private userService: UserService,
		private dataService: DataService
	) {}

	ngOnInit() {
		this.user = this.userService.user;
		this.isLoggedIn = this.userService.isLoggedIn;
		this.dataService.getDetails().then((data:string) => this.data = data);
	}
}
