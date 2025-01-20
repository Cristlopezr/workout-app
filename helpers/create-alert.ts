import { Alert, AlertButton } from 'react-native';

interface Props {
    title?: string;
    message?: string;
    buttons?: AlertButton[];
}

export const createAlert = ({ title = 'Alert', message, buttons }: Props) => Alert.alert(title, message, buttons);
