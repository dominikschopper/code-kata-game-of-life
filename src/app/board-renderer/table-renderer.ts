import { CellState } from '../board/board';
import { ElementRenderer } from './element-renderer';


export class TableRenderer extends ElementRenderer {
    tagName = 'table';
    htmlClasses = ['gol-table'];

    constructor() {
        super();
        this.init();
    }

    update(board: CellState[][]) {
        this.children.forEach((child, i) => {
            child.update(board[i]);
        });
    }
}
