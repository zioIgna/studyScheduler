import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgomentiPage } from './argomenti.page';

describe('ArgomentiPage', () => {
  let component: ArgomentiPage;
  let fixture: ComponentFixture<ArgomentiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArgomentiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgomentiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
