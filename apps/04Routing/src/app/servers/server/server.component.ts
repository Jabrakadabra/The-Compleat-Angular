import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';

import { ServersService } from '../../services/servers.service';

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
		this.route.data
		.subscribe(
			(data: Data) => {
				this.server = data['server'];
			}
		);
		// const id = this.route.snapshot.params['id'] || 1;
		// console.log('id', id);
		// this.server = this.serversService.getServer(id);
		// this.route.params
		// .subscribe(
		// 	(params: Params) => {
		// 		this.server = this.serversService.getServer(params['id']);
		// 	}
		// );
	}

	onEdit() {
		const serverNum = parseInt(this.route.snapshot.params['id'], 10);
		console.log('inEdit', serverNum);
		const editable = this.route.snapshot.queryParams['allowEdit'];
		this.router.navigate([`/servers/${serverNum}/edit`], {queryParams: { allowEdit: editable }});
	}
}
