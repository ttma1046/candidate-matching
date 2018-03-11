import { TestBed, inject } from '@angular/core/testing';
import { HttpErrorResponse, HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TreeNode } from 'primeng/api';

import { Job } from '../models/job';
import { Candidate } from '../models/candidate';

import { CoreService } from './core.service';
import { asyncData, asyncError } from './async-observable-helpers';

describe('CoreService', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let coreService: CoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                CoreService
            ]
        });

        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        coreService = new CoreService(<any>httpClientSpy);
    });

    it('can instantiate service via DI', () => {
        coreService = TestBed.get(CoreService);
        expect(coreService instanceof CoreService).toBe(true);
    });

    it('can instantiate service with "new"', () => {
        const http = TestBed.get(HttpClient);
        expect(http).not.toBeNull('http should be provided');
        let service = new CoreService(http);
        expect(service instanceof CoreService).toBe(true, 'new service should be ok');
    });

    it('should return expected jobs (HttpClient called once)', () => {
        const expectedJobs: TreeNode[] = [];

        httpClientSpy.get.and.returnValue(asyncData(expectedJobs));

        coreService.getJobs().subscribe(
            jobs => expect(jobs).toEqual(expectedJobs, 'expected Jobs'),
            fail
        );

        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('should return an error when the server returns a 404', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404, statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue(asyncError(errorResponse));

        coreService.getJobs().subscribe(
            heroes => fail('expected an error, not heroes'),
            error => expect(error.message).toContain('test 404 error')
        );
    });
});
