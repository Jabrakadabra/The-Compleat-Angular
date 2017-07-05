import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-recipe-section',
	templateUrl: './recipeSection.component.html',
	styleUrls: ['./recipeSection.component.css']
})

export class RecipeSectionComponent implements OnInit {
	hotRecipe: {name: string, description: string, imagePath: string}
	constructor() { }

passIndex(recipe) {
	this.hotRecipe = recipe;
}

	ngOnInit() {}
}
