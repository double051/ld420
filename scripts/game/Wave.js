// Wave.js

var Wave = function()
{
	this.units = [];
};

Wave.prototype = {};

Wave.prototype.addUnit = function(unit)
{
	this.units.push(unit);
};

Wave.prototype.addUnits = function(units)
{
	var unitCount = units.length;
	for (var unitIndex = 0; unitIndex < unitCount; unitIndex++)
	{
		var unit = units[unitIndex];
		this.addUnit(unit);
	}
};

Wave.prototype.getUnits = function()
{

};
