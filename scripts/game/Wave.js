// Wave.js

var Wave = function()
{
	this.units = [];

	this.unitsBySizeDescending = [];
};

Wave.prototype = {};

Wave.prototype.addUnit = function(unit)
{
	assertInstance(unit, VectorUnit);

	this.units.push(unit);

	this.unitsByRadiusDescending.push(unit);
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

Wave.prototype.getNewUnits = function()
{
	// make a new wave of units
	var newUnits = [];

	var units = this.units;
	var unitCount = units.length;
	for (var unitIndex = 0; unitIndex < unitCount; unitIndex++)
	{
		var unit = units[unitIndex];
		var newUnit = unit.copy();
		newUnits.push(newUnit);
	}

	return newUnits;
};

Wave.prototype.sortUnits = function(untis, comparator)
{
	assertFunction(comparator);

	units.sort(comparator);
};

Wave.prototype.sortUnitsByBodyRadiusDescending = function()
{
	var unitsBySizeDescending = this.sortUnitsBySizeDescending();

	this.sortUnits(this.unitsBySizeDescending, function(a, b)
	{

	});
};



