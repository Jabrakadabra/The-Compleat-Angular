import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import { HomeComponent} from './core/home/home.component';

const authRoutes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' }
];

@NgModule({
	imports: [RouterModule.forRoot(authRoutes, {preloadingStrategy: PreloadAllModules})],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
