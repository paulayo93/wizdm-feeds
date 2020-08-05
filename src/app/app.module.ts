import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatListModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DatabaseComponent } from './database/database.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ConnectModule, ConnectConfig, AuthModule, DatabaseModule, UploaderModule } from './connect';

// Firebase configuration for wizdm experiments
const config: ConnectConfig = {
  appname: 'wizdm-experiments',
  firebase: {
    apiKey: "AIzaSyDhq3U__FKV4IUCvl02s5jVgChisX2jcmY",
    authDomain: "wizdm-experiments.firebaseapp.com",
    databaseURL: "https://wizdm-experiments.firebaseio.com",
    projectId: "wizdm-experiments",
    storageBucket: "wizdm-experiments.appspot.com",
    messagingSenderId: "479013715916"
  }
};

@NgModule({
  imports:      [   
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule, 
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,

    // Initialize the connect module
    ConnectModule.init(config),
    AuthModule, 
    DatabaseModule,
    AppRoutingModule
  ],
  
  declarations: [ 
    AppComponent, 
    LoginComponent, 
    NotFoundComponent, 
    DatabaseComponent
  ],

  providers: [],
  
  bootstrap: [ AppComponent ]
})
export class AppModule { }
