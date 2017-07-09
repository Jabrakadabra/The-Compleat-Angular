import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})

export class DropdownDirective {
	constructor(){}
	@HostBinding('class.open') openClass = false;
	@HostListener('click') clicker(eventData: Event) {
		this.openClass = !this.openClass
	}
}

