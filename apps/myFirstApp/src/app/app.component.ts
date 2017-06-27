import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor() {
		// setTimeout(() => {this.allowNewServer = true}, 2000)
	}

	allowNewServer() {
		return false;
	}

	name = 'Jacy';
	serverName = '';
	serverCreationStatus = 'no server'
	class1 = 'online';
	class2 = 'redline';

	servers = new Set(['Server1', 'Server2'])

	onCreateServer() {
		let len = this.servers.size;
		this.servers.add(`Servers${len + 1}`);
		this.serverCreationStatus = "Server was created."
	}

	onUpdateServerName(event: any) {
		this.serverName = event.target.value;
	}

}
