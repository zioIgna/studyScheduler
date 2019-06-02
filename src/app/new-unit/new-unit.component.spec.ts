import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUnitComponent } from './new-unit.component';

describe('NewUnitComponent', () => {
  let component: NewUnitComponent;
  let fixture: ComponentFixture<NewUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUnitComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
