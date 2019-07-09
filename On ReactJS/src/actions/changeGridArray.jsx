import { connect } from 'tls';

export default connect(
    state => ({
        gridArray: state.gridArray,
    }),
    dispatch => ({
        onChangeGridArray: (gridArray) => {
            dispatch({ type: 'CHANGE_GRID_ARRAY', payload: gridArray });
        }
    })
)(App);