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
    const cart = [
      {
        id: 76,
        quantity: 1
      },
      {
        id: 78,
        quantity: 2
      }
    ]

    // Jag vet inte vilken format behöver /api/order  för att skicka 

    
    this.submitService.submit(cart).subscribe((res: any) => {
      console.log(res.text);
    }, (error: any) => {
        console.log(error);
    });
  }
}
