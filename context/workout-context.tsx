import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface WorkoutContext {
    preparationTime: number;
    workoutTime: number;
    restTime: number;
    cycles: number;
    setWorkoutTime: (workoutTime: number) => void;
    setRestTime: (restTime: number) => void;
    setCycles: (cycles: number) => void;
    setPreparationTime: (preparationTime: number) => void;
}

const WorkoutContext = createContext<WorkoutContext | null>(null);

export const WorkoutContextProvider = ({ children }: PropsWithChildren) => {
    const [workoutState, setWorkoutState] = useState({
        preparationTime: 0,
        workoutTime: 0,
        restTime: 0,
        cycles: 0,
    });

    const setWorkoutTime = (workoutTime: number) => {
        setWorkoutState(prevState => ({
            ...prevState,
            workoutTime,
        }));
    };
    const setRestTime = (restTime: number) => {
        setWorkoutState(prevState => ({
            ...prevState,
            restTime,
        }));
    };

    const setCycles = (cycles: number) => {
        setWorkoutState(prevState => ({
            ...prevState,
            cycles,
        }));
    };

    const setPreparationTime = (preparationTime: number) => {
        setWorkoutState(prevState => ({
            ...prevState,
            preparationTime,
        }));
    };

    return (
        <WorkoutContext.Provider
            value={{
                ...workoutState,
                setWorkoutTime,
                setRestTime,
                setCycles,
                setPreparationTime,
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
