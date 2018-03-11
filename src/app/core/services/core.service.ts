import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TreeNode } from 'primeng/api';

@Injectable()
export class CoreService {

  constructor(private http: HttpClient) { }

  getJobs(): Observable<TreeNode[]> {
      return Observable.of([{
                data: {
                    name: 'Test',
                    company: 'Test',
                    skills: 'Test'
                },
                children:[
                {  
                    data: {
                        name: 'Test Sub',
                        company: 'Test Sub',
                        skills: 'Test Sub'
                    }
                }
                ]
            } as TreeNode]);
  }
}
