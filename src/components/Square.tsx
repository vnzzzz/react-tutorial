// types
import { SquareProps } from "../types/SquareProps";

// ---- Squareコンポーネント ------------------------------------
export const Square = (props: SquareProps) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);
