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

	name = 'Jordan';
	serverName = '';
	serverCreationStatus = 'No server was created.'

	onCreateServer() {
		this.serverCreationStatus = "Server was created."
	}

	onUpdateServerName(event: any) {
		this.serverName = event.target.value;
	}

}
