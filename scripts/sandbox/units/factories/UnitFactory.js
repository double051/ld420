// UnitFactory

var UnitFactory = function()
{
	this.unit = VectorUnit.new();

	// defining a marine
	this.speed = 2.0;
	this.bodyRadius = 1.0;

	this.maxHealth = 50.0;
	this.armor = 0.0;

	this.range = 5.0;
	this.changeHealth = -6.0;
	this.armorPiercing = 0.0;

	this.abilityRadius = 0.0;
	this.abilityFalloff = 0.0;

	this.cooldown = 0.8;
};

UnitFactory.prototype = {};

UnitFactory.prototype.setUnitState = function()
{
	var state = this.unit.state;
	var indicies = VectorUnit.stateIndices;

	state[indicies.speed] = this.speed;
	state[indicies.bodyRadius] = this.bodyRadius;

	state[indicies.maxHealth] = this.maxHealth;
	state[indicies.health] = this.maxHealth;
	state[indicies.armor] = this.armor;

	state[indicies.range] = this.range;
	state[indicies.changeHealth] = this.changeHealth;
	state[indicies.armorPiercing] = this.armorPiercing;

	state[indicies.abilityFalloff] = this.abilityFalloff;
	state[indicies.abilityRadius] = this.abilityRadius;

	state[indicies.cooldown] = this.cooldown;
	state[indicies.cooldownRemaining] = 0.0;
};