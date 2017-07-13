import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServersService } from '../../services/servers.service';
// import { CanComponentDeactivate } from '../../services/can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-edit-server',
	templateUrl: './edit-server.component.html',
	styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
	server: {id: number, name: string, status: string};
	serverName = '';
	serverStatus = '';
	allowEdit = false;
	changesSaved = false;

	constructor(
		private serversService: ServersService,
		private route: ActivatedRoute,
		private router: Router
	) { }


	ngOnInit() {
		this.route.queryParams
			.subscribe(
				(queryParams: Params) => {
					this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
				}
			);
		this.route.fragment.subscribe();
		const id = this.route.snapshot.params['id'] || 1;
		this.server = this.serversService.getServer(id);
		this.serverName = this.server.name;
		this.serverStatus = this.server.status;
	}

	onUpdateServer() {
		this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
		this.changesSaved = true;
		this.router.navigate(['../'], {relativeTo: this.route});
	}

	canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
		console.log('deactivate', this.serverName);
		if (!this.allowEdit) {
			return true;
		}
		if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
			return confirm('Do you want to discard?');
		} else {
			return true;
		}
	}
}
