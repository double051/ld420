// Team.js

var Team = function(teamId)
{
	this.teamId = teamId;

	this.spawnPositionZ = 0.0;

	this.wave = new Wave(this);

	// temp add units
	var unitFactory = new UnitFactory();
	this.unitFactory = unitFactory;

	this.reset();
};

Team.prototype = {};

Team.prototype.reset = function()
{
	this.wave.units = [];

	var unitFactory = this.unitFactory;
	unitFactory.setUnitState();

	var unitCount = 30;
	for (var unitIndex = 0; unitIndex < unitCount; unitIndex++)
	{
		this.wave.addUnit(unitFactory.getUnitCopy());
	}

	var baseFactory = new BaseFactory();
	baseFactory.setUnitState();
	this.baseUnit = baseFactory.getUnitCopy();

	this.setSpawnPositionZ(this.spawnPositionZ);
};

Team.prototype.getNextWave = function()
{
	this.wave.addUnit(this.unitFactory.getUnitCopy());

	// only one wave for now
	var wave = this.wave;

	return wave;
};

Team.prototype.setSpawnPositionZ = function(spawnPositionZ)
{
	assertNumber(spawnPositionZ);

	this.spawnPositionZ = spawnPositionZ;
	this.wave.setSpawnPositionZ(spawnPositionZ);
	this.baseUnit.position[2] = spawnPositionZ;
};
