import { Container, DisplayObject, Graphics } from "pixi.js";
import { PerlinTile, TileMap } from "./types";
import { Vector } from "@/types";
import { generateRandomGradientVectors, perlinNoise2d } from "./CreateMap";

const white = 0xFFFFFF;
const black = 0x000000;

const canvasDimension: Vector = ({x:5, y:5})
const tileSize: number = 5;

export const renderMap = (map: TileMap, container: Container<DisplayObject>) => {
  map.tiles.forEach((x, indexX) => {
    x.forEach((y, indexY) => {
      const tile = new Graphics();

      tile.beginFill(y.isEmpty ? white : black);
      tile.drawRect(indexX * tileSize, indexY * tileSize, tileSize, tileSize);
      
      container.addChild(tile);
    })
  })
}

type PerlinMap = {
  tiles: PerlinTile[][];
  size: Vector;
}

export const renderPerlinMap = (map: PerlinMap , container: Container<DisplayObject>) => {
  map.tiles.forEach((x, indexX) => {
    x.forEach((y, indexY) => {
      const tile = new Graphics();

      //tile.beginFill(Math.floor(y.gradient * 100 > 50 ? black : white));
      //const value = Math.floor(Math.abs((y.gradient)/ 1000) *  255);
      const value = Math.floor(Math.abs((y.gradient)/ 10000000) *  255);
      tile.beginFill({r: value, g: value, b: value});
      tile.drawRect(indexX * tileSize, indexY * tileSize, tileSize, tileSize);
      console.log(value);
      
      container.addChild(tile);
    })
  })
}

export const renderPerlinTerrain = (container: Container<DisplayObject>) => {
  const size: Vector = {x:100, y:100};
  const seed = generateRandomGradientVectors({x: size.x + 2, y: size.y + 2}); 

  for(let x = 0; x < size.x; ++x) {
    for(let y = 0; y < size.y; ++y) {
      const tile = new Graphics()
      //const value = Math.floor(Math.abs(perlinNoise2d(x, y, seed)) / 1000000 * 255);
      
      const scale = 0.1;

      const value = perlinNoise2d(x, y, seed);
      const value2 = Math.abs(value) / 1000000;
      const value3 =  Math.floor(value2 * 255) + 10;
      
      tile.beginFill({r: value3, g: value3, b: value3});
      tile.drawRect(x*tileSize, y*tileSize, tileSize, tileSize);
      
      container.addChild(tile);
      console.log(value3);
      
    }
  }


}