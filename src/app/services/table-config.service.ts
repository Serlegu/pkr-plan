import { Injectable } from '@angular/core';
import { IColumnDefinition } from '../components/shared/table/column-def.interface';

@Injectable({
  providedIn: 'root',
})
export class TableConfigService {
  constructor() {}

  getColumnsDefinitionForUserStoriesList(): Array<IColumnDefinition> {
    return [
      {
        columnDef: 'position',
        header: 'No.',
        cell: (element: any) => `${element.position}`,
      },
      {
        columnDef: 'name',
        header: 'Name',
        cell: (element: any) => `${element.name}`,
      },
      {
        columnDef: 'weight',
        header: 'Weight',
        cell: (element: any) => `${element.weight}`,
      },
      {
        columnDef: 'symbol',
        header: 'Symbol',
        cell: (element: any) => `${element.symbol}`,
      },
    ];
  }
}
