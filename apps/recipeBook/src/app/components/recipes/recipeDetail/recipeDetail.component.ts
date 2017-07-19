import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { Recipe } from '../../../shared/models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipeDetail.component.html',
	styleUrls: ['./recipeDetail.component.css']
})

export class RecipeDetailComponent implements OnInit {
	recipe: Recipe;
	id: number;
	subscription: Subscription;
	recipes: Array<Recipe>;


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
		);

		this.route.params
			.subscribe (
				(params: Params) => {
					this.id = params['id'];
				}
			);
	}

	onEditRecipe() {
		this.router.navigate(['edit'], { relativeTo: this.route });
	}

	onDeleteRecipe() {
		console.log('id', this.id);
		this.recipeService.removeRecipe(this.id);
		this.router.navigate(['/recipes'])
	}

	addIngredients() {
		this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
	}
}
