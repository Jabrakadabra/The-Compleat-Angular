import { Ingredient } from '../shared/models/ingredient.model';
import {Subject} from 'rxjs/Subject';

export class ShoppingListService {
	ingredientsChanged = new Subject<Ingredient[]>();
	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
	];
	getIngredients() {
		return Array.from(this.ingredients);
	}
	addIngredient(item: Ingredient) {
		this.ingredients.push(item);
		this.ingredientsChanged.next(Array.from(this.ingredients));
	}

	addIngredients(ingredients: Array<Ingredient>) {
		console.log('ing', ingredients);
		this.ingredients.push(...ingredients);
		this.ingredientsChanged.next(Array.from(this.ingredients));
	}
}
