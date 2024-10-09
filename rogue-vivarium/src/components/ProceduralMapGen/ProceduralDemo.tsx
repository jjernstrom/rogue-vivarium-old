import { Vector } from "@/types";
import { useApp } from "@pixi/react"
import { Application, Container, DisplayObject, Graphics, ICanvas } from "pixi.js";
import { useEffect } from "react";
import { generateMapWithPerlinNoise, generateMapWithPureNoise } from "./CreateMap";
import { TileMap } from "./types";
import { renderMap, renderPerlinMap, renderPerlinTerrain } from "./RenderMap";

//const cave = generateMapWithPureNoise({x: 100, y: 100});
//const perlinCave = generateMapWithPerlinNoise({x:100, y:100})
interface Args {
  frequency: number,
  mapSize: Vector,
  gradientGridSize: number,
  tileSize: number,
  waterLevel: number,
}

interface Props {
  frequency: number,
  mapSize: Vector,
  gradientGridSize: number,
  tileSize: number,
  waterLevel: number,
  generate: boolean,
}
 
const run = (app: Application<ICanvas>, props:Args) => {
  const container = new Container();
  app.stage.addChild(container);
  
  //renderPerlinMap(perlinCave, container);
  renderPerlinTerrain(container, {frequency: props.frequency, mapSize: props.mapSize, gradientGridSize: props.gradientGridSize, tileSize: props.tileSize, waterLevel: props.waterLevel});
  
      // // Move container to the center
      // container.x = app.screen.width / 2;
      // container.y = app.screen.height / 2;
  
      // // Center logo sprite in local container coordinates
      // container.pivot.x = container.width / 2;
      // container.pivot.y = container.height / 2;
  
//   app.ticker.add((delta => {
//     container.rotation -= 0.01 * delta;
//   }));
// }
}


export const ProceduralDemo = ({generate, ...props}: Props) => {
  let app = useApp();
  
  useEffect(() => {
    app.stage.removeChildren();
    run(app, props);
  }, [app, generate]);
  
  return (
    <>
    </>
  );
}

