import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categoryhome',
  templateUrl: './categoryhome.component.html',
  styleUrls: ['./categoryhome.component.scss'],
})
export class CategoryhomeComponent implements OnInit, OnDestroy {
  public deviceXs: boolean;
  public deviceSm: boolean;
  public mediaSub: Subscription;

  constructor(public mediaObserver: MediaObserver) {}

  ngOnInit() {
    this.responsive();
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

  responsive() {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        // console.log('result',result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
        this.deviceSm = result.mqAlias === 'sm' ? true : false;
      }
    );
  }
}
