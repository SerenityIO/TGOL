const initSpeed = 100;

export default function gameSpeed(state = initSpeed, action) {
    if (action.type === 'CHANGE_GAME_SPEED') {
        return action.payload;
    }
    return state;
}