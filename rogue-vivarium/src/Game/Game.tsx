import { Stage } from '@pixi/react';
import { Player } from '../Player';
import { Vector } from '../types';


const stageSize: Vector = {x: 1280, y:720};

export const Game = () => {
    return (
        <Stage width={stageSize.x} height={stageSize.y} options={{ background: 0x1099bb }}>
            <Player initialPosition={{x:300, y:150}}/>
        </Stage>
    )
}
