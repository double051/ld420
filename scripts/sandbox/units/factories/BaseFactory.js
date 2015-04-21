// BaseFactory

var BaseFactory = function()
{
	UnitFactory.call(this);

	// defining a base
	this.speed = 0.0;
	this.bodyRadius = 20.0;

	this.maxHealth = 65535.0;
	this.armor = 5.0;

	this.range = 12.0;
	this.changeHealth = -10.0;
	this.armorPiercing = 3.0;

	this.abilityRadius = 0.0;
	this.abilityFalloff = 0.0;

	this.cooldown = 0.5;
};

BaseFactory.prototype = Object.create(UnitFactory.prototype);

BaseFactory.prototype.getUnitCopy = function()
{
	var unitCopy = this.unit.copy();

	return unitCopy;
};