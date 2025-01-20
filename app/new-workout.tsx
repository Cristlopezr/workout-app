import Button from '@/components/button';
import Input from '@/components/input';
import { globalStyles } from '@/config/theme/global-styles';
import { useThemeContext } from '@/context/theme-context';
import { useWorkoutContext } from '@/context/workout-context';
import { router } from 'expo-router';
import { RegisterOptions, useForm } from 'react-hook-form';
import { FlatList, KeyboardTypeOptions, ScrollView, Text, View } from 'react-native';

type Inputs = {
    name: string;
    preparationTime: string;
    workoutTime: string;
    restTime: string;
    numberOfCycles: string;
};

type Item = {
    name: keyof Inputs;
    label: string;
    keyboardType: KeyboardTypeOptions;
    rules?: Omit<RegisterOptions<any, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined;
};

const items: Item[] = [
    {
        name: 'name',
        label: 'Name',
        keyboardType: 'default',
        rules: {
            required: {
                value: true,
                message: 'Name is required',
            },
        },
    },
    {
        name: 'preparationTime',
        label: 'Preparation time',
        keyboardType: 'numeric',
        rules: {
            pattern: {
                value: /^[1-9]\d*$/,
                message: 'Only numbers from 1 and above are allowed',
            },
            required: {
                value: true,
                message: 'Preparation time is required',
            },
        },
    },
    {
        name: 'workoutTime',
        label: 'Workout time',
        keyboardType: 'numeric',
        rules: {
            pattern: {
                value: /^[1-9]\d*$/,
                message: 'Only numbers from 1 and above are allowed',
            },
            required: {
                value: true,
                message: 'Workout time is required',
            },
        },
    },
    {
        name: 'restTime',
        label: 'Rest time',
        keyboardType: 'numeric',
        rules: {
            pattern: {
                value: /^[1-9]\d*$/,
                message: 'Only numbers from 1 and above are allowed',
            },
            required: {
                value: true,
                message: 'Rest time is required',
            },
        },
    },
    {
        name: 'numberOfCycles',
        label: 'Number of cyles',
        keyboardType: 'numeric',
        rules: {
            pattern: {
                value: /^[1-9]\d*$/,
                message: 'Only numbers from 1 and above are allowed',
            },
            required: {
                value: true,
                message: 'Number of cycles is required',
            },
        },
    },
];

export default function NewWorkoutScreen() {
    const { colors } = useThemeContext();
    const { onSaveWorkout } = useWorkoutContext();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit = async (data: Inputs) => {
        try {
            const workout = {
                id: Date.now().toString(),
                ...data,
            };
            await onSaveWorkout(workout);
            router.replace('/my-routines');
        } catch (error) {
            //TODO:create state and show error
            console.log(error);
        }
    };

    return (
        <View style={[globalStyles.container, { gap: 20 }]}>
            <FlatList
                data={items}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                renderItem={({ item }) => (
                    <View>
                        <Input
                            style={{ color: colors.text, borderColor: colors.border }}
                            textStyle={{ color: colors.text }}
                            label={item.label}
                            keyboardType={item.keyboardType}
                            control={control}
                            name={item.name}
                            rules={item.rules}
                        />
                        {errors[item.name] && <Text style={{ color: colors.error, fontWeight: 'bold', textAlign: 'center' }}>{errors[item.name]?.message}</Text>}
                    </View>
                )}
            />
            <Button text='Save' style={{ backgroundColor: colors.action }} onPress={handleSubmit(onSubmit)} />
        </View>
    );
}
