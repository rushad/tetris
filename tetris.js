var WIDTH_IN_CELLS = 10;
var HEIGHT_IN_CELLS = 20;

var CELL_WIDTH = 25;
var CELL_HEIGHT = 25;

var FIGURE_COLORS = [ "black", "red", "lime", "blue", "yellow", "cyan", "magenta", "white" ];

var NUMBER_OF_FIGURE_TYPES = 7;

var SCORE_FOR_FIGURE = 1;
var SCORE_FOR_CELL = 0.1;
var SCORE_FOR_LINE = 10;

var LINES_PER_LEVEL = 10;

var NEXT_LEVEL_COEFF = 0.75;

var START_INTERVAL = 1000;

var KEY_SPACE = 32;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_P = 80;
var KEY_BREAK = 19;

var model;
var view;
var controller;
var board;
var loopId;

function loop()
{
	controller.loop();
}

function Start(controller)
{
	controller.loop();
	loopId = setInterval(loop, controller.interval);
	document.onkeydown = function(e)
	{
		switch (e.keyCode)
		{
			case KEY_SPACE:
				if (loopId)
					controller.spacePressed();
				break;
			case KEY_DOWN:
				if (loopId)
					controller.downPressed();
				break;
			case KEY_LEFT:
				if (loopId)
					controller.leftPressed();
				break;
			case KEY_UP:
				if (loopId)
					controller.turnPressed();
				break;
			case KEY_RIGHT:
				if (loopId)
					controller.rightPressed();
				break;
			case KEY_P:
			case KEY_BREAK:
				controller.pausePressed();
				break;
		}
	};
	document.onmousedown = function(e)
	{
		var x = controller.figure.points[0].x;
		var y = controller.figure.points[0].y;

		var rect = board.getBoundingClientRect();
		var ex = e.x - rect.left;
		var ey = e.y - rect.top;

		if (ey < (y - 2) * CELL_HEIGHT)
			controller.turnPressed();
		else if (ey > (y + 4) * CELL_HEIGHT)
			controller.spacePressed();
		else if (ex < x * CELL_WIDTH)
			controller.leftPressed();
		else if (ex > x * CELL_WIDTH)
			controller.rightPressed();
	}
}

function Stop()
{
	clearInterval(loopId);
	loopId = null;
}

function TetrisCanvas(canvasId, scoreId, levelId)
{
	model = new Model(WIDTH_IN_CELLS, HEIGHT_IN_CELLS);
	view = new CanvasView(canvasId, model.width, model.height);
	controller = new Controller(model, view, document.getElementById(scoreId), document.getElementById(levelId));

	board = document.getElementById(canvasId);

	Start(controller);
}

function TetrisSvg(svgId, scoreId, levelId)
{
	model = new Model(WIDTH_IN_CELLS, HEIGHT_IN_CELLS);
	view = new SvgView(svgId, model.width, model.height);
	controller = new Controller(model, view, document.getElementById(scoreId), document.getElementById(levelId));

	Start(controller);
}
