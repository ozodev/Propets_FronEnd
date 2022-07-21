import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardMascotaComponent } from './dash-board-mascota.component';

describe('DashBoardMascotaComponent', () => {
  let component: DashBoardMascotaComponent;
  let fixture: ComponentFixture<DashBoardMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashBoardMascotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
