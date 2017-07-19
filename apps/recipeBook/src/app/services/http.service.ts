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
		private httpService: Http,
		private recipeService: RecipeService
	) {}

	storeRecipes() {
		console.log('storeRecipes');
		return this.httpService.put(`${this.dbUrl}recipes.json`, this.recipeService.getRecipes());
	}

	getRecipes() {
		console.log('getRecipes');
		this.httpService.get(`${this.dbUrl}recipes.json`)
			.subscribe(
				(res: Response) => {
					const recipes: Recipe[] = res.json();
					this.recipeService.setRecipes(recipes)
				}
			)
	}
}
