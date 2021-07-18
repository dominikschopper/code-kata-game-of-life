export enum CellState {
    LIFE = '#',
    DEAD = '.'
}

export interface Board {
    data: CellState[][];
    setDataAsString(data: string): void;
    next(): void;
    toString(): string;
    /**
     * toggles the state of the cell from LIFE to DEAD and vice versa
     * @param row 0-based row number
     * @param col 0-based column number
     */
    toggleCell(row: number, col: number): void;
}

