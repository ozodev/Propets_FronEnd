import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardPersonalComponent } from './dash-board-personal.component';

describe('DashBoardPersonalComponent', () => {
  let component: DashBoardPersonalComponent;
  let fixture: ComponentFixture<DashBoardPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashBoardPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
