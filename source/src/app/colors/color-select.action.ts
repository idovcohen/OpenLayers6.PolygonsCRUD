import { createAction, props } from '@ngrx/store';
import { ActionType } from './action-type';

export const colorSelectAction =  createAction(ActionType.colorSelect, props<{selectedColor: string}>());
