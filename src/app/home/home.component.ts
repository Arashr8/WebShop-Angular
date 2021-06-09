import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product';
import {ProductsService} from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  loading: boolean;
  products: Product[] = [];
  constructor(private productsService: ProductsService) {
    this.loading = true;
  }

  ngOnInit(): void {
     this.productsService.index().subscribe((data: Product[]) => {
        data.forEach((d) => {
          const date = new Date(d.added);
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          this.products.push({
            id: d.id,
            price: d.price,
            description: this.limit(d.description, 100),
            name: this.limit(d.name, 30),
            imageUrl: d.imageUrl,
            year: d.year,
            added: date.toLocaleDateString('en-US', options)
          });
        });
        this.loading = false;
        localStorage.setItem('products', JSON.stringify(this.products));
     });
  }

  limit(str: string, len: number) {
    return str.length > len ? str.substring(0, len - 3) + '...' : str.substring(0, len);
  }
}
