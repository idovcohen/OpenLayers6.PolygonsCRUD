import { MapViewMode } from '../map-view/map-view-mode';

export interface MapViewInterface {
  readonly mode: MapViewMode;

  startDrawingMode(): void;
  stopDrawingMode(): void;
  startEditingMode(): void;
  stopEditingMode(): void;
  startDeletingMode(): void;
  stopDeletingMode(): void;
}
