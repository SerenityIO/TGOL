import React from 'react';
import { withRouter } from "react-router-dom";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableSize: "10x20",
            grid: [],
            gen: 0,
            speed: 100,
        };
        this.handleChangeSize = this.handleChangeSize.bind(this);
        this.playGame = this.playGame.bind(this);
        this.playGame1 = this.playGame1.bind(this);
        this.clearField = this.clearField.bind(this);
        this.randomGen = this.randomGen.bind(this);

    };

    componentWillMount() {
        this.createGrid(this.state.tableSize);
    };

    stopGame = () => {
        if (this.playing) {
            clearInterval(this.playing);
        }
    }

    slow = () => {
        this.state.speed += 100;
        if (this.playing) {
            clearInterval(this.playing);
        }
        this.playing = setInterval(this.playGame1, this.state.speed);
    }

    fast = () => {
        if (this.state.speed > 200)
            this.state.speed -= 100;
        if (this.playing) {
            clearInterval(this.playing);
        }
        this.playing = setInterval(this.playGame1, this.state.speed);
    }

    playGame() {
        if (this.playing) {
            clearInterval(this.playing);
        }
        this.playing = setInterval(this.playGame1, this.state.speed);
    }

    playGame1() {

        let temp = this.state.grid;
        let nextGen = JSON.parse(JSON.stringify(this.state.grid));
        let tempGen = this.state.gen;

        let size = this.state.tableSize;
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
        this.setState({
            grid: nextGen,
            gen: tempGen,
        })
    }

    clearField() {
        let temp = this.state.grid;
        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < temp[i].length; j++) {
                temp[i][j].isActive = false;
            }
        }
        this.setState({
            grid: temp,
            gen: 0
        });
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
        this.setState({
            grid: gridFull
        })
    };

    handleChangeSize(e) {
        this.setState({
            tableSize: e.target.value
        });
        this.createGrid(e.target.value);
    };

    changeCell(a, b) {
        let temp = this.state.grid;
        temp[a][b].isActive = !temp[a][b].isActive;
        this.setState({
            grid: temp
        });
    }

    randomGen() {
        let temp = this.state.grid;
        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < temp[i].length; j++) {
                let stan = Math.round(Math.random());
                if (stan === 1) temp[i][j].isActive = true;
                if (stan === 0) temp[i][j].isActive = false;
            }
        }
        this.setState({
            grid: temp
        });
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
                            {this.state.grid.map((v1, i) => (
                                <tr className='row'>
                                    {v1.map((v2, j) => (
                                        <td
                                            key={v2.id}
                                            className={this.state.grid[i][j].isActive ? 'alive' : 'cell'}
                                            onClick={() => this.changeCell(i, j)}
                                        />
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2>Generations: {this.state.gen}</h2>
                <div className="exitButton">
                    <button onClick={this.exit}>Exit</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Main);