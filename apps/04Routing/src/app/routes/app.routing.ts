import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UsersComponent } from '../users/users.component';
import { UserComponent } from '../users/user/user.component';
import { ServersComponent } from '../servers/servers.component';
import ServerRouting from './servers.routes';
import UserRouting from './users.routes';

const APP_ROUTES: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'users', component: UsersComponent },
	{ path: 'users', component: UsersComponent, children: UserRouting.USERS_ROUTES },
	{ path: 'servers', component: ServersComponent },
	{ path: 'servers', component: ServersComponent, children: ServerRouting.SERVERS_ROUTES },
];

export const routing = {
	routes: RouterModule.forRoot(APP_ROUTES),
	components: [
		...ServerRouting.serverComponents,
		...UserRouting.userComponents,
		HomeComponent,
		UsersComponent,
		UserComponent,
		ServersComponent
	]
};
