import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { OpaqueColorValue } from 'react-native';

interface Props {
    size?: number;
    color?: string | OpaqueColorValue;
}

export const Add = ({ size = 24, color = 'black' }: Props) => <Ionicons name='add' size={size} color={color} />;
export const Remove = ({ size = 24, color = 'black' }: Props) => <Ionicons name='remove' size={size} color={color} />;
export const Workout = ({ size = 24, color = 'black' }: Props) => <MaterialIcons name='directions-run' size={size} color={color} />;
