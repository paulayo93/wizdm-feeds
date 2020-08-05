import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatIconRegistry, MatSidenav } from '@angular/material';
import { AuthService, User } from './connect';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { 'class': 'mat-typography' }
})
export class AppComponent implements OnInit, OnDestroy { 

  public user: User = {} as User;
  private sub: Subscription;

  public menuItems = [
    { caption: 'Dashboard', page: 'database' },
    { caption: 'Sign out', page: 'login', mode: 'signOut' },
    { caption: 'Verify email', page: 'login', mode: 'verifyEmail' },
    { caption: 'Change email', page: 'login', mode: 'changeEmail' },
    { caption: 'Change password', page: 'login', mode: 'changePassword' },
    { caption: 'Delete account', page: 'login', mode: 'delete' }
  ];

  public footerItems = [ 
    { icon: "fab:fa-angular", link: "https://angular.io" },
    { icon: "fab:fa-github", link: "https://github.com" },
    { icon: "fab:fa-stack-overflow", link: "https://stackoverflow.com/" },
    { icon: "fab:fa-font-awesome", link: "https://fontawesome.com" }
  ];

  get authenticated() {
    return this.auth.authenticated;
  }

  constructor(private auth: AuthService,
              private router: Router,
              private icon: MatIconRegistry) {}

  @ViewChild('snav') private snav: MatSidenav;

  ngOnInit() {

    // Registers font awesome among the available sets of icons for mat-icon component
    this.icon.registerFontClassAlias('fontawesome', 'fa');

    this.router.events
      .pipe(filter( e => e instanceof NavigationEnd ))
      .subscribe( () => {
        this.snav.close();
      });

    // Subscribe to the user observable to know about login status changes
    this.sub = this.auth.user$.subscribe( user => {
      this.user = user || {} as User;

      // Jumps to the relevan page depending on the auth state change
      this.router.navigate([ !!user ? '/database' : '/login']);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
