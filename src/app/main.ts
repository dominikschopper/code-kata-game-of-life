import { BoardRenderer } from "./board-renderer/board-renderer";
import { bootsrapGol } from './bootstrap-gol';
import { InitialStateTypes, initNextButton, initPlayButton, initResetButtons, initCounter } from './init-render-helpers/init-click-handlers';

import { getEasyBoardData } from './init-render-helpers/initial-board-data/easy';
import { getIntermediateBoardData } from './init-render-helpers/initial-board-data/intermediate';
import { getXtremeBoardData } from './init-render-helpers/initial-board-data/xtreme';

console.log('!!!Start GOL');

const mountPoint = document.getElementById('mount-game');
const renderer = new BoardRenderer(mountPoint);

initNextButton(renderer);
initPlayButton(renderer);

const initialStates = {
    [InitialStateTypes.EASY]: getEasyBoardData(),
    [InitialStateTypes.MEDIUM]: getIntermediateBoardData(),
    [InitialStateTypes.XTREME]: getXtremeBoardData()
};
initResetButtons(renderer, initialStates);

initCounter();

const board = bootsrapGol();

const boardDataAsString = getEasyBoardData();



board.setDataAsString(boardDataAsString);

renderer.board = board;
renderer.render();
