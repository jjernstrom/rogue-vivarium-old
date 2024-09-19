import { useState } from "react";
import { Sprite } from "@pixi/react";
import { Vector } from "@types";
import { usePlayerInput } from "../hooks"; // TODO: Why can't I use the path mapping?

const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';

interface Props {
    initialPosition: Vector;
}

export const Player = ({ initialPosition }: Props) => {
    
    const [playerPosition, setPlayerPosition] = useState<Vector>({
        x: initialPosition.x,
        y: initialPosition.y,
    });
    
    usePlayerInput(setPlayerPosition);

    return <Sprite image={bunnyUrl} x={playerPosition.x} y={playerPosition.y} />
}
