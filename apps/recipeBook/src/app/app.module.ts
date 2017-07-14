import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing-module';

import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header';
import { RecipeSectionComponent } from './components/recipes';
import { RecipeListComponent, RecipeItemComponent } from './components/recipes/recipeList';
import { RecipeDetailComponent } from './components/recipes/recipeDetail';
import { ShoppingListComponent } from './components/shopping-list';
import { ShoppingListEditComponent } from './components/shopping-list/shopping-list-edit';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './services/shopping-list.service';
import {RecipeInitComponent} from './components/recipes/recipeDetail/recipe-init/recipe-init.component';
import {RecipeResolver} from './services/recipe-resolver.service';
import {RecipeService} from './services/recipe.service';
import {RecipeEditComponent} from './components/recipes/recipe-edit/recipe-edit.component';


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
		DropdownDirective,
		RecipeInitComponent,
		RecipeEditComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [
		ShoppingListService,
		RecipeService,
		RecipeResolver
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
