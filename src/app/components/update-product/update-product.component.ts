import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.less']
})
export class UpdateProductComponent implements OnInit {

 @Input() product: Product;
 updateform: FormGroup;
 updatedProduct: Product;

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.buildForm();
  }

    buildForm(): void {
    this.updateform = this.fb.group({
      quantity: ['', Validators.compose([Validators.min(0), Validators.max(100), Validators.required])],
      floor: ['', Validators.compose([Validators.min(1), Validators.max(3), Validators.required])],
      section: ['', Validators.compose([Validators.min(1), Validators.max(3), Validators.required])],
    });
  }


  saveProduct(): void {
    /*TBD - hiding the update panel after update is successful - currently update panel just presents 2-way data binding and mocking changes on server */
  	this.productService.updateProduct(this.product)
  		.subscribe(product => this.updatedProduct = product);
  }

}
