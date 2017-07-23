import {NgModule} from '@angular/core';
import { AppComponent} from './components/app';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent
	],
	imports: [AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}