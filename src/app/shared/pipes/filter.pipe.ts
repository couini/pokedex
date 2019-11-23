import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any {

    if (!items) {
      return [];
    }

    if (!searchText) {
      return items;
    }

    const filteredItems = items.filter((item) => {
      return item.names.french.toLowerCase().includes(searchText.toLowerCase());
    });
  }

}
