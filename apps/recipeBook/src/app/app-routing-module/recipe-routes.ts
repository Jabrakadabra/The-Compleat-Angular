import { Routes } from '@angular/router';
import { RecipeDetailComponent } from '../components/recipes/recipeDetail';
import { RecipeResolver } from '../services/recipe-resolver.service';
import {RecipeInitComponent} from '../components/recipes/recipeDetail/recipe-init/recipe-init.component';
import {RecipeEditComponent} from '../components/recipes/recipe-edit/recipe-edit.component';

const RECIPE_ROUTES = [
	{
		path: '',
		component: RecipeInitComponent
	},
	{
		path: 'new',
		component: RecipeEditComponent
	},
	{
		path: ':id',
		component: RecipeDetailComponent,
		resolve: {
			recipe: RecipeResolver
		}
	},
	{
		path: ':id/edit',
		component: RecipeEditComponent
	}
];

const recipeRouting = {
	RECIPE_ROUTES,
	recipeComponents: [
		RecipeInitComponent,
		RecipeDetailComponent,
		RecipeEditComponent
	]
};


export default recipeRouting;

