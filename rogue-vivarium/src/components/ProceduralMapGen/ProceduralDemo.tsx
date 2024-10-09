import { Vector } from "@/types";
import { useApp } from "@pixi/react"
import { Application, Container, DisplayObject, Graphics, ICanvas } from "pixi.js";
import { useEffect } from "react";
import { generateMapWithPerlinNoise, generateMapWithPureNoise } from "./CreateMap";
import { TileMap } from "./types";
import { renderMap, renderPerlinMap, renderPerlinTerrain } from "./RenderMap";

const cave = generateMapWithPureNoise({x: 100, y: 100});
const perlinCave = generateMapWithPerlinNoise({x:100, y:100})

const run = (app: Application<ICanvas>) => {
  const container = new Container();
  app.stage.addChild(container);
  
  //renderPerlinMap(perlinCave, container);
  renderPerlinTerrain(container);
  
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


export const ProceduralDemo = () => {
  let app = useApp();
  
  useEffect(() => {
    app.stage.removeChildren();
    run(app);
  }, [app]);
  
  return (
    <>
    </>
  );
}

