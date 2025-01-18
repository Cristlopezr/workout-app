import Button from '@/components/button';
import { globalStyles } from '@/config/theme/global-styles';
import { useThemeContext } from '@/context/theme-context';
import { useWorkoutContext } from '@/context/workout-context';
import { Workout } from '@/interfaces/workout.interface';
import { router } from 'expo-router';
import { FlatList, Text, View } from 'react-native';

export default function MyRoutinesScreen() {
    const { workouts, activeWorkout, onSetActiveWorkout } = useWorkoutContext();
    const { colors } = useThemeContext();

    const onSelectWorkout = (workout: Workout) => {
        onSetActiveWorkout(workout);
    };

    const onStartWorkout = () => {
        router.replace('/timer');
    };

    return (
        <View style={[globalStyles.container, { paddingVertical: 0 }]}>
            {workouts.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>Your workout list is empty.</Text>
                    <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>Time to add some!</Text>
                </View>
            ) : (
                <View>
                    <FlatList
                        data={workouts}
                        ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
                        renderItem={({ item }) => {
                            const isActiveItem = item.id === activeWorkout.id;
                            return (
                                <View
                                    style={{
                                        borderWidth: 1,
                                        backgroundColor: isActiveItem ? colors.card : colors.background,
                                        borderColor: colors.border,
                                        padding: 10,
                                        borderRadius: 5,
                                        paddingBottom: 40,
                                    }}
                                >
                                    <Text style={{ color: colors.text }}>
                                        {item.name}: Preparation({item.preparationTime}) - Workout({item.workoutTime}) - Rest({item.restTime}) - Cycles({item.numberOfCycles})
                                    </Text>
                                    <View style={{ position: 'absolute', right: 10, bottom: 5, flex: 1, flexDirection: 'row', gap: 20 }}>
                                        <Button
                                            disabled={isActiveItem}
                                            onPress={() => onSelectWorkout(item)}
                                            text='Select'
                                            style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: colors.action }}
                                            textStyle={{ color: colors.text }}
                                        />
                                        <Button
                                            onPress={onStartWorkout}
                                            disabled={!isActiveItem}
                                            text='Start'
                                            style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: colors.action }}
                                            textStyle={{ color: colors.text }}
                                        />
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
            )}
        </View>
    );
}
