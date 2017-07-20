import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent} from './shopping-list.component';

const shoppingListRoutes: Routes = [
	{ path: '', redirectTo: '/recipes', pathMatch: 'full' },
	{ path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
	imports: [RouterModule.forChild(shoppingListRoutes)],
	exports: [RouterModule]
})
export class ShoppingListRoutingModule {

}
