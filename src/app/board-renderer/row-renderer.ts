import { CellState } from '../board/board';
import { ElementRenderer } from './element-renderer';


export class RowRenderer extends ElementRenderer {
    tagName = 'tr';
    constructor(private readonly parent: ElementRenderer) {
        super();
        this.init();
    }

    update(state: CellState[]) {
        this.children.forEach((child, i) => child.update(state[i]))
    }

}
