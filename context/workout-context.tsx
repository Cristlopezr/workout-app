import UseTimer from '@/hooks/use-timer';
import type { WorkoutContext, WorkoutContextState, WorkoutStateProperty } from '@/interfaces/workout.interface';
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';

const WorkoutContext = createContext<WorkoutContext | null>(null);

export const WorkoutContextProvider = ({ children }: PropsWithChildren) => {
    const [workoutState, setWorkoutState] = useState<WorkoutContextState>({
        preparationTime: 0,
        workoutTime: 0,
        numberOfCycles: 1,
        restTime: 0,
    });

    const onSetWorkoutContextState = (propertyName: WorkoutStateProperty, value: number) => {
        setWorkoutState(prevState => ({
            ...prevState,
            [propertyName]: value,
        }));
    };

    const addSeconds = (propertyName: WorkoutStateProperty) => {
        setWorkoutState(prevState => ({
            ...prevState,
            [propertyName]: prevState[propertyName] + 1,
        }));
    };

    const subtractSeconds = (propertyName: WorkoutStateProperty) => {
        setWorkoutState(prevState => {
            if (prevState[propertyName] === 0) return prevState;
            return {
                ...prevState,
                [propertyName]: prevState[propertyName] - 1,
            };
        });
    };

    return (
        <WorkoutContext.Provider
            value={{
                ...workoutState,
                workoutState,
                onSetWorkoutContextState,
                addSeconds,
                subtractSeconds,
            }}
        >
            {children}
        </WorkoutContext.Provider>
    );
};

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext);

    if (!context) {
        throw new Error('WorkoutContext must be used within a WorkoutContextProvider');
    }

    return context;
};
