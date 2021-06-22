import { Component, OnInit } from '@angular/core';
import {CartService} from './cart.service';
import {Product} from '../models/product';
import {SubmitService} from '../services/submit.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  sum = 0;
  ids: number[] = [];
  products: Product[] = [];
  success = false;
  constructor(private cartService: CartService, private submitService: SubmitService) { }

  ngOnInit(): void {
    this.ids = this.cartService.getIds();
    // console.log(this.ids);
    const prods = localStorage.getItem('products');
    if (prods != null) {
      this.products = JSON.parse(prods);
    }
    // console.log(this.products);
    this.calc();
  }
  remove(id: number): void {
    this.cartService.remove(id);
    this.calc();
  }
  calc(): void {
    let localSum = 0;
    this.products.forEach((product) => {
      if (this.ids.includes(product.id)) {
        localSum += product.price;
      }
    });
    this.sum = localSum;
  }
  submit(): void {
    const itemsFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
   
    const cartItems = itemsFromLocalStorage.map((item: number) => {
      return { productId: item, amount: 1 };
    });
    
    const cart = {
      id: 0,
      paymentMethod: '',
      totalPrice: 0,
      created: '2021-06-21 21:00:00',
      createdBy: '',
      status: 0,
      companyId: 0,
      orderRows: cartItems
    }

    
    this.submitService.submit(cart).subscribe((res: any) => {
      this.success = true;
      this.cartService.clear();
      this.cartService.cartUpdated.next(0);
    }, (error: any) => {
        console.log(error);
    });
  }
}
