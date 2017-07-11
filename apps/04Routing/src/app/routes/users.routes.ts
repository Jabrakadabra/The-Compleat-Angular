import { Routes } from '@angular/router';
import { UserComponent } from '../users/user/user.component';

const USERS_ROUTES: Routes = [
	{ path: ':id/:name', component: UserComponent },
];

const userRouting = {
	USERS_ROUTES,
	userComponents: [
		UserComponent
	]
};

export default userRouting;
