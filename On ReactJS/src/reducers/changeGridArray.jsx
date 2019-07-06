const initState = [];

export default function gridArray(state = initState, action) {
    if (action.type === 'CHANGE_GRID_ARRAY') {
        return action.payload;
    }
    return state;
}