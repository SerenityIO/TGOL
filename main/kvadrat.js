var DataBase = (JSON.parse(window.localStorage.getItem('DataBase')))
window.onload = function () {

    redirect();
   loadFromBase(); 
   table=createTable();

    render();
};

function loadFromBase() {
    for (var key in DataBase) {
        game = DataBase[userID].settings[key];
    }
}

function redirect() {
    var user = DataBase.find(element => element.isonline);
    if (user) {
        //alert("Welcome back," + user.email);
    } else {
        document.location.href = "../authorize/log.html";
    }
}

var flashback = [];


var game = {
    size: '10x20',
    interval: null,
    speed: 100,
    arr: [],
    generations: 0
}

game.arr = createGrid();

var grid;
var gridGen;

var field = document.getElementById('field');
var table ;
function handleChangeSize(event) {
    game.size = event.target.value;
    fieldDelete();
    grid = createGrid();
    table = createTable();
    gridGen = createGrid();
    game.arr = createGrid();
    saveSettings();
}

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
            game.arr[i][j] = grid[i][j];
        }
    }
    render();
    game.generations = 0;
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
            game.arr[i][j] = grid[i][j];
        }
    }
    render();

}

function render() {


    for (let i = 0; i < game.arr.length; i++) {
        for (let j = 0; j < game.arr[i].length; j++) {
            var cell = table.rows[i].cells[j];
            var isAlive = game.arr[i][j];


            cell.classList.toggle('alive', isAlive);
        }

    }
}

function pauseGame() {
    clearInterval(game.interval);
}

function slow() {

    game.speed += 500;
    play();
}

function fast() {

    if (game.speed > 500) {
        game.speed -= 500;
        play();
    }
}

function play() {

    if (game.interval) {
        clearInterval(game.interval);
    }
    game.interval = setInterval(play1, game.speed);
}

function play1() {
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
    var g = document.getElementById('gen');
    g.innerText = 'Generations: ' + game.generations;
    game.generations++;
}

function saveSettings() {
    DataBase[userID].settings.splice(0, 1, game);
    window.localStorage.setItem('DataBase', JSON.stringify(DataBase));
}

const userID = findUserID();

function findUserID() {
    for (var i = 0; i < DataBase.length; i++) {
        if (DataBase[i].isonline === true) return i;
    }
}

