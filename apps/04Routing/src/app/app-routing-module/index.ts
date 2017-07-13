import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UsersComponent } from '../users/users.component';
import { UserComponent } from '../users/user/user.component';
import { ServersComponent } from '../servers/servers.component';
import ServerRouting from './servers.routes';
import UserRouting from './users.routes';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { ErrorPageComponent } from '../error-page/error-page.component';

const APP_ROUTES: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'users', component: UsersComponent, children: UserRouting.USERS_ROUTES },
	{
		path: 'servers',
		canActivateChild: [AuthGuardService],
		component: ServersComponent,
		children: ServerRouting.SERVERS_ROUTES
	},
	{ path: 'notFound', component: PageNotFoundComponent},
	// { path: 'notFound', component: ErrorPageComponent, data: { message: 'This is the message!'} },
	{ path: '**', redirectTo: 'users'}
];


@NgModule({
	imports: [
		RouterModule.forRoot(APP_ROUTES, {useHash: true})
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule {

}
