import { SquareState } from "./SquareState";

// Squareプロパティの型
export type SquareProps = {
  value: SquareState;
  onClick: () => void;
};
