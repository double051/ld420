// World.js

var World = function()
{
	this.units = [];
};

World.prototype = {};

World.prototype.addUnit = function(unit)
{
	this.units.push(unit);
};