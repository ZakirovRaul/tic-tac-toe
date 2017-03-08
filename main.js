var engine;
var buttons = [];
var dimension;

window.addEventListener('goCPU', function(e){ 
    
	var step = engine.goCPU();
	if(step != null){
	   var btnId = step[0] + step[1]*dimension;
	   var btn = buttons[btnId];
	   btn.redraw(engine.getStepColor());
	   engine.doStep(step[0], step[1]);
	   engine.checkStep(step[0], step[1]);
	   engine.nextStep();
	}
	
});


window.onload  = function(){
dimension = 3;
engine = new Engine(dimension);
var gui = new UI(dimension);
gui.init(engine);
	

	

};

