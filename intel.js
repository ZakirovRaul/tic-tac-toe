var Intel = function(){
	var matrix, user, cpu;
	
	function Intel(matrix, userStep, cpuStep)
	{
		this.matrix = matrix;
		this.user = userStep;
		this.cpu = cpuStep;
	}
	
	Intel.prototype.doStep = function(){
		var cpuSteps = [];
		var mustBlockStep;
		// checking rows
		for(var row=0; row < this.matrix.length; row++)
		{
			var cpuDirtyLane = false;
			var userDirtyLane = false;
			var cpuStepWeight = 0;
			var userStepWeight = 0;
		    for(var col=0; col < this.matrix.length; col++)
			{
				if(this.matrix[col][row] == this.user){
					cpuDirtyLane = true;
					userStepWeight++;
				}	
                if(this.matrix[col][row] == this.cpu){
					userDirtyLane = true;
					cpuStepWeight++;
				}					
			}
			if(!cpuDirtyLane){
				for(var col=0; col < this.matrix.length; col++)
				{
					if(this.matrix[col][row] == 0){
						if(cpuStepWeight == (this.matrix.length - 1)){
							return [col, row];
						}
						cpuSteps.push([cpuStepWeight, [col, row]]);
					}
				}				
			}
			if(!userDirtyLane && userStepWeight == (this.matrix.length -1)){
				for(var col=0; col < this.matrix.length; col++)
				{
					if(this.matrix[col][row] == 0){
						mustBlockStep = [col, row];
						break;
				    }
				}
			}
		}
        //checking columns
		for(var col=0; col < this.matrix.length; col++)
		{
			var cpuDirtyLane = false;
			var userDirtyLane = false;
			var cpuStepWeight = 0;
			var userStepWeight = 0;
		    for(var row=0; row < this.matrix.length; row++)
			{
				if(this.matrix[col][row] == this.user){
					cpuDirtyLane = true;
					userStepWeight++;
				}	
                if(this.matrix[col][row] == this.cpu){
					cpuStepWeight++;
					userDirtyLane = true;
				}					
			}
			if(!cpuDirtyLane)
			{
				for(var row=0; row < this.matrix.length; row++)
				{
					if(this.matrix[col][row] == 0){
						if(cpuStepWeight == (this.matrix.length - 1)){
							return [col, row];
						}
						cpuSteps.push([cpuStepWeight, [col, row]]);
					}
				}
			}
			if(!userDirtyLane && userStepWeight == (this.matrix.length -1)){
				for(var row=0; row < this.matrix.length; row++)
				{
					if(this.matrix[col][row] == 0){
						mustBlockStep = [col, row];
						break;
				    }
				}
			}
		}
        //checking diagonal
		{
            var cpuDirtyLane = false;
			var userDirtyLane = false;
			var cpuStepWeight = 0;
			var userStepWeight = 0;
			for(var i=0; i < this.matrix.length; i++)
			{
				if(this.matrix[i][i] == this.user){
					userStepWeight++;
					cpuDirtyLane = true;
				}	
				if(this.matrix[i][i] == this.cpu){
					cpuStepWeight++;
					userDirtyLane = true;
				}
			}
			if(!cpuDirtyLane)
			{
				for(var i=0; i < this.matrix.length; i++)
				{
					if(this.matrix[i][i] == 0){
						if(cpuStepWeight == (this.matrix.length - 1)){
							return [i, i];
						}
						cpuSteps.push([cpuStepWeight, [i, i]]);
					}
				}
			}
			if(!userDirtyLane && userStepWeight == (this.matrix.length -1)){
				for(var i=0; i < this.matrix.length; i++)
				{
					if(this.matrix[i][i] == 0){
						mustBlockStep = [i, i];
						break;
				    }
				}
			}
		}
		
		{
            var cpuDirtyLane = false;
			var userDirtyLane = false;
			var cpuStepWeight = 0;
			var userStepWeight = 0;
			for(var i=0, y=this.matrix.length-1; i < this.matrix.length; i++,y--)
			{
				if(this.matrix[i][y] == this.user){
					userStepWeight++;
					cpuDirtyLane = true;
				}	
				if(this.matrix[i][y] == this.cpu){
					cpuStepWeight++;
					userDirtyLane = true;
				}
			}
			if(!cpuDirtyLane)
			{
			    for(var i=0, y=this.matrix.length-1; i < this.matrix.length; i++,y--)
				{
					if(this.matrix[i][y] == 0){
						if(cpuStepWeight == (this.matrix.length - 1)){
							return [i, y];
						}
						cpuSteps.push([cpuStepWeight, [i, y]]);
					}
				}
			}
			if(!userDirtyLane && userStepWeight == (this.matrix.length -1)){
			    for(var i=0, y=this.matrix.length-1; i < this.matrix.length; i++,y--)
				{
					if(this.matrix[i][y] == 0){
						mustBlockStep = [i, y];
						break;
				    }
				}
			}
		}
	
		if(mustBlockStep != undefined){
		    return mustBlockStep;
		}

 
		if(cpuSteps.length > 0){
			cpuSteps.sort();
		    var topcpuStepWeight = cpuSteps[cpuSteps.length - 1][0];
			var mustStep = cpuSteps.filter(function(val){return val[0] == topcpuStepWeight;});		
            if(mustStep.length > 0){
				var randomOne = Math.floor(Math.random() * (mustStep.length - 1));
				return mustStep[randomOne][1];
			}
			else{
				
			}
		}
		else{
			
		}
		
		/*if(rows.length > 0){
			rows.sort();
			var row = rows[rows.length - 1][1];
			for(var i=0; i < this.matrix.length; i++){
				if(this.matrix[i][row] == 0){
					return [i, row];
				}
			}
		}
		
		if(cols.length > 0){
			cols.sort();
			var col = cols[cols.length - 1][1];
			for(var i=0; i < this.matrix.length; i++){
				if(this.matrix[col][i] == 0){
					return [col, i];
				}
			}
		}*/
		
		return null;
      		
	};
	
	
	
	return Intel;
}();