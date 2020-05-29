import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {

  searchText: string;
  filters: Object;

  newProduct: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
