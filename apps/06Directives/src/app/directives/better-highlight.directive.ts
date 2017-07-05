import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
	selector: '[appBetterHighlight]'
})

export class BetterHighlightDirective {
	@Input() defaultColor;
	@Input('appBetterHighlight') highlightColor;
	@HostBinding('style.backgroundColor') bc = this.defaultColor || 'grey';

	@HostListener('mouseenter') hover(eventData: Event) {
		this.bc = this.highlightColor;
	}

	@HostListener('mouseleave') leave(eventData: Event) {
		this.bc = this.defaultColor;
	}
}
