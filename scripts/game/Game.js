// Game.js

var Game = function()
{
	this.world = new World();

	this.teams = [];
	this.players = [];
};

Game.prototype = {};

Game.prototype.addPlayer = function(player)
{
	this.players.push(player);
};

