import { useThemeContext } from '@/context/theme-context';
import { useWorkoutContext } from '@/context/workout-context';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TimerScreen() {
    const { colors } = useThemeContext();

    const {
        workoutState: { time, activePhase, preparationTime, workoutTime, restTime, currentCycle, numberOfCycles },
        startTimer,
    } = useWorkoutContext();

    useEffect(() => {
        startTimer();
    }, []);
    return (
        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, paddingHorizontal: 10 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 200, color: colors.text }}>{time}</Text>
                <Text style={{ color: colors.text, fontSize: 20 }}>{activePhase.toUpperCase()}</Text>
            </View>
            <View style={{ gap: 10, width: '100%' }}>
                <Text style={[styles.workout, { color: colors.text, borderColor: colors.border }]}>Preparation: {preparationTime}</Text>
                <Text style={[styles.workout, { color: colors.text, borderColor: colors.border }]}>Workout: {workoutTime}</Text>
                <Text style={[styles.workout, { color: colors.text, borderColor: colors.border }]}>Rest: {restTime}</Text>
                <Text style={[styles.workout, { color: colors.text, borderColor: colors.border }]}>
                    Cycles: {currentCycle}/{numberOfCycles}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    workout: {
        borderWidth: 1,
        padding: 10,
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
    },
});
