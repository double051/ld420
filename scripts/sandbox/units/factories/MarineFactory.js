// MarinFactor.js

var MarineFactory = function()
{
	this.teamComponent = null;
	this.positionComponent = null;

	// defining a marine
	var health = 55.0;
	var armor = 0.0;
	var armorType = ArmorType.Light;

	var sight = 9.0;
	var speed = 2.25;

	var damage = 6.0;
	var cooldown = 0.86;

	this.unit = VectorUnit.new();
};

MarineFactory.prototype = {};

MarineFactory.prototype.getUnitCopy = function()
{
	var unitCopy = this.unit.copy();

	unitCopy.state[VectorUnit.stateIndices.speed] += (2 * Math.random() - 1);
	unitCopy.state[VectorUnit.stateIndices.changeHealth] += (40
	                                                         * Math.random()
	                                                         - 20);
	unitCopy.state[VectorUnit.stateIndices.range] += (10 * Math.random() - 5);

	return unitCopy;
};