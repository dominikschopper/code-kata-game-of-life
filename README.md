# Code Kata - Conways Game of Life

diese Kata soll die Funktionalität von [Conways "Game of Life"](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), einem zellulären Automaten abbilden.

Da die Funktionalität doch einges erfordert, sollte die Kata mit genügend Zeit ausgeführt werden. Ich schlage ca. 30min für einen Durchgang vor, d.h. die Kata wird bei zwei Wiederholungen samt Einführung mind. 80min dauern.

## Aufgabe

Es ist Eure Aufgabe, Conways Game of Life auszuprogrammieren.

D.h. eine Karte `Board` zu erstellen, das aus einzelnen Zellen besteht. Jede Zelle kann einen von zwei Zuständen einnehmen: `alive` oder `dead`.

Ein Beispiel Board könnte zB so aussehen (schwarz = `alive` white = `dead`)

![game board Conways Game of Life](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Game_of_life_glider_gun.svg/610px-Game_of_life_glider_gun.svg.png)

Das Spiel wird in Runden berechnet. D.h. aus dem initialen Zustand (Runde 0) wird der Zustand für die nächste Runde errechnet und immer so weiter.

### Regeln des "Game of Life"

Jede Zelle hat 8 Nachbarzellen! D.h. alle direkt angrenzenden Zellen waagrecht, senkrecht oder diagonal gelten als Nachbarn.

- Jede lebende Zelle mit weniger als 2 lebenden Nachbarn wird in der nächsten Runde tot sein. (**Unterbevölkerung**)
- Jede lebende Zelle mit mehr als 3 lebenden Nachbarn wird in der nächsten Runde tot sein. (**Überbevölkerung**)
- Jede lebende Zelle mit 2 oder 3 Nachbarn wird überleben.
- Jede tote Zelle mit genau 3 lebenden Nachbarn wird lebendig. (**Reproduktion**).

D.h. die vier Regeln lassen sich auf folgende drei verkürzen:

- Jede lebende Zelle mit 2 oder 3 lebenden Nachbarzellen überlebt eine Runde.
- Jede tote Zelle mit genau 3 lebenden Nachbarn wird lebendig.
- Alle anderen Zellen sind in der nächsten Runde tot.

### Board

Erstellt ein Board, das ein Property `data` hat, in dem ein Board als Array von Arrays abgebildet ist.

Das Board soll eine Methode `next()` haben, die die nächste Runde errechnet und diese über `data` zugänglich macht.

Außerdem soll das Board eine Methode `toString()` haben, die Arrays als ein String zurückgeben.

### Input

Boards können Daten durch die `setDataAsString(data: string)` erhalten.

#### Bsp 1

Der String Input sieht zB so aus:

```
........
........
...###..
...#....
....#...
........
```
und hätte nach dem Aufruf von `next()` diesen Zustand

```
........
....#...
...##...
...#.#..
........
........
```

#### Bsp 2

oder dieser Input
```
......
......
.####.
......
......
```
hätte nach dem Aufruf von `next()` diesen Output
```
......
..#...
..#...
..#...
......
```
