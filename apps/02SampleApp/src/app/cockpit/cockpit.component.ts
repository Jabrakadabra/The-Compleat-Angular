import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
	@Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
	@Output() blueprintCreated = new EventEmitter<{blueprintName: string, blueprintContent: string}>();
	newServerName = '';
	newServerContent = '';

	onAddServer() {
		console.log('test0');
		this.serverCreated.emit({
			serverName: this.newServerName,
			serverContent: this.newServerContent
		});
	}

	onAddBlueprint() {
		console.log('test1');
		this.blueprintCreated.emit({
			blueprintName: this.newServerName,
			blueprintContent: this.newServerContent
		});
	}

  ngOnInit() {
  }

}
