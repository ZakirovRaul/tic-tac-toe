var Control = (function(){	
	var events = {};	
	function Control()
	{}
	Control.prototype.addEventListener = function(name, handler){
		if(events.hasOwnProperty(name))
		{
			events[name].push(handler);
		}
		else{
			events[name] = [handler];
		}
	};	
	Control.prototype.removeEventListener = function(name, handler){
		
		if(!events.hasOwnProperty(name))
		{
			return;
		}
		
	    var index = events[name].indexOf(handler);
		if(index != -1)
		{
			events[name].splice(index, 1);
		}
	};		
	this.fireEvent = function(name, args){
		if(!events.hasOwnProperty(name))
		{
			return;
		}
		
		if(!args || !args.length)
		{
			args = [];
		}
		
		for(var i=0; i < events[name].length; i++)
		{
			events[name][i].apply(null, args);
		}
	};
	
	return Control;
})();


var Button = (function(){
	Button.prototype = Object.create(Control.prototype);
	Button.prototype.constructor = Button;

	function Button(ctx, x, y, width, height, m, n)
	{
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.m = m;
		this.n = n;
	}
	
	Button.prototype.draw = function(){
		this.ctx.fillRect(this.x, this.y, this.width, this.height);	
	};
	
	Button.prototype.click = function(clickX, clickY){
		if(clickX > this.x & clickX < this.x + this.width & clickY > this.y & clickY < this.y + this.height)
		{
			fireEvent('click', [this]);
			return true;
		}
		return false;
	};
	
	Button.prototype.redraw = function(color){
		this.ctx.clearRect(this.x, this.y, this.width, this.height);
		this.ctx.fillStyle = color;
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	};	
	return Button;
})();