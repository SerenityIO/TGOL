import React from 'react';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: true };
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

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Arr: []
        }
    };

    handleChangeSize(e) {
        this.setState({
            tableSize: e.target.value
        })
    }

    componentDidUpdate() {
        //Локал сторедж
    };

    render() {
        let temp = this.props.tableSize;
        let sizeTable = temp.split('x');
        var tableFull = [];
        for (let i = 0; i < sizeTable[0]; i++) {
            tableFull.push(<TableRow tableSize={this.tableSize} />)
        }
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
                        <button className="userInterface">Seed</button>
                        <select onChange={this.handleChangeSize} id="size">
                            <option value="10x20">10x20</option>
                            <option value="30x50">30x50</option>
                            <option value="50x70">50x70</option>
                        </select>
                    </div>
                </header>
                <main>
                    <table>
                        <tbody>
                            {this.Arr.map((val) => (
                                <td
                                    id={val.id}
                                    className="cell"

                                ></td>
                            ))}
                        </tbody>
                    </table>
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
