var field = document.getElementById('field');
var squareinf = [];

var arrLS = JSON.parse(window.localStorage.getItem('squareinf'));

var game = {
	size: '20x10',
	arr: []
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
	00
	redirect();
	render();
};

function redirect() {
	DataBase.forEach(element => {
		if (element.isonline === true) {
			//alert("Welcome back," + element.email);
		}
		else {
			document.location.href = "./log.html";
		}
	});
}

function render() {
	// ToDo: Тут тільки реальне використовування тільки для першого разу. 
	// ToDo: Ця функція має обновляти поля на основі даних в масиві
	
	var size = game.size.split('x');
	var height = +size[1], width = +size[0];
	var n = 0;
	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {
			createUserSegment(n);
			game.arr.push({ selected: false });
			n++;
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
	// ToDo: Тут потрібно видаляти поля і в масиві game.arr
	while (field.lastChild) {
		field.removeChild(field.lastChild);
	}
}

function Clear() {
	// ToDo: Ця функція не викликається ніде

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

	var neighbors = 0;
	var temp = 0;
	// ToDo: Тут надто багато хатдкоду. Подивись алгоритм в тасці 
	for (var k = 0; k < 200; k++) {
		neighbors = 0;

		if (k == 0 || k == 19 || k == 180 || k == 199 || k == 20 || k == 40 || k == 60 || k == 80 || k == 100 || k == 120 || k == 140 || k == 160 || k == 39 || k == 59 || k == 79 || k == 99 || k == 119 || k == 139 || k == 159 || k == 179 || (k < 20 && k > 0) || k < 199 && k > 180) {
			debugger
			if (k == 0) {
				temp = k + 1;
				(game.arr[temp].selected === true) ? neighbors++ : {};
				temp = k + 20;
				(game.arr[temp].selected === true) ? neighbors++ : {};
				temp = k + 21;
				(game.arr[temp].selected === true) ? neighbors++ : {};
			}
			if (k == 19) {
				temp = k - 1;
				(game.arr[temp].selected === true) ? neighbors++ : {};
				temp = k + 19;
				(game.arr[temp].selected === true) ? neighbors++ : {};
				temp = k + 20;
				(game.arr[temp].selected === true) ? neighbors++ : {};

			}
			if (k == 180) {
				temp = k - 20;
				(game.arr[temp].selected === true) ? neighbors++ : {};
				temp = k - 19;
				(game.arr[temp].selected === true) ? neighbors++ : {};
				temp = k + 1;
				(game.arr[temp].selected === true) ? neighbors++ : {};
			}
			if (k == 199) {
				(game.arr[k - 21].selected === true) ? neighbors++ : {};
				(game.arr[k - 20].selected === true) ? neighbors++ : {};
				(game.arr[k - 1].selected === true) ? neighbors++ : {};
			}
			if (k == 20 || k == 40 || k == 60 || k == 80 || k == 100 || k == 120 || k == 140 || k == 160) {
				(game.arr[k - 20].selected === true) ? neighbors++ : {};
				(game.arr[k - 19].selected === true) ? neighbors++ : {};
				(game.arr[k + 1].selected === true) ? neighbors++ : {};
				(game.arr[k + 20].selected === true) ? neighbors++ : {};
				(game.arr[k + 21].selected === true) ? neighbors++ : {};
			}
			if (k == 39 || k == 59 || k == 79 || k == 99 || k == 119 || k == 139 || k == 159 || k == 179) {
				(game.arr[k - 21].selected === true) ? neighbors++ : {};
				(game.arr[k - 20].selected === true) ? neighbors++ : {};
				(game.arr[k - 1].selected === true) ? neighbors++ : {};
				(game.arr[k + 19].selected === true) ? neighbors++ : {};
				(game.arr[k + 20].selected === true) ? neighbors++ : {};
			}
			if (k < 20 && k > 0) {
				(game.arr[k - 1].selected === true) ? neighbors++ : {};
				(game.arr[k + 1].selected === true) ? neighbors++ : {};
				(game.arr[k + 19].selected === true) ? neighbors++ : {};
				(game.arr[k + 20].selected === true) ? neighbors++ : {};
				(game.arr[k + 21].selected === true) ? neighbors++ : {};
			}
			if (k < 199 && k > 180) {
				(game.arr[k - 21].selected === true) ? neighbors++ : {};
				(game.arr[k - 20].selected === true) ? neighbors++ : {};
				(game.arr[k - 19].selected === true) ? neighbors++ : {};
				(game.arr[k - 1].selected === true) ? neighbors++ : {};
				(game.arr[k + 1].selected === true) ? neighbors++ : {};
			}
		}
		else if (k < 200) {
			debugger
			temp = k - 21;
			(game.arr[temp].selected === true) ? neighbors++ : {};
			temp = k - 20;
			(game.arr[temp].selected === true) ? neighbors++ : {};
			temp = k - 19;
			(game.arr[temp].selected === true) ? neighbors++ : {};
			temp = k - 1;
			(game.arr[temp].selected === true) ? neighbors++ : {};
			temp = k + 1;
			(game.arr[temp].selected === true) ? neighbors++ : {};
			temp = k + 19;
			(game.arr[temp].selected === true) ? neighbors++ : {};
			temp = k + 20;
			(game.arr[temp].selected === true) ? neighbors++ : {};
			temp = k + 21;
			(game.arr[temp].selected === true) ? neighbors++ : {};
		}

		if (game.arr[k].selected === true) {
			if (neighbors > 3 || neighbors < 2) {
				document.getElementById(k).selected = false;
				document.getElementById(k).style.backgroundColor = 'white';
			}
		}
		if (game.arr[k].selected === false) {
			if (neighbors == 3) {
				document.getElementById(k).selected = true;
				document.getElementById(k).style.backgroundColor = 'blue';
			}
		}

	}
}
