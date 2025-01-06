import { useThemeContext } from '@/context/theme-context';
import { useWorkoutContext } from '@/context/workout-context';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function TimerScreen() {
    const { colors } = useThemeContext();

    const {
        subtractSeconds,
        workoutState: { workoutTime },
    } = useWorkoutContext();

    useEffect(() => {
        setInterval(() => {
            subtractSeconds('workoutTime');
        }, 1000);

        return () => {};
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 200, color: colors.text }}>{workoutTime}</Text>
        </View>
    );
}
