import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component ({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {
	ingredients: Array<Ingredient>;
	private subscription: Subscription;
	constructor(
		private shoppingList: ShoppingListService
	) { }

	ngOnInit() {
		this.ingredients = this.shoppingList.getIngredients();
		this.subscription = this.shoppingList.ingredientsChanged
		.subscribe(
			(ingredients: Ingredient[]) => {
				this.ingredients = ingredients;
			}
		)
	}
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}
