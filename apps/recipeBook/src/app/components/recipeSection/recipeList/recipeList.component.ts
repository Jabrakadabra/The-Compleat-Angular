import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../../shared/models/recipe.model';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipeList.component.html',
	styleUrls: ['./recipeList.component.css']
})

export class RecipeListComponent {
	@Output() recipeNumber1 = new EventEmitter<{name: string, description: string, imagePath: string}>();
	recipes: Recipe[] = [
		new Recipe('A Test Recipe', 'This is simply a test', 'https://i1.wp.com/dippinflavors.com/wp-content/uploads/2015/04/Recipe.jpg?resize=300%2C300&ssl=1'),
		new Recipe('Schnitzel', 'This is a lovely schnitzel', 'https://i1.wp.com/dippinflavors.com/wp-content/uploads/2015/04/Recipe.jpg?resize=300%2C300&ssl=1')
	];

	recipePass(e: number) {
		this.recipeNumber1.emit(this.recipes[e]);
	}
	constructor() {}

}
