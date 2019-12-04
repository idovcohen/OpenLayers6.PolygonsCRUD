import { Injectable } from '@angular/core';
import Map from 'ol/Map';
import {Select} from 'ol/interaction';

@Injectable()
export class  PolygonDeleteService {
  private select: Select;
  private map: Map;
  constructor() {
  }

  public init(data: any): void {
    this.select = new Select();
    this.map = data.map as Map;
    this.select.on('select', (event) => {
      const selectedFeature = event.selected[0];
      if (selectedFeature) {
        data.source.removeFeature(selectedFeature);
      }
    });
  }

  public start(): void {
    this.map.addInteraction(this.select);
  }

  public stop(): void {
    this.map.removeInteraction(this.select);
  }
}
