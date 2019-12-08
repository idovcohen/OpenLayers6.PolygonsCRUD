import { PolygonDataService } from './services/polygon-data.service';
import { PolygonTrackingService } from './services/polygon-tracking.service';
import { MapViewComponent } from './map-view/map-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MapMenuComponent } from './map-menu/map-menu.component';
import { PolygonDrawService } from './services/polygon-draw.service';
import { PolygonEditService } from './services/polygon-edit.service';
import { PolygonDeleteService } from './services/polygon-delete.service';
import { ColorService } from './services/color.service';
import { colorSelectReducer } from './colors/color-select.reducer';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { polygonReducer } from './polygons/polygon.reducer';

@NgModule({
  declarations: [
    AppComponent,
    MapViewComponent,
    MapMenuComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({select: colorSelectReducer,
                        polygon: polygonReducer}),
    HttpClientModule,
  ],
  providers: [PolygonDrawService,
              PolygonEditService,
              PolygonDeleteService,
              PolygonTrackingService,
              PolygonDataService,
              ColorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
