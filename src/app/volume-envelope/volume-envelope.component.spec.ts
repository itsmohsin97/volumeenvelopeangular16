import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeEnvelopeComponent } from './volume-envelope.component';

describe('VolumeEnvelopeComponent', () => {
  let component: VolumeEnvelopeComponent;
  let fixture: ComponentFixture<VolumeEnvelopeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VolumeEnvelopeComponent]
    });
    fixture = TestBed.createComponent(VolumeEnvelopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
