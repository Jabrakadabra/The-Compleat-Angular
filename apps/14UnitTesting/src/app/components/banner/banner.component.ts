import { Component } from '@angular/core';

@Component( {
	selector: 'banner-comp',
	templateUrl: './banner.component.html',
	styleUrls: [
		'./banner.component.css'
	]
})

export class BannerComponent {
	constructor() {};

	title:string = 'The joy of test';
}
