import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../../../shared/models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit, OnDestroy {
	recipes: Array<Recipe>;
	subscription: Subscription;

	constructor(
		private recipeService: RecipeService,
		private router: Router
	) {}

	ngOnInit() {
		this.subscription = this.recipeService.recipesChanged
			.subscribe(
				(recipes: Recipe[]) => {
					console.log('changed', recipes);
					this.recipes = recipes;
				}
			);
		this.recipes = this.recipeService.getRecipes();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onNewRecipe() {
		this.router.navigate((['/', 'recipes', 'new']))
	}
}
