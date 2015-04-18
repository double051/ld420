// CharmComponent.js

var CharmComponent = function()
{
	this.duration = 5.0;
	this.age = 0.0;
	this.teamComponent = null;
};

CharmComponent.prototype = Object.create(EffectComponent.prototype);

CharmComponent.prototype.setTeamComponent = function(teamComponent)
{
	this.teamComponent = teamComponent;
};

CharmComponent.prototype.onApplyComponent = function(unit)
{
	unit.addComponent(this.teamComponent);
};

CharmComponent.prototype.onUpdateComponent = function(unit, time)
{
	this.age += time;
	if (this.age >= this.duration)
	{
		unit.removeComponent(this);
	}
};

CharmComponent.prototype.onRemoveComponent = function(unit)
{
	unit.removeComponent(this.teamComponent);
};
