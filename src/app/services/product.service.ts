import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'api';

  public floors = [];

	httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`{this.productsUrl}/products`)
      .pipe(catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  public getFloors(): Observable<Array<number>> {
    return this.httpClient.get<Array<number>>(`{this.baseUrl}/floors`);
  }
    
  public getSections(): Observable<Array<number>> {
    return this.httpClient.get<Array<number>>(`${this.baseUrl}/sections`);
  }

   /** PUT: update */
  updateProduct(product: Product): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/products`, product, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateProduct'))
    );
  }

  /** POST: add new*/
  addNewProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.baseUrl}/products`, product, this.httpOptions)
      .pipe(catchError(this.handleError<Product>('addProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(Error, `${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  }