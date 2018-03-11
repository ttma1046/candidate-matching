import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateMatchComponent } from './candidate-match.component';

describe('CandidateMatchComponent', () => {
  let component: CandidateMatchComponent;
  let fixture: ComponentFixture<CandidateMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
