import { Injectable  } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();

	private recipes: Recipe[] = [
		new Recipe(
			'Tasty Snot',
			'A super-tasty Schnitzel - just awesome!',
			'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
			[
				new Ingredient('Meat', 1),
				new Ingredient('French Fries', 20)
			]
		),
		new Recipe(
			'Big Farts',
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

	setRecipes(recipes: Array<Recipe>) {
		this.recipes = recipes;
		console.log('setting', this.recipes);
		this.recipesChanged.next(this.recipes.slice());
	}

	constructor(
		private shoppingService: ShoppingListService
	) {}

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipe(id) {
		const numId = parseInt(id, 10);
		return this.recipes[numId];
	}

	addIngredientsToShoppingList(ingredients: Array<Ingredient>) {
		this.shoppingService.addIngredients(ingredients);
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next(Array.from(this.recipes));
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		console.log('update', index);
		this.recipes[index] = newRecipe;
		this.recipesChanged.next(Array.from(this.recipes))
	}

	removeRecipe(index: number) {
		console.log('index', index);
		this.recipes.splice(index, 1);
		console.log('recipes', this.recipes);
		this.recipesChanged.next(Array.from(this.recipes))
	}
}
