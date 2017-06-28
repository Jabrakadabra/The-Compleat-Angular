import { Component, ElementRef, AfterViewInit, ViewChild, OnInit, Input, OnChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css'],
})

export class ElementComponent implements AfterViewInit, OnInit, OnChanges, DoCheck {
	@Input () element: {type: string, name: string, content: string}
	@ViewChild('heading') header: ElementRef

	ngOnInit() {
		console.log('header', this.header);
	}

	ngAfterViewInit() {
		console.log('avI', this.header.nativeElement.textContent);
	}

	ngDoCheck() {
		console.log('doCheck');
	}
	ngOnChanges(changes) {
		console.log('changes', changes);
	}

	constructor() {
		console.log('constructor');
	};

}
