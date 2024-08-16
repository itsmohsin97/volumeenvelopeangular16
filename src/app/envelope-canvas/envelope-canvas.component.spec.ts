import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvelopeCanvasComponent } from './envelope-canvas.component';

describe('EnvelopeCanvasComponent', () => {
  let component: EnvelopeCanvasComponent;
  let fixture: ComponentFixture<EnvelopeCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvelopeCanvasComponent]
    });
    fixture = TestBed.createComponent(EnvelopeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
