import { EventEmitter } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';

export class RecipeService {
	recipeSelected = new EventEmitter<Recipe>();

	private recipes: Recipe[] = [
		new Recipe('A Test Recipe', 'This is simply a test', 'https://i1.wp.com/dippinflavors.com/wp-content/uploads/2015/04/Recipe.jpg?resize=300%2C300&ssl=1'),
		new Recipe('Schnitzel', 'This is a lovely schnitzel', 'https://i1.wp.com/dippinflavors.com/wp-content/uploads/2015/04/Recipe.jpg?resize=300%2C300&ssl=1')
	];

	getRecipes() {
		return this.recipes.slice();
	}
}
