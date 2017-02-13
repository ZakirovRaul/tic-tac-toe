var Engine = (function(){
	var d;
	var matrix = []; 
	var curStep = 'x';
	var stepColor = '#ffff1a';
	var completeX = '';
	var completeO = '';
	
	function Engine(dimension)
	{
		d = dimension;
		for(var i = 0; i < d; i++)
		{
			matrix.push(new Array(d).fill(0));
			completeX += 'x';
			completeO += 'o';
		}		
	}
	
	Engine.prototype.allowStep = function(m, n){
		return matrix[m][n] == 0;
	};
	
	Engine.prototype.doStep = function(m, n){
		matrix[m][n] = curStep;
	};
	
	Engine.prototype.checkStep = function(m, n){
		var ar = [];
        for(var i = 0; i < d; i++)
		{
			ar.push(matrix[i][n]);
		}
	    if(ar.join('') == completeX || ar.join('') == completeO)
		{
			alert('gg');
			return;
		}
		ar = [];
		for(var i = 0; i < d; i++)
		{
			ar.push(matrix[m][i]);
		}
		if(ar.join('') == completeX || ar.join('') == completeO)
		{
			alert('gg');
			return;
		}
		ar = [];
		for(var i = 0, l = 0; i < d; i++, l++)
		{
			ar.push(matrix[i][l]);		
		}
		if(ar.join('') == completeX || ar.join('') == completeO)
		{
			alert('gg');
			return;
		}
		ar = [];
		for(var i = 0, l = d; i < d; i++, l--)
		{
			ar.push(matrix[i][l]);		
		}
		if(ar.join('') == completeX || ar.join('') == completeO)
		{
			alert('gg');
			return;
		}
		
	};
	
	Engine.prototype.nextStep = function()
	{
		if(curStep == 'x')
		{
			curStep = 'o';
			stepColor = '#00e600';
		}
		else
		{
			curStep = 'x';
			stepColor = '#ffff1a';
		}
	}
	
	Engine.prototype.getStepColor = function(){
		return stepColor;
	};
	return Engine;
})();