import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import {Ingredient} from '../shared/models/ingredient.model';
import {Observable} from 'rxjs/Observable';

interface Recipe {
	name: string,
	description: string,
	imagePath: string,
	ingredients: Array<Ingredient>
}

@Injectable()
export class RecipeResolver implements Resolve<Recipe> {
	constructor(
		private recipeService: RecipeService
	) {}

	resolve (
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<Recipe> | Promise<Recipe> | Recipe {
			return this.recipeService.getRecipe(route.params['id']);
	}
}
