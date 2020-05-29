import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnChanges {

	@Input() groupFilters: Object;
	@Input() searchByKeyword: string;

	@Input() newProduct: Product;

	products: Product[];
	filteredProducts: Product[];

	productToUpdate: Product;

	codes = [];

	constructor(private productService: ProductService, private ref: ChangeDetectorRef) { }

	getProducts(): void {
		this.productService.getProducts()
		.subscribe(products => {this.products = products; this.filteredProducts = products;});
	}


	getProductsList(): Product[] {
		return this.products;
	}

	ngOnInit(): void {
		this.getProducts();
	}

	ngOnChanges(): void {
		if (this.groupFilters) {
			console.log("onChanges groupFilters", this.groupFilters);
			this.filterProductList(this.groupFilters, this.products);
		}
		if (this.newProduct) {
			this.products.push(this.newProduct);
			this.filteredProducts = this.products;
			//this.productService.addNewProduct(this.newProduct).subscribe(product => this.products.push(product));
			this.newProduct = null;
		}
	}


	filterProductList(filters: any, products: Product[]): void {

		this.filteredProducts = this.products; //Reset Product List
		
		const keys = Object.keys(filters);

		const filterProduct = product => {
			let result = keys.map(key => {
				if (!~key.indexOf('name')) {
					if(product[key]) {
						return String(product[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())
					} else {
						return false;
					}
				}
			});
			// result = result.filter(it => it !== undefined);
			return result.reduce((acc, cur: any) => { return acc & cur }, 1)
		}
		this.filteredProducts = this.products.filter(filterProduct);
	}

	/*Show the update panel*/
    updateProduct(product: Product): void {
  		this.productToUpdate = product;
  	}


}



