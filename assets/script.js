
$("#add").click(function(){
	wall.addPostIt("GNAAGGNO");
});



function activateKeyboard(div){

	$("#"+div).keyboard({ layout: 'qwerty' });
	$("#"+div).getkeyboard().reveal();
}


 var wall;

function setup() {
  noCanvas();
  wall = new Wall(texts); 
}

function draw () {
	wall.movePostit();
}