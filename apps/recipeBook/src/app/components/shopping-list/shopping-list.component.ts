import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';

@Component ({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
	ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
	];

	addIngredient(item) {
		this.ingredients.push(new Ingredient(item.name, item.amount))
	}
	constructor() { }

	ngOnInit() {

	}

}
