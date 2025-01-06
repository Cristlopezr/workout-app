import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface WorkoutContext {
    onSetWorkoutState: (propertyName: WorkoutStateProperty, value: number) => void;
    addSeconds: (propertyName: WorkoutStateProperty) => void;
    subtractSeconds: (propertyName: WorkoutStateProperty) => void;
    workoutState: {
        preparationTime: number;
        workoutTime: number;
        restTime: number;
        cycles: number;
    };
}

export type WorkoutStateProperty = 'preparationTime' | 'workoutTime' | 'restTime' | 'cycles';

const WorkoutContext = createContext<WorkoutContext | null>(null);

export const WorkoutContextProvider = ({ children }: PropsWithChildren) => {
    const [workoutState, setWorkoutState] = useState({
        preparationTime: 0,
        workoutTime: 0,
        restTime: 0,
        cycles: 0,
    });

    const onSetWorkoutState = (propertyName: WorkoutStateProperty, value: number) => {
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
                onSetWorkoutState,
                addSeconds,
                subtractSeconds,
                workoutState,
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
