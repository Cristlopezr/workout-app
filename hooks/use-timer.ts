import { TimerColors, TimerState } from '@/interfaces/workout.interface';
import { AVPlaybackSource } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import usePlayer from './use-player';

const defaultColors: TimerColors = {
    preparation: '#FFA000',
    workout: '#FF5722',
    rest: '#4CAF50',
    finished: '#673AB7',
};

type Sounds = 'countdown' | 'startWorkout' | 'startRest' | 'finished';

interface Props {
    preparationTime: number;
    workoutTime: number;
    restTime: number;
    numberOfCycles: number;
    colors?: TimerColors;
    sounds?: Record<Sounds, AVPlaybackSource>;
}

export default function useTimer({ preparationTime = 0, workoutTime = 0, restTime = 0, numberOfCycles = 1, colors: colorsFromProps = defaultColors, sounds }: Props) {
    const [colors] = useState<TimerColors>(colorsFromProps);

    const { playSound } = usePlayer();
    const [timerState, setTimerState] = useState<TimerState>({
        preparationTime: preparationTime,
        workoutTime: workoutTime,
        restTime: restTime,
        numberOfCycles: numberOfCycles,
        time: undefined,
        activePhase: 'preparation',
        currentCycle: 1,
        activeColor: colorsFromProps['preparation'],
    });

    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timerState.activePhase === 'finished') {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        }
    }, [timerState.activePhase]);

    const changePhase = (prevState: TimerState): TimerState => {
        const isLastCycle = prevState.currentCycle === prevState.numberOfCycles;
        if (prevState.activePhase === 'finished') {
            return {
                ...prevState,
                time: 0,
                activeColor: colors['finished'],
            };
        }

        if (prevState.activePhase === 'preparation') {
            if (sounds) {
                playSound(sounds.startWorkout);
            }
            return {
                ...prevState,
                activePhase: 'workout',
                time: prevState.workoutTime,
                activeColor: colors['workout'],
            };
        }

        if (prevState.activePhase === 'workout') {
            if (sounds) {
                playSound(sounds.startRest);
            }
            return {
                ...prevState,
                activePhase: 'rest',
                time: prevState.restTime,
                activeColor: colors['rest'],
            };
        }

        if (prevState.activePhase === 'rest') {
            if (sounds) {
                if (isLastCycle) {
                    playSound(sounds.finished);
                } else {
                    playSound(sounds.startWorkout);
                }
            }
            return {
                ...prevState,
                activePhase: isLastCycle ? 'finished' : 'workout',
                time: isLastCycle ? 0 : prevState.workoutTime,
                currentCycle: isLastCycle ? prevState.numberOfCycles : prevState.currentCycle + 1,
                activeColor: isLastCycle ? colors['finished'] : colors['workout'],
            };
        }

        return prevState;
    };

    const startTimer = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }

        setTimerState(prevState => ({
            ...prevState,
            activePhase: 'preparation',
            time: prevState.preparationTime,
            currentCycle: 1,
            activeColor: colors['preparation'],
        }));

        intervalIdRef.current = setInterval(() => {
            setTimerState(prevState => {
                if (prevState.time && prevState.time <= 4 && prevState.time >= 2) {
                    if (sounds) {
                        playSound(sounds.countdown);
                    }
                }
                if (prevState.time === 1) {
                    return changePhase(prevState);
                }

                return {
                    ...prevState,
                    time: prevState.time! - 1,
                };
            });
        }, 1000);
    };

    return {
        ...timerState,
        startTimer,
    };
}
