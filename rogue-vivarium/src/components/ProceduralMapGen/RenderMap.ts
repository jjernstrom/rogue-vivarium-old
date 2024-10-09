import { Container, DisplayObject, Graphics } from "pixi.js";
import { PerlinTile, TileMap } from "./types";
import { Vector } from "@/types";
import { generateGradientVectorGrid, perlinNoise2d } from "./CreateMap";

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



interface Args {
  frequency: number,
  mapSize: Vector,
  gradientGridSize: number,
  tileSize: number,
  waterLevel: number
}

export const renderPerlinTerrain = (container: Container<DisplayObject>, {frequency, mapSize, gradientGridSize=255, tileSize, waterLevel}: Args) => {
  const colorEarthMap = (height: number) => {
    const gray = '#d7dbdd';
    const green = '#52be80';
    const darkGreen = '#1e8449';
    const sand = '#f9e79f';
    const blue = '#f9e79f';
    const darkBlue = '#21618c';
    
    const scale = 50;
  
    if (height - waterLevel + scale > 75) return white;
    else if (height - waterLevel + scale > 68) return gray;
    else if (height - waterLevel + scale > 55) return darkGreen;
    else if (height - waterLevel + scale > 45) return green;
    else if (height - waterLevel + scale > 40) return sand;
    else if (height - waterLevel + scale > 35) return blue;
    else return darkBlue;
  
  }
  
  const gradientVectorGrid = generateGradientVectorGrid(gradientGridSize); 

  for(let x = 0; x < mapSize.x; ++x) {
    for(let y = 0; y < mapSize.y; ++y) {
      const tile = new Graphics()
      
      const value = perlinNoise2d(x * frequency, y * frequency, gradientVectorGrid);
      const value2 = Math.floor(Math.abs(value) * 255);
      const value3 = Math.floor(Math.abs(value * 100))
      
      //tile.beginFill({r: value2, g: value2, b: value2});
      tile.beginFill(colorEarthMap(value3));
      tile.drawRect(x * tileSize, y * tileSize, tileSize, tileSize);
      
      container.addChild(tile);
    }
  }


}