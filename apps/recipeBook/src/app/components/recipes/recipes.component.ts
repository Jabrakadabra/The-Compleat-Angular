import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';


@Component({
	selector: 'app-recipe-section',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css'],
	providers: [RecipeService]
})

export class RecipeSectionComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
