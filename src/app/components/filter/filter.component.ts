
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styles: ['./filter.component.less']
})

export class FilterComponent implements OnInit {

  form: FormGroup;
  floors = [];
  sections = [];

  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();

  searchText: string = '';

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  getFloors(): void {
  	this.productService.getFloors()
  		.subscribe(floors => this.floors = floors);
  }

  getSections(): void {
  	this.productService.getSections()
  		.subscribe(sections => this.sections = sections);
  }

  ngOnInit(): void {
    this.getFloors();
    this.getSections();
    this.buildForm();
  }
  
  buildForm(): void {
      this.form = this.fb.group({
      code: [''],
      floor: [''],
      section: ['']
    });
  }


  filter(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.groupFilters.emit(filters);
  }
  
}
