// HealthComponent.js

var HealthComponent = function()
{
	this.maxHealth = 100;
	this.health = this.maxHealth;
};

HealthComponent.prototype = {};

HealthComponent.prototype.setHealth = function(health)
{
	assertNumber(health);

	this.health = health;
};

HealthComponent.prototype.setMaxHealth = function(maxHealth)
{
	assertNumber(maxHealth);

	this.maxHealth = maxHealth;
};

HealthComponent.prototype.changeHealth = function(healthDelta)
{
	assertNumber(healthDelta);

	var health = this.health;

	// negative healthDelta is damage
	health += healthDelta;

	if (health > this.maxHealth)
	{
		health = this.maxHealth;
	}

	this.health = health;
};

HealthComponent.prototype.changeMaxHealth = function(maxHealthDelta)
{
	assertNumber(maxHealthDelta);

	this.maxHealth += maxHealthDelta;

	this.changeHealth(0);
};