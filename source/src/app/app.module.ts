import { MapViewComponent } from './map-view/map-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MapMenuComponent } from './map-menu/map-menu.component';
import { PolygonDrawService } from './services/polygon-draw.service';
import { PolygonEditService } from './services/polygon-edit.service';
import { PolygonDeleteService } from './services/polygon-delete.service';
import { StoreModule } from '@ngrx/store';
import { colorSelectReducer } from './ngrx-things/reducers/color-select.reducer';

@NgModule({
  declarations: [
    AppComponent,
    MapViewComponent,
    MapMenuComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({select: colorSelectReducer}),
  ],
  providers: [PolygonDrawService,
              PolygonEditService,
              PolygonDeleteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
