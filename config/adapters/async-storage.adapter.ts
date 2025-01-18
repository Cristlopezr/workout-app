import { Workout, WorkoutContextState } from '@/interfaces/workout.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageAdapter {
    static async getItem(key: string): Promise<Workout[] | null> {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            throw new Error(`There was an error getting the item`);
        }
    }

    static async saveItem(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            throw new Error(`There was an error saving the item`);
        }
    }

    static async deleteItem(key: string) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            throw new Error(`There was an error removing the item`);
        }
    }
}
