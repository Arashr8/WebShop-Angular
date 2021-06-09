import {AfterContentChecked, AfterContentInit, AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {CartService} from '../cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit, AfterContentInit {
  @Input() product!: Product;
  constructor(private cartService: CartService) { }
  ids: number[] = [];
  includes = false;
  ngOnInit(): void {
    this.cartService.cartIds.subscribe((ids) => {
      this.ids = ids;
      this.includes = ids.includes(this.product.id);
    });
  }
  ngAfterContentInit(): void {
    this.cartService.refresh();
    if (this.ids.includes(this.product.id)) {
      this.includes = true;
    }
  }
  add(product: Product): void {
    this.cartService.add(product);
  }
}
