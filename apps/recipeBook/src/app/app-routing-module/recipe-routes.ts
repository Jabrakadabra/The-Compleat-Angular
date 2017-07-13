import { Routes } from '@angular/router';
import { RecipeDetailComponent } from '../components/recipes/recipeDetail';
import { RecipeResolver } from '../services/recipe-resolver.service';
import {RecipeInitComponent} from '../components/recipes/recipeDetail/recipe-init/recipe-init.component';

const RECIPE_ROUTES = [
	{
		path: ':id',
		component: RecipeDetailComponent,
		resolve: {
			recipe: RecipeResolver
		}
	},
	{
		path: '',
		component: RecipeInitComponent
	}
];

const recipeRouting = {
	RECIPE_ROUTES,
	recipeComponents: [
		RecipeInitComponent,
		RecipeDetailComponent
	]
};


export default recipeRouting;

