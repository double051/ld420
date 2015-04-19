// WeaponAction.js

var WeaponAction = function()
{
	this.damage = 0.0;
};

WeaponAction.prototype = Object.create(UnitAction.prototype);

WeaponAction.prototype.onApplyAction = function(unit)
{
	var healthComponent = unit.getHealthComponent();

	healthComponent.changeHealth(-this.damage);
};