// blueprint

function isWin(boardHashMap: Map<string, number>) {
  for (const value of boardHashMap.values()) {
    if (value === 3) {
      return true;
    }
  }

  return false;
}

export class Session {
  public board: (string | null)[][] = new Array(3).fill(
    new Array(3).fill(null)
  );

  public turn: number = 1;

  public isWin: boolean = false;

  private boardHashMap? = new Map<string, number>([
    ["r0", 0],
    ["r1", 0],
    ["r2", 0],
    ["c0", 0],
    ["c1", 0],
    ["c2", 0],
    ["d0", 0],
    ["d1", 0],
  ]);

  reset() {
    this.board = new Array(3).fill(new Array(3).fill(null));
    this.turn = 1;
  }

  play(pos: { x: number; y: number }) {
    const symbol = this.turn === 1 ? "o" : "x";
    this.board[pos.x][pos.y] = symbol;

    const rowId = `r${pos.x}`;
    const colId = `c${pos.x}`;

    this.boardHashMap!.set(
      rowId,
      this.turn + (this.boardHashMap!.get(rowId) ?? 0)
    );
    this.boardHashMap!.set(
      colId,
      this.turn + (this.boardHashMap!.get(rowId) ?? 0)
    );

    if (isWin(this.boardHashMap!)) {
      this.isWin = true;
      return;
    }

    this.turn = this.turn === -1 ? 1 : -1;
  }
}
