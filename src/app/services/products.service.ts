import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  index(){
    const productsUrl = 'http://medieinstitutet-wie-products.azurewebsites.net/api/products';
    return this.http.get<Product[]>(productsUrl);
  }
}
