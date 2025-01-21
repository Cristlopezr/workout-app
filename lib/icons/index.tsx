import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { OpaqueColorValue } from 'react-native';

interface Props {
    size?: number;
    color?: string | OpaqueColorValue;
}

export const Add = ({ size = 24, color = 'black' }: Props) => <Ionicons name='add' size={size} color={color} />;
export const Remove = ({ size = 24, color = 'black' }: Props) => <Ionicons name='remove' size={size} color={color} />;
export const Workout = ({ size = 24, color = 'black' }: Props) => <MaterialIcons name='directions-run' size={size} color={color} />;
export const Moon = ({ size = 24, color = 'black' }: Props) => <Ionicons name='moon-outline' size={size} color={color} />;
export const Sunny = ({ size = 24, color = 'black' }: Props) => <Ionicons name='sunny-outline' size={size} color={color} />;
export const Delete = ({ size = 24, color = 'black' }: Props) => <FontAwesome5 name='trash' size={size} color={color} />;
