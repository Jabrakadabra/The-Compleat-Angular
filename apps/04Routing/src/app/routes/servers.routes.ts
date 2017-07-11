import { Routes } from '@angular/router';
import { ServerComponent } from '../servers/server/server.component';
import { EditServerComponent } from '../servers/edit-server/edit-server.component';

const SERVERS_ROUTES: Routes = [
	{ path: ':id', component: ServerComponent },
	{ path: ':id/edit', component: EditServerComponent }
];

const serverRouting = {
	SERVERS_ROUTES,
	serverComponents: [
		ServerComponent,
		EditServerComponent
	]
}

export default serverRouting;
