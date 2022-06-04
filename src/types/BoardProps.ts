import { BoardState } from "./BoardState";

// Boardのプロパティの型
export type BoardProps = {
  squares: BoardState;
  onClick: (i: number) => void;
};
