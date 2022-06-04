import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Repeat } from "typescript-tuple";
import "./index.css";

// 先後のマーク指定
const mark1: string = "●";
const mark2: string = "○";

// ---- Squareコンポーネント ------------------------------------
// Squareの状態の型
type SquareState = typeof mark1 | typeof mark2 | null;

// Squareプロパティの型
type SquareProps = {
  value: SquareState;
  onClick: () => void;
};

// Square コンポーネントの実装
const Square = (props: SquareProps) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);

// ---- Boardコンポーネント ------------------------------------
// Boardの状態の型
type BoardState = Repeat<SquareState, 9>;

// Boardのプロパティの型
type BoardProps = {
  squares: BoardState;
  onClick: (i: number) => void;
};

// Board コンポーネントの実装
const Board = (props: BoardProps) => {
  const renderSquare = (i: number) => (
    <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
  );

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

// ---- Gameコンポーネント ------------------------------------
// Gameの特定のステップの型
type Step = {
  squares: BoardState;
  mark1IsNext: boolean;
};

// Gameの状態の型
type GameState = {
  readonly history: Step[];
  readonly stepNumber: number;
};

// Gameの実装
const Game = () => {
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

// 勝敗判定用のヘルパー関数
const calculateWinner = (squares: BoardState) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// ========================================

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Game />);
