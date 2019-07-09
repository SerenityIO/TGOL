import React from 'react';
import { connect } from 'react-redux';

class Main extends React.Component {
    componentWillMount() {
        this.createGrid(this.props.gridSize);
    };

    componentDidMount() {
        window.onload = () => {
            let DataBase = (JSON.parse(window.localStorage.getItem('DataBase'))) ? JSON.parse(window.localStorage.getItem('DataBase')) : [];
            let user = DataBase.find(element => element.isonline);
            if (user) {
                //alert("Welcome back," + user.email);
            } else {
                this.props.history.push('/reg');
            }
        }
    }

    stopGame = () => {
        if (this.playing) {
            clearInterval(this.playing);
        }
    }

    slow = () => {
        let spd = this.props.gameSpeed;
        spd += 100;
        this.props.onChangeGameSpeed(spd);
        if (this.playing) {
            clearInterval(this.playing);
        }
        this.playing = setInterval(this.playGame1, spd);
    }

    fast = () => {
        let spd = this.props.gameSpeed;
        if (this.props.gameSpeed > 200) {
            spd -= 100;
            this.props.onChangeGameSpeed(spd);
        }
        if (this.playing) {
            clearInterval(this.playing);
        }
        this.playing = setInterval(this.playGame1, spd);
    }

    playGame = () => {
        let spd = this.props.gameSpeed;
        if (this.playing) {
            clearInterval(this.playing);
        }
        this.playing = setInterval(this.playGame1, spd);
    }

    playGame1 = () => {
        let temp = this.props.gridArray;
        let nextGen = JSON.parse(JSON.stringify(this.props.gridArray));
        let tempGen = this.props.generations;

        let size = this.props.gridSize;
        let size1 = size.split('x');
        let rows = size1[0];
        let cols = size1[1];

        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < temp[i].length; j++) {
                let neighbors = 0;

                if (i - 1 >= 0) if (temp[i - 1][j].isActive === true) neighbors++;
                if (i - 1 >= 0 && j - 1 >= 0) if (temp[i - 1][j - 1].isActive === true) neighbors++;
                if (i - 1 >= 0 && j + 1 < cols) if (temp[i - 1][j + 1].isActive === true) neighbors++;
                if (j - 1 >= 0) if (temp[i][j - 1].isActive === true) neighbors++;
                if (j + 1 < cols) if (temp[i][j + 1].isActive === true) neighbors++;
                if (i + 1 < rows) if (temp[i + 1][j].isActive) neighbors++;
                if (i + 1 < rows && j - 1 >= 0) if (temp[i + 1][j - 1].isActive === true) neighbors++;
                if (i + 1 < rows && j + 1 < cols) if (temp[i + 1][j + 1].isActive === true) neighbors++;
                if (temp[i][j].isActive && (neighbors < 2 || neighbors > 3)) nextGen[i][j].isActive = false;
                if (!temp[i][j].isActive && neighbors === 3) nextGen[i][j].isActive = true;

            }
        }
        tempGen++;

        this.props.onChangeGridArray(nextGen);
        this.props.onChangeGenerationsCount(tempGen);
    }

    clearField = () => {
        let temp = JSON.parse(JSON.stringify(this.props.gridArray));
        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < temp[i].length; j++) {
                temp[i][j].isActive = false;
            }
        }
        this.props.onChangeGridArray(temp);
        this.props.onChangeGenerationsCount(0);

        this.stopGame();
    }

    createGrid = (size) => {
        let sizeTable = size.split('x');
        var gridFull = [];
        let id = 0;
        let gTr = [];
        for (let i = 0; i < sizeTable[0]; i++) {
            gTr = [];
            for (let j = 0; j < sizeTable[1]; j++) {
                let gTd = {
                    id: id++,
                    isActive: false
                };
                gTr.push(gTd);
            }
            gridFull.push(gTr)
        }

        this.props.onChangeGridArray(gridFull);
    };

    handleChangeSize = (e) => {
        this.props.onChangeGridSize(e.target.value);
        this.createGrid(e.target.value);
        this.stopGame();
        this.props.onChangeGenerationsCount(0);
    };



    changeCell = (a, b) => {
        let temp = JSON.parse(JSON.stringify(this.props.gridArray));
        temp[a][b].isActive = !temp[a][b].isActive;
        this.props.onChangeGridArray(temp);
    }

    randomGen = () => {
        let temp = JSON.parse(JSON.stringify(this.props.gridArray));
        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < temp[i].length; j++) {
                let stan = Math.round(Math.random());
                if (stan === 1) temp[i][j].isActive = true;
                if (stan === 0) temp[i][j].isActive = false;
            }
        }
        this.props.onChangeGridArray(temp);
    }



    exit = () => {
        let DataBase = (JSON.parse(window.localStorage.getItem('DataBase'))) ? JSON.parse(window.localStorage.getItem('DataBase')) : [];

        DataBase.forEach(e => {
            e.isOnline = false;
        });

        window.localStorage.setItem('DataBase', JSON.stringify(DataBase));
        this.props.history.push('/auth');
    }



    render() {
        console.log("ONO", this.props);
        return (
            <div >
                <h1>The Game of Life</h1>
                <div className="centerUI">
                    <div className="blockUI">
                        <button className="userInterface" onClick={this.playGame}>Play</button>
                        <button className="userInterface" onClick={this.stopGame}>Pause</button>
                        <button className="userInterface" onClick={this.clearField}>Clear</button>
                        <button className="userInterface" onClick={this.slow}>Slow</button>
                        <button className="userInterface" onClick={this.fast}>Fast</button>
                        <button className="userInterface" onClick={this.randomGen}>Seed</button>
                        <select onChange={this.handleChangeSize} id="size">
                            <option value="10x20">10x20</option>
                            <option value="30x50">30x50</option>
                            <option value="50x70">50x70</option>
                        </select>
                    </div>
                </div>
                <div className="gameField">
                    <table className="field" cellSpacing='0'>
                        <tbody>
                            {this.props.gridArray.map((v1, i) => (
                                <tr
                                    className='row'>
                                    {v1.map((v2, j) => (
                                        <td
                                            key={v2.id}
                                            className={this.props.gridArray[i][j].isActive ? 'alive' : 'cell'}
                                            onClick={() => this.changeCell(i, j)}
                                        />
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2>Generations: {this.props.generations}</h2>
                <div className="exitButton">
                    <button onClick={this.exit}>Exit</button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        gridSize: state.gridSize,
        gameSpeed: state.gameSpeed,
        generations: state.genCount,
        gridArray: state.gridArray,
        isPlaying: state.isPlaying,
    }),
    dispatch => ({
        onChangeGridSize: (gridSize) => {
            dispatch({ type: 'CHANGE_GRID_SIZE', payload: gridSize });
        },
        onChangeGameSpeed: (gameSpeed) => {
            dispatch({ type: 'CHANGE_GAME_SPEED', payload: gameSpeed });
        },
        onChangeGenerationsCount: (generations) => {
            dispatch({ type: 'CHANGE_GENERATIONS_COUNT', payload: generations });
        },
        onChangeGridArray: (gridArray) => {
            dispatch({ type: 'CHANGE_GRID_ARRAY', payload: gridArray });
        },
        onChangeIsPlaying: (isPlaying) => {
            dispatch({ type: 'CHANGE_PLAYING_NOW', payload: isPlaying });
        }
    })
)(Main);