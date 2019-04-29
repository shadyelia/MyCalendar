import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleListPage } from './people-list.page';

describe('PeopleListPage', () => {
  let component: PeopleListPage;
  let fixture: ComponentFixture<PeopleListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
