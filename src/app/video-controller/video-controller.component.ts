import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-video-controller',
  templateUrl: './video-controller.component.html',
  styleUrls: ['./video-controller.component.scss'],
})
export class VideoControllerComponent implements AfterViewInit {
  @Input() videoSrc: string = '';
  @Input() width: string | number | null | undefined;
  @ViewChild('player') _player!: ElementRef<HTMLVideoElement>;
  player!: HTMLVideoElement;
  unpause: number = 0;
  seekIndicator: string = '';
  metadataReady: boolean = false;
  isFullscreen: boolean = !!document.fullscreenElement;
  forceHideControls: boolean = false;
  visibilitTimeout: any = null;
  ngAfterViewInit(): void {
    this.player = this._player.nativeElement;

    const load = fromEvent(this.player, 'loadedmetadata').subscribe(() => {
      this.metadataReady = true;
      load.unsubscribe();
    });

    fromEvent(document, 'fullscreenchange').subscribe(() => {
      this.isFullscreen = !!document.fullscreenElement;
      this.forceHideControls = false;
      clearInterval(this.visibilitTimeout)
    });
  }

  handleKeybind(event: KeyboardEvent) {
    switch (event.code) {
      case 'Space':
        
        this.toggleVideo();
        break;

      case 'ArrowLeft':
        this.seekVideo(this.player.currentTime - 10, 'back');
        break;

      case 'ArrowRight':
        this.seekVideo(this.player.currentTime + 10, 'fourth');
        break;

      default:
        null;
    }
  }

  toggleVideo() {
    this.player.paused ? this.playVideo() : this.pauseVideo();
  }
  handleFullscreenControls() {
    clearTimeout(this.visibilitTimeout);
    this.forceHideControls = false;
    this.visibilitTimeout = setTimeout(() => {
      this.forceHideControls = true;
    }, 3000);
  }

  log(d: any) {
    console.log(d);
  }

  volumeToggle(elem: HTMLInputElement) {
    elem.focus();
    if (this.player.volume) {
      this.unpause = this.player.volume;
      this.player.volume = 0;
      return;
    }
    this.player.volume = this.unpause ?? 0.5;
  }

  pauseVideo(): void {
    if (!this.player) return;
    this.player.pause();
  }

  playVideo(): void {
    if (!this.player) return;
    this.player.play();
  }

  toggleFullscreen(elem: HTMLElement): void {
    if (!!document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      elem.requestFullscreen();
    }
  }

  changePlaybackSpeed(speed: number): void {
    if (!this.player) return;
    this.player.playbackRate = speed;
  }

  changePlaybackVolume(volume: number): void {
    if (!this.player || !(volume >= 0 && volume <= 1)) return;
    this.player.volume = volume;
  }

  seekVideo(seekTime: number | string, indic = ''): void {
    if (!this.player) return;
    this.seekIndicator = indic;
    this.player.currentTime = Number(seekTime);
    setTimeout(() => (this.seekIndicator = ''), 400);
  }

  formatTime(seconds: number) {
    let hh = Math.floor(seconds / 3600);
    let mm = Math.floor((seconds % 3600) / 60);
    let ss = Math.round(seconds % 60);
    let formattedTime = hh > 0 ? `${hh.toString().padStart(2, '0')}:` : '';
    formattedTime += `${mm.toString().padStart(2, '0')}:${ss
      .toString()
      .padStart(2, '0')}`;
    return formattedTime;
  }
}
