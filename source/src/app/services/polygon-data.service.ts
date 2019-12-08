import { PolygonState } from '../polygons/polygon.entity';
import { selectAllPolygons } from '../polygons/polygon.selector';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol';
import {Vector as VectorSource} from 'ol/source';
import { PolygonActionTypes } from '../polygons/polygon-action-types';

@Injectable()
export class PolygonDataService {
  private readonly URL = 'http://localhost:1234/api/v1/polygons';
  private readonly geoJsonParser: GeoJSON;
  private isLoading = false;

  constructor(private readonly store: Store<PolygonState>,
              private readonly http: HttpClient) {
    this.geoJsonParser = new GeoJSON();
  }

  public save(): void {
    this.store.select(selectAllPolygons)
                      .subscribe((features: Feature[]) => { this.sendToServer(features); });
  }

  private sendToServer(polygons: Feature[]) {
    if (this.isLoading) {
      return;
    }

    const vectorLayerAsJson = this.geoJsonParser.writeFeatures(polygons);
    this.http.post(this.URL, {data: vectorLayerAsJson}).subscribe(() => {});
  }

  public load(layer: any): void {
    const source: VectorSource = layer;
    this.http.get<{data}>(this.URL).subscribe((input: {data}) => {
      const data = input.data;
      if (data !== null) {
        this.isLoading = true;
        const polygons: Feature[] = this.geoJsonParser.readFeatures(data);
        this.store.dispatch({type: PolygonActionTypes.add, payload: polygons });
        source.addFeatures(polygons);
        this.isLoading = false;
      }
    });
  }
}
