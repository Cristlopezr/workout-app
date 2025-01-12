import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { forwardRef } from 'react';

interface Props {
    style?: StyleProp<ViewStyle>;
    icon: React.ReactNode;
    onPress?: () => void;
}

const FAB = forwardRef<View, Props>(({ style, icon, onPress }: Props, ref) => {
    return (
        <TouchableOpacity ref={ref} onPress={() => onPress && onPress()} style={[styles.fab, style]}>
            {icon}
        </TouchableOpacity>
    );
});

export default FAB;

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
