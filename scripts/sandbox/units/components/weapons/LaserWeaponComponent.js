// LaserWeaponComponent

var LaserWeaponComponent = function()
{
	WeaponComponent.call(this);

	this.cooldown = 1.0;
	this.damage = 10.0;
};

LaserWeaponComponent.prototype = Object.create(WeaponComponent.prototype);


