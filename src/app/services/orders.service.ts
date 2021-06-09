import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }
  index(){
    const ordersUrl = 'https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=10';
    return this.http.get<Order[]>(ordersUrl);
  }
}
