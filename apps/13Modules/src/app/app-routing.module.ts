import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from './home/home.component';

const authRoutes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' }
];

@NgModule({
	imports: [RouterModule.forRoot(authRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
