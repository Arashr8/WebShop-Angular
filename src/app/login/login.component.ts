import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.check()) {
      this.router.navigate(['admin']);
    }
  }

  ngOnInit(): void {
  }
  login(){
    if (this.authService.login(this.username, this.password)) {
      alert('You are logged in successfully.');
      this.router.navigate(['admin']);
    } else {
      alert('Your credentials are not correct.');
    }
  }

}
