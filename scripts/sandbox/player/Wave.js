// Wave.js

var Wave = function()
{
	this.spawnPositionZ = 0.0;
	this.units = [];

	this.unitsByBodyRadiusAscending = [];
	this.unitsByBodyRadiusDescending = [];
};

Wave.prototype = {};

Wave.prototype.setSpawnPositionZ = function(positionZ)
{
	this.spawnPositionZ = positionZ;
};

Wave.prototype.addUnit = function(unit)
{
	assertInstance(unit, VectorUnit);

	this.units.push(unit);

	this.unitsByBodyRadiusAscending.push(unit);
	this.unitsByBodyRadiusDescending.push(unit);
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

Wave.prototype.removeUnit = function(unit)
{
	this.removeUnitFromArray(unit, this.units);
	this.removeUnitFromArray(unit, this.unitsByBodyRadiusDescending)
};

Wave.prototype.removeUnitFromArray = function(unit, array)
{
	var unitIndex = array.indexOf(unit);
	assert(unitIndex > -1);
	this.units.splice(unitIndex, 1);
};

Wave.prototype.removeUnits = function(units)
{
	var unitCount = units.length;
	for (var unitIndex = 0; unitIndex < unitCount; unitIndex++)
	{
		var unit = units[unitIndex];
		this.removeUnit(unit);
	}
};

Wave.prototype.setUnitSpawnPositions = function()
{
	var spawnPositionZ = this.spawnPositionZ;

	var ringIndex = 0;
	var ringBodyRadius = 0.0;
	var ringBodyRadians = 0.0;

	var spawnRadius = 3.0;
	var spawnRadians = 0.0;

	var spawnZPositionCumulative = 0.2;

	var units = this.sortUnitsByBodyRadiusDescending();
	var unitCount = units.length;
	for (var unitIndex = 0; unitIndex < unitCount; unitIndex++)
	{
		var unit = units[unitIndex];
		var bodyRadius = unit.state[VectorUnit.stateIndices.bodyRadius];

		var bodyRadians = 0.0;
		if (spawnRadius !== 0.0)
		{
			bodyRadians = Math.asin(bodyRadius / spawnRadius);
		}

		spawnRadians += bodyRadians;

		if (spawnRadius <= 0.0
		    || bodyRadius > ringBodyRadius
		    || (spawnRadians + bodyRadians + ringBodyRadians) > (Math.PI * 2))
		{
			ringIndex += 1;
			spawnRadians = 0.0;
			spawnRadius += ringBodyRadius;
			spawnRadius += bodyRadius;
			ringBodyRadius = bodyRadius;

			bodyRadians = Math.asin(bodyRadius / spawnRadius);
			ringBodyRadians = bodyRadians;
		}

		var position = unit.position;
		position[0] = spawnRadius * Math.cos(spawnRadians);
		position[1] = spawnRadius * Math.sin(spawnRadians);
		position[2] = spawnPositionZ + (spawnPositionZ > 0 ? 1 : -1)
		                               * (unitIndex * spawnZPositionCumulative);
	}
};

Wave.prototype.getSpawnUnits = function()
{
	this.setUnitSpawnPositions();

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

Wave.prototype.sortUnits = function(units, comparator)
{
	assertFunction(comparator);

	units.sort(comparator);
};

Wave.prototype.sortUnitsByBodyRadiusAscending = function()
{
	this.sortUnits(this.unitsByBodyRadiusAscending,
	               UnitComparators.bodyRadiusAscending);
	return this.unitsByBodyRadiusAscending;
};

Wave.prototype.sortUnitsByBodyRadiusDescending = function()
{
	this.sortUnits(this.unitsByBodyRadiusDescending,
	               UnitComparators.bodyRadiusDescending);
	return this.unitsByBodyRadiusDescending;
};
