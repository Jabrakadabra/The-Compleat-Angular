import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { UsersComponent } from './app/users/users.component';
import { UserComponent } from './app/users/user/user.component';
import { ServersComponent } from './app/servers/servers.component';
import { ServerComponent } from './app/servers/server/server.component';
import { EditServerComponent } from './app/servers/edit-server/edit-server.component';

const APP_ROUTES: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'users', component: UsersComponent },
	{ path: 'users/:id/:name', component: UserComponent },
	{ path: 'servers', component: ServersComponent },
	{ path: 'servers/:id', component: ServerComponent },
	{ path: 'servers/:id/edit', component: EditServerComponent }
];

export const routing = {
	routes: RouterModule.forRoot(APP_ROUTES),
	components: [
		HomeComponent,
		UsersComponent,
		UserComponent,
		ServersComponent,
		ServerComponent,
		EditServerComponent
	]
}
