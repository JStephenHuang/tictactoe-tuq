"use client";

import { useState } from "react";
import Board from "./_components/Board";

export default function Home() {
  const [start, setStart] = useState<boolean>(false);

  const placeholder = new Array(9).fill(
    <div className="w-[10vw] aspect-square border"></div>
  );

  return (
    <div className="h-screen flex flex-col items-center">
      {start ? (
        <Board setStart={setStart} />
      ) : (
        <div className="h-full flex flex-col gap-10 items-center justify-center">
          <div className="grid grid-cols-3 border border-black blur-sm">
            {placeholder}
          </div>
          <div className="absolute flex flex-col items-center gap-5">
            <p className="text-24 font-bold">TICTACTOE TUQ</p>
            <button
              className="w-fit px-6 py-2 bg-green-400 border border-green-700"
              onClick={() => setStart(true)}
            >
              Play
            </button>
          </div>
        </div>
      )}
      <div className="absolute bottom-5 flex flex-col items-center">
        <div className="">made by stephen :)</div>
        <div className="">
          <a
            className="hover:underline"
            href="https://github.com/JStephenHuang/tictactoe-tuq"
          >
            Source code
          </a>
        </div>
      </div>
    </div>
  );
}
