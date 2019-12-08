import { EntityAdapter, createEntityAdapter, } from '@ngrx/entity';
import Feature from 'ol';

export const polygonAdapter: EntityAdapter<Feature> =
                            createEntityAdapter<Feature>({
                              selectId: f => f.ol_uid
                            });
