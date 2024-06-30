import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFamilyComponent } from './detail-family.component';

describe('DetailFamilyComponent', () => {
  let component: DetailFamilyComponent;
  let fixture: ComponentFixture<DetailFamilyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailFamilyComponent]
    });
    fixture = TestBed.createComponent(DetailFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
