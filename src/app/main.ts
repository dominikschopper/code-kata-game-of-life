import { BoardRenderer } from "./board-renderer/board-renderer";
import { Board, CellState } from './board/board';
console.log('###start');

const mountPoint = document.getElementById('mount-game');
const renderer = new BoardRenderer(mountPoint)

class TestGame implements Board {

    data: CellState[][] = [
        [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD ],
        [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD ],
        [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD ],
        [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD ]
    ];

    private nexts: CellState[][][] = [
        [
            [CellState.LIFE, CellState.DEAD, CellState.DEAD, CellState.DEAD],
            [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD],
            [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD],
            [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD]
        ],
        [
            [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD],
            [CellState.DEAD, CellState.LIFE, CellState.DEAD, CellState.DEAD],
            [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD],
            [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD]
        ],
        [
            [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD],
            [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD],
            [CellState.DEAD, CellState.DEAD, CellState.LIFE, CellState.DEAD],
            [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD]
        ]
    ]

    setDataAsString(data: string): Board {
        throw new Error("Method not implemented.");
    }

    next(): void {
        this.data = this.nexts.shift();
    }

    toString(): string {
        throw new Error("Method not implemented.");
    }
}

renderer.board = new TestGame();
renderer.render();

const nextButtonElement = document.getElementById('next-button');
nextButtonElement.addEventListener('click', () => {
    console.log('clicked next');
    renderer.next();
});

