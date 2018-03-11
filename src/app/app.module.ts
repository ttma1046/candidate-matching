import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CandidateModule } from './candidate/candidate.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CandidateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
