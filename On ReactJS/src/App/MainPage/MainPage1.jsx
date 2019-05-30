import React from 'react';

class Cell extends React.Component {
    render() {
        return (
            <td className="cell"
                id={this.props.id}
            />
        )
    }
}

class TableRow extends React.Component {
    render() {
        var cellsInRow = [];
        for (let i = 0; i < this.props.cols; i++) {
            cellsInRow.push(
                <Cell
                />
            )
        }
        return (
            <tr className="row">
                {cellsInRow}
            </tr>
        )
    }
}

class Grid extends React.Component {
    render() {
        let sizeTable=this.props.tableSize.split('x');
        var gridFull = [];

        for (let i = 0; i < sizeTable[0]; i++)
            gridFull.push(
                <TableRow
                    cols={sizeTable[1]}
                />
            )
        return <table className="field" cellSpacing='0'>
            {gridFull}
        </table>
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableSize: "10x20",
        };
        this.handleChangeSize = this.handleChangeSize.bind(this);
    }

    handleChangeSize(e) {
        this.setState({
            tableSize: e.target.value
        })
    }

    render() {

        return (
            <div>
            
                <h1>The Game of Life</h1>
                <div className="blockUI">
                    <button className="userInterface">Play</button>
                    <button className="userInterface">Pause</button>
                    <button className="userInterface">Clear</button>
                    <button className="userInterface">Slow</button>
                    <button className="userInterface">Fast</button>
                    <button className="userInterface">Seed</button>
                    <select onChange={this.handleChangeSize} id="size">
                        <option value="10x20">10x20</option>
                        <option value="30x50">30x50</option>
                        <option value="50x70">50x70</option>
                    </select>
                </div>
                <div className="gameField">
                    
                    <Grid 
                    tableSize={this.state.tableSize}
                    />
                </div>
                <h2>Generations:0</h2>
            </div>
        )
    }
}

export default Main;