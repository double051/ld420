// WeaponComponent.js

var WeaponComponent = function()
{
	UnitComponent.call(this);

	// time until able to fire again
	this.cooldown = 0.0;
	this.cooldownRemaining = 0.0;

	// positive is damage (to enemies), negative is healing (to allies)
	this.damage = 0.0;

	// distance at which a unit can hit
	this.range = 0.0;
};

WeaponComponent.prototype = Object.create(UnitComponent.prototype);

WeaponComponent.prototype.getAction = function()
{
	var action = new WeaponAction();
	action.damage = this.damage;

	return action;
};

