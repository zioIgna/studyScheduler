import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleUnitPage } from './reschedule-unit.page';

describe('RescheduleUnitPage', () => {
  let component: RescheduleUnitPage;
  let fixture: ComponentFixture<RescheduleUnitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RescheduleUnitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RescheduleUnitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
