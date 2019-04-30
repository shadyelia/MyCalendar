import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventPage } from './add-event.page';

describe('AddEventPage', () => {
  let component: AddEventPage;
  let fixture: ComponentFixture<AddEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
