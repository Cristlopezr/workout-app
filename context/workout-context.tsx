import type { WorkoutContext, WorkoutContextState, WorkoutStateProperty } from '@/interfaces/workout.interface';
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const WorkoutContext = createContext<WorkoutContext | null>(null);

export const WorkoutContextProvider = ({ children }: PropsWithChildren) => {
    const {
        control,
        formState: { errors },
        getValues: getValuesHookForm,
        setValue,
        handleSubmit,
    } = useForm<WorkoutContextState>();

    const addSeconds = (propertyName: WorkoutStateProperty) => {
        const value = `${Number(getValuesHookForm(propertyName)) + 1}`;
        setValue(propertyName, value, { shouldValidate: true });
    };

    const subtractSeconds = (propertyName: WorkoutStateProperty) => {
        const value = `${Number(getValuesHookForm(propertyName)) - 1}`;
        if (+value <= 0) return;
        setValue(propertyName, value, { shouldValidate: true });
    };

    const getValues = () => {
        return { ...getValuesHookForm() };
    };

    return (
        <WorkoutContext.Provider
            value={{
                ...getValues(),
                handleSubmit,
                control,
                errors,
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
