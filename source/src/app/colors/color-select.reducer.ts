import { createReducer, on, Action } from '@ngrx/store';
import { colorSelectAction } from './color-select.action';
import { AppStateInterface } from '../interfaces/app-state.interface';

export const initialState: AppStateInterface = {
  selectedColor: 'red'
};

const reducer = createReducer(initialState,
                              on(colorSelectAction, (state, action: {selectedColor: string}) =>
                                                    ({selectedColor: action.selectedColor })));

export function colorSelectReducer(state: AppStateInterface | undefined, action: Action) {
  return reducer(state, action);
}
