import { BoardRenderer } from './board-renderer/board-renderer';
import { stepCounter } from './step-counter';
import { bootsrapGol } from './bootstrap-gol';

export const initNextButton = (renderer: BoardRenderer): void => {

    const nextButtonElement = document.getElementById('next-button');
    nextButtonElement.addEventListener('click', () => {
        console.log('clicked next');
        stepCounter.add();
        renderer.next();
    });

};

let intervalId;
let clickCount = 0;
const stopPlaying = () => {
    clearInterval(intervalId);
};

const playButtonElement = document.getElementById('play-button');

const getOtherPlayButtonText = (clickCount) => {
    const playButtonTexts = ['play', 'stop'];
    return playButtonTexts[clickCount % 2];
};

const resetPlayButtonText = () => {
    clickCount = 0;
    playButtonElement.innerText = getOtherPlayButtonText(clickCount);
}

export const initPlayButton = (renderer: BoardRenderer): void => {
    const intervalInMsField = document.getElementById('ms-interval-field') as HTMLInputElement;

    resetPlayButtonText();

    playButtonElement.addEventListener('click', () => {
        console.log('clicked play');
        clickCount += 1;
        decideWhatToPlay(clickCount);
    });


    const decideWhatToPlay = (clickCount) => {
        if (clickCount % 2 === 1) {
            console.log('start playing');
            intervalId = setInterval(() => {
                stepCounter.add()
                renderer.next();
            }, parseInt(intervalInMsField.value, 10));
        } else {
            console.log('stop playing');
            stopPlaying();
        }
        playButtonElement.innerText = getOtherPlayButtonText(clickCount);
    };

};

export enum InitialStateTypes {
    EASY = 'easy',
    MEDIUM = 'medium',
    XTREME = 'xtreme',
}

export const initResetButtons = (renderer: BoardRenderer, initialStates: {}): void => {
    const buttons: HTMLLabelElement[] = Array.from(document.querySelectorAll('.board-data-select-button'));

    buttons.forEach((label: HTMLLabelElement) => {
        label.addEventListener('click', (ev) => {
            const data = initialStates[label.dataset['stateType']];
            stopPlaying();
            clickCount = 0;
            resetPlayButtonText();
            stepCounter.reset();
            const newBoard = bootsrapGol();
            newBoard.setDataAsString(data);
            renderer.board = newBoard;
            renderer.render();
        });
    });
};

export const initCounter = () => {
    const counter: HTMLInputElement = document.getElementById('step-counter') as HTMLInputElement;

    const updateCounter = (value) => {
        counter.value = value;
    };

    stepCounter.subscribe(updateCounter);
};

