# Code Kata - Conways Game of Life

In this Kata you can implement the logic for [Conways "Game of Life"](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). Game of Life is a cellular automaton.

Since the functionality is easy to mess up, you should try to plan with  enough time for each round (I would propse 40min minimum) and two rounds at least.

## Exercise

You should program Conways Game of Life.

This means that you have to create a map or board that consists of cells.

Each cell must have one of two states `alive` or `dead`.

This is an example, with all live cells marked black and all dead cells white.

Ein Beispiel Board könnte zB so aussehen (schwarz = `alive` white = `dead`)

![game board Conways Game of Life](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Game_of_life_glider_gun.svg/610px-Game_of_life_glider_gun.svg.png)

Then the game is calculated in rounds. In each round the next state of the cells is calculated through the following rules.

### Rules of "Game of Life"

Each cell has 8 neighbour cells (vertical, horizontal and diagonal attached cells count as neighbours).

- Every living cell with less then 2 neighbours will be dead in the next round. (Underpopulation)

- Every living cell with more than 3 neighbours will be dead in the next round. (Overpopulation)

- Every living cell with exactly 2 or 3 living neighbours will survive the round and stay alive.

- Every dead cell with exactly 3 living neighbours will come alive in the next round. (Reproduction).

This means the four rules can be reduced to these three:

1. Every living cell with 2 living neighbours will stay alive.

1. Every cell (dead or alive) with 3 living neighbours will be alive in the next round.

1. All other cells will be dead in the next round.

### Board

Create a `GameBoard` class that implements the `Board` interface.

Its state (in the `data` property) is a simple Array of Arrays like this `CellState[][]`.

The necessary `enum CellState {}` already exists.

The board provides a `next()` method that calculates the state of the board for the next round and provides that state via the `data` property.

The board provides a `toString()` method, that returns '.' for a dead cell and '#' for a live one. Rows of cells will be split by `\n`.

The board should be able to consume data that is returned by the `toString()` method and set its state accordingly via the `setDataAsString(data: string)` method.

#### Tip!

You will need to copy the whole board to evade side effects when calculating the next state. A deep copy can be done in a lot of ways,
e.g. you can use a library like lodash with its `deepClone` function.

a. Lodashs `__.cloneDeep()` verwenden (erst lodash als dependency installieren)
  ```typescript
  const state: CellState[][] = [ [ CellState.LIFE, CellState.DEAD ] ];
  const copy = _.cloneDeep(state);
  ```
  or

b. you can use JS default tools like JSON
  ```typescript
  const state: CellState[][] = [ [ CellState.LIFE, CellState.DEAD ] ];
  const copy = JSON.parse( JSON.stringify(state) );
  ```

this should come in handy when you want to create a deep copy of a structure.

### Examples for interesting patterns

-----
#### Example 1 - static

this input
```
....
.##.
.##.
....
```
should be this output after a `next()` call
```
....
.##.
.##.
....
```

-----
#### Example 2 - create, static

this input
```
....
.##.
.#..
....
```
should be this output after a `next()` call
```
....
.##.
.##.
....
```

-----
#### Example 3 - spinner

this input
```
.....
.###.
.....
```
should be this output after a `next()` call
```
..#..
..#..
..#..
```
should be this output after a `next()` call
```
.....
.###.
.....
```
-----
#### Example 4 - Simple Glider

the so called glider moves. So this input

```
........
........
...###..
...#....
....#...
........
```
should be this output after a `next()` call

```
........
....#...
...##...
...#.#..
........
........
```
