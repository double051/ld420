// VectorUnit.js

var VectorUnit = function()
{
	var stateCount = this.stateNames.length;

	this.state = new Float32Array(stateCount);

	this.renderComponent = null;
};

// names of all state values
VectorUnit.stateNames =
	[
		"positionX",
		"positionY",
		"positionZ",

		"bodyRadius",

		"health",
		"armor",

		"range",
		"changeHealth",
		"armorPiercing",

		"abilityRadius",
		"abilityFalloff"
	];

VectorUnit.stateIndices =
{
	positionX      : 0,
	positionY      : 1,
	positionZ      : 2,
	bodyRadius     : 3,
	health         : 4,
	armor          : 5,
	range          : 6,
	changeHealth   : 7,
	armorPiercing  : 8,
	abilityRadius  : 9,
	abilityFalloff : 10
};

VectorUnit.objects = [];

VectorUnit.new = function()
{
	var object = null;

	var objects = this.objects;
	if (objects.length > 0)
	{
		object = objects.pop();
	}
	else
	{
		object = new VectorUnit();
	}

	return object;
};

VectorUnit.prototype = {};

VectorUnit.prototype.stateNames = VectorUnit.stateNames;

VectorUnit.prototype.objects = VectorUnit.objects;

VectorUnit.prototype.copy = function()
{
	var copy = this.new();

	copy.copyState(this.state);
};

VectorUnit.prototype.copyState = function(sourceState)
{
	assertInstance(sourceState, Float32Array);

	this.state.set(sourceState);
};

VectorUnit.prototype.attackTargets = function(sourceUnit, targetUnits)
{
	assertInstance(unit, VectorUnit);

	var indices = this.stateIndices;
	var state = this.state;
	var unitState = this.unit.state;

	// source
	var changeHealth = state[indices.changeHealth];
	var armorPiercing = state[indices.armorPiercing];

	var targetUnitCount = targetUnits.length;
	if (targetUnitCount > 0)
	{
		this.attackTarget(sourceUnit, targetUnits[0]);

		for (var targetIndex = 1; targetIndex < targetCount; targetIndex++)
		{
			var target = targetUnits[targetIndex];

		}

		var health = state[indices.health];
		var armor = state[indices.armor];

		var absorbed = Math.max(-armor - armorPiercing);
		health -= changeHealth(Math.max(0, armor - armorPiercing));
	}
};

VectorUnit.prototype.attackTarget = function(sourceUnit, targetUnit)
{

};
