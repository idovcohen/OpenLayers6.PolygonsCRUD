import { PolygonActionTypes } from './polygon-action-types';
import { PolygonState } from './polygon.entity';
import { polygonAdapter } from './polygon.adapter';

const initialPolygonState: PolygonState = polygonAdapter.getInitialState();

export function polygonReducer(state = initialPolygonState,
                               action: {type: string, payload: any}): PolygonState {
  switch (action.type) {
    case PolygonActionTypes.add:
        return polygonAdapter.addAll(action.payload, state);
  }
}
