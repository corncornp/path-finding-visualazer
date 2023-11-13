export interface ActionButtonState {
    checked: boolean;
    status: 'start' | 'finding' | 'done'
}

export interface SpeedButtonState {
    speedVisited: number;
    speedPath: number
}

export interface ConfigButtonState {
    isStart: boolean;
    isFinish: boolean;
    isBomb: boolean;
}