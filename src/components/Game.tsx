// package
import { useState } from "react";

// types
import { mark1, mark2 } from "../types/marks";
import { Board } from "./Board";
import { GameState } from "../types/GameState";
import { BoardState } from "../types/BoardState";
import { Step } from "../types/Step";

// utils
import { calculateWinner } from "../utils/calculateWinner";

// ---- Gameコンポーネント ------------------------------------
export const Game = () => {
  const [state, setState] = useState<GameState>({
    history: [
      {
        squares: [null, null, null, null, null, null, null, null, null],
        mark1IsNext: true,
      },
    ],
    stepNumber: 0,
  });

  // 表示するBoardの状態
  const current = state.history[state.stepNumber];
  // 勝者
  const winner = calculateWinner(current.squares);

  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${current.mark1IsNext ? mark1 : mark2}`;
  }

  // Squareをクリックしたときに新しいBoardを保存し、stepを更新する関数
  const handleClick = (i: number) => {
    if (winner || current.squares[i]) {
      return;
    }

    const next: Step = (({ squares, mark1IsNext }) => {
      const nextSquares = squares.slice() as BoardState;
      nextSquares[i] = mark1IsNext ? mark1 : mark2;
      return {
        squares: nextSquares,
        mark1IsNext: !mark1IsNext,
      };
    })(current);

    setState(({ history, stepNumber }) => {
      const newHistory = history.slice(0, stepNumber + 1).concat(next);

      return {
        history: newHistory,
        stepNumber: newHistory.length - 1,
      };
    });
  };

  const jumpTo = (move: number) => {
    setState((prev) => ({
      ...prev,
      stepNumber: move,
    }));
  };

  const moves = state.history.map((step, move) => {
    const description = move > 0 ? `Go to move #${move}` : `Go to start`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
