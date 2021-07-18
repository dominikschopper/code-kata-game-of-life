import { Board } from './board/board';
import { GameBoard, GameRules } from './board/game-board';

export const bootsrapGol = (): Board => {
    // initialize your board here!
    return new GameBoard(new GameRules());
};