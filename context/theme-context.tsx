import { AsyncStorageAdapter } from '@/config/adapters/async-storage.adapter';
import { darkTheme, lightTheme } from '@/config/theme/themeColors';
import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';

interface ThemeContext {
    dark: boolean;
    colors: {
        primary: string;
        background: string;
        card: string;
        text: string;
        lightText: string;
        border: string;
        notification: string;
        action: string;
        error: string;
        success: string;
        highlight:string;
    };
}

const ThemeContext = createContext<ThemeContext | null>(null);

const getThemeFromStorage = async () => {
    try {
        const theme = await AsyncStorageAdapter.getItem<'dark' | 'light'>('theme');
        if (theme) Appearance.setColorScheme(theme);
    } catch (error) {
        console.log(error);
    }
};

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
    const theme = useColorScheme() === 'light' ? lightTheme : darkTheme;

    useEffect(() => {
        getThemeFromStorage();
    }, []);

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeContextProvider');
    }

    return context;
};
