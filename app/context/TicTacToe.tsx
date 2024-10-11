"use client";

import { createContext, useContext, useState } from "react";
import { Session } from "@/src/models/ttt";

function checkWin(boardHashMap: Map<string, number>) {
  for (const [key, value] of boardHashMap) {
    if (value === 3 || value === -3) {
      return true;
    }
  }

  return false;
}

const TicTacToeContext = createContext<Session | null>(null);

export function useTicTacToe() {
  const context = useContext(TicTacToeContext);

  if (!context) throw new Error("tictactoe not used inside provider");

  return context;
}

export function TicTacToeProvider({ children }: { children: React.ReactNode }) {
  const [turn, setTurn] = useState<number>(1);

  const [board, setBoard] = useState<(string | null)[][]>(
    new Array(3).fill(new Array(3).fill(null))
  );

  const [isWin, setIsWin] = useState<boolean>(false);

  const [boardHashMap, setBoardHashMap] = useState(
    new Map<string, number>([
      ["r0", 0],
      ["r1", 0],
      ["r2", 0],
      ["c0", 0],
      ["c1", 0],
      ["c2", 0],
      ["d0", 0],
      ["d1", 0],
    ])
  );

  function reset() {
    setBoard(new Array(3).fill(new Array(3).fill(null)));
    setTurn(1);
    setIsWin(false);
    setBoardHashMap(
      new Map<string, number>([
        ["r0", 0],
        ["r1", 0],
        ["r2", 0],
        ["c0", 0],
        ["c1", 0],
        ["c2", 0],
        ["d0", 0],
        ["d1", 0],
      ])
    );
  }

  function play(pos: { x: number; y: number }) {
    if (board[pos.y][pos.x]) return;

    if (isWin) return;

    const symbol = turn === 1 ? "o" : "x";
    const newBoard = board.map((rows, y) => {
      return rows.map((cell, x) => {
        if (x === pos.x && y === pos.y) {
          return symbol;
        } else {
          return cell;
        }
      });
    });

    setBoard(newBoard);

    const rowId = `r${pos.y}`;
    const colId = `c${pos.x}`;

    boardHashMap.set(rowId, turn + (boardHashMap.get(rowId) ?? 0));
    boardHashMap.set(colId, turn + (boardHashMap.get(colId) ?? 0));

    if (pos.x === pos.y) {
      boardHashMap.set("d1", turn + (boardHashMap.get("d1") ?? 0));
    }

    if (2 - pos.x === pos.y) {
      boardHashMap.set("d2", turn + (boardHashMap.get("d2") ?? 0));
    }

    setBoardHashMap(boardHashMap);

    if (checkWin(boardHashMap)) {
      setIsWin(true);
      console.log("WIN");
      return;
    }

    setTurn((turn) => (turn === -1 ? 1 : -1));

    console.log(boardHashMap);
  }

  return (
    <TicTacToeContext.Provider value={{ board, turn, isWin, reset, play }}>
      {children}
    </TicTacToeContext.Provider>
  );
}
