// MoveAction.js

var MoveAction = function()
{
	UnitAction.call(this);

	this.positionDelta = [0.0, 0.0, 0.0];
};

MoveAction.prototype = Object.create(UnitAction.prototype);

MoveAction.prototype.setPositionDelta = function(x, y, z)
{
	this.positionDelta[0] = x;
	this.positionDelta[1] = y;
	this.positionDelta[2] = z;
};

MoveAction.prototype.onApplyAction = function(unit)
{
	var positionComponent = unit.getPositionComponent();

	positionComponent.changePosition(this.positionDelta);
};
