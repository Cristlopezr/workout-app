import Button from '@/components/button';
import FAB from '@/components/fab';
import Input from '@/components/input';
import { useThemeContext } from '@/context/theme-context';
import { useWorkoutContext } from '@/context/workout-context';
import { Add, Remove } from '@/lib/icons';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const workoutSettings = [
    {
        text: 'Preparation',
        placeholder: '120',
        onClickLeft: () => {},
        onClickRight: () => {},
    },
    {
        text: 'Workout',
        placeholder: '30',
        onClickLeft: () => {},
        onClickRight: () => {},
    },
    {
        text: 'Rest',
        placeholder: '90',
        onClickLeft: () => {},
        onClickRight: () => {},
    },
    {
        text: 'Cycles',
        placeholder: '8',
        onClickLeft: () => {},
        onClickRight: () => {},
    },
];

export default function WorkoutSettingsScreen() {
    const { colors } = useThemeContext();

    const { cycles, preparationTime, restTime, workoutTime } = useWorkoutContext();

    /*
    const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(true); */

    const onStartTimer = () => {
        //Go to timer page
        /* setInterval(() => {
            setWorkTime(prevActiveTime => prevActiveTime - 1);
        }, 1000); */
    };

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20, justifyContent: 'space-between' }}>
            <View style={{ gap: 15 }}>
                {workoutSettings.map(({ text, placeholder, onClickLeft, onClickRight }) => (
                    <Input
                        key={text}
                        keyboardType='numeric'
                        text={text}
                        placeholder={placeholder}
                        left={<FAB onPress={onClickLeft} icon={<Remove color={colors.text} size={24} />} style={{ backgroundColor: colors.action, width: 40, height: 40, position: 'relative' }} />}
                        right={<FAB onPress={onClickRight} icon={<Add color={colors.text} size={24} />} style={{ backgroundColor: colors.action, width: 40, height: 40, position: 'relative' }} />}
                    />
                ))}
            </View>
            <Link href='/timer' asChild>
                <Button style={{ backgroundColor: colors.action }} onPress={onStartTimer} text='Start' />
            </Link>
            <FAB onPress={() => {}} icon={<Add color={colors.text} size={28} />} style={{ backgroundColor: colors.action }} />
        </SafeAreaView>
    );
}
