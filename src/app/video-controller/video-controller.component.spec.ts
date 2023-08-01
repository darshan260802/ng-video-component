import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoControllerComponent } from './video-controller.component';

describe('VideoControllerComponent', () => {
  let component: VideoControllerComponent;
  let fixture: ComponentFixture<VideoControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
