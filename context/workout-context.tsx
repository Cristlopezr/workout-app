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

    useEffect(() => {
        getWorkouts();
    }, []);

    const onSetActiveWorkout = (workout: WorkoutContextState) => {
        setActiveWorkout(workout);
    };

    const getWorkouts = async () => {
        try {
            const workouts = await AsyncStorageAdapter.getItem<Workout[]>(STORAGE_KEY);
            if (workouts) {
                setWorkouts(workouts);
            }
        } catch (error) {
            console.log(error);
            throw new Error(`An error has ocurred getting workouts: ${error}`);
        }
    };

    const onSaveWorkout = async (newWorkout: Workout) => {
        const newWorkouts = [...workouts, newWorkout];
        try {
            await AsyncStorageAdapter.setItem(STORAGE_KEY, JSON.stringify(newWorkouts));
            setWorkouts(newWorkouts);
        } catch (error) {
            console.log(error);
            throw new Error(`An error has ocurred saving a workout: ${error}`);
        }
    };

    const onDeleteWorkout = async (id: string) => {
        const remainingWorkouts = workouts.filter(workout => workout.id !== id);
        try {
            await AsyncStorageAdapter.setItem(STORAGE_KEY, JSON.stringify(remainingWorkouts));
            setWorkouts(remainingWorkouts);
        } catch (error) {
            console.log(error);
            throw new Error(`An error has ocurred deleting a workout: ${error}`);
        }
    };

    const onDeleteAllWorkouts = async () => {
        try {
            await AsyncStorageAdapter.removeItem(STORAGE_KEY);
            setWorkouts([]);
        } catch (error) {
            console.log(error);
            throw new Error(`An error has ocurred deleting workouts: ${error}`);
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
                onDeleteWorkout,
                onDeleteAllWorkouts,
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
