import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {ShoppingListRoutingModule} from './shopping-list-routing.module';
import { SharedModule} from '../shared/shared.module';

@NgModule({
	declarations: [
		ShoppingListComponent,
		ShoppingEditComponent
	],
	imports: [
		SharedModule,
		CommonModule,
		FormsModule,
		ShoppingListRoutingModule
	],
})
export class ShoppingListModule { }
