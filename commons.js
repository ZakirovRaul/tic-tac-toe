var EventListener = (function(){	
	var events = {};	
	function EventListener()
	{

	}
	EventListener.prototype.addEventListener = function(name, handler){
		if(events.hasOwnProperty(name))
		{
			events[name].push(handler);
		}
		else{
			events[name] = [handler];
		}
	};	
	EventListener.prototype.removeEventListener = function(name, handler){
		
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
	
	return EventListener;
})();