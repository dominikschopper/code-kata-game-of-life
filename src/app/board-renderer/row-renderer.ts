import { CellState } from '../board/board';
import { ElementRenderer } from './element-renderer';


export class RowRenderer extends ElementRenderer {
    tagName = 'tr';
    constructor(private readonly parent: ElementRenderer, rowId: number) {
        super();
        this.init();
        this.element.dataset['rowId'] = String(rowId);
    }

    update(state: CellState[]) {
        this.children.forEach((child, i) => child.update(state[i]))
    }

}
