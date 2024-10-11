"use client";
// import { Session } from "@/src/models/ttt";
import React, { Dispatch, SetStateAction } from "react";
import { useTicTacToe } from "../context/TicTacToe";
import { CircleIcon, Cross1Icon } from "@radix-ui/react-icons";

const Board = ({
  setStart,
}: {
  setStart: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useTicTacToe();

  return (
    <div className="relative h-full flex flex-col gap-20 items-center justify-center">
      <div className="flex items-center gap-5 font-bold">
        Player&apos; turn:
        {session.turn === -1 ? <Cross1Icon /> : <CircleIcon />}
      </div>
      {session.isWin && (
        <div className="absolute flex items-center justify-center w-full h-full">
          <div className="w-full h-full bg-black opacity-50"></div>
          <div className="absolute flex flex-col gap-6 items-center justify-center w-1/5 h-1/2 bg-white border border-black">
            {session.turn === -1 ? <Cross1Icon /> : <CircleIcon />} WON!
            <button
              onClick={session.reset}
              className="border px-6 py-2 bg-red-400 border-red-700"
            >
              Reset
            </button>
          </div>
        </div>
      )}
      {session && (
        <div>
          <div className="w-full grid grid-cols-3 border border-black">
            {session.board.map((rows, y) =>
              rows.map((val, x) => (
                <div
                  onClick={() => {
                    session.play({ x: x, y: y });
                  }}
                  className="w-[10vw] aspect-square border grid place-items-center"
                >
                  {val &&
                    (val === "x" ? (
                      <Cross1Icon className="w-[10%] h-[10%]" />
                    ) : (
                      <CircleIcon className="w-[10%] h-[10%]" />
                    ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <div className="flex items-center gap-5">
        <button
          onClick={session.reset}
          className="border px-6 py-2 bg-red-400 border-red-700"
        >
          Reset
        </button>
        <button
          onClick={() => setStart(false)}
          className="border px-6 py-2 bg-red-400 border-red-700"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Board;
