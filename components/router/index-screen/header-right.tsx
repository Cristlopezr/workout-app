import { AsyncStorageAdapter } from '@/config/adapters/async-storage.adapter';
import { useThemeContext } from '@/context/theme-context';
import { Moon, Sunny, Workout } from '@/lib/icons';
import { Link } from 'expo-router';
import { Appearance, Pressable, View } from 'react-native';

export default function HeaderRight() {
    const { colors, dark } = useThemeContext();

    const onChangeTheme = async () => {
        const theme = dark ? 'light' : 'dark';
        try {
            Appearance.setColorScheme(theme);
            await AsyncStorageAdapter.setItem('theme', theme);
        } catch (error) {
            //TODO: Show error
            console.log(error);
        }
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Link href='/my-routines'>
                <Workout color={colors.action} size={35} />
            </Link>
            {dark ? (
                <Pressable onPress={onChangeTheme}>
                    <Sunny color={colors.action} size={30} />
                </Pressable>
            ) : (
                <Pressable onPress={onChangeTheme}>
                    <Moon color={colors.action} size={30} />
                </Pressable>
            )}
        </View>
    );
}
