var Button = (function(){
	//Button.prototype = Object.create(EventListener.prototype);
	//Button.prototype = new EventListener();
	//Button.prototype.constructor = Button;

	function Button(ctx, x, y, width, height, m, n)
	{	
	    this.events = [];
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
			this.fireEvent('onClick', [this]);
			return true;
		}
		return false;
	};
	
	Button.prototype.redraw = function(color){
		this.ctx.clearRect(this.x, this.y, this.width, this.height);
		this.ctx.fillStyle = color;
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	};	
	
	Button.prototype.addEventListener = function(name, handler){
		if(this.events.hasOwnProperty(name))
		{
			this.events[name].push(handler);
		}
		else{
			this.events[name] = [handler];
		}
	};	
	
	Button.prototype.removeEventListener = function(name, handler){
		
		if(!this.events.hasOwnProperty(name))
		{
			return;
		}
		
	    var index = this.events[name].indexOf(handler);
		if(index != -1)
		{
			this.events[name].splice(index, 1);
		}
	};	
	
	Button.prototype.fireEvent = function(name, args){
		if(!this.events.hasOwnProperty(name))
		{
			return;
		}
		
		if(!args || !args.length)
		{
			args = [];
		}
		
		for(var i=0; i < this.events[name].length; i++)
		{
			this.events[name][i].apply(null, args);
		}
	};
	return Button;
})();