import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAfterResultPage } from './modal-after-result.page';

describe('ModalAfterResultPage', () => {
  let component: ModalAfterResultPage;
  let fixture: ComponentFixture<ModalAfterResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAfterResultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAfterResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
