export type CellTypes = "code" | "text";

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}

export const initialCode =
  "document.querySelector('#root').innerText = 'Hello World';";
