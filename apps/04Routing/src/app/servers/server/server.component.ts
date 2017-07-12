import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
	selector: 'app-server',
	templateUrl: './server.component.html',
	styleUrls: ['./server.component.css']
})

export class ServerComponent implements OnInit {
	server: {id: number, name: string, status: string};

	constructor(
		private serversService: ServersService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		const id = this.route.snapshot.params['id'] || 1;
		this.server = this.serversService.getServer(id);
		this.route.params
		.subscribe(
			(params: Params) => {
				this.server = this.serversService.getServer(params['id']);
			}
		);
	}

	onEdit() {
		const serverNum = parseInt(this.route.snapshot.params['id'], 10);
		const editable = this.route.snapshot.queryParams['allowEdit'];
		this.router.navigate([`/servers/${serverNum}/edit`], {queryParams: { allowEdit: editable }});
	}
}
