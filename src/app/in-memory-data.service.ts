import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
	    {id: 1, code: 'AVC 9234', quantity: 1, floor:1, section: 3},
  		{id: 2, code: 'NGC 134', quantity: 4, floor:2, section: 2},
  		{id: 3, code: 'REC 20034', quantity: 2, floor:3, section: 1},
  		{id: 4, code: 'TOC 123456', quantity: 8, floor:2, section: 3},
  		{id: 5, code: 'NVC 7734', quantity: 1, floor:1, section: 3},
    ];

    const floors = [1, 2, 3];
    const sections = [1, 2, 3];

    return {products: products, floors: floors, sections: sections};
  }
}