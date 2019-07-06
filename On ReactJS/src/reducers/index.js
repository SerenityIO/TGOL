import { combineReducers } from 'redux';

import gridArray from './changeGridArray';
import gridSize from './changeGridSize';
import gameSpeed from './changeGameSpeed';
import isPlaying from './changePlayingNow';
import genCount from './changeGenerationsCount';

export default combineReducers({
    gridArray,
    gridSize,
    gameSpeed,
    isPlaying,
    genCount
});