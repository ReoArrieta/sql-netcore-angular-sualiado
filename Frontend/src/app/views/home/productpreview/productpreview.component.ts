import { Component, OnInit } from '@angular/core';

import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ApiProductService } from '@app/services/apiproduct.service';
import { Product } from '@app/models/product';

@Component({
  selector: 'app-productpreview',
  templateUrl: './productpreview.component.html',
  styleUrls: ['./productpreview.component.scss'],
})
export class ProductpreviewComponent implements OnInit {
  public deviceXs: boolean;
  public deviceSm: boolean;
  private _mediaSub: Subscription;
  private _name: string = this._route.snapshot.paramMap.get('nombre');
  public product: Product[];

  constructor(
    private _mediaObserver: MediaObserver,
    private _route: ActivatedRoute,
    private _apiProduct: ApiProductService
  ) {}

  ngOnInit() {
    this.getProduct();
    this.responsive();
  }

  ngOnDestroy() {
    this._mediaSub.unsubscribe();
  }

  getProduct() {
    this._apiProduct.getName(this._name).subscribe((res) => {
      this.product = res.data;
    })
  }

  responsive() {
    this._mediaSub = this._mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        // console.log('result',result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
        this.deviceSm = result.mqAlias === 'sm' ? true : false;
      }
    );
  }
}
