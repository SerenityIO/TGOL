import React from 'react';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableSize: "10x20",
            grid: [],
            gen: 0,
        };
        this.handleChangeSize = this.handleChangeSize.bind(this);
        //   this.stopGame = this.stopGame.bind(this);
        this.playGame = this.playGame.bind(this);
        this.playGame1 = this.playGame1.bind(this);
        this.clearField = this.clearField.bind(this);
        this.randomGen = this.randomGen.bind(this);

    };

    componentWillMount() {
        this.createGrid(this.state.tableSize);
    };

    playGame() {

        setInterval(this.playGame1, 1000);
    }

    playGame1() {
        //  debugger
        let temp = this.state.grid;
        let nextGen = temp;
        let tempGen = this.state.gen;

        let size = this.state.tableSize;
        let size1 = size.split('x');
        let rows = size1[0];
        let cols = size1[1];

        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < temp[i].length; j++) {
                let neighbors = 0;

                if (i - 1 >= 0) if (temp[i - 1][j].isActive == 1) neighbors++;
                if (i - 1 >= 0 && j - 1 >= 0) if (temp[i - 1][j - 1].isActive == 1) neighbors++;
                if (i - 1 >= 0 && j + 1 < cols) if (temp[i - 1][j + 1].isActive == 1) neighbors++;
                if (j - 1 >= 0) if (temp[i][j - 1].isActive == 1) neighbors++;
                if (j + 1 < cols) if (temp[i][j + 1].isActive == 1) neighbors++;
                if (i + 1 < rows) if (temp[i + 1][j].isActive) neighbors++;
                if (i + 1 < rows && j - 1 >= 0) if (temp[i + 1][j - 1].isActive == 1) neighbors++;
                if (i + 1 < rows && j + 1 < cols) if (temp[i + 1][j + 1].isActive == 1) neighbors++;

                if (temp[i][j].isActive) {
                    if (neighbors < 2 || neighbors > 3) {
                        nextGen[i][j].isActive = 0;
                    }
                    else if (neighbors === 2 || neighbors === 3) {
                        nextGen[i][j].isActive = 1;
                    }
                }
                else {
                    if (neighbors === 3) {
                        nextGen[i][j].isActive = 1;
                    }
                }
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
                temp[i][j].isActive = 0;
            }
        }
        this.setState({
            grid: temp
        });
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
                temp[i][j].isActive = Math.round(Math.random());
            }
        }
        this.setState({
            grid: temp
        });
    }

    render() {
        return (
            <div >
                <h1>The Game of Life</h1>
                <div className="centerUI">
                    <div className="blockUI">
                        <button className="userInterface" onClick={this.playGame}>Play</button>
                        <button className="userInterface">Pause</button>
                        <button className="userInterface" onClick={this.clearField}>Clear</button>
                        <button className="userInterface">Slow</button>
                        <button className="userInterface">Fast</button>
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
            </div>
        )
    }
}

export default Main;