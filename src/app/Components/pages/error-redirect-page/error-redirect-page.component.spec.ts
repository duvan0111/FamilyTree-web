import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRedirectPageComponent } from './error-redirect-page.component';

describe('ErrorRedirectPageComponent', () => {
  let component: ErrorRedirectPageComponent;
  let fixture: ComponentFixture<ErrorRedirectPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorRedirectPageComponent]
    });
    fixture = TestBed.createComponent(ErrorRedirectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
