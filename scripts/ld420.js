// ld420.js

var LD420 = {};

LD420.init = function(canvasId)
{
	LD420.testUnits();
	LD420.testUnitComponents();

	LD420.testGame();
	LD420.testRenderer();

	LD420.initCanvas(canvasId);
};

LD420.testUnits = function()
{
	var unit0 = Unit.new();
	unit0.destroy();

	var unit1 = Unit.new();
	assertEqual(unit0, unit1);

	var unit2 = unit1.new();
	unit1.destroy();

	assertNotEqual(unit1, unit2);
};

LD420.testUnitComponents = function()
{
	var unitComponent0 = UnitComponent.new();
	unitComponent0.destroy();

	var unitComponent1 = UnitComponent.new();
	unitComponent1.destroy();

	var unitComponent2 = UnitComponent.new();

	assertEqual(unitComponent0, unitComponent1);
	assertEqual(unitComponent1, unitComponent2);
};

LD420.initCanvas = function(canvasId)
{
	var canvas = document.getElementById(canvasId);

	var webglOptions =
	    {
		    antialias : true
	    };

	var gl = (canvas.getContext("webgl", webglOptions)
	          || canvas.getContext("experimental-webgl", webglOptions));
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
};

LD420.testGame = function()
{
	var game = new Game();

	// Team A

	var teamA = new Team(0);

	var teamAComponent = TeamComponent.new();
	teamAComponent.setTeam(teamA);

	var shipA0 = Unit.new();
	shipA0.setTeamComponent(teamAComponent.copy());

	var shipA1 = Unit.new();
	shipA1.setTeamComponent(teamAComponent.copy());

	// Team B
	var teamB = new Team(1);

	var teamBComponent = TeamComponent.new();
	teamBComponent.setTeam(teamB);
	var shipB = Unit.new();
	shipB.setTeamComponent(teamBComponent.copy());

	// Team C

	var teamC = new Team(2);

	var teamCComponent = TeamComponent.new();
	teamCComponent.setTeam(teamC);
	var shipC = Unit.new();
	shipC.setTeamComponent(teamCComponent.copy());

	var world = game.world;
	world.addUnit(shipA0);
	world.addUnit(shipA1);
	world.addUnit(shipB);
	world.addUnit(shipC);
};

LD420.testRenderer = function()
{
	var game = new Game();
	var world = game.world;

	var renderer = new Renderer();

	var animate = function(time)
	{
		renderer.render(world);

		requestAnimationFrame(animate);
	};

	requestAnimationFrame(animate);
};
