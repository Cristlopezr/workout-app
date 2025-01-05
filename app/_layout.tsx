import { ThemeContextProvider } from '@/context/theme-context';
import { WorkoutContextProvider } from '@/context/workout-context';
import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <ThemeContextProvider>
            <WorkoutContextProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name='index' />
                    <Stack.Screen name='my-routines' />
                    <Stack.Screen name='timer' />
                </Stack>
            </WorkoutContextProvider>
        </ThemeContextProvider>
    );
}
