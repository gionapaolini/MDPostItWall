var CIRCLE_DISTANCE = 10;
var CIRCLE_RADIUS = 1;
var ANGLE_CHANGE =50;
var MAX_SEE_AHEAD = 10;
function Postit(pText, id, wall){
	this.wanderAngle = 10;
	this.text = pText;
	this.wall = wall;
	this.id = id; 
	this.active = false;
	this.self = this;
	this.position = new Victor(floor(random(100, windowWidth - 100)),floor(random(100, document.documentElement.scrollHeight - 100)));
	this.velocity = new Victor(0,1);
	this.cmyDiv = createDiv("");
	this.cmyDiv.class("cmySquare");
	this.cmyDiv.id(id);
	$("#"+this.id).append("<div class='insidePostit' id='insidePostit"+this.id+"'><input type='text' class='contentPostit' id='content"+this.id+"' value='"+this.text+"'></div>");
	this.cmyDiv.position(this.position.x,this.position.y);
	this.cmyDiv.mouseClicked((function () {
	
		//wall.removePostit(this);
		if($("#"+this.id).hasClass("cmySquare")){
			$("#insidePostit"+this.id).prepend("<button class='closeButton'>X</button>");
			$("#"+this.id).switchClass( "cmySquare", "cmySquareBig", 1000, "easeInOutQuad" );
			activateKeyboard("content"+this.id);

			$(".closeButton").click(function  () {
				$(this).parent().parent().switchClass( "cmySquareBig", "cmySquare", 1000, "easeInOutQuad" );
				$(this).remove();
					
				
			});
		}
		
		
	}).bind(this));
	


	this.setPosition = function(x, y) {
	        this.position.x = x;
	        this.position.y = y;

	        this.cmyDiv.position(x, y);
	}
	
	

	this.removeDiv = function  () {
		this.cmyDiv.remove();
	}



	this.move = function  () {
		if($("#"+this.id).hasClass("cmySquare")){
			this.velocity = this.velocity.add(this.wander()).normalize().multiplyScalar(1);
			this.position = this.position.add(this.velocity);
			this.cmyDiv.position(this.position.x, this.position.y);
		}
	}



	this.wander = function  () {
		
		   // Calculate the circle center
		   var circleCenter;
		   circleCenter = this.velocity.clone();
		   circleCenter.normalize();
		   circleCenter.multiplyScalar(CIRCLE_DISTANCE);
		   //
		   // Calculate the displacement force
		   var displacement;
		   displacement = new Victor(0, -1);
		   displacement.multiplyScalar(CIRCLE_RADIUS);
		   //
		   // Randomly change the vector direction
		   // by making it change its current angle
		   this.setAngle(displacement, this.wanderAngle);
		   
		   //
		   // Change wanderAngle just a bit, so it
		   // won't have the same value in the
		   // next game frame.
		   this.wanderAngle += Math.random() * ANGLE_CHANGE - ANGLE_CHANGE * .5;
		   //
		   // Finally calculate and return the wander force
		   var wanderForce;
		   wanderForce = circleCenter.add(displacement);
		   return wanderForce;
		}
		 
	this.setAngle = function  (vector, value) {
	   var len = vector.length();

	   vector.x = Math.cos(value) * len;
	   vector.y = Math.sin(value) * len;
	}

	this.avoidObstacle = function  () {
		var ahead = this.position.add(this.velocity.normalize()).multiplyScalar(MAX_SEE_AHEAD);
		if(ahead.x<10 || ahead.y<10 || ahead.x>500 || ahead.y>500){
			avoidance_force = normalize(ahead).multiplyScalar(2);
		}
	}








	
	
}

