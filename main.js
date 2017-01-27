

window.onload  = function(){
	
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext('2d');

	var buttons = [];
	for(var n = 0; n < 5; n++)
	{
		for(var m = 0; m < 5; m++)
		{
			var btn = new Button(ctx, m * 60, n * 60, 50, 50);
			buttons.push(btn);
			btn.draw();
		}
	}
	
	canvas.addEventListener('click', function(evt){
		var rect = this.getBoundingClientRect();
		for(var prop in buttons)
		{
			var x = evt.clientX - rect.left;
			var y = evt.clientY - rect.top;
			if(buttons[prop].clicked(x, y))
			{
				buttons[prop].redraw();
			}
		}
	});

};

function Button(ctx, x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.draw = function(){
		ctx.fillRect(x, y, width, height);	
	};
	
	this.clicked = function(clickX, clickY){
		if(clickX > x & clickX < x + width & clickY > y & clickY < y + height)
			return true;
		return false;
	};
	
	this.redraw = function(){
		ctx.clearRect(x, y, width, height);
		ctx.fillStyle = "#a3c2c2";
		ctx.fillRect(x, y, width, height);
	};

	
}