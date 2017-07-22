import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'case',
	pure: false
})

export class TitleCasePipe implements PipeTransform {
	transform(input: string): string {
		let inputArray = input.split(' ');
		inputArray = inputArray.map(val => {
			if (val === val.toUpperCase()) {
				return val;
			}
			return val.length === 0 ? '' : val.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.slice(1).toLowerCase()));
		})
		return inputArray.join(' ');
	}
}
