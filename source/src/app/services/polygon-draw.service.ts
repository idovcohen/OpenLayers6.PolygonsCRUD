import { Injectable } from '@angular/core';
import Map from 'ol/Map';
import {Draw} from 'ol/interaction';

@Injectable()
export class  PolygonDrawService {

  private map: Map;
  private draw: Draw;
  constructor() {
  }
  public init(data: any): void {
    this.map = data.map as Map;
    this.draw = new Draw({type: 'Polygon',
    source: data.source});
  }

  public start(): void {
    this.map.addInteraction(this.draw);
  }

  public stop(): void {
    this.map.removeInteraction(this.draw);
  }
}
