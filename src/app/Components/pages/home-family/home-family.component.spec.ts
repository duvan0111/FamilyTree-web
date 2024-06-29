import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFamilyComponent } from './home-family.component';

describe('HomeFamilyComponent', () => {
  let component: HomeFamilyComponent;
  let fixture: ComponentFixture<HomeFamilyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFamilyComponent]
    });
    fixture = TestBed.createComponent(HomeFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
