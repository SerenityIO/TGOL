var field = document.getElementById('field');
var squareinf = [];

var arrLS = JSON.parse(window.localStorage.getItem('squareinf'));

var game = {
	size: '20x10',
	arr: [],
	arr2: []
};


function handleSquare(event) {

	var id = event.target.id;

	if (id != 'field') {
		if (event.target.style.backgroundColor === "") {
			event.target.style.backgroundColor = "blue";
			game.arr[id].selected = true;
		}
		else {
			event.target.style.backgroundColor = "";
			game.arr[id].selected = false;
		}
	}
}

window.onload = function () {
	redirect();
	render();
};

function redirect() {

	var temp = JSON.parse(localStorage.getItem('DataBase'));
	temp.forEach(element => {
		if (element.isonline === true) {
			//alert("Welcome back," + element.email);
		}
		else {
			document.location.href = "../authorize/log.html";
		}
	});
}

function render() {
	// ToDo: Тут тільки реальне використовування тільки для першого разу. 
	// ToDo: Ця функція має обновляти поля на основі даних в масиві

	var size = game.size.split('x');
	var height = +size[1], width = +size[0];

	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {
			createUserSegment(i + j);
			// if (game.arr[i + j].selected === true) {
			// 	document.getElementById(i + j).style.backgroundColor = 'blue';
			// }
			// else
			game.arr.push({ selected: false });
		}
	}
}

function createUserSegment(sum) {
	var div = document.createElement("div");
	div.className = 'square';
	div.id = sum;
	document.getElementById("field").appendChild(div);
}

function clearField() {
	// Done: Тут потрібно видаляти поля і в масиві game.arr 
	while (field.lastChild) {
		field.removeChild(field.lastChild);
		game.arr.shift();
	}
}

function Clear() {

	clearField();
	render();
}
function fieldSize() {
	if (game.size === "20x10") {
		var temp = document.getElementById('field');
		temp.style.height = '150px';
		temp.style.width = '300px';
	}
	if (game.size === "50x30") {
		var temp = document.getElementById("field");
		temp.style.width = '750px';
		temp.style.height = '450px';
	}
	if (game.size === "70x50") {
		var temp = document.getElementById('field');
		temp.style.height = '750px';
		temp.style.width = '1050px';
	}
}

function handleChangeSize(event) {
	game.size = event.target.value;
	clearField(game.size);
	fieldSize(game.size);
	render();
}

function randomGen() {
	// Я преписав функцію ген. Слідкуй за прикладом кодінгу
	// ToDo: перенеси робону з DOM в render()
	var field;

	for (var i = 0; i < game.arr.length; i++) {
		field = document.getElementById(i);
		if (Math.floor(Math.random() * 4) === 1) {
			field.style.backgroundColor = "blue";
			game.arr[i].selected = true;
		} else {
			field.style.backgroundColor = "white";
			game.arr[i].selected = false;
		}
	}
}


function play() {
	var size = game.size.split('x');
	var height = +size[1], width = +size[0];

	// ToDo: Тут надто багато хардкоду. Подивись алгоритм в тасці 

	for (var i = width; i !== 0; i--) {
		for (var j = height; j !== 0; j++) {
			var neighboors = 0;
			if (i > 0) if (game.arr[i - 1][j]) neighboors++;
			if (i > 0 && j > 0) if (game.arr[i - 1][j + 1]) neighboors++;
			if (i > 0 && j < height - 1) if (game.arr[i - 1][j + 1]) neighboors++;
			if (j < height - 1) if (game.arr[i][j + 1]) neighboors++;
			if (j > 0) if (game.arr[i][j - 1]) neighboors++;
			if (i < width - 1) if (game.arr[i + 1][j]) neighboors++;
			if (i < width - 1 && j > 0) if (game.arr[i + 1][j - 1]) neighboors++;
			if (i < width - 1 && height - 1) if (game.arr[i + 1][j + 1]) neighboors++;
			if (game.arr[i][j] && (neighboors < 2 || neighboors > 3)) game.arr2[i][j] = false;
			if (!game.arr[i][j] && neighboors === 3) game.arr2[i][j] = true;
		}
	}
}