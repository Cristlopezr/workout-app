import { AsyncStorageAdapter } from '@/config/adapters/async-storage.adapter';
import type { Workout, WorkoutContext, WorkoutContextState } from '@/interfaces/workout.interface';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

const WorkoutContext = createContext<WorkoutContext | null>(null);

const STORAGE_KEY = 'workouts';

export const WorkoutContextProvider = ({ children }: PropsWithChildren) => {
    const [activeWorkout, setActiveWorkout] = useState<WorkoutContextState>({
        numberOfCycles: '',
        preparationTime: '',
        restTime: '',
        workoutTime: '',
        name: '',
        id: '',
    });

    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getWorkouts();
    }, []);

    const onSetActiveWorkout = (workout: WorkoutContextState) => {
        setActiveWorkout(workout);
    };

    const getWorkouts = async () => {
        try {
            const workouts = await AsyncStorageAdapter.getItem(STORAGE_KEY);
            if (workouts) {
                setWorkouts(workouts);
            }
        } catch (error) {
            console.log(error);
            throw new Error(`An error has ocurred: ${error}`);
        }
    };

    const onSaveWorkout = async (newWorkout: Workout) => {
        const newWorkouts = [...workouts, newWorkout];
        try {
            await AsyncStorageAdapter.saveItem(STORAGE_KEY, JSON.stringify(newWorkouts));
            setWorkouts(newWorkouts);
        } catch (error) {
            console.log(error);
            throw new Error(`An error has ocurred: ${error}`);
        }
    };

    return (
        <WorkoutContext.Provider
            value={{
                ...activeWorkout,
                activeWorkout,
                onSetActiveWorkout,
                workouts,
                onSaveWorkout,
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
