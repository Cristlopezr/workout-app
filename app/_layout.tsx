import { ThemeContextProvider, useThemeContext } from '@/context/theme-context';
import { WorkoutContextProvider } from '@/context/workout-context';
import { Link, Stack } from 'expo-router';
import { Workout } from '@/lib/icons';

export default function RootLayout() {
    return (
        <ThemeContextProvider>
            <WorkoutContextProvider>
                <StackRouter />
            </WorkoutContextProvider>
        </ThemeContextProvider>
    );
}

function StackRouter() {
    const { colors } = useThemeContext();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                },
                contentStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.text,
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen
                name='index'
                options={{
                    title: '',
                    headerRight: () => (
                        <Link href='/my-routines'>
                            <Workout color={colors.action} size={35} />
                        </Link>
                    ),
                }}
            />
            <Stack.Screen
                name='my-routines'
                options={{
                    title: 'My workouts',
                }}
            />
            <Stack.Screen name='timer' options={{ headerShown: false }} />
            <Stack.Screen
                name='new-workout'
                options={{
                    title: 'New workout',
                }}
            />
        </Stack>
    );
}
