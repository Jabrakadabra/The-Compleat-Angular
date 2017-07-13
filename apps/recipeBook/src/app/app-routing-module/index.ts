import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import RecipeRouting from './recipe-routes';
import { RecipeSectionComponent} from '../components/recipes';
import { ShoppingListComponent } from '../components/shopping-list'



const APP_ROUTES: Routes = [
	{
		path: 'recipes',
		component: RecipeSectionComponent,
		children: RecipeRouting.RECIPE_ROUTES
	},
	{
		path: 'shopping',
		component: ShoppingListComponent
	},
	{
		path: '',
		redirectTo: 'recipes',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(APP_ROUTES)
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule {}
