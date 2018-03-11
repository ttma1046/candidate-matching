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

            const requireskillweight = {};

            for (let i = 0; i < skillarray.length; i++) {
                requireskillweight[skillarray[i]] = skillarray.length - i;
            }

            const bestmatch: Candidate = this.candidates.reduce((acc, candidate) => {
                if (!candidate.skillarray || candidate.skillarray.length === 0) {
                    return acc;
                }

                const matchedskills = candidate.skillarray.filter(function(skill, index) {
                    return !!requireskillweight[skill] && candidate.skillarray.indexOf(skill) === index;
                });

                if (matchedskills.length > 0) {
                    const weight = matchedskills.reduce((accu, skill, index) => {
                        return requireskillweight[skill] * (matchedskills.length - index) + accu;
                    }, 0);

                    const score = weight / matchedskills.length;

                    return score > acc.score ? { ...candidate, score } : acc;
                }

                return acc;
            }, { score: 0, name: '', skills: '', skillarray: [] });

            observer.next({
                data: {
                    name: bestmatch['name'],
                    company: `Score:${bestmatch['score']} - Top Score`,
                    skills: bestmatch['skills']
                }
            } as TreeNode);
        }
        );
    }
}
