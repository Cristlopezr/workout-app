export interface WorkoutContext {
    preparationTime: number;
    workoutTime: number;
    restTime: number;
    numberOfCycles: number;
    workoutState: WorkoutContextState;
    onSetWorkoutContextState: (propertyName: WorkoutStateProperty, value: number) => void;
    addSeconds: (name: WorkoutStateProperty) => void;
    subtractSeconds: (name: WorkoutStateProperty) => void;
}

export interface WorkoutContextState {
    preparationTime: number;
    workoutTime: number;
    restTime: number;
    numberOfCycles: number;
}

export interface TimerState {
    preparationTime: number;
    workoutTime: number;
    restTime: number;
    numberOfCycles: number;
    currentCycle: number;
    time: number | undefined;
    activePhase: WorkoutTime;
    activeColor: string;
}

export interface TimerColors {
    preparation: string;
    workout: string;
    rest: string;
    finished: string;
}

export type WorkoutTime = 'preparation' | 'workout' | 'rest' | 'finished';
export type WorkoutStateProperty = 'preparationTime' | 'workoutTime' | 'restTime' | 'numberOfCycles';
