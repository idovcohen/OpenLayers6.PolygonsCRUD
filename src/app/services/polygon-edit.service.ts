import { Injectable } from '@angular/core';
import Map from 'ol/Map';
import {Select, Modify} from 'ol/interaction';

@Injectable()
export class  PolygonEditService {
  private readonly select: Select;
  private  modify: Modify;
  private map: Map;

  constructor() {
    this.select = new Select();
  }

  public init(data: any): void {
    this.map = data.map as Map;
    this.modify = new Modify({source: data.source});
  }

  public start(): void {
    this.map.addInteraction(this.select);
    this.map.addInteraction(this.modify);
  }

  public stop(): void {
    this.map.removeInteraction(this.select);
    this.map.removeInteraction(this.modify);
  }
}
