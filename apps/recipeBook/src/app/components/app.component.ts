import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	choice = 'recipe';

	onPageChoice(e) {
		this.choice = e;
		console.log('choice', e);
	}
}
