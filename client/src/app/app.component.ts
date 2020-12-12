import { Component } from '@angular/core';
import { AuthService } from './AuthService/api.authservice'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Auth0 Angular SDK Sample';

  constructor(public auth: AuthService) {
    auth.handleAuthentication()
  }
}
