import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipeItem.component.html',
	styleUrls: ['./recipeItem.component.css']
})

export class RecipeItemComponent {
	@Output() recipeNumber = new EventEmitter<number>();
	@Input() recipe: {name: string, description: string, imagePath: string};
	@Input() ind: number;

	chooseRecipe(num) {
		console.log(`choose: ${num}`);
		this.recipeNumber.emit(num);
	}
}
