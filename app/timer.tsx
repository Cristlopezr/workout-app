import { useThemeContext } from '@/context/theme-context';
import { useWorkoutContext } from '@/context/workout-context';
import useTimer from '@/hooks/useTimer';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const audiosData = {
    whistle: require('../assets/audios/whistle.mp3'),
    beep: require('../assets/audios/beep.mp3'),
    shortBeep: require('../assets/audios/short-beep.mp3'),
    rest: require('../assets/audios/rest.mp3'),
};

export default function TimerScreen() {
    const { colors } = useThemeContext();

    const {
        workoutState: { preparationTime, workoutTime, restTime, numberOfCycles },
    } = useWorkoutContext();

    const { startTimer, time, activePhase, activeColor, currentCycle } = useTimer({
        numberOfCycles,
        preparationTime,
        restTime,
        workoutTime,
        sounds: {
            countdown: audiosData.beep,
            finished: audiosData.shortBeep,
            startRest: audiosData.rest,
            startWorkout: audiosData.whistle,
        },
    });

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
