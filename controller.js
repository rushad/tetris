function Controller(model, view)
{
	var NUMBER_OF_FIGURE_TYPES = 7;
	var controller = 
	{
		model: model,
		view: view,
		figure: null,
		
		draw: function()
		{
			view.clear();
			
			for (var y = 0; y < model.height; y++)
			{
				for (var x = 0; x < model.width; x++)
				{
					if (model.get(x, y))
					{
						view.fillCellAt(x, y);
					}
				}
			}
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
			
			if (!model.fitsFigure(figure))
				return false;

			model.placeFigure(figure);
			this.figure = figure;
			
			return true;
		},
		
		moveFigure:function()
		{
			model.removeFigure(this.figure);
			var movedFigure = this.figure.down();
			if (!model.fitsFigure(movedFigure))
			{
				model.placeFigure(this.figure);
				this.figure = null;
				model.freeFullLines();
				loop();
			}
			else
			{
				model.placeFigure(movedFigure);
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
				model.removeFigure(this.figure);
				var tempFigure = this.figure;
				var movedFigure = tempFigure.down();
				while (model.fitsFigure(movedFigure))
				{
					tempFigure = movedFigure;
					movedFigure = tempFigure.down();
				}
				model.placeFigure(tempFigure);
				this.figure = tempFigure;
				this.draw();
			}
		},
		
		leftPressed: function()
		{
			if (this.figure)
			{
				model.removeFigure(this.figure);
				var movedFigure = this.figure.left();
				if (!model.fitsFigure(movedFigure))
				{
					model.placeFigure(this.figure);
				}
				else
				{
					model.placeFigure(movedFigure);
					this.figure = movedFigure;
					this.draw();
				}
			}
		},

		rightPressed: function()
		{
			if (this.figure)
			{
				model.removeFigure(this.figure);
				var movedFigure = this.figure.right();
				if (!model.fitsFigure(movedFigure))
				{
					model.placeFigure(this.figure);
				}
				else
				{
					model.placeFigure(movedFigure);
					this.figure = movedFigure;
					this.draw();
				}
			}
		},

		downPressed: function()
		{
			if (this.figure)
			{
				model.removeFigure(this.figure);
				var movedFigure = this.figure.down();
				if (!model.fitsFigure(movedFigure))
				{
					model.placeFigure(this.figure);
				}
				else
				{
					model.placeFigure(movedFigure);
					this.figure = movedFigure;
					this.draw();
				}
			}
		},
		
		turnPressed: function()
		{
			if (this.figure)
			{
				model.removeFigure(this.figure);
			
				var movedFigure = this.figure.turn();
				if (!model.fitsFigure(movedFigure))
				{
					model.placeFigure(this.figure);
				}
				else
				{
					model.placeFigure(movedFigure);
					this.figure = movedFigure;
					this.draw();
				}
			}
		}
	};
	
	return controller;
}