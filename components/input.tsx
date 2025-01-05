import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';

interface Props {
    placeholder?: string;
    text: string;
    direction?: 'row' | 'column';
    keyboardType?: KeyboardTypeOptions;
    right?: string | React.ReactNode;
    left?: string | React.ReactNode;
}

export default function Input({ placeholder, text, direction = 'column', keyboardType, right, left }: Props) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 15 }}>
            <Text>{left}</Text>
            <View style={{ flex: 1, flexDirection: direction, gap: 5 }}>
                <Text style={{ textAlign: 'center' }}>{text}</Text>
                <TextInput keyboardType={keyboardType} style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, textAlign: 'right', paddingHorizontal: 10 }} placeholder={placeholder} />
            </View>
            <Text>{right}</Text>
        </View>
    );
}
