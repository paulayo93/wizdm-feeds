import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ElementsModule} from '@wizdm/elements';
import {AnimateModule} from '@wizdm/animate';
import {EmojiSupportModule} from '@wizdm/emoji';
import {ConnectModule} from '@wizdm/connect';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MatIconModule } from '@angular/material/icon';
import {AvatarComponent} from '@wizdm/elements/avatar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'
import { IconModule } from '@wizdm/elements/icon';
@NgModule({
  imports:      [   
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule, 

    MatIconModule,
    MatCardModule,
    MatButtonModule,

    AnimateModule,
    ElementsModule,
    EmojiSupportModule,
    IconModule,

    AppRoutingModule
  ],
  
  declarations: [ 
    AppComponent, 
    AvatarComponent,

  ],

  providers: [],
  
  bootstrap: [ AppComponent ]
})
export class AppModule { }
