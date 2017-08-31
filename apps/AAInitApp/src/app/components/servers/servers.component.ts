import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-servers',
	templateUrl: './servers.component.html',
	styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
	value: string;
	allowNewServer = false;
	serverCreationStatus = 'No server was created!';

	onCreateServer(toast) {
		console.log('test0: ', toast);
		this.serverCreationStatus = 'A server has been created!';
	}

	constructor() {
		setTimeout(() => {
			this.allowNewServer = true;
		}, 2000);
	}

	ngOnInit() {
		this.value = 'Jordan';
	}
}
