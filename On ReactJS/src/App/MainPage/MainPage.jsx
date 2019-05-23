import React from 'react';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: false };
    }
    render() {
        return <td className="cell" />
    }
}

class TableRow extends React.Component {
    render() {
        let sizeTable = this.props.tableSize.split('x');
        var allCells = [];
        for (let i = 0; i < sizeTable[1]; i++) {
            allCells.push(<Cell />)
        }
        return (<tr>{allCells}</tr>);
    }
}

class Field extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let temp = this.props.tableSize;
        let sizeTable = temp.split('x');
        const tableFull = [];
        for (let i = 0; i < sizeTable[0]; i++) {
            tableFull.push(<TableRow tableSize={this.props.tableSize} />)
        }
        return (
            <table>
                <tbody>
                    {tableFull}
                </tbody>
            </table>
        );
    }
}



class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableSize: "10x20",
            tableSize1: [],
            arr: []
        };
        this.handleChangeSize = this.handleChangeSize.bind(this);
    }

    randomGen = () => {
        let tableFull = this.state.arr;
        for (let i = 0; i < this.state.tableSize1[0]; i++) {
            for (let j = 0; j < this.state.tableSize1[1]; j++) {
                debugger
                this.setState.arr[i][j] = Math.round(Math.random());
                
            }
        }

    }

    handleChangeSize(e) {
        
        this.setState({
            tableSize: e.target.value
        })
    }

    componentDidUpdate() {
        //Локал сторедж
        debugger
        let temp = this.state.tableSize;
        let sizeTable = temp.split('x');
        const tableFull = [];
        for (let i = 0; i < sizeTable[0]; i++) {
            tableFull.push(<TableRow tableSize={this.tableSize} />)
        }
        this.state.arr = tableFull;
        this.state.tableSize1 = sizeTable;
    };

    render() {

        return (
            <div>
                <header>
                    <h1>The Game of Life</h1>
                    <div>
                        <button className="userInterface">Play</button>
                        <button className="userInterface">Pause</button>
                        <button className="userInterface">Clear</button>
                        <button className="userInterface">Slow</button>
                        <button className="userInterface">Fast</button>
                        <button onClick={this.randomGen} className="userInterface">Seed</button>
                        <select onChange={this.handleChangeSize} id="size">
                            <option value="10x20">10x20</option>
                            <option value="30x50">30x50</option>
                            <option value="50x70">50x70</option>
                        </select>
                    </div>
                </header>
                <main>
                    <Field tableSize={this.state.tableSize} />
                </main>
                <footer>
                    <h2>Generations: </h2>
                    <button className="userInterface">Exit</button>
                </footer>
            </div>
        );
    }
}

export default MainPage;
