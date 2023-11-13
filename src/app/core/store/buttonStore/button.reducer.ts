import { createReducer, on } from '@ngrx/store';
import * as buttonActions from './button.action';
import { environment } from 'src/environments/environment';
import { SpeedButtonState, ActionButtonState, ConfigButtonState } from './button.state';
export const initialStateAction = {
	checked: false,
	status: 'start'
}

export const initialStateSpeed = {
	speedVisited: environment.default.speedVisited,
	speedPath: environment.default.speedPath
}

export const initialStateConfig = {
	isStart: false,
	isFinish: false,
	isBomb: false
}

export const initialPoint = {
	rStart: environment.default.start,
	cStart: environment.default.start,
	rFinish: environment.default.start,
	cFinish: environment.default.start
}

export const excutionButtonReducer = createReducer(
	initialStateAction,
	on(buttonActions.setExcutionButton, (state, { checked, status }) => ({ ...state, checked, status }))
)

export const speedButtonReducer = createReducer(
	initialStateSpeed,
	on(buttonActions.setSpeedButton, (state, { speedVisited, speedPath }) => ({ ...state, speedVisited, speedPath }))
)

export const configButtonReducer = createReducer(
	initialStateConfig,
	on(buttonActions.setConfigButton, (state, { isStart, isFinish, isBomb }) => ({ ...state, isStart, isFinish, isBomb }))
)

export const SetDownPointReducer = createReducer(
	initialPoint,
	on(buttonActions.setPoint, (state, { rStart, cStart, rFinish, cFinish }) => ({ ...state, rStart, cStart, rFinish, cFinish }))
)
