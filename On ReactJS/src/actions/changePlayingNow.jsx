import { connect } from 'tls';

export default connect(
    state => ({
        isPlaying: state.isPlaying,
    }),
    dispatch => ({
        onChangeIsPlaying: (isPlaying) => {
            dispatch({ type: 'CHANGE_PLAYING_NOW', payload: isPlaying });
        }
    })
)(Body);