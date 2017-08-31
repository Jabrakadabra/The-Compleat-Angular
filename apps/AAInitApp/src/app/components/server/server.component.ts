import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-server',
	templateUrl: './server.component.html',
	styleUrls: ['./server.component.css']
})

export class ServerComponent {
	@Input() name;
	serverId = 10;
	serverStatus = 'offline';
}
