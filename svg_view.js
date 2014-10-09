function SvgView(elementId, _width, _height)
{
	var CELL_WIDTH = 25;
	var CELL_HEIGHT = 25;
	var GRID_COLOR = "gray";

	var view =
	{
		svg: document.getElementById(elementId),
		svgns: "http://www.w3.org/2000/svg",
		width: _width,
		height: _height,
		cellWidth: CELL_WIDTH,
		cellHeight: CELL_HEIGHT,
		canvasWidth: _width * CELL_WIDTH + 1,
		canvasHeight: _height * CELL_HEIGHT + 1,
		gridColor: GRID_COLOR,
		cells: new Array(),
		
		init: function() 
		{
			for (var x = 0; x <= this.width; ++x)
			{
				this.line(x * this.cellWidth + 0.5, 0, x * this.cellWidth + 0.5, this.canvasHeight, GRID_COLOR);
			}
			for (var y = 0; y <= this.height; ++y)
			{
				this.line(0, y * this.cellHeight + 0.5, this.canvasWidth, y * this.cellHeight + 0.5, GRID_COLOR);
			}
		},
		
		clear: function()
		{
			for (var i = 0, cell; cell = this.cells[i++];)
				this.svg.removeChild(cell);
			this.cells.length = 0;
		},
		
		fillCellAt: function(x, y, type)
		{
			this.cells.push(this.rect(x * this.cellWidth + 1, y * this.cellHeight + 1, this.cellWidth - 1, this.cellHeight - 1, FIGURE_COLORS[type]));
		},
		
		pause: function()
		{
			var shadow = document.createElementNS(this.svgns, "text");
			shadow.setAttributeNS(null, "font-family", "Times");
			shadow.setAttributeNS(null, "font-size", 25);
			shadow.setAttributeNS(null, "fill", "black");
			shadow.setAttributeNS(null, "text-anchor", "middle");
			shadow.setAttributeNS(null, "x", this.canvasWidth / 2 + 2);
			shadow.setAttributeNS(null, "y", this.canvasHeight / 2 + 2);
			shadow.innerHTML = "Press 'P' to continue";
			this.svg.appendChild(shadow);
			this.cells.push(shadow);

			var text = document.createElementNS(this.svgns, "text");
			text.setAttributeNS(null, "font-family", "Times");
			text.setAttributeNS(null, "font-size", 25);
			text.setAttributeNS(null, "fill", "white");
			text.setAttributeNS(null, "text-anchor", "middle");
			text.setAttributeNS(null, "x", this.canvasWidth / 2);
			text.setAttributeNS(null, "y", this.canvasHeight / 2);
			text.innerHTML = "Press 'P' to continue";
			this.svg.appendChild(text);
			this.cells.push(text);
		},
		
		line: function(x1, y1, x2, y2, color)
		{
			var line = document.createElementNS(this.svgns, "line");
			line.setAttributeNS(null, "x1", x1);
			line.setAttributeNS(null, "y1", y1);
			line.setAttributeNS(null, "x2", x2);
			line.setAttributeNS(null, "y2", y2);
			line.setAttributeNS(null, "stroke", color);
			line.setAttributeNS(null, "stroke-width", 1);
			this.svg.appendChild(line);
		},
		
		rect: function(x, y, width, height, color)
		{
			var rect = document.createElementNS(this.svgns, "rect");
			rect.setAttributeNS(null, "x", x);
			rect.setAttributeNS(null, "y", y);
			rect.setAttributeNS(null, "width", width);
			rect.setAttributeNS(null, "height", height);
			rect.setAttributeNS(null, "fill", color);
			this.svg.appendChild(rect);
			return rect;
		}
	};

	view.init();
	
	return view;
}