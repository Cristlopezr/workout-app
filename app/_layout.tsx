import { ThemeContextProvider, useThemeContext } from '@/context/theme-context';
import { WorkoutContextProvider } from '@/context/workout-context';
import { Stack } from 'expo-router';
import HeaderRight from '@/components/router/index-screen/header-right';

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
                headerShadowVisible: false,
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
                    headerRight: () => <HeaderRight />,
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
            <Stack.Screen
                name='edit-workout/[id]'
                options={{
                    title: 'Edit workout',
                }}
            />
        </Stack>
    );
}
