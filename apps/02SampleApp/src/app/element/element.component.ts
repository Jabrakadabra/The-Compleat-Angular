import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css'],
})

export class ElementComponent implements OnInit {
	@Input ('srvElement') element: {type: string, name: string, content: string}

	constructor() { }

	ngOnInit() {
  }
}
