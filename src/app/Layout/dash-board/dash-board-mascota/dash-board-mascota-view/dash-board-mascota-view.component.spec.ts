import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardMascotaViewComponent } from './dash-board-mascota-view.component';

describe('DashBoardMascotaViewComponent', () => {
  let component: DashBoardMascotaViewComponent;
  let fixture: ComponentFixture<DashBoardMascotaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashBoardMascotaViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardMascotaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
