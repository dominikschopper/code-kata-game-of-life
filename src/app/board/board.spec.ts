import { Board, CellState } from './board';
import { GameBoard, GameRules } from './game-board';

describe('the Board interface', () => {
    let board: Board;
    const rules = new GameRules();

    beforeEach(() => {
        board = new GameBoard(rules);
    });

    describe('the setDataAsString() method', () => {
        it('should set the data to DEAD if "." is given', () => {
            const simplyDead = '...\n...\n...';

            board.setDataAsString(simplyDead)
            simplyDead.split('\n').forEach(row => {
                row.split('').forEach(cell => {
                    expect(cell).toBe(CellState.DEAD)
                })
            })
        });

        it('should set the data to LIVE if "#" is given', () => {
            const simplyAlive = '###\n###\n###';

            board.setDataAsString(simplyAlive)
            simplyAlive.split('\n').forEach(row => {
                row.split('').forEach(cell => {
                    expect(cell).toBe(CellState.LIFE)
                })
            })
        });

        it('should set the data to DEAD, LIVE, DEAD if ".#." is given', () => {
            const mixedData = '.#.';

            board.setDataAsString(mixedData)
            expect(board.data[0][0]).toBe(CellState.DEAD);
            expect(board.data[0][1]).toBe(CellState.LIFE);
            expect(board.data[0][2]).toBe(CellState.DEAD);
        });
    });

    describe('the toString() method', () => {
        it('should return "..." for three DEAD cells', () => {
            board.data = [ [ CellState.DEAD, CellState.DEAD, CellState.DEAD ] ];
            expect(board.toString()).toBe('...');
        });

        it('should return "###" for three LIFE cells', () => {
            board.data = [[CellState.LIFE, CellState.LIFE, CellState.LIFE]];
            expect(board.toString()).toBe('###');
        });

        it('should return ".#." for DEAD, LIFE, DEAD cells', () => {
            board.data = [[CellState.DEAD, CellState.LIFE, CellState.DEAD]];
            expect(board.toString()).toBe('.#.');
        });

        it('should return ".#.\\n.#.\\n.#." for DEAD, LIFE, DEAD cells', () => {
            board.data = [
                [CellState.DEAD, CellState.LIFE, CellState.DEAD],
                [CellState.DEAD, CellState.LIFE, CellState.DEAD],
                [CellState.DEAD, CellState.LIFE, CellState.DEAD]
            ];
            expect(board.toString()).toBe('.#.\n.#.\n.#.');
        });
    });

    describe('the toggleCell() method', () => {
        it('should set a LIFE cell to be DEAD and not touch the other cells', () => {
            board.data = [
                //  col 0           col 1           col 2
                [CellState.DEAD, CellState.DEAD, CellState.DEAD],   // row: 0
                [CellState.DEAD, CellState.DEAD, CellState.DEAD],   // row: 1
                [CellState.DEAD, CellState.DEAD, CellState.DEAD]    // row: 2
            ];

            board.toggleCell(1, 1);

            expect(board.data[1][1]).toBe(CellState.LIFE);
            getAllStatesButThis(1, 1, board.data).forEach(state => {
                expect(state).toBe(CellState.DEAD)
            })

        });

        it('should set a DEAD cell to be LIFE and not touch the other cells', () => {
            board.data = [
                //  col 0           col 1           col 2
                [CellState.LIFE, CellState.LIFE, CellState.LIFE],   // row: 0
                [CellState.LIFE, CellState.LIFE, CellState.LIFE],   // row: 1
                [CellState.LIFE, CellState.LIFE, CellState.LIFE]    // row: 2
            ];

            board.toggleCell(1, 1);

            expect(board.data[1][1]).toBe(CellState.DEAD);
            getAllStatesButThis(1, 1, board.data).forEach(state => {
                expect(state).toBe(CellState.LIFE)
            })
        });

        const getAllStatesButThis = (row: number, col: number, data: CellState[][]): CellState[] => {
            return data.map((singleRow, r) => singleRow.filter((cell, c) => r!==row && c!==col)).flat();
        };
    });

    describe('the next() method', () => {

        /**
         *   01234      01234
         * 0 .....      .....
         * 1 .#...  =>  .....
         * 2 .....      .....
         * 3 .....      .....
         * 4 .....      .....
         */
        it('a single living cell will be dead after one call', () => {
            board.setDataAsString(
                '......\n' +
                '..#...\n' +
                '......\n' +
                '......\n' +
                '......' // '......\n' // use this, if the test fails
            );
            board.next();
            expect(board.toString()).toBe(
                '......\n' +
                '......\n' +
                '......\n' +
                '......\n' +
                '......' // '......\n' // use this, if the test fails
            );
        });

        /**
         *   01234      01234
         * 0 .....      .....
         * 1 .##..  =>  .....
         * 2 .....      .....
         * 3 .....      .....
         * 4 .....      .....
         */
        it('two adjacent living cells will be dead after one call', () => {
            board.setDataAsString(
                '......\n' +
                '..#...\n' +
                '..#...\n' +
                '......\n' +
                '......' // '......\n' // use this, if the test fails
            );
            board.next();
            expect(board.toString()).toBe(
                '......\n' +
                '......\n' +
                '......\n' +
                '......\n' +
                '......' // '......\n' // use this, if the test fails
            );
        });

        /**
         *   01234      01234      01234
         * 0 ....      ....      ....
         * 1 .##.  =>  .##.  =>  .##.
         * 2 .##.      .##.      .##.
         * 3 ....      ....      ....
         */
        it('should not change a square of live cells', () => {
            board.setDataAsString(
                '....\n' +
                '.##.\n' +
                '.##.\n' +
                '....' // '....\n' // use this if the test fails
            );

            for (let i = 0; i < 5; i += 1) {
                board.next();
                expect(board.toString()).toBe(
                    '....\n' +
                    '.##.\n' +
                    '.##.\n' +
                    '....' // '....\n' // use this if the test fails
                );
            }
        });


        /**
         *   01234      01234      01234
         * 0 .....      .....      .....
         * 1 .##..  =>  .##..  =>  .##..
         * 2 ..#..      ..#..      ..#..
         * 3 .....      .....      .....
         * 4 .....      .....      .....
         */
        it('living cells will stay alive in a static pattern', () => {
            board.setDataAsString(
                '....\n'+
                '.##.\n'+
                '..#.\n'+
                '....' // '....\n' // use this if the test fails
            );

            for (let i = 0; i < 5; i += 1) {
                board.next();
                expect(board.toString()).toBe(
                    '....\n' +
                    '.##.\n' +
                    '.##.\n' +
                    '....' // '....\n' // use this if test fails
                );
            }
        });

        /**
         *   01234      01234      01234      01234
         * 0 .....      .....      .....      .....
         * 1 .....      ..#..      .....      ..#..
         * 2 .###.  =>  ..#..  =>  .###.  =>  ..#..
         * 3 .....      ..#..      .....      ..#..
         * 4 .....      .....      .....      .....
         */
        it('a simple spinner should spin', () => {

            // case three cells in a row spin
            board.setDataAsString(
                '.....\n' +
                '.....\n' +
                '.###.\n' +
                '.....\n' +
                '.....' // '.....\n' // use this if test fails
            );

            board.next();

            expect(board.toString()).toBe(
                '.....\n' +
                '..#..\n' +
                '..#..\n' +
                '..#..\n' +
                '.....' // '.....\n' // use this if test fails
            );

            board.next();

            expect(board.toString()).toBe(
                '.....\n' +
                '.....\n' +
                '.###.\n' +
                '.....\n' +
                '.....' // '.....\n' // use this if test fails
            );

            board.next();

            expect(board.toString()).toBe(
                '.....\n' +
                '..#..\n' +
                '..#..\n' +
                '..#..\n' +
                '.....' // '.....\n' // use this if test fails
            );

        });
    });
});