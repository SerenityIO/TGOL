var field = document.getElementById('field');

var game = {
	size: '20x10',
	
};


window.onload = function () {
	render();
};

function render() {
	var size = game.size.split('x');
	var height = +size[1], width = +size[0];
	
	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {

			createUserSegment()
		
		}
	}
}


function createUserSegment() {
	var div = document.createElement("div");
	div.className = 'square';
	div.onclick = function () {
		div.style.backgroundColor = "blue";
	};
	document.getElementById("field").appendChild(div);
}

function deleteField(){
	getElementByClassName('square');
	for (var i = 0; i < width * height; i++) {
			field.removeElement(square);
		}
		render();
	}

function destr() { 
	debugger
	deleteField();
}

function fieldSize(fieldsize) {
	if (game.size == "20x10"){
		document.getElementById(field).style.width = '300px';
	}
	if (game.size == "50x40"){
		document.getElementById(field).style.width = '700px';
	}
}

function handleChangeSize(event) {
	game.size = event.target.value;
	fieldSize(game.size);
	render();
}