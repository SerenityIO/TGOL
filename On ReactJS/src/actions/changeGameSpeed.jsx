import { connect } from 'tls';

export default connect(
    state => ({
        gameSpeed: state.gameSpeed,
    }),
    dispatch => ({
        onChangeGameSpeed: (gameSpeed) => {
            dispatch({ type: 'CHANGE_GAME_SPEED', payload: gameSpeed });
        }
    })
)(App);