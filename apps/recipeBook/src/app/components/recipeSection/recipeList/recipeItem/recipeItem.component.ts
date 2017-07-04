import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipeItem.component.html',
	styleUrls: ['./recipeItem.component.css']
})

export class RecipeItemComponent {
	@Input() recipe: {name: string, description: string, imagePath: string}
}
