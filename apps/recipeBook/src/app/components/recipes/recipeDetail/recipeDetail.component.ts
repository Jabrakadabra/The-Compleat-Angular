import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { Recipe } from '../../../shared/models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipeDetail.component.html',
	styleUrls: ['./recipeDetail.component.css']
})

export class RecipeDetailComponent implements OnInit {
	recipe: Recipe


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

	onEditRecipe() {
		this.router.navigate(['edit'], { relativeTo: this.route });
	}

	addIngredients() {
		this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
	}
}
