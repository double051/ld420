// RenderUnit.js

var RenderUnit = function()
{
	this.state = new Float32Array();
};

RenderUnit.stateIndices =
{
	positionX : 0,
	positionY : 1,
	positionZ : 2,

	size : 3,

	directionX : 4,
	directionY : 5,
	directionZ : 6,

	health : 7,

	colorHue : 8
};

