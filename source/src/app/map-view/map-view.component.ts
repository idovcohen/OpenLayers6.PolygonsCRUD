import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import {Snap} from 'ol/interaction';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Style, Stroke, Fill} from 'ol/style';
import {MapViewMode} from './map-view-mode';
import { AppStateInterface } from '../interfaces/app-state.interface';
import { MapViewInterface } from '../interfaces/map-view.interface';
import { PolygonDrawService } from '../services/polygon-draw.service';
import { PolygonEditService } from '../services/polygon-edit.service';
import { PolygonDeleteService } from '../services/polygon-delete.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component(
  {
    selector: 'map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.css']
  })
export class MapViewComponent implements OnInit, OnDestroy, MapViewInterface, AfterViewInit {
  private subColor: Subscription = null;
  private vecSource: VectorSource = null;
  private vectorLayer: VectorLayer = null;
  private modeField: MapViewMode;
  private map: Map = null;

  public get mode(): MapViewMode {
    return this.modeField;
  }

  constructor(private readonly store: Store<AppStateInterface>,
              private readonly drawSvc: PolygonDrawService,
              private readonly editSvc: PolygonEditService,
              private readonly deleteSvc: PolygonDeleteService) {
     this.modeField = MapViewMode.scroll;
     this.vecSource = new VectorSource({wrapX: false});
  }

  public ngOnInit(): void {
    this.subColor = this.store.select(state => state)
                              .subscribe((value: AppStateInterface) => {this.onPolygonColorChanged(value); });
  }

  public ngAfterViewInit(): void {


    const view: View = new View({
      center: [813079.7791264898, 5929220.284081122],
      zoom: 7
    });

    const stroke: Stroke = new Stroke ({color: 'rgba(255, 0, 0, 1)', width: 2});
    const fill: Fill = new Fill({color: 'rgba(255, 255, 255, 0.5)'});

    const style: Style = new Style({stroke, fill});
    const tileLayer: TileLayer = new TileLayer({source: new OSM()});
    this.vectorLayer = new VectorLayer( {source: this.vecSource, style});
    this.map = new Map({
      target: 'map',
      layers: [  tileLayer, this.vectorLayer],
      view,
    });

    this.drawSvc.init({map: this.map, source: this.vecSource});
    this.editSvc.init({map: this.map, source: this.vecSource});
    this.deleteSvc.init({map: this.map, source: this.vecSource});

    const snap: Snap = new Snap({source: this.vecSource});
    this.map.addInteraction(snap);
  }

  private onPolygonColorChanged(value: AppStateInterface): void {
    if (this.vectorLayer === null) {
      return;
    }

    let why: any = value;
    why = why.select;
    const stroke: Stroke = new Stroke ({color: why.selectedColor, width: 2});
    const fill: Fill = new Fill({color: 'rgba(255, 255, 255, 0.5)'});
    const style: Style = new Style({stroke, fill});
    this.vectorLayer.setStyle(style);
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

  public ngOnDestroy(): void {
    this.subColor.unsubscribe();
  }
}
