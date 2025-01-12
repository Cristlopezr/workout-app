import Button from '@/components/button';
import Input from '@/components/input';
import { globalStyles } from '@/config/theme/global-styles';
import { useThemeContext } from '@/context/theme-context';
import { Controller, RegisterOptions, useForm } from 'react-hook-form';
import { FlatList, KeyboardTypeOptions, ScrollView, Text, View } from 'react-native';

type Inputs = {
    name: string;
    preparationTime: string;
    workoutTime: string;
    restTime: string;
    numberOfCyles: string;
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
            pattern: {
                value: /^[A-Za-z]+$/,
                message: 'Only letters are allowed',
            },
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
        name: 'numberOfCyles',
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

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit = (data: Inputs) => {
        //TODO:Save new workout
        console.log(data);
    };

    return (
        <View style={[globalStyles.container, { paddingBottom: 50 }]}>
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
