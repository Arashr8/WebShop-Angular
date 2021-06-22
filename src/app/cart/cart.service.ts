import {Product} from '../models/product';
import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';

export class CartService {
  items: number [] = [];
  cartUpdated = new Subject<number>();
  cartIds = new Subject<number[]>();
  constructor() {
    let json = localStorage.getItem('cart');
    if (json != null) {
      this.items = JSON.parse(json);
    } else {
      this.items = [];
    }
    this.refresh()
  }
  add(product: Product) {
    if (this.items.includes(product.id)) {
      const index = this.items.indexOf(product.id);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    } else {
      this.items.push(product.id);
    }
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.refresh()
  }
  refresh() {
    this.cartUpdated.next(this.items.length);
    this.cartIds.next(this.items);
  }
  getIds() {
    return this.items;
  }
  remove(id: number) {
    if (this.items.includes(id)) {
      const index = this.items.indexOf(id);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.refresh()
  }
  clear(){
    this.items = [];
    localStorage.removeItem('cart');
  }
}
