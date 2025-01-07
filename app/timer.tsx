import { useThemeContext } from '@/context/theme-context';
import { useWorkoutContext } from '@/context/workout-context';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TimerScreen() {
    const { colors } = useThemeContext();

    const {
        workoutState: { time, activePhase, preparationTime, workoutTime, restTime, currentCycle, numberOfCycles, activeColor },
        startTimer,
    } = useWorkoutContext();

    useEffect(() => {
        startTimer();
    }, []);
    return (
        <View style={[{ backgroundColor: activeColor }, styles.container]}>
            <View style={styles.timer}>
                <Text style={[{ color: colors.text }, styles.timeLeft]}>{time}</Text>
                <Text style={[{ color: colors.text }, styles.timerPhase]}>{activePhase.toUpperCase()}</Text>
            </View>
            <View style={styles.workoutPropertyContainer}>
                <Text style={[styles.workoutProperty, { color: colors.text, borderColor: colors.border }]}>Preparation: {preparationTime}</Text>
                <Text style={[styles.workoutProperty, { color: colors.text, borderColor: colors.border }]}>Workout: {workoutTime}</Text>
                <Text style={[styles.workoutProperty, { color: colors.text, borderColor: colors.border }]}>Rest: {restTime}</Text>
                <Text style={[styles.workoutProperty, { color: colors.text, borderColor: colors.border }]}>
                    Cycles: {currentCycle}/{numberOfCycles}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    timer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeLeft: {
        fontSize: 200,
    },
    timerPhase: {
        fontSize: 20,
        fontWeight: 500,
    },
    workoutPropertyContainer: {
        gap: 10,
        width: '100%',
    },
    workoutProperty: {
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 20,
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 500,
    },
});
