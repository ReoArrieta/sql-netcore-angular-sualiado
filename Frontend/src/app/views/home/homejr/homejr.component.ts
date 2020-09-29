import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

import { ICarouselItem } from '@models/carousel';
import { CAROUSEL_DATA_ITEMS } from '@app/models/carousel-const';

@Component({
  selector: 'app-homejr',
  templateUrl: './homejr.component.html',
  styleUrls: ['./homejr.component.scss'],
})
export class HomeJrComponent implements OnInit, OnDestroy {
  public currentPosition = 0;
  public deviceXs: boolean;
  public deviceSm: boolean;
  public finalHeight: string | number = 0;
  public items: ICarouselItem[] = CAROUSEL_DATA_ITEMS;
  public mediaSub: Subscription;

  @Input() height = 450;
  @Input() isFullScreen = false;

  constructor(public mediaObserver: MediaObserver) {
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
  }

  ngOnInit() {
    this.responsive();
    this.items.map((i, index) => {
      i.id = index;
      i.marginLeft = 0;
    });
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

  responsive() {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        // console.log('result ->',result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
        this.deviceSm = result.mqAlias === 'sm' ? true : false;
      }
    );
  }

  setCurrentPosition(position: number) {
    this.currentPosition = position;
    this.items.find((i) => i.id === 0).marginLeft = -100 * position;
  }

  setNext() {
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if (nextPosition <= this.items.length - 1) {
      finalPercentage = -100 * nextPosition;
    } else {
      nextPosition = 0;
    }
    this.items.find((i) => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
  }

  setBack() {
    let finalPercentage = 0;
    let backPosition = this.currentPosition - 1;
    if (backPosition >= 0) {
      finalPercentage = -100 * backPosition;
    } else {
      backPosition = this.items.length - 1;
      finalPercentage = -100 * backPosition;
    }
    this.items.find((i) => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = backPosition;
  }
}
