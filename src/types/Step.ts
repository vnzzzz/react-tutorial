import { BoardState } from "./BoardState";

// Gameの特定のステップの型
export type Step = {
  squares: BoardState;
  mark1IsNext: boolean;
};
