// PositionComponent.js

var PositionComponent = function()
{
	this.position = [0.0, 0.0, 0.0];

	this.direction = [0.0, 0.0, 0.0];

	this.tempDirection = [0.0, 0.0, 0.0];
};

PositionComponent.prototype = {};

PositionComponent.prototype.setPosition = function(sourcePosition)
{
	var position = this.position;
	position[0] = sourcePosition[0];
	position[1] = sourcePosition[1];
	position[2] = sourcePosition[2];
};

PositionComponent.prototype.changePosition = function(positionDelta)
{
	var position = this.position;
	var pd = positionDelta;

	position[0] += pd[0];
	position[1] += pd[1];
	position[2] += pd[2];

	var positionDeltaManhattan = pd[0] + pd[1] + pd[2];
	if (positionDeltaManhattan > 0)
	{
		var positionDeltaMagnitude = Math.sqrt(pd[0] * pd[0]
		                                       + pd[1] * pd[1]
		                                       + pd[2] * pd[2]);
		var td = this.tempDirection;
		td[0] = pd[0] / positionDeltaMagnitude;
		td[1] = pd[1] / positionDeltaMagnitude;
		td[2] = pd[2] / positionDeltaMagnitude;

		this.setDirection(td);
	}
};

PositionComponent.prototype.setDirection = function(sourceDirection)
{
	var direction = this.direction;
	direction[0] = sourceDirection[0];
	direction[1] = sourceDirection[1];
	direction[2] = sourceDirection[2];
};