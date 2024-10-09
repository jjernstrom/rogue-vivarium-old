import { Vector } from "@/types";
import { PerlinTile, SimpleTile } from "./types";

export const generateMapWithPureNoise = (size: Vector) => {
  const tiles: SimpleTile[][] = [];
  
  for(let x = 0; x < size.x; ++x) {
    const row: SimpleTile[] = [];

    for(let y = 0; y < size.y; ++y) {
      const num = Math.floor(Math.random() * 100);
      row.push({isEmpty: num < 50 ? true: false});
    }

    tiles.push(row);
  }
  
  return ({tiles, size});
}





const dotProduct = (a: Vector, b: Vector) => {
  return a.x * b.x + a.y * b.y ? a.x * b.x + a.y * b.y : 0;
}

const dotProductGrid = (input: Vector, directionVector: Vector, seed: Vector[][]): number => {
  // TODO: update fallback case to non-zero
  let gradientVector = seed[directionVector.x][directionVector.y] ? 
    seed[directionVector.x][directionVector.y] : {x:0, y:0};
  
  return dotProduct(directionVector, gradientVector);
}

// x is the scale factor between a and b
const linearInterpolation = (x: number, a: number, b: number):number => {
  return a + x * (b-a);
}

export const generateRandomGradientVectors = (size: Vector) => {
  let vectors = [];

  const getRandGradVect = () => {
    const theta = Math.random() * 2 * Math.PI;
    return {x: Math.cos(theta), y: Math.sin(theta)};
  }

  for (let x = 0; x < size.x; ++x) {
    let row = [];
    for (let y = 0; y < size.y; ++y) {
      row.push(getRandGradVect());
    }
    vectors.push(row);
  }

  return vectors;
}

export const perlinNoise2d = (x:number, y:number, seed: Vector[][]):number => {
  
  const x0: number = x === 0 ? 0 : x - 1;
  const x1: number = x === 100 ? 100 : 0;
  const y0: number = y === 0 ? 0 : y - 1;
  const y1: number = y === 100 ? 100 : y + 1;
  
  const topLeft = dotProductGrid({x:x, y:y}, {x:x0, y:y0}, seed)
  const topRight = dotProductGrid({x:x, y:y}, {x:x1, y:y0}, seed)
  const bottomLeft = dotProductGrid({x:x, y:y}, {x:x0, y:y1}, seed)
  const bottomRight = dotProductGrid({x:x, y:y}, {x:x1, y:y1}, seed)
  
  const xTop = linearInterpolation(x - x1, topLeft, topRight)
  const xBottom = linearInterpolation(x - x1, bottomLeft, bottomRight)

  const intensity = linearInterpolation(x - x1, xTop, xBottom)

  return intensity;
}


export const generateMapWithPerlinNoise = (size: Vector) => {
  const tiles: PerlinTile[][] = [];
  const seed = generateRandomGradientVectors({x: size.x + 2, y: size.y + 2}); 

  for(let x = 0; x < size.x; ++x) {
    const row: PerlinTile[] = [];

    for(let y = 0; y < size.y; ++y) {
      
      row.push({gradient: perlinNoise2d(x, y, seed)});
    }
    
    tiles.push(row);
  }

  return {tiles, size};
}