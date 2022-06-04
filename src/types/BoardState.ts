import { Repeat } from "typescript-tuple";

import { SquareState } from "./SquareState";

// Boardの状態の型
export type BoardState = Repeat<SquareState, 9>;
