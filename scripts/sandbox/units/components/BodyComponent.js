// BodyComponent.js

var BodyComponent = function()
{
	this.radius = 1.0;
};

BodyComponent.prototype = Object.create(UnitComponent.prototype);

BodyComponent.prototype.setRadius = function(radius)
{
	this.radius = radius;
};

BodyComponent.prototype.getRadius = function()
{
	return this.radius;
};
