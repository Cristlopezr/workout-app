import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
    style?: StyleProp<ViewStyle>;
    icon: React.ReactNode;
    onPress: () => void;
}

export default function FAB({ style, icon, onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.fab, style]}>
            {icon}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        backgroundColor: 'blue',
        width: 60,
        height: 60,
        borderRadius: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
