var Engine = (function(){
	var d;
	var matrix = []; 
	var curStep = 'x';
	var stepColor = '#ffff1a';
	var completeX = '';
	var completeO = '';
	var intel;
	
	function Engine(dimension)
	{
		d = dimension;
		for(var i = 0; i < d; i++)
		{
			matrix.push(new Array(d).fill(0));
			completeX += 'x';
			completeO += 'o';
		}	
        intel = new Intel(matrix, 'x', 'o');		
	}
	
	Engine.prototype.tryStep = function(m,n){
		if(this.allowStep(m, n))
		{
			engine.doStep(m, n);
			engine.checkStep(m, n);
			engine.nextStep();
			window.dispatchEvent(new CustomEvent("goCPU"));
			return true;
		}
		return false;
	};
	
	
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
			gameOver(curStep);
			return;
		}		
		ar = [];
		for(var i = 0; i < d; i++)
		{
			ar.push(matrix[m][i]);
		}
		if(ar.join('') == completeX || ar.join('') == completeO)
		{
			gameOver(curStep);
			return;
		}
		ar = [];
		for(var i = 0, l = 0; i < d; i++, l++)
		{
			ar.push(matrix[i][l]);		
		}
		if(ar.join('') == completeX || ar.join('') == completeO)
		{
			gameOver(curStep);
			return;
		}
		ar = [];
		for(var i = 0, l = d; i < d; i++, l--)
		{
			ar.push(matrix[i][l]);		
		}
		if(ar.join('') == completeX || ar.join('') == completeO)
		{
			gameOver(curStep);
			return;
		}
		if(draw()){
			gameOver('DRAW');
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
	};
	
	Engine.prototype.goCPU = function(){
		return intel.doStep();
	};
	
	Engine.prototype.getStepColor = function(){
		return stepColor;
	};
	
	function gameOver(winner){
		setTimeout(function(){}, 2000);
		alert("Winner is " + winner);
	}
	
	function draw(){
		var dirtyCount = 0;
		var m = matrix;
		
		for(var col=0;col < m.length;col++){
			var dirty1 = false;
		    var dirty2 = false;
			for(var row=0;row < m.length;row++){
				if(m[row][col] == 'x'){
					dirty1 = true;
				}
				if(m[row][col] == 'o'){
					dirty2 = true;
				}
			}
			if(dirty1 && dirty2){
				dirtyCount++;
			}
		}
		for(var row=0;row < m.length;row++){
			var dirty1 = false;
		    var dirty2 = false;
			for(var col=0;col < m.length;col++){
				if(m[row][col] == 'x'){
					dirty1 = true;
				}
				if(m[row][col] == 'o'){
					dirty2 = true;
				}
			}
			if(dirty1 && dirty2){
				dirtyCount++;
			}
		}
		{
			var dirty1 = false;
		    var dirty2 = false;
			for(var i=0; i<m.length;i++){
				if(m[i][i] == 'x'){
					dirty1 = true;
				}
				if(m[i][i] == 'o'){
					dirty2 = true;
				}
			}
			if(dirty1 && dirty2){
				dirtyCount++;
			}
		}
		{
			var dirty1 = false;
		    var dirty2 = false;
			for(var col=0,row=m.length-1; col < m.length; col++,row--){
				if(m[row][col] == 'x'){
					dirty1 = true;
				}
				if(m[row][col] == 'o'){
					dirty2 = true;
				}
			}
			if(dirty1 && dirty2){
				dirtyCount++;
			}
		}
		
		if(dirtyCount == (m.length*2 +2)){
			return true;
		}
		return false;
	}
	
	return Engine;
})();