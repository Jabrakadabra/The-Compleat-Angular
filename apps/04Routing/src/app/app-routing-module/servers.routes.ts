import { Routes } from '@angular/router';
import { ServerComponent } from '../servers/server/server.component';
import { EditServerComponent } from '../servers/edit-server/edit-server.component';
import { MyDeactivateGuard } from '../services/can-deactivate-guard.service';
import { ServerResolver } from '../services/server-resolver.service';

const SERVERS_ROUTES: Routes = [
	{
		path: ':id',
		component: ServerComponent,
		resolve: {
			server: ServerResolver
		}
	},
	{
		path: ':id/edit',
		component: EditServerComponent,
		canDeactivate: [MyDeactivateGuard]
	}
];

const serverRouting = {
	SERVERS_ROUTES,
	serverComponents: [
		ServerComponent,
		EditServerComponent
	]
}

export default serverRouting;
