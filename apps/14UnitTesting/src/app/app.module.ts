import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { Services } from './services';
import { Components } from './components';
// import { Directives } from './directives';
// import {  } from './routes';
import { Pipes } from './pipes';


@NgModule({
	imports: [
		BrowserModule,
		// FormsModule,
		// HttpModule,
		// ACMRoutes.routes,
	],
	declarations: [
		AppComponent,
		...Components.components,
		...Pipes.pipes,
    // ...Directives.directives
	],
	bootstrap: [
		AppComponent
	],
	providers: [
		...Services.services,
	]
})

export class AppModule {};
