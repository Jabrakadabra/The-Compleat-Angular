import { Component, OnInit } from '@angular/core';

@Component ({
	selector: 'app-shopping-list',
	templateUrl: './shoppingSection.component.html',
	styleUrls: ['./shoppingSection.component.css']
})

export class ShoppingListComponent implements OnInit {
	ingredients = [];

	constructor() { }

	ngOnInit() {
		let bob: string = 'bob'
		
	}

}
