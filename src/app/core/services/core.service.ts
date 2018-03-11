import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TreeNode } from 'primeng/api';

@Injectable()
export class CoreService {
  private baseUrl = 'http://private-76432-jobadder1.apiary-mock.com/';
  constructor(private http: HttpClient) { }

  getJobs(): Observable<TreeNode[]> {
        return this.http.get<TreeNode[]>(`${this.baseUrl}/jobs`).pipe(
            map((jobs: TreeNode[]) => {
                return jobs.map(job => ({
                    data: job,
                    leaf: false
                } as TreeNode)
                );
            })
        );
  }
}
