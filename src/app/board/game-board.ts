import { Board, CellState } from './board';

export class GameBoard implements Board {
    data: CellState[][];
    setDataAsString(data: string): void {
        throw new Error('Method not implemented.');
    }
    next(): void {
        throw new Error('Method not implemented.');
    }
    toString(): string {
        throw new Error('Method not implemented.');
    }
    toggleCell(row: number, col: number): void {
        throw new Error('Method not implemented.');
    }
}


