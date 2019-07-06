import { connect } from 'tls';

export default connect(
    state => ({
        gridSize: state.gridSize,
    }),
    dispatch => ({
        onChangeGridSize: (gridSize) => {
            dispatch({ type: 'CHANGE_GRID_SIZE', payload: gridSize });
        }
    })
)(Body);