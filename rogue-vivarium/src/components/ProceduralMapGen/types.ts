import { Vector } from "@/types";

export type SimpleTile = {
  isEmpty: boolean;
}

export type PerlinTile = {
  gradient: number;
}

export type TileMap = {
  tiles: SimpleTile[][];
  size: Vector;
}