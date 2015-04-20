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

	this.simulationTimeDelta = 0.1;

	var self = this;
	this.animationFrame = function()
	{
		self.render();

		requestAnimationFrame(self.animationFrame);
	};

	this.simulationFrame = function()
	{
		self.update(self.simulationTimeDelta);
	};

	this.interval = setInterval(this.simulationFrame, 100);

	this.spawnCount = 0;
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
	if (lastWaveSpawnTime <= 0.0
	    || (currentTime - lastWaveSpawnTime) > waveSpawnInterval)
	{
		this.spawnWaves();

		this.lastWaveSpawnTime = currentTime;
	}

	var world = this.world;
	world.update(timeDelta);

	this.time = currentTime;
};

Game.prototype.spawnWaves = function()
{
	this.spawnCount += 1;

	var world = this.world;
	var teams = this.teams;

	var teamCount = teams.length;
	for (var teamIndex = 0; teamIndex < teamCount; teamIndex++)
	{
		var team = teams[teamIndex];
		var wave = team.getNextWave();
		var waveUnits = wave.getSpawnUnits();

		world.addUnits(waveUnits, teamIndex);
	}

	var team0Count = world.unitsTeam0.length;
	var team1Count = world.unitsTeam0.length;
	console.log("spawn " + this.spawnCount + ": "
	            + team0Count + " | " + team1Count);
};

Game.prototype.setCanvas = function(canvas)
{
	assertCanvas(canvas);

	this.canvas = canvas;
	this.initRenderer();
};

Game.prototype.initRenderer = function()
{
	this.renderer = new Renderer(this.canvas);
};

Game.prototype.render = function()
{
	var renderer = this.renderer;
	var world = this.world;
	renderer.renderWorld(world);
};
