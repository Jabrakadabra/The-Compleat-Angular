import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header';
import { RecipeSectionComponent } from './components/recipeSection';
import { RecipeListComponent, RecipeItemComponent } from './components/recipeSection/recipeList';
import { RecipeDetailComponent } from './components/recipeSection/recipeDetail';
import { ShoppingListComponent } from './components/shopping-list';
import { ShoppingListEditComponent } from './components/shopping-list/shoppingListEdit';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './services/shoppingListService';
import { RecipeService } from './services/recipeService';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		RecipeSectionComponent,
		RecipeListComponent,
		RecipeItemComponent,
		RecipeDetailComponent,
		ShoppingListComponent,
		ShoppingListEditComponent,
		DropdownDirective
	],
	imports: [
		BrowserModule
	],
	providers: [
		ShoppingListService,
		RecipeService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
