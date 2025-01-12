import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';

export interface WorkoutContext {
    preparationTime: string;
    workoutTime: string;
    restTime: string;
    numberOfCycles: string;
    control: Control<WorkoutContextState, any>;
    errors: FieldErrors<WorkoutContextState>;
    handleSubmit: UseFormHandleSubmit<WorkoutContextState, undefined>;
    addSeconds: (name: WorkoutStateProperty) => void;
    subtractSeconds: (name: WorkoutStateProperty) => void;
}

export interface WorkoutContextState {
    preparationTime: string;
    workoutTime: string;
    restTime: string;
    numberOfCycles: string;
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
