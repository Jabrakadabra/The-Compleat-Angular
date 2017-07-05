import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-shopping-list-edit',
	templateUrl: './shoppingListEdit.component.html',
	styleUrls: ['./shoppingListEdit.component.css']
})

export class ShoppingListEditComponent {
	@ViewChild('nameInput') nameInput: ElementRef;
	@ViewChild('amountInput') amountInput: ElementRef;
	@Output() ingredient = new EventEmitter<{name: string, amount: number}>();

	submitData() {
		const name: string = this.nameInput.nativeElement.value;
		const amount: number = this.amountInput.nativeElement.value;
		this.ingredient.emit({
			name,
			amount
		});
	}

}
