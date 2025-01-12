import { Control, FieldValues, RegisterOptions, useController } from 'react-hook-form';
import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native';

interface Props {
    name: string;
    label: string;
    direction?: 'row' | 'column';
    right?: string | React.ReactNode;
    left?: string | React.ReactNode;
    textStyle?: StyleProp<TextStyle>;
    control: Control<any, any>;
    placeholder?: string;
    keyboardType: KeyboardTypeOptions;
    style: StyleProp<TextStyle>;
    rules?: Omit<RegisterOptions<any, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined;
    defaultValue?: number | string;
}

export default function Input({ placeholder, name, control, defaultValue, label, rules, direction = 'column', keyboardType, right, left, style, textStyle }: Props) {
    const { field } = useController({
        name,
        control,
        defaultValue,
        rules,
    });

    const { onBlur, onChange, value } = field;

    return (
        <View style={styles.componentContainer}>
            <Text>{left}</Text>
            <View style={{ ...styles.inputContainer, flexDirection: direction }}>
                <Text style={[styles.inputText, textStyle]}>{label}</Text>
                <TextInput onBlur={onBlur} value={value} onChangeText={onChange} keyboardType={keyboardType} style={[styles.textInput, style]} placeholder={placeholder} />
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
