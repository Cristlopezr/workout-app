export interface WorkoutContext {
    preparationTime: string;
    workoutTime: string;
    restTime: string;
    numberOfCycles: string;
    workouts: Workout[];
    activeWorkout: WorkoutContextState;
    onSetActiveWorkout: (workout: WorkoutContextState) => void;
    onSaveWorkout: (workout: Workout) => void;
    onDeleteWorkout: (id: string) => void;
    onDeleteAllWorkouts: () => void;
}

export interface Workout {
    id: string;
    name: string;
    preparationTime: string;
    workoutTime: string;
    restTime: string;
    numberOfCycles: string;
}

export interface WorkoutContextState {
    id?: string;
    name?: string;
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
