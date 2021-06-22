import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {
  constructor(private http: HttpClient) { }
  submit(body: any): any {
    const productsUrl = '/api/orders';
    return this.http.post<any>(productsUrl, body);
  }
}
