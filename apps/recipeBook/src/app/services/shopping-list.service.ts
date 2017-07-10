import { Ingredient } from '../shared/models/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
	ingredientsChanged = new EventEmitter<Ingredient[]>();
	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
	];
	getIngredients() {
		return Array.from(this.ingredients);
	}
	addIngredient(item: Ingredient) {
		this.ingredients.push(item);
		this.ingredientsChanged.emit(Array.from(this.ingredients));
	}
}
