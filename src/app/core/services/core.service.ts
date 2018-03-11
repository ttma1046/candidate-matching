import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TreeNode } from 'primeng/api';
import { Candidate } from '../models/candidate';

@Injectable()
export class CoreService {
    private baseUrl = 'http://private-76432-jobadder1.apiary-mock.com/';

    candidates: Candidate[];

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

    getCandidates(): void {
        this.http.get<any[]>(`${this.baseUrl}/candidates`).pipe(
            map((candidates: any[]) => {
                return candidates.map(
                    candidate => ({
                        name: candidate.name,
                        skills: candidate.skillTags,
                        skillarray: candidate.skillTags.replace(/\s/g, '').split(',')
                    } as Candidate)
                );
            })
        ).subscribe(candidates => {
            this.candidates = candidates;
        });
    }

    getMatchedCandidates(skillarray: string[]): Observable<TreeNode> {
        return Observable.create(observer => {
            observer.next({
                data: {
                    name: 'test',
                    company: 'test',
                    skills: 'test'
                }
            } as TreeNode);
        });
    }
}
