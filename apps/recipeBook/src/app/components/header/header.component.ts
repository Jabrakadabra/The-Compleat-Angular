import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent {
	@Output() hotComp = new EventEmitter<string>();

	goRecipe() {
		this.hotComp.emit('recipe');
	}

	goShopping() {
		this.hotComp.emit('shopping');
	}
}
