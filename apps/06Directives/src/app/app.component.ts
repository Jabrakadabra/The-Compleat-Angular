import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	hotColor = 'pink';
	coldColor = 'grey';
	oddNumbers = [1, 3, 5];
	evenNumbers = [2, 4];
	onlyOdd = false;

}
