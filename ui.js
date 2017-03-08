var UI = (function(){	
	var canvas, ctx, dimension;
	var buttons = [];
	
	function UI(_dimension){
		canvas = document.getElementById("myCanvas");
	    ctx = canvas.getContext('2d');
		dimension = _dimension;
	}
	
	UI.prototype.init = function(engine){
		for(var n = 0; n < dimension; n++)
		{
			for(var m = 0; m < dimension; m++)
			{
				var button = new Button(ctx, m * 60, n * 60, 50, 50, m, n);
				buttons.push(button);
				button.addEventListener('click', function(evt){
					if(engine.tryStep(evt.m, evt.n)){
						evt.redraw(engine.getStepColor());
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
				btn.click(x, y);
			}
		});

	};

	
	return UI;
})();