import { Board, CellState } from '../board/board';

export class BoardRenderer {
    boardRenderCompositeRoot: ElementRenderer;

    private gameBoard: Board;
    private  stepCounter = 0;

    set board(board: Board) {
        this.gameBoard = board;
        this.boardRenderCompositeRoot && this.boardRenderCompositeRoot.element.remove();
        this.init();
        this.stepCounter = 0;
    }

    get board(): Board {
        return this.gameBoard;
    }

    constructor(private readonly mountPoint: HTMLElement) {
        console.log('starting board render');
    }

    next() {
        this.gameBoard.next();
        this.stepCounter += 1;
        this.render();
    }

    init() {
        console.log('init board render', this.board.data);
        this.boardRenderCompositeRoot = new TableRenderer();
        this.board.data.forEach(rowData => {
            const rowRenderer = new RowRenderer();
            this.boardRenderCompositeRoot.addChild(rowRenderer);

            rowData.forEach(cellState => {
                const cellRenderer = new CellRenderer();
                cellRenderer.state = cellState;
                rowRenderer.addChild(cellRenderer);
            });
        });
        this.mountPoint.appendChild(this.boardRenderCompositeRoot.element);
    }

    render() {
        console.log('board render.render');
        this.boardRenderCompositeRoot.render();
    }
}

class ElementRenderer {

    tagName: string;
    element: HTMLElement;
    children: ElementRenderer[] = [];
    htmlClasses: string[] = [];
    changed = true;

    constructor() {
        this.init();
    }

    init () {
        this.element = document.createElement(this.tagName);
        this.htmlClasses.forEach(c => this.element.classList.add(c));
    }

    addChild(child: ElementRenderer) {
        this.children.push(child)
        this.element.appendChild(child.element);
    }

    render() {
        if (!this.element) {
            this.init();
        }
        if (this.changed) {
            this.update();
            this.changed = false;
        }
        this.children.forEach(child => child.render());
        return this.element;
    }

    update() { }
}

export class TableRenderer extends ElementRenderer {
    tagName = 'table';
    htmlClasses = [ 'gol-table' ];

    constructor() {
        super();
        this.init();
    }
}

export class RowRenderer extends ElementRenderer{
    tagName = 'tr';
    constructor() {
        super();
        this.init();
    }

}

export class CellRenderer extends ElementRenderer {
    tagName = 'td';
    htmlClasses = [ 'gol-cell' ];

    private actualState: CellState = CellState.DEAD;

    private classNames = [ 'gol-cell-dead', 'gol-cell-life' ];
    private stateToClassIdx = {
        [CellState.DEAD]: 0,
        [CellState.LIFE]: 1
    };

    constructor() {
        super();
        this.init();
        console.log('CellRenderer:%o', this.element);
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
        return this.classNames[ this.stateToClassIdx[state] ];
    }

    set state(state: CellState) {
        if (state !== this.actualState) {
            this.changed = true;
            this.actualState = state;
        }
    }

    update() {
        const cName = this.getClassNameFor(this.actualState);
        this.setStateClass(cName);
    }

}