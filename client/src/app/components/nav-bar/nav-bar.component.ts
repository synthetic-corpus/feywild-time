import { Component, Inject, OnInit } from '@angular/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../AuthService/api.authservice';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit() {
    console.log(`Authenticated is ${this.auth.isAuthenticated()}`)
  }

  loginWithRedirect() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
