// Player.js

var Player = function()
{
	this.name = null;
	this.team = null;
};

Player.prototype = {};

Player.prototype.setName = function(name)
{
	this.name = name;
};

Player.prototype.setTeam = function(team)
{
	this.team = team;
};
