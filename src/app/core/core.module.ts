import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreService } from './services/core.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ CoreService ]
})
export class CoreModule { }
