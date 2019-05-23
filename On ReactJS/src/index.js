import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/mainStyles.css";

class Text extends React.Component {
    render() {
        return <h1>{this.props.name}{this.props.count}</h1>;
    }
}

function Interface(props) {
    return <button onClick={props.todo}>{props.buttonName}</button>
}

var counter = 0;

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

class Field extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let temp = this.props.tableSize;
        let sizeTable = temp.split('x');
        var tableFull = [];
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

// Play = () => { }
// Pause = () => { }
// Clear = () => { }
// Slow = () => { }
// Fast = () => { }

class Element extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tableSize: "10x20" };
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
                <header>
                    <Text name="The Game of Life" />
                    <div>
                        <Interface className="userInterface" buttonName='Play' />
                        <Interface className="userInterface" buttonName='Pause' />
                        <Interface className="userInterface" buttonName='Clear' />
                        <Interface className="userInterface" buttonName='Slow' />
                        <Interface className="userInterface" buttonName='Fast' />
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
                    <Text name="Generations" count={":" + counter} />
                    <Interface className="userInterface" buttonName='Exit' />
                </footer>
            </div>
        );
    }
}

ReactDOM.render(
    <Element />,
    document.getElementById('root')
);

