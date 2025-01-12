import { AsyncStorageAdapter } from '@/config/adapters/async-storage.adapter';
import { globalStyles } from '@/config/theme/global-styles';
import { WorkoutContextState } from '@/interfaces/workout.interface';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function MyRoutinesScreen() {
    const [workouts, setWorkouts] = useState<WorkoutContextState[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const getWorkouts = async () => {
        try {
            const workouts = await AsyncStorageAdapter.getItem('workouts');
            if (workouts) {
                setWorkouts(workouts);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error as string);
        }
    };

    useEffect(() => {
        getWorkouts();
        return () => {};
    }, []);

    return (
        <View style={globalStyles.container}>
            <Text>{JSON.stringify(workouts)}</Text>
        </View>
    );
}
