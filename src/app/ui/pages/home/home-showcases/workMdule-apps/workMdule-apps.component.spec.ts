import { TestBed ,ComponentFixture } from '@angular/core/testing';

import { WorkMduleAppsComponent } from './workMdule-apps.component';

describe('WorkMduleAppsComponent', () => {
  let component: WorkMduleAppsComponent;
  let fixture: ComponentFixture<WorkMduleAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkMduleAppsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkMduleAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
