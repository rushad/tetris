function Controller(_model, _view, _scoreElement, _levelElement)
{
	var NUMBER_OF_FIGURE_TYPES = 7;
	var SCORE_FOR_FIGURE = 1;
	var SCORE_FOR_CELL = 0.1;
	var SCORE_FOR_LINE = 10;
	var LINES_PER_LEVEL = 10;
	var NEXT_LEVEL_COEFF = 0.75;
	var START_INTERVAL = 1000;
	
	var controller = 
	{
		model: _model,
		view: _view,
		scoreElement: _scoreElement,
		levelElement: _levelElement,
		figure: null,
		score: 0,
		lines: 0,
		interval: START_INTERVAL,
		level: 1,
		
		draw: function()
		{
			this.view.clear();
			
			for (var y = 0; y < this.model.height; y++)
			{
				for (var x = 0; x < this.model.width; x++)
				{
					var type = this.model.get(x, y);
					if (type)
					{
						this.view.fillCellAt(x, y, type);
					}
				}
			}
		},
		
		drawScores: function()
		{
			this.scoreElement.innerHTML = "Score: " + Math.floor(this.score);
		},
		
		drawLevel: function()
		{
			this.levelElement.innerHTML = "Level: " + this.level;
		},

		randomFigure: function()
		{
			var figureType = Math.round(Math.random() * (NUMBER_OF_FIGURE_TYPES - 1) + 1);
			var figure;
			switch (figureType)
			{
				case 1:
					figure = new Figure1();
					break;
				case 2:
					figure = new Figure2();
					break;
				case 3:
					figure = new Figure3();
					break;
				case 4:
					figure = new Figure4();
					break;
				case 5:
					figure = new Figure5();
					break;
				case 6:
					figure = new Figure6();
					break;
				case 7:
					figure = new Figure7();
					break;
			}
			return figure;
		},
		
		newFigure: function()
		{
			var figure = this.randomFigure();
			
			if (!this.model.fitsFigure(figure))
				return false;

			this.model.placeFigure(figure);
			this.figure = figure;
			
			return true;
		},
		
		moveFigure:function()
		{
			this.model.removeFigure(this.figure);
			var movedFigure = this.figure.down();
			if (!this.model.fitsFigure(movedFigure))
			{
				this.model.placeFigure(this.figure);
				this.figure = null;
				this.score += SCORE_FOR_FIGURE * this.level;
				this.drawScores();
				this.lines += this.model.freeFullLines();
				if (this.level < 10 && this.lines > this.level * LINES_PER_LEVEL)
				{
					this.level++;
					this.interval *= NEXT_LEVEL_COEFF;
					this.drawLevel();
					Stop();
					Start(this);
				}
				this.loop();
			}
			else
			{
				this.model.placeFigure(movedFigure);
				this.figure = movedFigure;
			}
			this.draw();
		},
		
		gameOver: function()
		{
			Stop();
			alert("Game over!!!");
		},
		
		loop: function()
		{
			if (!this.figure)
			{
				if (!this.newFigure())
				{
					this.gameOver();
					return;
				}
				this.draw();
			}
			else
			{
				this.moveFigure();
			}
		},
		
		spacePressed: function()
		{
			if (this.figure)
			{
				this.model.removeFigure(this.figure);
				var tempFigure = this.figure;
				var movedFigure = tempFigure.down();
				while (this.model.fitsFigure(movedFigure))
				{
					this.score += SCORE_FOR_CELL * this.level;
					tempFigure = movedFigure;
					movedFigure = tempFigure.down();
				}
				this.model.placeFigure(tempFigure);
				this.figure = tempFigure;
				this.draw();
			}
		},
		
		leftPressed: function()
		{
			if (this.figure)
			{
				this.model.removeFigure(this.figure);
				var movedFigure = this.figure.left();
				if (!this.model.fitsFigure(movedFigure))
				{
					this.model.placeFigure(this.figure);
				}
				else
				{
					this.model.placeFigure(movedFigure);
					this.figure = movedFigure;
					this.draw();
				}
			}
		},

		rightPressed: function()
		{
			if (this.figure)
			{
				this.model.removeFigure(this.figure);
				var movedFigure = this.figure.right();
				if (!this.model.fitsFigure(movedFigure))
				{
					this.model.placeFigure(this.figure);
				}
				else
				{
					this.model.placeFigure(movedFigure);
					this.figure = movedFigure;
					this.draw();
				}
			}
		},

		downPressed: function()
		{
			if (this.figure)
			{
				this.model.removeFigure(this.figure);
				var movedFigure = this.figure.down();
				if (!this.model.fitsFigure(movedFigure))
				{
					this.model.placeFigure(this.figure);
				}
				else
				{
					this.score += SCORE_FOR_CELL * this.level;
					this.model.placeFigure(movedFigure);
					this.figure = movedFigure;
					this.draw();
				}
			}
		},
		
		turnPressed: function()
		{
			if (this.figure)
			{
				this.model.removeFigure(this.figure);
			
				var movedFigure = this.figure.turn();
				if (!this.model.fitsFigure(movedFigure))
				{
					this.model.placeFigure(this.figure);
				}
				else
				{
					this.model.placeFigure(movedFigure);
					this.figure = movedFigure;
					this.draw();
				}
			}
		}
	};
	
	return controller;
}