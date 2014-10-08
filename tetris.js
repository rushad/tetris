var model;
var view;
var controller;
var loopId;

function loop()
{
	controller.loop();
}

function Start(controller)
{
	loop();
	loopId = setInterval(loop, 1000);
	document.onkeydown = function(e)
	{
		switch (e.keyCode)
		{
			case 32:
				controller.spacePressed();
				break;
			case 40:
				controller.downPressed();
				break;
			case 37:
				controller.leftPressed();
				break;
			case 38:
				controller.turnPressed();
				break;
			case 39:
				controller.rightPressed();
				break;
		}
	};
}

function Stop()
{
	clearInterval(loopId);
	loopId = null;
}

function Tetris(canvasId)
{
	var WIDTH_IN_CELLS = 10;
	var HEIGHT_IN_CELLS = 20;
	
	model = new Model(WIDTH_IN_CELLS, HEIGHT_IN_CELLS);
	view = new CanvasView(canvasId, model.width, model.height);
	controller = new Controller(model, view);

	Start(controller);
}

