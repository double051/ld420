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

World.prototype.addUnits = function(units)
{
	assertArrayInstances(units, Unit);

	var unitCount = units.length;
	for (var unitIndex = 0; unitIndex < unitCount; unitIndex++)
	{
		var unit = units[unitIndex];
		this.addUnit(unit);
	}
};

World.prototype.getUnits = function()
{
	return this.units;
};