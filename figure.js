function Figure(game)
{
	var figure =
	{
		x: 3,
		y: 0,
		color: "blue",
		drawWithColor: function(color)
		{
			game.ctx.fillStyle = color;
			game.ctx.fillRect(this.x * game.cellWidth + 1, this.y * game.cellHeight + 1, game.cellWidth - 2, game.cellHeight - 2);
			game.ctx.fillRect((this.x + 1) * game.cellWidth + 1, this.y * game.cellHeight + 1, game.cellWidth - 2, game.cellHeight - 2);
			game.ctx.fillRect((this.x + 2) * game.cellWidth + 1, this.y * game.cellHeight + 1, game.cellWidth - 2, game.cellHeight - 2);
			game.ctx.fillRect((this.x + 3) * game.cellWidth + 1, this.y * game.cellHeight + 1, game.cellWidth - 2, game.cellHeight - 2);
		},
		
		clear: function()
		{
			this.drawWithColor(game.backgroundColor);
		},
		
		draw: function()
		{
			this.drawWithColor(this.color);
		},
		
		lower: function()
		{
			this.clear();
			this.y++;
			this.draw();
		},
		
		start: function()
		{
			var a = this;
			setInterval(a.lower, 1000);
		}
	};
	
	figure.draw();
	figure.lower();
	figure.lower();

	figure.start();
	
	return figure;
}