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
  return a.x * b.x + a.y * b.y; 
}

const dotProductGrid = (input: Vector, grid: Vector, gradientVectorGrid: Vector[][]): number => {
  const offsetVector: Vector = {x: input.x - grid.x, y: input.y - grid.y};
 
  const gradientVector: Vector = gradientVectorGrid[grid.x][grid.y];

  return dotProduct(gradientVector, offsetVector);
}

// x is the scale factor between a and b
const linearInterpolationWithSmooth = (x: number, a: number, b: number):number => {
  return a + smootherstep(x) * (b-a);
}

const linearInterpolation= (x: number, a: number, b: number):number => {
  return a + x * (b-a);
}

const smootherstep = (x: number) => {
  return 6*x**5 - 15*x**4 + 10*x**3;
}

export const generateGradientVectorGrid = (size: number) => {
  let vectors = [];

  const generateRandomGradientVector = () => {
    const theta = Math.random() * 2 * Math.PI;
    return {x: Math.cos(theta), y: Math.sin(theta)};
  }

  for (let x = 0; x < size; ++x) {
    let row = [];
    for (let y = 0; y < size; ++y) {
      row.push(generateRandomGradientVector());
    }
    vectors.push(row);
  }

  return vectors;
}

export const perlinNoise2d = (xInput:number, yInput:number, gradientVectorGrid: Vector[][]):number => {
  
  const X: number = Math.floor(xInput);
  const Y: number = Math.floor(yInput);
  
  // Gradient Vector Grid local node x y
  const x0: number = X 
  const x1: number = X + 1
  const y0: number = Y
  const y1: number = Y + 1
  
  const topLeft = dotProductGrid({x:xInput, y:yInput}, {x:x0, y:y0}, gradientVectorGrid)
  const topRight = dotProductGrid({x:xInput, y:yInput}, {x:x1, y:y0}, gradientVectorGrid)
  const bottomLeft = dotProductGrid({x:xInput, y:yInput}, {x:x0, y:y1}, gradientVectorGrid)
  const bottomRight = dotProductGrid({x:xInput, y:yInput}, {x:x1, y:y1}, gradientVectorGrid)
  
  const xTop = linearInterpolationWithSmooth(xInput - x0, topLeft, topRight)
  const xBottom = linearInterpolationWithSmooth(xInput - x0, bottomLeft, bottomRight)

  const intensity = linearInterpolationWithSmooth(yInput - y0, xTop, xBottom)

  return intensity;
}


export const generateMapWithPerlinNoise = (size: Vector) => {
  const tiles: PerlinTile[][] = [];
  const seed = generateGradientVectorGrid(size.x); 

  for(let x = 0; x < size.x; ++x) {
    const row: PerlinTile[] = [];

    for(let y = 0; y < size.y; ++y) {
      
      row.push({gradient: perlinNoise2d(x, y, seed)});
    }
    
    tiles.push(row);
  }

  return {tiles, size};
}