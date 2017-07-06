import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true
})

export class FilterPipe implements PipeTransform {
  transform(values: any, test?: string): any {
    return values.filter(val => {
      return val.instanceType.includes(test);
    });
  };
}
