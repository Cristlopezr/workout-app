import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { forwardRef } from 'react';

interface Props {
    onPress?: () => void;
    text?: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
    icon?: React.ReactNode;
}

const Button = forwardRef<View, Props>(({ onPress, text, style, textStyle, disabled, icon }: Props, ref) => {
    return (
        <Pressable
            ref={ref}
            disabled={disabled}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, disabled && styles.buttonDisabled, style]}
            onPress={() => onPress && onPress()}
        >
            {icon ? icon : <Text style={[styles.text, disabled && styles.textDisabled, textStyle]}>{text}</Text>}
        </Pressable>
    );
});

export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    buttonPressed: {
        backgroundColor: '#FF867C',
    },
    buttonDisabled: {
        backgroundColor: '#B0BEC5',
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    textDisabled: {
        color: '#ECEFF1',
    },
});
