var DataBase = (JSON.parse(window.localStorage.getItem('DataBase')))
window.onload = function () {
    redirect();
    loadRender();
};


function redirect() {
    // DataBase.forEach(element => {
    //     if (element.isonline === true) {
    //         //alert("Welcome back," + element.email);
    //     }
    //     else {
    //         document.location.href = "../authorize/log.html";
    //     }
    // });
}

var flashback = [];
// flashback[0] = [];


var game = {
    size: '10x20',
    arr: []
}

var isPlaying = false;

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
    saveSettings();
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
            game.arr[i][j] = grid[i][j];
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
            game.arr[i][j] = grid[i][j];
        }
    }
    render();
    saveSettings();
}

function render() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            var cell = table.rows[i].cells[j];
            var isalive = grid[i][j];
            game.arr[i][j] = grid[i][j];

            cell.classList.toggle('alive', isalive);
        }

    }
    saveSettings();
    //  flashback.push(grid);
}

function play(speed) {
    setInterval(Play, speed);
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
    //  if (compare(flashback, grid) === true) return;

}

function compare(arr1, arr2) {
    // debugger
    let count = 0;
    var size = game.size.split('x');
    var cols = +size[1], rows = +size[0];


    for (let k = 0; k < arr1.length; k++) {
        var h = arr1[k];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (h[i][j] === arr2[i][j]) count++;
            }
        }
    }
    if (count === arr2.length) return true;
}

function saveSettings() {
    // console.log(DataBase[1].settings);
    // debugger
    console.log(game);
    DataBase[userID].settings.splice(0, 1, game);
    window.localStorage.setItem('DataBase', JSON.stringify(DataBase));
    

}
window.onbeforeunload = function () {
    saveSettings();
}

const userID = findUserID();


function findUserID() {
    for (var i = 0; i < DataBase.length; i++) {
        if (DataBase[i].isonline === true) return i;
    }
}


function loadRender() {
    fieldDelete();
    let size = DataBase[userID].settings[0].size.split('x');
    game.size = DataBase[userID].settings[0].size;
    grid = createGrid();


    for (let i = 0; i < size[0]; i++) {
        for (let j = 0; j < size[1]; j++) {
            console.log(grid[i][j]);
            grid[i][j] = DataBase[userID].settings[0].arr[i][j];

        }
    }


    


    render();
}