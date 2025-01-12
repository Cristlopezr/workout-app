import { darkTheme, lightTheme } from '@/config/theme/themeColors';
import { createContext, PropsWithChildren, useContext } from 'react';
import { useColorScheme } from 'react-native';

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
    };
}

const ThemeContext = createContext<ThemeContext | null>(null);

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
    const theme = useColorScheme() === 'light' ? lightTheme : darkTheme;

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeContextProvider');
    }

    return context;
};
