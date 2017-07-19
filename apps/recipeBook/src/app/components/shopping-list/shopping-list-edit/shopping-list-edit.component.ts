import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ShoppingListService } from '../../../services/shopping-list.service';
import { Ingredient } from '../../../shared/models/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'app-shopping-list-edit',
	templateUrl: './shopping-list-edit.component.html',
	styleUrls: ['./shopping-list-edit.component.css']
})

export class ShoppingListEditComponent implements OnInit, OnDestroy {
	@ViewChild('f') shoppingListForm: NgForm;
	subscription: Subscription;
	editMode = false;
	editedItemIndex: number;
	editedItem: Ingredient;

	constructor(
		private shoppingList: ShoppingListService
	) {}

	onSubmit() {
		const value = this.shoppingListForm.value;
		const newIngredient = new Ingredient(value.name, value.amount);
		if (this.editMode) {
			this.shoppingList.updateIngredient(this.editedItemIndex, newIngredient);
		} else {
			this.shoppingList.addIngredient(newIngredient);
		}
		this.clearForm();
	}

	deleteItem() {
		this.shoppingList.removeIngredient(this.editedItemIndex);
		this.clearForm();
	}

	clearForm() {
		this.shoppingListForm.reset();
		this.editMode = false;
	}

	ngOnInit() {
		this.subscription = this.shoppingList.startedEditing
			.subscribe(
				(index: number) => {
					this.editedItemIndex = index;
					this.editMode = true;
					this.editedItem = this.shoppingList.getIngredient(index);
					this.shoppingListForm.setValue({
						name: this.editedItem.name,
						amount: this.editedItem.amount
					})
				}
			);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}
