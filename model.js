function Model(_width, _height)
{
	var model = 
	{
		width: _width,
		height: _height,
		board: null,
		
		get: function(x, y)
		{
			return this.board[y][x];
		},
		
		set: function(x, y, type)
		{
			this.board[y][x] = type;
		},
		
		unset: function(x, y)
		{
			this.board[y][x] = 0;
		},
		
		fitsFigure: function(figure)
		{
			for (var i = 0; i < figure.points.length; i++)
			{
				if (figure.points[i].y < 0)
					return false;
				if (figure.points[i].y >= this.height)
					return false;
				if (figure.points[i].x < 0)
					return false;
				if (figure.points[i].x >= this.width)
					return false;
				if (this.get(figure.points[i].x, figure.points[i].y))
					return false;
			}
			return true;
		},
		
		placeFigure: function(figure)
		{
			for (var i = 0; i < figure.points.length; i++)
			{
				this.set(figure.points[i].x, figure.points[i].y, figure.type);
			}
		},

		removeFigure: function(figure)
		{
			for (var i = 0; i < figure.points.length; i++)
			{
				this.unset(figure.points[i].x, figure.points[i].y);
			}
		},
		
		isFullLine: function(y)
		{
			for (var x = 0; x < this.width; x++)
			{
				if (!this.get(x, y))
					return false;
			}
			return true;
		},
		
		freeLine: function(y)
		{
			for (var i = y - 1; i >= 0; i--)
			{
				for (var x = 0; x < this.width; x++)
				{
					this.board[i+1][x] = this.board[i][x];
				}
			}
			for (var j = 0; j < this.width; j++)
			{
				this.board[0][j] = 0;
			}
		},
		
		freeFullLines: function(figure)
		{
			var lines = 0;
			for (var y = this.height-1; y >= 0; y--)
			{
				if (this.isFullLine(y))
				{
					this.freeLine(y);
					lines++;
					y++;
				}
			}
			return lines;
		}
	};
	
	model.board = new Array(model.height);
	for (var y = 0; y < model.height; y++)
	{
		model.board[y] = new Array(model.width);
		for (var x = 0; x < model.width; x++)
		{
			model.board[y][x] = 0;
		}
	}
		
	return model;
}