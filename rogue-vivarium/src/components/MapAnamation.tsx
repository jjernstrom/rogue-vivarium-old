import { AppProvider, Stage, useApp } from "@pixi/react";
import { Graphics } from "pixi.js";
import { Vector } from "@/types";
import { randomInt } from "crypto";
import { ProceduralDemo } from "./ProceduralMapGen/ProceduralDemo";

type Tile = {
    isEmpty: boolean;
    color: string;
};

type TileGrid = Tile[][];

type TileMap = {
    tileGrid: TileGrid;
    tileMapSize: Vector;
    tileSize: number;
};

const tileSize = 4;
const mapSize: Vector = {x: 1280, y:720};
const tileGridSize: Vector = {x: mapSize.x/tileSize, y: mapSize.y/tileSize};

const initTileMap = (tileSize: number, mapSize: Vector): TileMap => {
    
    const tileMapSize: Vector = {
        x: mapSize.x/tileSize, 
        y: mapSize.y/tileSize
    }; 
    
    const tileRow = Array<Tile>(tileMapSize.x).fill({isEmpty: true, color: ''});
    const tileGrid = Array<Array<Tile>>(tileMapSize.y).fill(tileRow);
    
    return { tileGrid, tileMapSize, tileSize };
}

const generateTileMap = (caveMap: TileMap): TileMap => {
    caveMap.tileGrid.forEach(x => {
        x.forEach(y => {
            const num = Math.random() * 100;
            num < 50 ? y.isEmpty = false : y.isEmpty = true; 
        });
    });
    
    return caveMap;
}

const black = 0xFFFFFF

const tile = new Graphics();
tile.beginFill(black);
tile.drawRect(100, 100, tileSize*10, tileSize*10);



export const MapAnimation = () => {
    // let app = useApp();

    // app.stage.addChild(tile);
    
    return (
        // <AppProvider value={app}>
            <Stage height={100} width={100}>
            {/* <ProceduralDemo /> */}
            </Stage>
        // </AppProvider>
    );
}
