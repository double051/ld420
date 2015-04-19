// MovementComponent.js

var MovementComponent = function()
{
	this.speed = 0.0;
};

MovementComponent.prototype = Object.create(UnitComponent.prototype);

MovementComponent.prototype.setSpeed = function(speed)
{
	this.speed = speed;
};
