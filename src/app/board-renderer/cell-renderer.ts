import { CellState } from '../board/board';
import { ElementRenderer } from './element-renderer';


export class CellRenderer extends ElementRenderer {
    tagName = 'td';
    htmlClasses = ['gol-cell'];

    private actualState: CellState = CellState.DEAD;

    private classNames = ['gol-cell-dead', 'gol-cell-life'];
    private stateToClassIdx = {
        [CellState.DEAD]: 0,
        [CellState.LIFE]: 1
    };

    constructor(private readonly parent: ElementRenderer) {
        super();
        this.init();
    }

    private setStateClass(className: string) {
        this.classNames.map(c => {
            if (c === className) {
                this.element.classList.add(c);
            } else {
                this.element.classList.remove(c);
            }
        });
    }

    getClassNameFor(state: CellState): string {
        return this.classNames[this.stateToClassIdx[state]];
    }

    set state(state: CellState) {
        if (state !== this.actualState) {
            this.changed = true;
            this.actualState = state;
        }
    }

    update(state: CellState) {
        this.state = state ?? this.state;
        const cName = this.getClassNameFor(this.actualState);
        this.setStateClass(cName);
    }

}
