import { MapViewMode } from '../map-view/map-view-mode';
import { Component, ViewChild } from '@angular/core';
import { MapViewComponent } from '../map-view/map-view.component';
import { MapViewInterface } from '../interfaces/map-view.interface';

@Component(
  {
    selector: 'map-control',
    templateUrl: './map-menu.component.html',
    styleUrls: ['./map-menu.component.css']
  })
export class MapMenuComponent {
  @ViewChild(MapViewComponent, {static: true}) public view: MapViewInterface;

  public mapViewmode = MapViewMode;

  public startDrawing(): void {
    this.view.startDrawingMode();
  }
  public stopDrawing(): void {
    this.view.stopDrawingMode();
  }
  public startEditing(): void {
    this.view.startEditingMode();
  }
  public stopEditing(): void {
    this.view.stopEditingMode();
  }
  public startDeleting(): void {
    this.view.startDeletingMode();
  }
  public stopDeleting(): void {
    this.view.stopDeletingMode();
  }

}
