import { Component } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Response} from '@angular/http';
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from '../../shared/models/recipe.model';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent {
	constructor(
		private httpService: HttpService,
		private recipeService: RecipeService
	) {}

	onSaveData() {
		this.httpService.storeRecipes()
		.subscribe(
			(res: Response) => {
				console.log(res);
			}
		);
	}

	onFetchData() {
		console.log('onFetchData');
		this.httpService.getRecipes();
	}
}
