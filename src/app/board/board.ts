export enum CellState {
    LIFE = '#',
    DEAD = '.'
}

export interface Board {
    data: CellState[][];
    setDataAsString(data: string): Board;
    next(): void;
    toString(): string;
}

