import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';

import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-candidate-match',
  templateUrl: './candidate-match.component.html',
  styleUrls: ['./candidate-match.component.css']
})
export class CandidateMatchComponent implements OnInit {
  jobs: TreeNode[];
  constructor(private service: CoreService) { }

  ngOnInit() {
      this.loadJobs();
      this.loadCandidates();
  }

  loadJobs() {
    this.service.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  loadCandidates() {
    this.service.getCandidates();
  }
}
