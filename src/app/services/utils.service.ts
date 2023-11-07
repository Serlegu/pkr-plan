import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  getNextIdFromArray(array: any[]): number {
    return array.length
      ? array.reduce((a, b) => (a.id > b.id ? a : b)).id + 1
      : 0;
  }
}
