import { EventEmitter, Injectable  } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
	recipeSelected = new EventEmitter<Recipe>();

	private recipes: Recipe[] = [
		new Recipe(
			'Tasty Schnitzel',
			'A super-tasty Schnitzel - just awesome!',
			'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
			[
				new Ingredient('Meat', 1),
				new Ingredient('French Fries', 20)
			]
		),
		new Recipe(
			'Big Fat Burger',
			'What else do I need to say?',
			'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
			[
				new Ingredient('Bun', 1),
				new Ingredient('Beef Patty', 2),
				new Ingredient('Tomato Slice', 1),
				new Ingredient('Pickle Chips', 4)
			]
		)
	];

	constructor(
		private shoppingService: ShoppingListService
	) {}

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipe(ind) {
		return this.recipes[ind];
	}

	addIngredientsToShoppingList(ingredients: Array<Ingredient>) {
		console.log('done', ingredients);
		this.shoppingService.addIngredients(ingredients);
	}
}
