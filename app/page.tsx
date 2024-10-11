"use client";

import { useState } from "react";
import Board from "./_components/Board";

export default function Home() {
  const [start, setStart] = useState<boolean>(false);

  const placeholder = new Array(9).fill(
    <div className="w-[10vw] aspect-square border"></div>
  );

  return (
    <div className="h-screen flex flex-col">
      {start ? (
        <Board setStart={setStart} />
      ) : (
        <div className="h-full flex flex-col items-center justify-center">
          <div className="grid grid-cols-3 border border-black blur-sm">
            {placeholder}
          </div>

          <button
            className="absolute px-6 py-2 bg-green-400 border border-green-700"
            onClick={() => setStart(true)}
          >
            Play
          </button>
        </div>
      )}
    </div>
  );
}
