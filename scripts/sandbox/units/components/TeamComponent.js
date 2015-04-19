// TeamComponent.js

var TeamComponent = function()
{
	UnitComponent.call(this);

	this.team = null;
};

TeamComponent.objects = [];

TeamComponent.new = function()
{
	var object = UnitComponent.new.call(this);

	return object;
};

TeamComponent.allocate = function()
{
	return new TeamComponent();
};

TeamComponent.prototype = Object.create(UnitComponent.prototype);

TeamComponent.prototype.objects = TeamComponent.objects;

TeamComponent.prototype.allocate = function()
{
	return TeamComponent.allocate.call(this);
};

TeamComponent.prototype.new = function()
{
	return TeamComponent.new.call(this);
};

TeamComponent.prototype.copyProperties = function(copy)
{
	UnitComponent.prototype.copyProperties.call(this, copy);

	copy.team = this.team;
};

TeamComponent.prototype.destroy = function()
{
	this.team = null;

	UnitComponent.prototype.destroy.call(this);
};

TeamComponent.prototype.setTeam = function(team)
{
	this.team = team;
};