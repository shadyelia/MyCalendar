import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonPage } from './add-person.page';

describe('AddPersonPage', () => {
  let component: AddPersonPage;
  let fixture: ComponentFixture<AddPersonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPersonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
