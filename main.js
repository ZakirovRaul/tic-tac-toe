


window.onload  = function(){
	var dimension = 3;
	var engine = new Engine(dimension);
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext('2d');

	var buttons = [];
	for(var n = 0; n < dimension; n++)
	{
		for(var m = 0; m < dimension; m++)
		{
			var button = new Button(ctx, m * 60, n * 60, 50, 50, m, n);
			buttons.push(button);
			button.addEventListener('click', function(btn){
			
				if(engine.allowStep(btn.m, btn.n))
				{
					btn.redraw(engine.getStepColor());
					engine.doStep(btn.m, btn.n);
					engine.checkStep(btn.m, btn.n);
					engine.nextStep();
				}
			});
			button.draw();
		}
	}
	
	canvas.addEventListener('click', function(evt){
		var rect = this.getBoundingClientRect();
		for(var btn of buttons)
		{
			var x = evt.clientX - rect.left;
			var y = evt.clientY - rect.top;
			btn.goClick(x, y);
		}
	});

};

