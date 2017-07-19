import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Recipe} from '../shared/models/recipe.model';
import {RecipeService} from './recipe.service';
import 'rxjs/Rx';

@Injectable()
export class HttpService {
	fireplace = 'ng-recipe-bb4e9';
	dbUrl = `https://ng-recipe-bb4e9.firebaseio.com/`

	constructor (
		private http: Http,
		private recipeService: RecipeService
	) {}

	storeRecipes() {
		console.log('storeRecipes');
		return this.http.put(`${this.dbUrl}recipes.json`, this.recipeService.getRecipes());
	}

	getRecipes() {
		console.log('getRecipes');
		this.http.get(`${this.dbUrl}recipes.json`)
			.map(
				(response: Response) => {
					const recipes: Recipe[] = response.json();
					for (let recipe of recipes) {
						if (!recipe['ingredients']) {
							recipe['ingredients'] = [];
						}
					}
					return recipes
				}
			)
			.subscribe(
				(recipes: Recipe[]) => {
					this.recipeService.setRecipes(recipes)
				}
			)
	}
}
