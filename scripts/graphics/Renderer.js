// Renderer.js

var Renderer = function(canvas)
{
	assertCanvas(canvas);
	this.canvas = canvas;

	var webglOptions =
	    {
		    antialias : true
	    };

	var gl = (canvas.getContext("webgl", webglOptions)
	          || canvas.getContext("experimental-webgl", webglOptions));
	this.gl = gl;
	if (gl)
	{
		this.initWebGL();
	}
	else
	{
		// no WebGL support
	}
};

Renderer.prototype = {};

Renderer.prototype.initWebGL = function()
{
	var gl = this.gl;

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	var vertexShaderLines =
		    [
			    "// vertex shader",
			    "precision float mediump",
			    "attribute vec4 v_position;",
			    "void main()",
			    "{",
			    "gl_Position = vec4(v_position.z, v_position.x, 0.0, 1.0);",
			    "gl_PointSize = 2.0;",
			    "}"
		    ];

	var fragmentShaderLines =
		    [
			    "// fragment shader",
			    "precision float mediump",
			    "uniform vec4 u_color;",
			    "void main()",
			    "{",
			    "gl_FragColor = u_color;",
			    "}"
		    ];

	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vertexShaderLines.join("\n"));
	gl.compileShader(vertexShader);
	// var vertexShaderCompileStatus = gl.get

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fragmentShaderLines.join("\n"));
	gl.compileShader(fragmentShader);

	var shaderProgram = gl.createProgram();
	this.shaderProgram = shaderProgram;

	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);

	gl.linkProgram(shaderProgram);
	gl.useProgram(shaderProgram);

	this.positionAtribute = gl.getAttribLocation(shaderProgram, "a_position");
	this.colorUniform = gl.getUniformLocation(shaderProgram, "u_color");

	var vertexBuffer = gl.createBuffer();
	this.vertexBuffer = vertexBuffer;

	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
};

Renderer.prototype.renderWorld = function(world)
{
	assertInstance(world, World);

	this.startFrame();

	var units = this.world.getAllUnits();
	this.renderUnits(units);
};

Renderer.prototype.startFrame = function()
{
	var gl = this.gl;
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

Renderer.prototype.renderUnits = function(units0, units1)
{
	// var indices = VectorUnit.stateIndices;

	var unitCount0 = units0.length;
	var unitCount1 = units1.length;

	var vertexCount = unitCount0 + unitCount1;

	var vertexValueCount = 4;
	var vertexBufferValueCount = vertexCount * vertexValueCount;

	var vertexBufferData = new Float32Array(vertexBufferValueCount);

	for (var unitIndex0 = 0; unitIndex0 < unitCount0; unitIndex0++)
	{
		var unit0 = units0[unitIndex0];
		// var renderComponentId = unit.renderComponentId;

		// var bodyRadius = unit.state[indices.bodyRadius];
		var position0 = unit0.state.position;
		vertexBufferData.set(position0, unitCount0 * vertexValueCount);
	}

	for (var unitIndex1 = 0; unitIndex1 < unitCount1; unitIndex1++)
	{
		var unit1 = units1[unitIndex1];
		// var renderComponentId = unit.renderComponentId;

		// var bodyRadius = unit.state[indices.bodyRadius];
		var position1 = unit1.state.position;
		vertexBufferData.set(position1,
		                 (unitCount0 + unitIndex1) * vertexValueCount);
	}

	var gl = this.gl;

	gl.bufferData(gl.ARRAY_BUFFER, vertexBufferData, gl.DYNAMIC_DRAW);
	gl.vertexAttribPointer(this.positionAtribute, 4, gl.FLOAT, false, 0, 0);

	// team0 - red
	gl.uniform4f(this.colorUniform, 1.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.POINTS, 0, unitCount0);

	// team1 - blue
	gl.uniform4f(this.colorUniform, 0.0, 0.0, 1.0, 1.0);
	gl.drawArrays(gl.POINTS, unitCount0, unitCount1);
};

