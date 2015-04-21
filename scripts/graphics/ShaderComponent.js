// ShaderComponent.js

var ShaderComponent = function()
{
	this.uniforms = [];
	this.attributes = [];
	this.varyings = [];

	this.vertexShaderLines = null;
	this.fragmentShaderLines = null;

	this.gl = null;
	this.glVertexShader = null;
	this.glFragmentShader = null;
	this.glShaderProgram = null;

	this.viewMatrixUniform = null;
	this.projectionMatrixUniform = null;

	this.colorUniform = null;
	this.positionAttribute = null;
};

ShaderComponent.prototype = {};

ShaderComponent.prototype.glUse = function(gl)
{
	if (gl != this.gl)
	{
		this.glInit(gl);
	}

	gl.useProgram(this.glShaderProgram);
	gl.enableVertexAttribArray(this.positionAttribute);
};

ShaderComponent.prototype.glInit = function(gl)
{
	this.gl = gl;

	this.glInitShaders();
};

ShaderComponent.prototype.glInitShaders = function()
{
	var gl = this.gl;

	var vertexShader = this.glInitVertexShader(gl);
	this.glVertexShader = vertexShader;

	var fragmentShader = this.glInitFragmentShader(gl);
	this.glFragmentShader = fragmentShader;

	var program = gl.createProgram();
	this.glShaderProgram = program;

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS))
	{
		console.log(gl.getProgramInfoLog(program));
	}
	gl.useProgram(program);

	this.viewMatrixUniform = gl.getUniformLocation(program, "u_viewMatrix");
	this.projectionMatrixUniform = gl.getUniformLocation(program,
	                                                     "u_projectionMatrix");
	this.colorUniform = gl.getUniformLocation(program, "u_color");

	this.positionAttribute = gl.getAttribLocation(program, "a_position");
	gl.enableVertexAttribArray(this.positionAttribute);
};

ShaderComponent.prototype.glInitVertexShader = function(gl)
{
	this.vertexShaderLines =
		[
			"// vertex shader",
			"precision mediump float;",

			"uniform mat4 u_viewMatrix;",
			"uniform mat4 u_projectionMatrix;",

			"attribute vec4 a_position;",

			"void main()",
			"{",
			"vec4 position = vec4(a_position.xyz, 1.0);",
			"gl_Position = vec4(u_projectionMatrix * u_viewMatrix * position);",

			"gl_PointSize = a_position.w;",
			"}"
		];

	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, this.vertexShaderLines.join("\n"));

	this.glCompileShader(gl, vertexShader);

	return vertexShader;
};

ShaderComponent.prototype.glInitFragmentShader = function(gl)
{
	this.fragmentShaderLines =
		[
			"// fragment shader",
			"precision mediump float;",

			"uniform vec4 u_color;",

			"void main()",
			"{",
			"gl_FragColor = u_color;",
			"}"
		];

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, this.fragmentShaderLines.join("\n"));

	this.glCompileShader(gl, fragmentShader);

	return fragmentShader;
};

ShaderComponent.prototype.glCompileShader = function(gl, shader)
{
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
	{
		console.log(gl.getShaderInfoLog(shader));
	}
};