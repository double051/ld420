// Unit.js

var Unit = function()
{
	// state components
	this.teamComponent = null;
	this.positionComponent = null;
	this.healthComponent = null;

	// action components
	this.movementComponent = null;
	this.weaponComponent = null;
	this.abilityComponent = null;

	// pretty components
	this.bodyComponent = null;
	this.renderComponent = null;

	// lingering effects (self-repair, damage over time, slow / stun)
	this.effectComponents = null;
};

Unit.objects = [];
Unit.new = function()
{
	var object = null;
	var objects = this.objects;

	if (this.objects.length > 0)
	{
		object = objects.pop();
	}
	else
	{
		object = this.allocate();
	}

	return object;
};

Unit.allocate = function()
{
	return new Unit();
};

Unit.prototype = {};

Unit.prototype.objects = Unit.objects;

Unit.prototype.allocate = function()
{
	Unit.allocate.call(this);
};

Unit.prototype.new = function()
{
	Unit.new.call(this);
};

Unit.prototype.copy = function()
{
	var copy = Unit.new();
	copy.copyProperties(this);

	return copy;
};

Unit.prototype.destroy = function()
{
	this.objects.push(this);
};

Unit.prototype.copyProperties = function(source)
{
	this.teamComponent = source.teamComponent.copy();
	this.positionComponent = source.positionComponent.copy();
	this.healthComponent = source.healthComponent.copy();
	this.weaponComponent = source.weaponComponent.copy();
	this.abilityComponent = source.abilityComponent.copy();
	this.renderComponent = source.renderComponent.copy();

	var effectComponents = [];
	var sourceEffectComponents = source.effectComponents;

	var effectCount = source.effectComponents.length;
	for (var effectIndex = 0; effectIndex < effectCount; effectIndex++)
	{
		var sourceEffectComponent = sourceEffectComponents[effectIndex];
		var effectComponent = sourceEffectComponent.copy();
		effectComponents.push(effectComponent);
	}

	this.effectComponents = effectComponents;
};

Unit.prototype.applyAction = function(action)
{
	assertInstance(action, UnitAction);

	action.onApplyAction(this);
};

Unit.prototype.setTeamComponent = function(teamComponent)
{
	assertInstance(teamComponent, TeamComponent);

	this.teamComponent = teamComponent;
};

Unit.prototype.setHealthComponent = function(healthComponent)
{
	assertInstance(healthComponent, HealthComponent);

	this.healthComponent = healthComponent;
};

Unit.prototype.getPositionComponent = function()
{
	return this.positionComponent;
};

Unit.prototype.getHealthComponent = function()
{
	return this.healthComponent;
};

