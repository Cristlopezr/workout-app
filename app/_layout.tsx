import { ThemeContextProvider, useThemeContext } from '@/context/theme-context';
import { WorkoutContextProvider } from '@/context/workout-context';
import { Stack } from 'expo-router';

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
                headerShown: false,
                contentStyle: {
                    backgroundColor: colors.background,
                },
            }}
        >
            <Stack.Screen name='index' />
            <Stack.Screen name='my-routines' />
            <Stack.Screen name='timer' />
        </Stack>
    );
}
