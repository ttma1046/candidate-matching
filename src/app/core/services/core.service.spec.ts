import { TestBed, inject } from '@angular/core/testing';
import { HttpErrorResponse, HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TreeNode } from 'primeng/api';

import { Job } from '../models/job';

import { CoreService } from './core.service';

describe('CoreService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let coreService: CoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        CoreService
      ]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    coreService = new CoreService(<any> httpClientSpy);
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

    httpClientSpy.get.and.returnValue(of(expectedJobs));

    coreService.getJobs().subscribe(
      jobs => expect(jobs).toEqual(expectedJobs, 'expected Jobs'),
      fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
