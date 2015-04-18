// ld420.js

var LD420 = {};

LD420.init = function(canvasId)
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

	var game = new Game();

	var teamA = new Team();
	teamA.setTeamId(0);

	var teamB = new Team();
	teamB.setTeamId(1);

	var teamC = new Team();
	teamC.setTeamId(2);

	var teamAComponent = new TeamComponent();
	teamAComponent.setTeam(teamA.team);
	var shipA = new Unit();
	shipA.addComponent(teamAComponent);


	var teamBComponent = new TeamComponent();
	teamBComponent.setTeam(teamB.team);
	var shipB = new Unit();
	shipB.addComponent(teamBComponent);


	var teamCComponent = new TeamComponent();
	teamCComponent.setTeam(teamC.team);
	var shipC = new Unit();
	shipC.addComponent(teamCComponent);

	var world = game.world;
	world.addUnit(shipA);
	world.addUnit(shipB);
	world.addUnit(shipC);
};
