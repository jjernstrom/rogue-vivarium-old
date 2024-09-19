import { useEffect } from "react";
import { Vector } from "@types";

const movementDelta = 5;

const keyboardActions = {
    KeyW: 'up',
    KeyS: 'down',
    KeyA: 'left',
    KeyD: 'right',
}

type keyboardEventCodes = keyof typeof keyboardActions;

const getKeyboardActionFromCode = (eventCode: keyboardEventCodes) => keyboardActions[eventCode];

export const usePlayerInput = (setPlayerPosition: React.Dispatch<React.SetStateAction<Vector>>) => {
    const move = (direction: string) => {
        switch (direction) {
            case 'up':
                setPlayerPosition((position) => ({...position, y: (position.y - movementDelta)}));
                break;
            case 'down':
                setPlayerPosition((position) => ({...position, y: (position.y + movementDelta)}));
                break;
            case 'right':
                setPlayerPosition((position) => ({...position, x: (position.x + movementDelta)}));
                break;
            case 'left':
                setPlayerPosition((position) => ({...position, x: (position.x - movementDelta)}));
                break;
            default:
                break;
        }
    }
    
    const handleKeyDown = (event: KeyboardEvent) => {
        const direction = getKeyboardActionFromCode(event.code as keyboardEventCodes);
        move(direction);
    }

    const handleKeyboardInput = () => {
        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }

    useEffect(handleKeyboardInput);
}