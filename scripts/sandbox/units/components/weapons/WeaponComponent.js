// WeaponComponent.js

var WeaponComponent = function()
{
	UnitComponent.call(this);

	this.cooldown = 0.0;
	this.damage = 0.0;
	this.friendlyFire = false;
};

WeaponComponent.prototype = Object.create(UnitComponent.prototype);

WeaponComponent.prototype.getAction = function()
{
	var action = new WeaponAction();
	action.damage = this.damage;

	return action;
};

