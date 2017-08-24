import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './components/app';
import { ServerComponent} from './components/server';
import { ServersComponent } from './components/servers';

@NgModule({
	declarations: [
		AppComponent,
		ServerComponent,
		ServersComponent
	],
	imports: [
		BrowserModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
