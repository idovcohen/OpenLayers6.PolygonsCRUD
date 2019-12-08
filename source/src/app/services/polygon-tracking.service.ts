import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import Feature from 'ol';
import {Vector as VectorSource} from 'ol/source';
import { PolygonDataService } from './polygon-data.service';
import { PolygonActionTypes } from '../polygons/polygon-action-types';
import { AppStateInterface } from '../interfaces/app-state.interface';

@Injectable()
export class PolygonTrackingService {
  private source: VectorSource;

  constructor(private readonly store: Store<AppStateInterface>,
              private readonly dataSvc: PolygonDataService) {
  }

  public init(data: any): void {
    this.source = data.source;
    this.source.on('addfeature', (f: Feature) => { this.onSourceChanged(f); });
    this.source.on('removefeature', (f: Feature) => { this.onSourceChanged(f); });
  }

  private onSourceChanged(f: Feature): void {
    const features: Feature[] = this.source.getFeatures();
    this.store.dispatch({type: PolygonActionTypes.add, payload: features });
    this.dataSvc.save();
  }
}
