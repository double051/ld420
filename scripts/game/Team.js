// Team.js

var Team = function(teamId)
{
	this.teamId = teamId;

	this.wave = new Wave(this);
};

Team.prototype = {};

Team.prototype.getNextWave = function()
{
	// only one wave for now
	var wave = this.wave;

	return wave;
};

