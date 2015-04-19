// ArmorComponent

var ArmorType =
    {
	    Light : "Light",
	    Heavy : "Heavy"
    };

var ArmorComponent = function()
{
	HealthComponent.call(this);

	// reduce incoming damage by this amount
	// negative armor would increase incoming damage
	this.armor = 1.0;

	this.armorType = ArmorType.Light;
};

ArmorComponent.prototype = Object.create(HealthComponent.prototype);

ArmorComponent.prototype.changeHealth = function(healthDelta)
{
	assertNumber(healthDelta);

	if (healthDelta < 0)
	{
		healthDelta += this.armor;

		// armor cannot heal, cannot stop all damage
		healthDelta = Math.min(-1.0, healthDelta);
	}

	HealthComponent.prototype.changeHealth.call(this, healthDelta);
};

ArmorComponent.prototype.copy = function()
{
	var copy = HealthComponent.prototype.copy.call(this);

	return copy;
};

ArmorComponent.prototype.copyProperties = function(copy)
{
	copy.armor = armor;
	copy.armorType = armorType;
};

ArmorComponent.prototype.setArmor = function(armor)
{
	assertNumber(armor);
	this.armor = armor;
};

ArmorComponent.prototype.setArmorType = function(armorType)
{
	assertIn(armorType, ArmorType);
	this.armorType = armorType;
};
