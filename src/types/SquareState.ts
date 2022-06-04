import { mark1, mark2 } from "./marks";

// Squareの状態の型
export type SquareState = typeof mark1 | typeof mark2 | null;
