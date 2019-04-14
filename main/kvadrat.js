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
    size: '10x20',
    arr: []
}


game.arr = createGrid();
var grid = createGrid();
var gridGen = createGrid();


var field = document.getElementById('field');
var table = createTable();


function handleChangeSize(event) {
    game.size = event.target.value;
    fieldDelete();
    grid = createGrid();
    table = createTable();
    gridGen = createGrid();
    game.arr = createGrid();
}

//Creating table

function createTable() {
    var size = game.size.split('x');
    var cols = +size[1], rows = +size[0];
    var table = document.createElement('table');

    table.className = 'grid';

    for (let i = 0; i < rows; i++) {
        var row = document.createElement('tr');
        row.className = 'row';

        for (let j = 0; j < cols; j++) {
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

    for (let i = 0; i < rows; i++) {
        grid[i] = [];

        for (let j = 0; j < cols; j++) {
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

function play() {
    setInterval(Play, 1000);
}

function Play() {
    var size = game.size.split('x');
    var cols = +size[1], rows = +size[0];


    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            var neighbors = 0;
            var isalive = grid[i][j];

            if (i - 1 >= 0) if (grid[i - 1][j] === 1) neighbors++;
            if (i - 1 >= 0 && j - 1 >= 0) if (grid[i - 1][j - 1] === 1) neighbors++;
            if (i - 1 >= 0 && j + 1 < cols) if (grid[i - 1][j + 1] === 1) neighbors++;
            if (j - 1 >= 0) if (grid[i][j - 1] === 1) neighbors++;
            if (j + 1 < cols) if (grid[i][j + 1] === 1) neighbors++;
            if (i + 1 < rows) if (grid[i + 1][j]) neighbors++;
            if (i + 1 < rows && j - 1 >= 0) if (grid[i + 1][j - 1] === 1) neighbors++;
            if (i + 1 < rows && j + 1 < cols) if (grid[i + 1][j + 1] === 1) neighbors++;

            if (isalive) {
                if (neighbors < 2 || neighbors > 3) {
                    gridGen[i][j] = 0;
                }
                else if (neighbors === 2 || neighbors === 3) {
                    gridGen[i][j] = 1;
                }
            }
            else {
                if (neighbors === 3) {
                    gridGen[i][j] = 1;
                }
            }
        }
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = gridGen[i][j];
            game.arr[i][j] = gridGen[i][j];
            gridGen[i][j] = 0;
        }
    }
    render();
}