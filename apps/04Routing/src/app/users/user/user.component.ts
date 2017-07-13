import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	user: {id: number, name: string} = {
		id: null,
		name: null
	};
	constructor(
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.route.params.subscribe((val: any) => {
			this.user.id = val.id;
			this.user.name = val.name;
		});
	}

};
