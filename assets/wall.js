function Wall(data){
	this.postit = [];

	for(var i=0;i<texts.length;i++){
		this.postit.push(new Postit(data[i].text,data[i].id,this));
	}
	

	this.addPostIt = function(text) {
		var newPost = new Postit(text,floor(random(0, 9999999)),this);
		this.postit.push(newPost);

		$.ajax({
		type: "POST",
		url: " /",
		data:{text: newPost.text, id: newPost.id},
		success: function  (data) {
			alert("Data sent");
			
		}
	});

	}

	this.removePostit = function(postitobj){
		var index = this.postit.indexOf(postitobj);


		alert(postitobj.text + index);
		if (index > -1) {
		    this.postit.splice(index, 1);
		}

		postitobj.removeDiv();

		$.ajax({
			type: "delete",
			url: "/",
			data: {id: postitobj.id},
			success: function  (data) {
				alert("Deleted");
			}
		});

	}

	this.movePostit = function () {
		for(var i=0;i<this.postit.length;i++){
			this.postit[i].move();
		}
	}
}