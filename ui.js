var UI = (function(){	
    var engine;
	var canvas, ctx, dimension;
	var buttons = [];
	
	function UI(_engine, _dimension){
		engine = _engine;
		dimension = _dimension;
		canvas = document.getElementById("myCanvas");
	    ctx = canvas.getContext('2d');
	}
	
	UI.prototype.init = function(){		
		for(var n = 0; n < dimension; n++)
		{
			for(var m = 0; m < dimension; m++)
			{
				var button = new Button(ctx, m * 60, n * 60, 50, 50, m, n);
				buttons.push(button);
				button.addEventListener('onClick', function(evt){
					if(engine.allowStep(evt.m, evt.n)){
						engine.doStep(evt.m, evt.n);
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
		
		engine.addEventListener('onStep', function(evt){
		    var btnId = evt[0] + evt[1]*dimension;
		    buttons[btnId].redraw(engine.getStepColor());
		});
	};

	
	return UI;
})();