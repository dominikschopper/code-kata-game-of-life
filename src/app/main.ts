import { BoardRenderer } from "./board-renderer/board-renderer";
import { GameBoard, GameRules } from './board/game-board';

console.log('!!!Start GOL');

const mountPoint = document.getElementById('mount-game');

const renderer = new BoardRenderer(mountPoint);
const board = new GameBoard(new GameRules());

board.setDataAsString(
    '....................................\n' +
    '.....##........................#....\n' +
    '....................................\n' +
    '....................................\n' +
    '....................................\n' +
    '.........................##.........\n' +
    '..............##.........##.........\n' +
    '..............#.#...................\n' +
    '..............#.....................\n' +
    '....................................\n' +
    '....................................\n' +
    '........................###.........\n' +
    '....................................\n' +
    '....................................\n' +
    '........##..........................\n' +
    '....................................\n' +
    '........................##..#.##....\n' +
    '.......................#..#..##.....\n' +
    '.........##.............#.#.........\n' +
    '.........#...............#..........\n' +
    '...............................#....\n' +
    '.............................###....\n' +
    '....#.......................#.......\n' +
    '....#........................#......\n' +
    '....#.........................##....'
);


renderer.board = board;
renderer.render();

const nextButtonElement = document.getElementById('next-button');
nextButtonElement.addEventListener('click', () => {
    console.log('clicked next');
    renderer.next();
});

const intervalInMsField = document.getElementById('ms-interval-field') as HTMLInputElement;

const playButtonElement = document.getElementById('play-button');
let clickCount = 0;
playButtonElement.addEventListener('click', () => {
    console.log('clicked play');
    clickCount += 1;
    decideWhatToPlay(clickCount);
});

let intervalId;
const decideWhatToPlay = (clickCount) => {
    playButtonElement.innerText = getOtherPlayButtonText(clickCount);
    if (clickCount % 2 === 1) {
        console.log('start');
        intervalId = setInterval(() => {
            renderer.next();
        }, parseInt(intervalInMsField.value, 10));
        return;
    }
    console.log('stop');
    clearInterval(intervalId);
};


const getOtherPlayButtonText = (clickCount) => {
    const playButtonTexts = [ 'play', 'stop' ];
    return playButtonTexts[clickCount % 2];
};

