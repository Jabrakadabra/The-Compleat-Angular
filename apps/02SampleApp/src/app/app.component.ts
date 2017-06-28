import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	serverElements = [
		{type: 'server', name: 'testServer', content: 'Just a test.'},
		{type: 'server', name: 'cjbServer', content: 'a second test.'}
	];

	onServerAdded(serverData: {serverName: string, serverContent: string}) {
		console.log('shazaam!');
		this.serverElements.push({
			type: 'server',
			name: serverData.serverName,
			content: serverData.serverContent
		});
	}

	onBluePrintAdded(blueprintData: {blueprintName: string, blueprintContent: string}) {
		console.log('shazoom');
		this.serverElements.push({
			type: 'blueprint',
			name: blueprintData.blueprintName,
			content: blueprintData.blueprintContent
		});
	}
}
