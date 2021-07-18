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
        this.update();
        this.render();
    }

    init() {
        this.boardRenderCompositeRoot = new TableRenderer();
        this.board.data.forEach((rowData, rowId) => {
            const rowRenderer = new RowRenderer(this.boardRenderCompositeRoot, rowId);
            this.boardRenderCompositeRoot.addChild(rowRenderer);

            rowData.forEach((cellState, colId) => {
                const cellRenderer = new CellRenderer(rowRenderer, rowId, colId);
                rowRenderer.addChild(cellRenderer);
            });
        });

        this.mountPoint.appendChild(this.boardRenderCompositeRoot.element);
        this.addToggleClick();
    }

    render() {
        this.boardRenderCompositeRoot.render();
    }

    update() {
        this.boardRenderCompositeRoot.update(this.board.data);
    }

    private addToggleClick() {
        this.boardRenderCompositeRoot.element.addEventListener('click', (ev) => {
            const clickedTile = ev.target as HTMLElement;
            const rowId = clickedTile.dataset['rowId'];
            const colId = clickedTile.dataset['colId'];
            console.log('who was clicked:%o / ', clickedTile);
            this.board.toggleCell(parseInt(rowId, 10), parseInt(colId, 10));
            this.update();
            this.render();
        });
    }


}

