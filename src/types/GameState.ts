import { Step } from "./Step";

// Gameの状態の型
export type GameState = {
  readonly history: Step[];
  readonly stepNumber: number;
};
