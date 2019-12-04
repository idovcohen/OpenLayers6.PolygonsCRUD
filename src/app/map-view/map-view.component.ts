import { Component, AfterViewInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import {Snap} from 'ol/interaction';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Style, Stroke, Fill} from 'ol/style';

import {MapViewMode} from './map-view-mode';
import { MapViewInterface } from '../interfaces/map-view.interface';
import { PolygonDrawService } from '../services/polygon-draw.service';
import { PolygonEditService } from '../services/polygon-edit.service';
import { PolygonDeleteService } from '../services/polygon-delete.service';

@Component(
  {
    selector: 'map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.css']
  })
export class MapViewComponent implements MapViewInterface, AfterViewInit {
  private modeField: MapViewMode;
  private map: Map;

  public get mode(): MapViewMode {
    return this.modeField;
  }

  constructor(private readonly drawSvc: PolygonDrawService,
              private readonly editSvc: PolygonEditService,
              private readonly deleteSvc: PolygonDeleteService) {
     this.modeField = MapViewMode.scroll;
  }

  public ngAfterViewInit(): void {

    const vecSource: VectorSource = new VectorSource({wrapX: false});

    const view: View = new View({
      center: [813079.7791264898, 5929220.284081122],
      zoom: 7
    });

    const stroke: Stroke = new Stroke ({color: 'rgba(255, 0, 0, 1)', width: 2});
    const fill: Fill = new Fill({color: 'rgba(255, 255, 255, 0.5)'});

    const style: Style = new Style({stroke, fill});
    const tileLayer: TileLayer = new TileLayer({source: new OSM()});
    const vectorLayer: VectorLayer = new VectorLayer( {source: vecSource, style});
    this.map = new Map({
      target: 'map',
      layers: [  tileLayer, vectorLayer],
      view,
    });

    // const long = 34.855499;
    // const lat = 32.109333;
    // const  lonLat: LonLat = new LonLat(long, lat).transform(new Projection('EPSG:4326'),
    //                             this.map.getProjectionObject());
    // this.map.center(lonLat, 7);
    this.drawSvc.init({map: this.map, source: vecSource});
    this.editSvc.init({map: this.map, source: vecSource});
    this.deleteSvc.init({map: this.map, source: vecSource});

    const snap: Snap = new Snap({source: vecSource});
    this.map.addInteraction(snap);
  }

  public startDrawingMode(): void {
    this.drawSvc.start();
    this.modeField = MapViewMode.draw;
  }

  public stopDrawingMode(): void {
    this.drawSvc.stop();
    this.modeField = MapViewMode.scroll;
  }

  public startEditingMode(): void {
    this.editSvc.start();
    this.modeField = MapViewMode.edit;
  }

  public stopEditingMode(): void {
    this.editSvc.stop();
    this.modeField = MapViewMode.scroll;
  }

  public startDeletingMode(): void {
    this.deleteSvc.start();
    this.modeField = MapViewMode.delete;
  }

  public stopDeletingMode(): void {
    this.deleteSvc.stop();
    this.modeField = MapViewMode.scroll;
  }
}
