import { PolygonState } from './polygon.entity';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { polygonAdapter } from './polygon.adapter';

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = polygonAdapter.getSelectors();

export const getPolygonState = createFeatureSelector<PolygonState>('polygon');
export const selectAllPolygons = createSelector(getPolygonState, selectAll);


