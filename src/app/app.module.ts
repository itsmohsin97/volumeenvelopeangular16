import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { jqxKnobModule } from 'jqwidgets-ng/jqxknob';
import { TestserviceService } from './testservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    jqxKnobModule,
    NgxSpinnerModule.forRoot({ type: 'pacman' })
  ],
  providers: [TestserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
