const isActive = false;

export default function isPlaying(state = isActive, action) {
    if (action.type === 'CHANGE_PLAYING_NOW') {
        return action.payload;
    }
    return state;
}