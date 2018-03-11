import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';

import { CandidateMatchComponent } from './candidate-match/candidate-match.component';

@NgModule({
  imports: [
    CommonModule,
    CandidateRoutingModule
  ],
  declarations: [CandidateMatchComponent]
})
export class CandidateModule { }
