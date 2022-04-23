export type CellTypes = "code" | "text";

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}

export const initialCode = "show(<h1>Hello World</h1>);";
