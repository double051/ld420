// UnitComparators.js

// example:
// units.sort(UnitComparators.positionZDescending);

var UnitComparators = {};

// distance

UnitComparators.distanceAscending = function(position)
{
	return function(a, b)
	{
		var positionA = a.position;
		var positionB = b.position;

		var distanceAX = positionA[0] - position[0];
		var distanceAY = positionA[1] - position[1];
		var distanceAZ = positionA[2] - position[2];

		var distanceBX = positionB[0] - position[0];
		var distanceBY = positionB[1] - position[1];
		var distanceBZ = positionB[2] - position[2];

		var distanceA = ((distanceAX * distanceAX)
		                 + (distanceAY * distanceAY)
		                 + (distanceAZ * distanceAZ));

		var distanceB = ((distanceBX * distanceBX)
		                 + (distanceBY * distanceBY)
		                 + (distanceBZ * distanceBZ));

		return distanceA - distanceB;
	}
};

// position

// x

UnitComparators.positionXAscending = function(a, b)
{
	var index = VectorUnit.stateIndices.positionX;

	return a.state[index] - b.state[index];
};

UnitComparators.positionXDescending = function(a, b)
{
	var index = VectorUnit.stateIndices.positionX;

	return b.state[index] - a.state[index];
};

// y

UnitComparators.positionYAscending = function(a, b)
{
	var index = VectorUnit.stateIndices.positionY;

	return a.state[index] - b.state[index];
};

UnitComparators.positionYDescending = function(a, b)
{
	var index = VectorUnit.stateIndices.positionY;

	return b.state[index] - a.state[index];
};

// z

UnitComparators.positionZAscending = function(a, b)
{
	var index = VectorUnit.stateIndices.positionZ;

	return a.state[index] - b.state[index];
};

UnitComparators.positionZDescending = function(a, b)
{
	var index = VectorUnit.stateIndices.positionZ;

	return b.state[index] - a.state[index];
};

// body

// body radius

UnitComparators.bodyRadiusAscending = function(a, b)
{
	var index = VectorUnit.stateIndices.bodyRadius;

	return a.state[index] - b.state[index];
};

UnitComparators.bodyRadiusDescending = function(a, b)
{
	var index = VectorUnit.stateIndices.bodyRadius;

	return b.state[index] - a.state[index];
};

// health

UnitComparators.healthAscending = function(a, b)
{
	var index = VectorUnit.stateIndices.health;

	return a.state[index] - b.state[index];
};

UnitComparators.healthDescending = function(a, b)
{
	var index = VectorUnit.stateIndices.health;

	return b.state[index] - a.state[index];
};

// armor

UnitComparators.armorAscending = function(a, b)
{
	var index = VectorUnit.stateIndices.armor;

	return a.state[index] - b.state[index];
};

UnitComparators.armorDescending = function(a, b)
{
	var index = VectorUnit.stateIndices.armor;

	return b.state[index] - a.state[index];
};

// ability

// ability range

UnitComparators.rangeAscending = function(a, b)
{
	var index = VectorUnit.stateIndices.range;

	return a.state[index] - b.state[index];
};

UnitComparators.rangeDescending = function(a, b)
{
	var index = VectorUnit.stateIndices.range;

	return b.state[index] - a.state[index];
};

// ability change health

UnitComparators.changeHealthAscending = function(a, b)
{
	var index = VectorUnit.stateIndices.changeHealth;

	return a.state[index] - b.state[index];
};

UnitComparators.changeHealthDescending = function(a, b)
{
	var index = VectorUnit.stateIndices.changeHealth;

	return b.state[index] - a.state[index];
};

// ability radius

UnitComparators.abilityRadiusAscending = function(a, b)
{
	var index = VectorUnit.stateIndices.abilityRadius;

	return a.state[index] - b.state[index];
};

UnitComparators.abilityRadiusDescending = function(a, b)
{
	var index = VectorUnit.stateIndices.abilityRadius;

	return b.state[index] - a.state[index];
};

// ability falloff

UnitComparators.abilityFalloffAscending = function(a, b)
{
	var index = VectorUnit.stateIndices.abilityFalloff;

	return a.state[index] - b.state[index];
};

UnitComparators.abilityFalloffDescending = function(a, b)
{
	var index = VectorUnit.stateIndices.abilityFalloff;

	return b.state[index] - a.state[index];
};

// numbers

UnitComparators.numbersAscending = function(a, b)
{
	return a - b;
};

UnitComparators.numbersDescending = function(a, b)
{
	return b - a;
};

