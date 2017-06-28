import { Component, EventEmitter, Output, ViewChild, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
	@Output('sC') serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
	@Output('bpC') blueprintCreated = new EventEmitter<{blueprintName: string, blueprintContent: string}>();
	// newServerName = '';
	// newServerContent = '';
	@ViewChild('serverContentInput') serverContentInput: ElementRef;

	onAddServer(nameInput: HTMLInputElement) {
		this.serverCreated.emit({
			serverName: nameInput.value,
			serverContent: this.serverContentInput.nativeElement.value
		});
	}

	onAddBlueprint(nameInput: HTMLInputElement) {
		this.blueprintCreated.emit({
			blueprintName: nameInput.value,
			blueprintContent: this.serverContentInput.nativeElement.value
		})
	}

  ngOnInit() {
  }

}
