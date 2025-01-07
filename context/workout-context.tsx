import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';

interface WorkoutContext {
    onSetWorkoutState: (propertyName: WorkoutStateProperty, value: number) => void;
    addSeconds: (propertyName: WorkoutStateProperty) => void;
    subtractSeconds: (propertyName: WorkoutStateProperty) => void;
    workoutState: WorkoutState;
    startTimer: () => void;
}

interface WorkoutState {
    preparationTime: number;
    workoutTime: number;
    restTime: number;
    numberOfCycles: number;
    currentCycle: number;
    time: number | undefined;
    activePhase: WorkoutTime;
}

type WorkoutTime = 'preparation' | 'workout' | 'rest' | 'finished';
export type WorkoutStateProperty = 'preparationTime' | 'workoutTime' | 'restTime' | 'numberOfCycles';

const WorkoutContext = createContext<WorkoutContext | null>(null);

export const WorkoutContextProvider = ({ children }: PropsWithChildren) => {
    const [workoutState, setWorkoutState] = useState<WorkoutState>({
        preparationTime: 0,
        workoutTime: 0,
        restTime: 0,
        numberOfCycles: 0,
        time: undefined,
        activePhase: 'preparation',
        currentCycle: 1,
    });

    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (workoutState.activePhase === 'finished') {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        }
    }, [workoutState.activePhase]);

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

    const changePhase = (prevState: WorkoutState): WorkoutState => {
        const isLastCycle = prevState.currentCycle === prevState.numberOfCycles;
        if (prevState.activePhase === 'finished') {
            return {
                ...prevState,
                time: 0,
            };
        }

        if (prevState.activePhase === 'preparation') {
            return {
                ...prevState,
                activePhase: 'workout',
                time: prevState.workoutTime,
            };
        }

        if (prevState.activePhase === 'workout') {
            return {
                ...prevState,
                activePhase: 'rest',
                time: prevState.restTime,
            };
        }

        if (prevState.activePhase === 'rest') {
            return {
                ...prevState,
                activePhase: isLastCycle ? 'finished' : 'workout',
                time: isLastCycle ? 0 : prevState.workoutTime,
                currentCycle: isLastCycle ? prevState.numberOfCycles : prevState.currentCycle + 1,
            };
        }

        return prevState;
    };

    const startTimer = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }

        setWorkoutState(prevState => ({
            ...prevState,
            activePhase: 'preparation',
            time: prevState.preparationTime,
            currentCycle: 1,
        }));

        intervalIdRef.current = setInterval(() => {
            setWorkoutState(prevState => {
                if (prevState.time === 0) {
                    return changePhase(prevState);
                }

                return {
                    ...prevState,
                    time: prevState.time! - 1,
                };
            });
        }, 1000);
    };

    return (
        <WorkoutContext.Provider
            value={{
                ...workoutState,
                onSetWorkoutState,
                addSeconds,
                subtractSeconds,
                workoutState,
                startTimer,
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
