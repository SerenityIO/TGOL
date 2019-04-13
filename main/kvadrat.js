window.onload = function () {
    redirect();
    render();
};

function redirect() {
    DataBase.forEach(element => {
        if (element.isonline === true) {
            //alert("Welcome back," + element.email);
        }
        else {
            document.location.href = "../authorize/log.html";
        }
    });
}


var game = {
    size: '20x10'
}

var isPlaying = false;

var grid = createGrid();
var gridGen = createGrid();


var field = document.getElementById('field');
var table = createTable();




function handleChangeSize(event) {
    game.size = event.target.value;
    fieldDelete();
    grid = createGrid();
    table = createTable();
}

//Creating table

function createTable() {
    var size = game.size.split('x');
    var cols = +size[1], rows = +size[0];
    var table = document.createElement('table');

    table.className = 'grid';

    for (let i = 0; i < cols; i++) {
        var row = document.createElement('tr');
        row.className = 'row';

        for (let j = 0; j < rows; j++) {
            var cell = document.createElement('td');

            cell.className = 'cell';
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    //alive
    table.addEventListener('click', event => {
        if (!event.target.classList.contains('cell')) return;

        var cell = event.target;
        var rowIndex = cell.parentNode.rowIndex;
        var columnIndex = cell.cellIndex;
        var isalive = grid[rowIndex][columnIndex] === 1 ? true : false;

        grid[rowIndex][columnIndex] = isalive ? 0 : 1;
        cell.classList.toggle('alive', !isalive);
    })
    field.appendChild(table);
    return table;
}

function clearField() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = 0;
        }
    }
    render();
}

function fieldDelete() {
    while (field.lastChild) {
        field.removeChild(field.lastChild);
    }
}

function createGrid() {
    var size = game.size.split('x');
    var cols = +size[1], rows = +size[0];

    const grid = [];

    for (let i = 0; i < cols; i++) {
        grid[i] = [];

        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
    return grid;
}

function randomGen() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = Math.round(Math.random());
        }
    }
    render();
}

function render() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            var cell = table.rows[i].cells[j];
            var isalive = grid[i][j];

            cell.classList.toggle('alive', isalive);
        }

    }
}