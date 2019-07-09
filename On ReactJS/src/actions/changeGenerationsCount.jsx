import { connect } from 'tls';

export default connect(
    state => ({
        generations: state.generations,
    }),
    dispatch => ({
        onChangeGenerationsCount: (generations) => {
            dispatch({ type: 'CHANGE_GENERATIONS_COUNT', payload: generations });
        }
    })
)(App);