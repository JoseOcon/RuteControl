import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: Array<any>, filter: string): Array<any> {
    if(filter.length === 0){
      return array;
    }

    filter = filter.toLocaleLowerCase();

    return array.filter(elem => {
      return elem.nombre.toLocaleLowerCase().includes(filter);
    })
  }

}
