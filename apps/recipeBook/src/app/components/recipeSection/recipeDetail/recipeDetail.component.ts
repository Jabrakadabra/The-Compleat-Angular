import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipeDetail.component.html',
	styleUrls: ['./recipeDetail.component.css']
})

export class RecipeDetailComponent {
	@Input() recipe: {name: string, description: string, imagePath: string};

}
