const initGenCount = 0;

export default function genCount(state = initGenCount, action) {
    if (action.type === 'CHANGE_GENERATIONS_COUNT') {
        return action.payload;
    }
    return state;
}