function Figure()
{
	var figure = 
	{
		points:
		[
			{x: 0, y: 0},
			{x: 0, y: 0},
			{x: 0, y: 0},
			{x: 0, y: 0},
		],
		
		down: function()
		{
			var movedFigure = new Figure();
			for (var i = 0; i < this.points.length; i++)
			{
				movedFigure.points[i].x = this.points[i].x;
				movedFigure.points[i].y = this.points[i].y + 1;
			}
			return movedFigure;
		},
		
		left: function()
		{
			var movedFigure = new Figure();
			for (var i = 0; i < this.points.length; i++)
			{
				movedFigure.points[i].x = this.points[i].x - 1;
				movedFigure.points[i].y = this.points[i].y;
			}
			return movedFigure;
		},

		right: function()
		{
			var movedFigure = new Figure();
			for (var i = 0; i < this.points.length; i++)
			{
				movedFigure.points[i].x = this.points[i].x + 1;
				movedFigure.points[i].y = this.points[i].y;
			}
			return movedFigure;
		},
		
		turn: function()
		{
			var m00 = 0, m01 = 1;
			var m10 = -1, m11 = 0;

			var movedFigure = new Figure();
			
			for (var i = 0; i < this.points.length; i++)
			{
				dx = this.points[i].x - this.points[0].x;
				dy = this.points[i].y - this.points[0].y;
				movedFigure.points[i].x = dx * m00 + dy * m01 + this.points[0].x;
				movedFigure.points[i].y = dx * m10 + dy * m11 + this.points[0].y;
			}
			return movedFigure;
		}
	};

	return figure;
}