import { Board } from '../board/board';
import { CellRenderer } from './cell-renderer';
import { ElementRenderer } from './element-renderer';
import { RowRenderer } from './row-renderer';
import { TableRenderer } from './table-renderer';

export class BoardRenderer {
    boardRenderCompositeRoot: ElementRenderer;

    private gameBoard: Board;
    private  stepCounter = 0;

    set board(board: Board) {
        this.gameBoard = board;
        if (!!this.boardRenderCompositeRoot) {
            this.boardRenderCompositeRoot.element.remove();
        }
        this.init();
        this.stepCounter = 0;
        this.boardRenderCompositeRoot.update(this.gameBoard.data);
    }

    get board(): Board {
        return this.gameBoard;
    }

    constructor(private readonly mountPoint: HTMLElement) {
        console.log('instantiating BoardRenderer');
    }

    next() {
        this.gameBoard.next();
        this.stepCounter += 1;
        this.boardRenderCompositeRoot.update(this.gameBoard.data);
        this.render();
    }

    init() {
        this.boardRenderCompositeRoot = new TableRenderer();
        this.board.data.forEach(rowData => {
            const rowRenderer = new RowRenderer(this.boardRenderCompositeRoot);
            this.boardRenderCompositeRoot.addChild(rowRenderer);

            rowData.forEach(cellState => {
                const cellRenderer = new CellRenderer(rowRenderer);
                rowRenderer.addChild(cellRenderer);
            });
        });
        this.mountPoint.appendChild(this.boardRenderCompositeRoot.element);
    }

    render() {
        this.boardRenderCompositeRoot.render();
    }
}

