// PositionComponent.js

var PositionComponent = function()
{
	this.position = [0.0, 0.0, 0.0];
};

PositionComponent.prototype = {};

PositionComponent.prototype.setPosition = function(x, y, z)
{
	var position = this.position;
	position[0] = x;
	position[1] = y;
	position[2] = z;
};

