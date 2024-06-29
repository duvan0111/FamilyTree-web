import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSelectorOneComponent } from './image-selector-one.component';

describe('ImageSelectorOneComponent', () => {
  let component: ImageSelectorOneComponent;
  let fixture: ComponentFixture<ImageSelectorOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageSelectorOneComponent]
    });
    fixture = TestBed.createComponent(ImageSelectorOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
