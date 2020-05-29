import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable} from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.less']
})
export class AddProductComponent implements OnInit {

  @Output() newProduct: EventEmitter<any> = new EventEmitter<any>();
  new: Product;
  addform: FormGroup;
  codepattern = "^[A-Z]{2,4} [0-9]{4,6}$";

  floors = [];
  codes = [];
  allproducts: Product[];

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.allproducts = products);
  	this.buildForm();
  }


  buildForm(): void {
    this.addform = this.fb.group({
      code: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.codepattern)])),
      quantity: new FormControl('', Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])),
      floor: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.max(3)])),
      section: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.max(3)]))
    });
  }


  addProduct(code: string, quantity: number, floor: number, section: number): void {
    this.new = {code, quantity, floor, section} as Product;

    if (this.codeExists(code)) {
      console.log("The product already exists, code must be unique or you can update product."); //Temp solution - validation TBD
    }
    else {
      this.allproducts.push(this.new);
      this.newProduct.emit(this.new);
      this.addform.reset();
    }
  }


  codeExists (code: string): boolean {
    //this.productService.getProducts().subscribe(products => this.allproducts = products);
    this.codes = this.allproducts.map (obj => obj.code);
    if (this.codes.indexOf(code) == -1) {
      console.log("This product does not exist, you can add it."); //Temp solution - validation TBD
      return false;
    }
    return true;
  }

}
