import Button from '@/components/button';
import FAB from '@/components/fab';
import Input from '@/components/input';
import { globalStyles } from '@/config/theme/global-styles';
import { useThemeContext } from '@/context/theme-context';
import { useWorkoutContext } from '@/context/workout-context';
import { WorkoutContextState, WorkoutStateProperty } from '@/interfaces/workout.interface';
import { Add, Remove } from '@/lib/icons';
import { Link, router } from 'expo-router';
import { RegisterOptions, useForm } from 'react-hook-form';
import { FlatList, KeyboardTypeOptions, SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Item = {
    name: WorkoutStateProperty;
    defaultValue: string;
    label: string;
    keyboardType: KeyboardTypeOptions;
    rules?: Omit<RegisterOptions<any, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined;
};

const items: Item[] = [
    {
        name: 'preparationTime',
        defaultValue: '',
        label: 'Preparation',
        keyboardType: 'numeric',
        rules: {
            required: false,
            pattern: {
                value: /^[1-9]\d*$/,
                message: 'Only numbers from 1 and above are allowed',
            },
        },
    },
    {
        name: 'workoutTime',
        defaultValue: '',
        label: 'Workout',
        keyboardType: 'numeric',
        rules: {
            pattern: {
                value: /^[1-9]\d*$/,
                message: 'Only numbers from 1 and above are allowed',
            },
            required: 'Workout time is required',
        },
    },
    {
        name: 'restTime',
        defaultValue: '',
        label: 'Rest',
        keyboardType: 'numeric',
        rules: {
            pattern: {
                value: /^[1-9]\d*$/,
                message: 'Only numbers from 1 and above are allowed',
            },
            required: 'Rest time is required',
        },
    },
    {
        name: 'numberOfCycles',
        defaultValue: '',
        label: 'Cycles',
        keyboardType: 'numeric',
        rules: {
            required: 'Number of cycles is required',
            pattern: {
                value: /^[1-9]\d*$/,
                message: 'Only numbers from 1 and above are allowed',
            },
        },
    },
];

export default function WorkoutSettingsScreen() {
    const { colors } = useThemeContext();

    const {
        control,
        formState: { errors },
        getValues,
        setValue,
        handleSubmit,
    } = useForm<WorkoutContextState>();

    const { onSetActiveWorkout } = useWorkoutContext();

    const onSubmit = () => {
        onSetActiveWorkout({ ...getValues() });
        router.push('/timer');
    };

    const addSeconds = (propertyName: WorkoutStateProperty) => {
        if (getValues(propertyName) === '') {
            setValue(propertyName, '1', { shouldValidate: true });
            return;
        }
        const value = `${Number(getValues(propertyName)) + 1}`;
        setValue(propertyName, value, { shouldValidate: true });
    };

    const subtractSeconds = (propertyName: WorkoutStateProperty) => {
        if (getValues(propertyName) === '') return;
        const value = `${Number(getValues(propertyName)) - 1}`;
        if (+value <= 0) return;
        setValue(propertyName, value, { shouldValidate: true });
    };

    return (
        <SafeAreaView style={[globalStyles.container, styles.container]}>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <View>
                        <Input
                            style={{
                                borderColor: colors.border,
                                color: colors.text,
                            }}
                            textStyle={{
                                color: colors.text,
                            }}
                            defaultValue={item.defaultValue}
                            rules={item.rules}
                            name={item.name}
                            control={control}
                            keyboardType='numeric'
                            label={item.label}
                            left={<FAB onPress={() => subtractSeconds(item.name)} icon={<Remove color={colors.text} size={24} />} style={[{ backgroundColor: colors.action }, styles.fab]} />}
                            right={<FAB onPress={() => addSeconds(item.name)} icon={<Add color={colors.text} size={24} />} style={[{ backgroundColor: colors.action }, styles.fab]} />}
                        />
                        {errors[item.name] && <Text style={{ color: colors.error, fontWeight: 'bold', textAlign: 'center' }}>{errors[item.name]?.message}</Text>}
                    </View>
                )}
            />

            <Button style={{ backgroundColor: colors.action }} text='Start' onPress={handleSubmit(onSubmit)} textStyle={{ color: colors.text }} />
            <Link href='/new-workout' asChild>
                <FAB icon={<Add color={colors.text} size={28} />} style={{ backgroundColor: colors.action, bottom: 100 }} />
            </Link>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
    },
    fab: {
        width: 40,
        height: 40,
        position: 'relative',
    },
});
