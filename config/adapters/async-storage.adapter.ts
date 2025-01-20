import { Workout, WorkoutContextState } from '@/interfaces/workout.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageAdapter {
    static async getItem<T>(key: string): Promise<T | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            if (!value) return null;
            try {
                return JSON.parse(value);
            } catch (error) {
                return value as T;
            }
        } catch (error) {
            throw new Error(`There was an error getting the item: ${error}`);
        }
    }

    static async setItem(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            throw new Error(`There was an error saving the item ${error}`);
        }
    }

    static async removeItem(key: string) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            throw new Error(`There was an error removing the item  ${error}`);
        }
    }
}
