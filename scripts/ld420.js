// ld420.js

var LD420 = {};

LD420.init = function(canvasId)
{
	LD420.testUnits();

	LD420.testGame(canvasId);
};

LD420.testUnits = function()
{
	var unit0 = VectorUnit.new();
	unit0.destroy();

	var unit1 = VectorUnit.new();
	assertEqual(unit0, unit1);

	var unit2 = unit1.new();
	unit1.destroy();

	assertNotEqual(unit1, unit2);
};

LD420.testGame = function(canvasId)
{
	var game = new Game();

	var team0 = new Team(0);
	team0.setSpawnPositionZ(-50.0);

	var team1 = new Team(1);
	team1.setSpawnPositionZ(50.0);

	game.addTeam(team0);
	game.addTeam(team1);

	var canvas = document.getElementById(canvasId);
	game.setCanvas(canvas);
};
