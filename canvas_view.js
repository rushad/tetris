function CanvasView(elementId, width, height)
{
	var CELL_WIDTH = 25;
	var CELL_HEIGHT = 25;
	var GRID_COLOR = "gray";
	var FIGURE_COLOR = "yellow";
	var FIGURE_COLORS = [ "black", "red", "lime", "blue", "yellow", "cyan", "magenta", "white" ];
	var canvasElement = document.getElementById(elementId);
	if (!canvasElement || !canvasElement.getContext)
	{
		console.log("No canvas with id=" + elementId);
		return;
	}
	
	var view =
	{
		width: width,
		height: height,
		cellWidth: CELL_WIDTH,
		cellHeight: CELL_HEIGHT,
		canvasWidth: width * CELL_WIDTH + 1,
		canvasHeight: height * CELL_HEIGHT + 1,
		gridColor: GRID_COLOR,
		figureColor: FIGURE_COLOR,
		ctx: canvasElement.getContext("2d"),
		
		init: function() 
		{
			this.ctx.strokeStyle = this.gridColor;
			this.ctx.lineWidth = 1;
			for (var x = 0; x <= this.width; ++x)
			{
				this.ctx.moveTo(x * this.cellWidth + 0.5, 0);
				this.ctx.lineTo(x * this.cellWidth + 0.5, this.canvasHeight);
				this.ctx.stroke();
			}
			for (var y = 0; y <= this.height; ++y)
			{
				this.ctx.moveTo(0, y * this.cellHeight + 0.5);
				this.ctx.lineTo(this.canvasWidth, y * this.cellHeight + 0.5);
				this.ctx.stroke();
			}
			this.clear();
		},
		
		clear: function()
		{
			for (var y = 0; y < this.height; y++)
			{
				for (var x = 0; x < this.width; x++)
				{
					this.ctx.clearRect(x * this.cellWidth + 1, y * this.cellHeight + 1, this.cellWidth-1, this.cellHeight - 1);
				}
			}
		},
		
		fillCellAt: function(x, y, type)
		{
			this.ctx.fillStyle = FIGURE_COLORS[type];
			this.ctx.fillRect(x * this.cellWidth + 1, y * this.cellHeight + 1, this.cellWidth-1, this.cellHeight - 1);
		}
	};
	
	canvasElement.width = view.canvasWidth;
	canvasElement.height = view.canvasHeight;
	
	view.init();
	
	return view;
}