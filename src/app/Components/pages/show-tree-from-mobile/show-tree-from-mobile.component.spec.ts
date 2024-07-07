import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTreeFromMobileComponent } from './show-tree-from-mobile.component';

describe('ShowTreeFromMobileComponent', () => {
  let component: ShowTreeFromMobileComponent;
  let fixture: ComponentFixture<ShowTreeFromMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTreeFromMobileComponent]
    });
    fixture = TestBed.createComponent(ShowTreeFromMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
