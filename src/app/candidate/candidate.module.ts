import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeTableModule } from 'primeng/treetable';

import { CandidateRoutingModule } from './candidate-routing.module';

import { CandidateMatchComponent } from './candidate-match/candidate-match.component';

@NgModule({
  imports: [
    CommonModule,
    TreeTableModule,
    CandidateRoutingModule
  ],
  declarations: [CandidateMatchComponent]
})
export class CandidateModule { }
