import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[appUnless]'
})

export class UnlessDirective {
	@Input() set appUnless(condition: boolean) {
		if ( !condition) {
			this.viewCont.createEmbeddedView(this.template);
		} else {
			this.viewCont.clear();
		}
	}
	constructor(
		private template: TemplateRef<any>,
		private viewCont: ViewContainerRef
	) {}
}
