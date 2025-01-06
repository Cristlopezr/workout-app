import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native';

interface Props {
    placeholder?: string;
    text: string;
    direction?: 'row' | 'column';
    keyboardType?: KeyboardTypeOptions;
    right?: string | React.ReactNode;
    left?: string | React.ReactNode;
    onChangeText: (value: string) => void;
    style?: StyleProp<TextStyle>;
    textStyle?: StyleProp<TextStyle>;
    value: string;
}

export default function Input({ placeholder, text, direction = 'column', keyboardType, right, left, onChangeText, style, textStyle, value }: Props) {
    return (
        <View style={styles.componentContainer}>
            <Text>{left}</Text>
            <View style={{ ...styles.inputContainer, flexDirection: direction }}>
                <Text style={[styles.inputText, textStyle]}>{text}</Text>
                <TextInput value={value} onChangeText={onChangeText} keyboardType={keyboardType} style={[styles.textInput, style]} placeholder={placeholder} />
            </View>
            <Text>{right}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    componentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 15,
    },
    inputContainer: {
        flex: 1,
        gap: 5,
    },
    inputText: {
        textAlign: 'center',
        fontSize: 20,
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'right',
        paddingHorizontal: 10,
    },
});
