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
};
