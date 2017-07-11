import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// our components, services, routes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { routing } from './routes/app.routing';

@NgModule({
	declarations: [
		AppComponent,
		...routing.components,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing.routes
	],
	providers: [ServersService],
	bootstrap: [AppComponent]
})

export class AppModule { }
