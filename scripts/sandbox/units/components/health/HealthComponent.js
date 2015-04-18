// HealthComponent.js

var HealthComponent = function()
{
	this.maxHealth = 100;
	this.health = this.maxHealth;
};

HealthComponent.prototype = {};



HealthComponent.prototype.changeHealth = function(healthDelta)
{
	var health = this.health;

	// negative healthDelta is damage
	health += healthDelta;

	if (health < 0)
	{

	}

	this.health = health;
};

HealthComponent.prototype.changeMaxHealth = function(maxHealthDelta)
{
	this.maxHealth += maxHealthDelta;

	this.changeHealth(0);
};