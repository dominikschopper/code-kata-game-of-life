export enum CellState {
    LIFE = '#',
    DEAD = '.'
}

export interface Board {
    data: CellState[][];
    setDataAsString(data: string): Board;
    next(): void;
    toString(): string
}

export class GameBoard implements Board {

    data: CellState[][];

    setDataAsString(data: string): Board {
        throw new Error("Method not implemented.");
    }

    next(): void {
        throw new Error("Method not implemented.");
    }

    toString(): string {
        throw new Error("Method not implemented.");
    }

}