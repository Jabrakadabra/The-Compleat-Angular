import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';


import { Ingredient } from '../../../shared/models/ingredient.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipeDetail.component.html',
	styleUrls: ['./recipeDetail.component.css']
})

export class RecipeDetailComponent implements OnInit {
	recipe: { name: string, description: string, imagePath: string, ingredients: Array<Ingredient>}


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private recipeService: RecipeService
	) {}

	ngOnInit() {
		this.route.data
		.subscribe(
			(data: Data) => {
				this.recipe = data['recipe'];
			}
		)
	}

	addIngredients() {
		this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
	}
}
