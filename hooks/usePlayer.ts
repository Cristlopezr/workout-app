import { useEffect, useState } from 'react';
import { Audio, AVPlaybackSource } from 'expo-av';

type AudioData = AVPlaybackSource;

export default function usePlayer() {
    const [audio, setAudio] = useState<Audio.Sound>();

    async function playSound(audioData: AudioData) {
        if (!audioData) {
            throw new Error('Invalid audioData');
        }

        if (audio) {
            await audio.unloadAsync();
        }

        const { sound } = await Audio.Sound.createAsync(audioData);
        setAudio(sound);

        console.log('soundPlaying');
        await sound.playAsync();
    }

    useEffect(() => {
        return audio
            ? () => {
                  console.log('Unloading Sound');
                  audio.unloadAsync();
              }
            : undefined;
    }, [audio]);

    return {
        playSound,
    };
}
