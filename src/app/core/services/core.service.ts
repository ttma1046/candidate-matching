import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { AsyncSubject } from 'rxjs/AsyncSubject';

import { catchError, map } from 'rxjs/operators';

import { TreeNode } from 'primeng/api';

import { Candidate } from '../models/candidate';

@Injectable()
export class CoreService {
    private baseUrl = 'http://private-76432-jobadder1.apiary-mock.com/';

    private candidatesCache = new Map<string, Observable<Candidate[]>>();

    constructor(private http: HttpClient) { }

    getJobs(): Observable<TreeNode[]> {
        return this.http.get<TreeNode[]>(`${this.baseUrl}/jobs`).pipe(
            map((jobs: TreeNode[]) => {
                return jobs.map(job => ({
                    data: job,
                    leaf: false
                } as TreeNode)
                );
            }),
            catchError(this.handleError('GetJobs'))
        ) as Observable<TreeNode[]>;
    }

    getCandidates(): Observable<Candidate[]> {
        const url = `${this.baseUrl}/candidates`;
        if (!this.candidatesCache.has(url)) {
            this.candidatesCache.set(url, this.fetchCandidates(url));
        }
        return this.candidatesCache.get(url);
    }

    private fetchCandidates(url: string): Observable<Candidate[]> {
        const subject = new AsyncSubject<Candidate[]>();

        this.http.get<Candidate[]>(url, { responseType: 'json' })
            .pipe(
                map((candidates: Candidate[]) => {
                    return candidates.map(
                        candidate => ({
                            name: candidate.name,
                            skills: candidate.skillTags,
                            skillarray: candidate.skillTags.replace('aphra', 'ahpra').replace(/\s/g, '').replace(/-/g, '')
                                .toLowerCase().split(',')
                        } as Candidate)
                    );
                }),
                catchError(this.handleError('GetCandidates'))
            ).subscribe(subject);

        return subject.asObservable();
    }

    getMatchedCandidates(skillarray: string[]): Observable<TreeNode> {
        return Observable.create(observer => {
            this.getCandidates().subscribe(candidates => {
                const requireskillweight = {};

                for (let i = 0; i < skillarray.length; i++) {
                    requireskillweight[skillarray[i]] = skillarray.length - i;
                }

                const bestmatch: Candidate = candidates.reduce((acc, candidate) => {
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
                }, { score: 0, name: '', skills: '', skillarray: [], skillTags: '' });

                observer.next({
                    data: {
                        name: bestmatch['name'],
                        company: `Score:${bestmatch['score']} - Top Score`,
                        skills: bestmatch['skills']
                    }
                } as TreeNode);
            }
            );
        });
    }

    private handleError<T>(operation: string) {
        return (error: HttpErrorResponse): Observable<T> => {
            console.error(error);

            const message = (error.error instanceof ErrorEvent) ?
                error.error.message :
                `server returned code ${error.status} with body "${error.error}"`;

            throw new Error(`${operation} failed: ${message}`);
        };
    }
}
