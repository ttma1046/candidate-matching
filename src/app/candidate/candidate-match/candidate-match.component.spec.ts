import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CoreModule } from '../../core/core.module';
import { TreeTableModule } from 'primeng/treetable';

import { CandidateMatchComponent } from './candidate-match.component';

describe('CandidateMatchComponent', () => {
let component: CandidateMatchComponent;
  let fixture: ComponentFixture<CandidateMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateMatchComponent ],
      imports: [ TreeTableModule, CoreModule ]
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

  describe('On load', () => {
    it('should have the table element', () => {
      const treeTable = fixture.debugElement.query(By.css('p-treetable'));
      expect(treeTable).toBeTruthy();
    });
  });    
});
