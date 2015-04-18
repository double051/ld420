// Unit.js

var Unit = function()
{
	this.components = [];

	this.teamComponents = [];
	this.healthComponents = [];

	this.positionComponent = new PositionComponent();
};

Unit.prototype = {};

Unit.prototype.addComponent = function(component)
{
	this.components.push(component);

	if (component instanceof TeamComponent)
	{
		this.addTeamComponent(component);
	}

	if (component instanceof HealthComponent)
	{
		this.addHealthComponent(component);
	}

	component.onApplyComponent();
};

Unit.prototype.removeComponent = function(component)
{
	var components = this.components;
	components.remove(components.indexOf(component));

	if (component instanceof TeamComponent)
	{
		this.removeTeamComponent(component);
	}

	if (component instanceof HealthComponent)
	{
		this.removeHealthComponent(component);
	}
};

Unit.prototype.receiveAction = function(action)
{

};

Unit.prototype.addTeamComponent = function(teamComponent)
{
	this.teamComponents.push(teamComponent);
};

Unit.prototype.removeTeamComponent = function(teamComponent)
{
	var teamComponents = this.teamComponents;

	teamComponents.remove(teamComponents.indexOf(teamComponent));
};

Unit.prototype.addHealthComponent = function(teamComponent)
{
	this.teamComponents.push(teamComponent);
};

Unit.prototype.removeHealthComponent = function(healthComponent)
{
	var healthComponents = this.teamComponents;

	healthComponents.remove(healthComponents.indexOf(healthComponent));
};
