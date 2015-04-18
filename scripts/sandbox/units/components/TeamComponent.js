// TeamComponent.js

var TeamComponent = function()
{
	UnitComponent.call(this);

	this.team = null;
};

TeamComponent.prototype = Object.create(UnitComponent.prototype);

TeamComponent.prototype.setTeam = function(team)
{
	this.team = team;
};