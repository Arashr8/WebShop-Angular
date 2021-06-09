import {AfterContentInit, Component, OnInit} from '@angular/core';
import {CartService} from '../cart/cart.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements AfterContentInit {
  count!: number;
  loggedIn = false;
  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {
    this.loggedIn = authService.check();
  }
  ngAfterContentInit(): void {
    this.cartService.cartUpdated.subscribe((cartCount) => {
      this.count = cartCount;
    });
    this.authService.loggedInSubject.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
    this.cartService.refresh();
  }

  logout() {
    alert('Successfully logged out.');
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
