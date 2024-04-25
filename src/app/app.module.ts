import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'pacman' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
