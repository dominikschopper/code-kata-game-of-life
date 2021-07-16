import { Board, CellState } from './board';

interface CellPosition {
    col: number;
    row: number;
}

export class GameBoard implements Board {
    data: CellState[][];

    constructor(private readonly rules: GameRules) {
        //
    }

    setDataAsString(data: string): Board {

        this.data = data.split('\n').map(
            row => {
                return row.split('')
                    .map((cState) => {
                        if (cState === CellState.DEAD || cState === CellState.LIFE) {
                            return cState;
                        }
                    });
            }
        );

        return this;
    }

    next(): void {
        // copy state
        const copyOfState = JSON.parse(JSON.stringify(this.data));
        this.rules.setGameState(copyOfState);
        this.data.forEach((row, r) => {
            row.forEach((col, c) => {
                const pos = { row: r, col: c };
                this.data[pos.row][pos.col] = this.rules.apply(pos);
            });
        });
    }

    toString(): string {
        const result = [];
        this.data.forEach(row => {
            result.push( row.join('') );
        });
        return result.join('\n');
    }

}

export class GameRules {
    private data: CellState[][];

    setGameState(data: CellState[][]) {
        this.data = data;
    }

    apply(pos: CellPosition): CellState {

        const neighbours = this.neighboursOf(pos);

        if (this.hasThreeAlifeNeighbours(neighbours)) {
            return CellState.LIFE;
        }

        if (this.isAlive(pos) && (this.hasTwoAlifeNeighbours(neighbours) || this.hasThreeAlifeNeighbours(neighbours))) {
            return CellState.LIFE;
        }

        return CellState.DEAD;
    }

    private neighboursOf(pos: CellPosition): CellPosition[] {

        const neighbourPos = [
            { row: -1, col: -1 },
            { row: -1, col: 0 },
            { row: -1, col: 1 },
            { row: 0, col: -1 },
            { row: 0, col: 1 },
            { row: 1, col: -1 },
            { row: 1, col: 0 },
            { row: 1, col: 1 },
        ];

        return neighbourPos.map(relPos => this.addPositions(pos, relPos))
            .filter(p => this.isValidPos(p));
    }



    private addPositions(pos1, pos2): CellPosition {
        return {
            col: pos1.col + pos2.col,
            row: pos1.row + pos2.row
        };
    }

    private isValidPos(pos: CellPosition): boolean {
        return pos.row >= 0 && pos.row < this.data.length
            &&
            pos.col >= 0 && pos.col < this.data[0].length;
    }

    private isAlive(pos: CellPosition): boolean {
        return this.data[pos.row][pos.col] === CellState.LIFE;
    }

    private getState(pos: CellPosition): CellState {
        return this.data[pos.row][pos.col];
    }

    private hasTwoAlifeNeighbours(neighbours: CellPosition[]): boolean {
        return this.getAmountOfLifeNeighbours(neighbours) === 2;
    }

    private hasThreeAlifeNeighbours(neighbours: CellPosition[]): boolean {
        return this.getAmountOfLifeNeighbours(neighbours) === 3;
    }

    private getAmountOfLifeNeighbours(neighbours: CellPosition[]): number {
        return neighbours.filter(pos => this.data[pos.row][pos.col] === CellState.LIFE).length;
    }
}


