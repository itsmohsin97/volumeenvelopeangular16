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
import { VolumeEnvelopeComponent } from './volume-envelope/volume-envelope.component';
import { EnvelopeCanvasComponent } from './envelope-canvas/envelope-canvas.component';
import { EnvelopeStateService } from './envelope-state.service';
import { AudioWaveformComponent } from './audio-waveform/audio-waveform.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
 
@NgModule({
  declarations: [
    AppComponent,
    VolumeEnvelopeComponent,
    EnvelopeCanvasComponent,
    AudioWaveformComponent,
    BarChartComponent,

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
  providers: [TestserviceService,EnvelopeStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
