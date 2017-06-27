import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/headerComponent';
import { RecipeBookComponent } from './components/recipeBookComponent';
import { RecipeListComponent } from './components/recipeBookComponent/recipeListComponent';
import { RecipeItemComponent } from './components/recipeBookComponent/recipeListComponent/recipeItemComponent';
import { RecipeDetailComponent } from './components/recipeBookComponent/recipeDetailComponent';
import { ShoppingListComponent } from './components/shoppingListComponent';
import { ShoppingListEditComponent } from './components/shoppingListComponent/shoppingListEditComponent';

@NgModule({
  declarations: [
    AppComponent,
	HeaderComponent,
	RecipeBookComponent,
	RecipeListComponent,
	RecipeItemComponent,
	RecipeDetailComponent,
	ShoppingListComponent,
	ShoppingListEditComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
