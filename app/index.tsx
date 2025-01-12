import Button from '@/components/button';
import FAB from '@/components/fab';
import Input from '@/components/input';
import { useThemeContext } from '@/context/theme-context';
import { useWorkoutContext } from '@/context/workout-context';
import { WorkoutStateProperty } from '@/interfaces/workout.interface';
import { Add, Remove } from '@/lib/icons';
import { Link } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';

interface WorkoutSettings {
    text: string;
    name: WorkoutStateProperty;
}

const workoutSettings: WorkoutSettings[] = [
    {
        text: 'Preparation',
        name: 'preparationTime',
    },
    {
        text: 'Workout',
        name: 'workoutTime',
    },
    {
        text: 'Rest',
        name: 'restTime',
    },
    {
        text: 'Cycles',
        name: 'numberOfCycles',
    },
];

export default function WorkoutSettingsScreen() {
    const { colors } = useThemeContext();

    const { workoutState, onSetWorkoutContextState, addSeconds, subtractSeconds } = useWorkoutContext();

    const { numberOfCycles, preparationTime, restTime, workoutTime } = workoutState;
    const isStartButtonDisabled = numberOfCycles === 0 || preparationTime === 0 || restTime === 0 || workoutTime === 0;

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ gap: 15 }}>
                {workoutSettings.map(({ text, name }) => (
                    <Input
                        value={`${workoutState[name]}`}
                        style={{
                            borderColor: colors.border,
                            color: colors.text,
                        }}
                        textStyle={{
                            color: colors.text,
                        }}
                        key={name}
                        onChangeText={(value: string) => onSetWorkoutContextState(name, Number(value))}
                        keyboardType='numeric'
                        text={text}
                        left={<FAB onPress={() => subtractSeconds(name)} icon={<Remove color={colors.text} size={24} />} style={[{ backgroundColor: colors.action }, styles.fab]} />}
                        right={<FAB onPress={() => addSeconds(name)} icon={<Add color={colors.text} size={24} />} style={[{ backgroundColor: colors.action }, styles.fab]} />}
                    />
                ))}
            </View>

            <Link href='/timer' asChild>
                <Button disabled={isStartButtonDisabled} style={{ backgroundColor: colors.action, opacity: isStartButtonDisabled ? 0.5 : 1 }} text='Start' />
            </Link>

            <Link href='/new-workout' asChild>
                <FAB icon={<Add color={colors.text} size={28} />} style={{ backgroundColor: colors.action, bottom: 120 }} />
            </Link>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        justifyContent: 'space-between',
    },
    fab: {
        width: 40,
        height: 40,
        position: 'relative',
    },
});
