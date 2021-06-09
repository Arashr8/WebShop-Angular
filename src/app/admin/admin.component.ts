import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Order} from '../models/order';
import {OrdersService} from '../services/orders.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  companyId = 10;
  loading = true;
  orders: Order[] = [];
  constructor(private authService: AuthService, private router: Router, private ordersService: OrdersService) {
    if (!this.authService.check()) {
      this.router.navigate(['login']);
    }
    this.ordersService.index().subscribe((result) => {
      this.orders = result;
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

  limit(str: string, len: number) {
    return str.length > len ? str.substring(0, len - 3) + '...' : str.substring(0, len);
  }

  remove(order: Order): void {
    console.log('removed');
  }
}
