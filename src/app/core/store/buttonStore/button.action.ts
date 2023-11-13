import { createAction, props } from '@ngrx/store';

export const setExcutionButton = createAction('[SET] Excution Button', props<{ checked: boolean, status: string }>())
export const setSpeedButton = createAction('[SET] Speed Button', props<{ speedVisited: number, speedPath: number }>())
export const setConfigButton = createAction('[SET] Config Button', props<{ isStart: boolean, isFinish: boolean, isBomb: boolean }>())
export const setPoint = createAction('[SET] Position Point', props<{ rStart: number, cStart: number, rFinish: number, cFinish: number }>())