import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipeDetail.component.html',
	styleUrls: ['./recipeDetail.component.css']
})

export class RecipeDetailComponent {
	@Input() recipe: {
		name: string,
		description: string,
		imagePath: string,
		ingredients: Array<Ingredient>
	};

	constructor(
		private recipeService: RecipeService
	){}

	addIngredients() {
		this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
	}
}
