// Game.js

var Game = function()
{
	this.world = new World();

	this.teams = [];
	this.players = [];

	this.time = 0.0;

	// max game time: 15 minutes
	this.gameTimeMax = 60 * 15;

	// waves spawn every 20 seconds
	this.waveSpawnInterval = 20.0;
	this.lastWaveSpawnTime = 0.0;

	// resource acquisition rates, grows linear as the game progresses
	this.resourceGrantInterval = 1.0;
	this.resourceGrantMin = 10;
	this.resourceGrantMax = 100;
};

Game.prototype = {};

Game.prototype.addTeam = function(team)
{
	assertInstance(team, Team);
	this.teams.push(team);
};

Game.prototype.addPlayer = function(player)
{
	this.players.push(player);
};

Game.prototype.setWaveSpawnInterval = function(waveSpawnInterval)
{
	this.waveSpawnInterval = waveSpawnInterval;
};

Game.prototype.update = function(timeDelta)
{
	var oldTime = this.time;
	var currentTime = oldTime + timeDelta;

	var lastWaveSpawnTime = this.lastWaveSpawnTime;
	var waveSpawnInterval = this.waveSpawnInterval;
	if ((currentTime - lastWaveSpawnTime) > waveSpawnInterval)
	{
		this.spawnWaves();
	}
};

Game.prototype.spawnWaves = function()
{
	var world = this.world;
	var teams = this.teams;

	var teamCount = teams.length;
	for (var teamIndex = 0; teamIndex < teamCount; teamIndex++)
	{
		var team = teams[teamIndex];
		var wave = team.getNextWave();
		var waveUnits = wave.getNewUnits();

		world.addUnits(waveUnits);
	}
};
