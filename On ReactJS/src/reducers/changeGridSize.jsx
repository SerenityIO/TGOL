const sizeState = '10x20'

export default function gridSize(state = sizeState, action) {
    if (action.type === 'CHANGE_GRID_SIZE') {
        return action.payload;
    }
    return state;
}