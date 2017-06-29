import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
	constructor(
		private serversService: ServersService,
		private route: ActivatedRoute
	) { }

	server: {id: number, name: string, status: string};


	ngOnInit() {
		console.log('server');
		const id = this.route.snapshot.params['id'] || 1;
		console.log(typeof id);
		console.log(id);
		this.server = this.serversService.getServer(id);
	}
}
