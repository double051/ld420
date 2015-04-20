// Team.js

var Team = function(teamId)
{
	this.teamId = teamId;

	this.spawnPositionZ = 0.0;

	this.wave = new Wave(this);

	// temp add units
	this.unitFactory = new UnitFactory();
	this.unitFactory.setUnitState();

	var unit = this.unitFactory.unit;
	var unitCount = 11;
	for (var unitIndex = 0; unitIndex < unitCount; unitIndex++)
	{
		this.wave.addUnit(unit.copy());
	}
};

Team.prototype = {};

Team.prototype.getNextWave = function()
{
	// only one wave for now
	var wave = this.wave;

	return wave;
};

Team.prototype.setSpawnPositionZ = function(spawnPositionZ)
{
	assertNumber(spawnPositionZ);

	this.spawnPositionZ = spawnPositionZ;
	this.wave.setSpawnPositionZ(spawnPositionZ);
};
