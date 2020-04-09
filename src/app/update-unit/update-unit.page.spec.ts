import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUnitPage } from './update-unit.page';

describe('UpdateUnitPage', () => {
  let component: UpdateUnitPage;
  let fixture: ComponentFixture<UpdateUnitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUnitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUnitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
