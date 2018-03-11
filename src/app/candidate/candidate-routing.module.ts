import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateMatchComponent } from './candidate-match/candidate-match.component';

const candidateRoutes: Routes = [
  { path: 'candidate-match',  component: CandidateMatchComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(candidateRoutes)
  ]
})
export class CandidateRoutingModule { }
