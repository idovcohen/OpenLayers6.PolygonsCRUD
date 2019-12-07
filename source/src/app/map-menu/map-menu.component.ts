import { ColorResponse } from './../map-view/color-response';
import { ColorService } from './../services/color.service';
import { ActionType } from '../ngrx-things/actions/action-type';
import { MapViewMode } from '../map-view/map-view-mode';
import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MapViewComponent } from '../map-view/map-view.component';
import { MapViewInterface } from '../interfaces/map-view.interface';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../interfaces/app-state.interface';
import { Subscription } from 'rxjs';

@Component(
  {
    selector: 'map-menu',
    templateUrl: './map-menu.component.html',
    styleUrls: ['./map-menu.component.css']
  })
export class MapMenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MapViewComponent, {static: true}) public view: MapViewInterface;
  public mapViewmode = MapViewMode;

  private sub: Subscription;
  constructor(private readonly store: Store<AppStateInterface>,
              private readonly colorSvc: ColorService) {
  this.sub = new Subscription();
              }

  public ngAfterViewInit(): void {
    this.sub.add(this.colorSvc.getColor()
                  .subscribe((res: ColorResponse) => {
                              const picker: HTMLInputElement = document.getElementById('colorPicker') as HTMLInputElement;
                              picker.value = res.selectedColor; }));
  }

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

  public colorSelect(): void {
    const picker: HTMLInputElement = document.getElementById('colorPicker') as HTMLInputElement;
    const action = {type: ActionType.colorSelect, selectedColor: picker.value};
    this.sub.add(this.colorSvc.setColor(picker.value).subscribe(() => {},
                                                        () => { console.error('Could not send the selected color to the server.'); }));
    this.store.dispatch(action);
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
