import { MapViewComponent } from './map-view/map-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MapMenuComponent } from './map-menu/map-menu.component';
import { PolygonDrawService } from './services/polygon-draw.service';
import { PolygonEditService } from './services/polygon-edit.service';
import { PolygonDeleteService } from './services/polygon-delete.service';

@NgModule({
  declarations: [
    AppComponent,
    MapViewComponent,
    MapMenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PolygonDrawService,
              PolygonEditService,
              PolygonDeleteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
