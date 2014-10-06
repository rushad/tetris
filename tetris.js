function Tetris(canvasId)
{
	var WIDTH_IN_CELLS = 10;
	var HEIGHT_IN_CELLS = 20;
	var CELL_WIDTH = 25;
	var CELL_HEIGHT = 25;
	var BACKGROUND_COLOR = "black";
	var GRID_COLOR = "gray";
	
	var canvasElement = document.getElementById(canvasId);
	if (!canvasElement || !canvasElement.getContext)
	{
		console.log("No canvas with id=" + canvasId);
		return;
	}

	var game = 
	{
		widthInCells: WIDTH_IN_CELLS,
		heightInCells: HEIGHT_IN_CELLS,
		cellWidth: CELL_WIDTH,
		cellHeight: CELL_HEIGHT,
		canvasWidth: WIDTH_IN_CELLS * CELL_WIDTH,
		canvasHeight: HEIGHT_IN_CELLS * CELL_HEIGHT,
		backgroundColor: BACKGROUND_COLOR,
		gridColor: GRID_COLOR,
		ctx: canvasElement.getContext("2d"),
		loop: null,
		figure: null,
		
		drawGameBoard: function() 
		{
			this.ctx.fillStyle = this.backgroundColor;
			this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
			this.ctx.strokeStyle = this.gridColor;
			this.ctx.lineWidth = 1;
			this.ctx.translate(0.5, 0.5);
			for(var x = 0; x <= this.widthInCells; ++x)
			{
				this.ctx.moveTo(x * this.cellWidth, 0);
				this.ctx.lineTo(x * this.cellWidth, this.canvasHeight);
				this.ctx.stroke();
			}
			for(var y = 0; y <= this.heightInCells; ++y)
			{
				this.ctx.moveTo(0, y * this.cellHeight);
				this.ctx.lineTo(this.canvasWidth, y * this.cellHeight);
				this.ctx.stroke();
			}		
		}
	};
	
	canvasElement.width = game.canvasWidth;
	canvasElement.height = game.canvasHeight;
	
	game.drawGameBoard();

	game.figure = new Figure(game);
	
/*	
	return 
	{
		dimWidth: 10,
		dimHeight: 20,
		cellWidth: 30,
		cellHeight: 30,
	var canvasWidth = dimWidth * cellWidth + 1;
	var canvasHeight = dimHeight * cellHeight + 1;
	var curX = 0;
	var curY = -1;
	var curFigure = 0;
	var canvas;
	var ctx;
	var loop = null;
*/	
}