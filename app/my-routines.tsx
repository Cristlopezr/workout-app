import Button from '@/components/button';
import { globalStyles } from '@/config/theme/global-styles';
import { useThemeContext } from '@/context/theme-context';
import { useWorkoutContext } from '@/context/workout-context';
import { createAlert } from '@/helpers/create-alert';
import { Workout } from '@/interfaces/workout.interface';
import { router } from 'expo-router';
import { FlatList, Text, View } from 'react-native';

export default function MyRoutinesScreen() {
    const { workouts, activeWorkout, onSetActiveWorkout, onDeleteAllWorkouts, onDeleteWorkout } = useWorkoutContext();
    const { colors } = useThemeContext();

    const onSelectWorkout = (workout: Workout) => {
        onSetActiveWorkout(workout);
    };

    const onStartWorkout = () => {
        router.replace('/timer');
    };

    const onDeleteAll = () => {
        createAlert({
            title: 'Are you sure?',
            message: `This can't be undone`,
            buttons: [
                {
                    text: 'Ok',
                    onPress: () => onDeleteAllWorkouts(),
                },
                {
                    text: 'Cancel',
                    onPress: () => undefined,
                },
            ],
        });
    };

    const onDeleteSingleWorkout = (workout: Workout) => {
        onDeleteWorkout(workout);
    };

    return (
        <View style={[globalStyles.container]}>
            {workouts.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>Your workout list is empty.</Text>
                    <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>Time to add some!</Text>
                </View>
            ) : (
                <View style={{ flex: 1, gap: 20 }}>
                    <FlatList
                        data={workouts}
                        ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
                        renderItem={({ item }) => {
                            const isActiveItem = item.id === activeWorkout.id;
                            return (
                                <View
                                    style={{
                                        borderWidth: 1,
                                        backgroundColor: isActiveItem ? colors.background : colors.card,
                                        borderColor: colors.border,
                                        padding: 10,
                                        borderRadius: 5,
                                        paddingBottom: 45,
                                    }}
                                >
                                    <Text style={{ color: colors.text }}>
                                        {item.name}: Preparation({item.preparationTime}) - Workout({item.workoutTime}) - Rest({item.restTime}) - Cycles({item.numberOfCycles})
                                    </Text>
                                    <View style={{ position: 'absolute', right: 10, bottom: 8, flex: 1, flexDirection: 'row', gap: 20 }}>
                                        <Button
                                            disabled={isActiveItem}
                                            onPress={() => onSelectWorkout(item)}
                                            text='Select'
                                            style={{ paddingVertical: 4, paddingHorizontal: 10, backgroundColor: colors.action }}
                                            textStyle={{ color: colors.text, fontSize: 14 }}
                                        />
                                        <Button
                                            onPress={onStartWorkout}
                                            disabled={!isActiveItem}
                                            text='Start'
                                            style={{ paddingVertical: 4, paddingHorizontal: 10, backgroundColor: colors.action }}
                                            textStyle={{ color: colors.text, fontSize: 14 }}
                                        />
                                    </View>
                                </View>
                            );
                        }}
                    />
                    <Button onPress={onDeleteAll} text='Delete all workouts' style={{ backgroundColor: colors.error }} textStyle={{ color: 'white' }} />
                </View>
            )}
        </View>
    );
}
