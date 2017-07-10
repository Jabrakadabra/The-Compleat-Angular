import { Component, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListService } from '../../../services/shopping-list.service';
import { Ingredient } from '../../../shared/models/ingredient.model';

@Component({
	selector: 'app-shopping-list-edit',
	templateUrl: './shopping-list-edit.component.html',
	styleUrls: ['./shopping-list-edit.component.css']
})

export class ShoppingListEditComponent {
	constructor(
		private shoppingList: ShoppingListService
	) {}

	@ViewChild('nameInput') nameInput: ElementRef;
	@ViewChild('amountInput') amountInput: ElementRef;

	submitData() {
		const name: string = this.nameInput.nativeElement.value;
		const amount: number = this.amountInput.nativeElement.value;
		const newIngredient = new Ingredient(name, amount);
		this.shoppingList.addIngredient(newIngredient)
	}

}
