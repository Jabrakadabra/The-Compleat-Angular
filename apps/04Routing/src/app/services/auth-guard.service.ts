import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivateChild {
	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.authService.isAuthenticated()
			.then(
				(authenticated: boolean) => {
					if (authenticated) {
						return true;
					} else {
						this.router.navigate(['/']);
						return false;
					}
				}
			);
	}
}
