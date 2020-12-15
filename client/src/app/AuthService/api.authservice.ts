import { Injectable } from '@angular/core';
import * as AUTH_CONFIG from '../../../auth_config.json';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import auth0 from 'auth0-js';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  userProfile: any;
  requestedScopes: string = 'openid profile read:timesheets create:timesheets';

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientId,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: AUTH_CONFIG.audience,
    redirectUri: AUTH_CONFIG.appUri,
    scope: this.requestedScopes
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('Access token: ', authResult.accessToken)
        console.log('id token: ', authResult.idToken)
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        console.log("Flagrant Login Error")
        this.router.navigate(['/home']);
        console.log(err);
        alert('Error: ${err.error}. Check the console for further details.');
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    // If there is a value on the scope param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes = authResult.scope || this.requestedScopes || '';

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    console.log("Removing local Tokens?")
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const value = new Date().getTime() < expiresAt;
    //console.log(`Is Authenticated returns ${value}`)
    return value
  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}