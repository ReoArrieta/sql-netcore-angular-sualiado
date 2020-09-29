import { Component, OnInit, OnDestroy } from '@angular/core';

import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

import { Product } from '@models/product';
import { ApiProductService } from '@services/apiproduct.service';

@Component({
  selector: 'app-producthome',
  templateUrl: './producthome.component.html',
  styleUrls: ['./producthome.component.scss'],
})
export class ProductHomeComponent implements OnInit, OnDestroy {
  public deviceXs: boolean;
  public deviceSm: boolean;
  private _mediaSub: Subscription;
  public products: Product[];

  constructor(
    private _apiProduct: ApiProductService,
    private _mediaObserver: MediaObserver
  ) {}

  ngOnInit() {
    this.getProduct();
    this.responsive();
  }

  ngOnDestroy() {
    this._mediaSub.unsubscribe();
  }

  getProduct() {
    this._apiProduct.get().subscribe((res) => {
      this.products = res.data;
    });
  }

  responsive() {
    this._mediaSub = this._mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
        this.deviceSm = result.mqAlias === 'sm' ? true : false;
      }
    );
  }
}
