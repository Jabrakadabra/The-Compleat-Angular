import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header';
import { RecipeSectionComponent } from './components/recipes';
import { RecipeListComponent, RecipeItemComponent } from './components/recipes/recipeList';
import { RecipeDetailComponent } from './components/recipes/recipeDetail';
import { ShoppingListComponent } from './components/shopping-list';
import { ShoppingListEditComponent } from './components/shopping-list/shopping-list-edit';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './services/shopping-list.service';


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
		ShoppingListService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
