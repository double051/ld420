// Renderer.js

var Renderer = function(canvas)
{
	assertCanvas(canvas);
	this.canvas = canvas;

	this.canvasWidth = 0;
	this.canvasHeight = 0;

	this.camera = new Camera();
	this.shaderComponent = new ShaderComponent();

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
		this.initControls();
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

	this.shaderComponent.glUse(gl);

	var vertexBuffer = gl.createBuffer();
	this.vertexBuffer = vertexBuffer;

	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
};

Renderer.prototype.renderWorld = function(world)
{
	assertInstance(world, World);

	this.startFrame();

	this.renderUnits(world.unitsTeam0, world.unitsTeam1);
};

Renderer.prototype.startFrame = function()
{
	var canvas = this.canvas;

	var canvasWidth = canvas.clientWidth;
	var canvasHeight = canvas.clientHeight;

	if (this.canvasWidth !== canvasWidth
	    || this.canvasHeight !== canvasHeight)
	{
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;

		this.onResizeCanvas(canvasWidth, canvasHeight);
	}

	var gl = this.gl;
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	this.shaderComponent.glUse(gl);
	this.camera.glSetUniformData(gl, this.shaderComponent);
};

Renderer.prototype.onResizeCanvas = function(width, height)
{
	var canvas = this.canvas;

	canvas.width = width;
	canvas.height = height;

	this.camera.aspectRatio = width / height;

	this.gl.viewport(0, 0, width, height);
};

Renderer.prototype.renderUnits = function(units0, units1)
{
	var indices = VectorUnit.stateIndices;

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

		var position0 = unit0.position;
		var state0 = unit0.state;
		var index0 = unitIndex0 * vertexValueCount;

		vertexBufferData.set(position0, index0);
		vertexBufferData[index0 + 3] = state0[indices.bodyRadius];
	}

	for (var unitIndex1 = 0; unitIndex1 < unitCount1; unitIndex1++)
	{
		var unit1 = units1[unitIndex1];
		// var renderComponentId = unit.renderComponentId;

		var position1 = unit1.position;
		var state1 = unit1.state;
		var index1 = (unitCount0 + unitIndex1) * vertexValueCount;

		vertexBufferData.set(position1, index1);
		// vertexBufferData[index1 + 3] = state1[indices.bodyRadius];

		var healthPercent = state1[indices.health] / state1[indices.maxHealth];
		var bodyRadius = state1[indices.bodyRadius];
		vertexBufferData[index1 + 3] = healthPercent * bodyRadius;
	}

	var gl = this.gl;
	var colorUniform = this.shaderComponent.colorUniform;
	var positionAttribute = this.shaderComponent.positionAttribute;

	gl.bufferData(gl.ARRAY_BUFFER, vertexBufferData, gl.DYNAMIC_DRAW);
	gl.vertexAttribPointer(positionAttribute, 4, gl.FLOAT, false, 0, 0);

	// team0 - red
	gl.uniform4f(colorUniform, 1.0, 0.5, 0.0, 1.0);
	gl.drawArrays(gl.POINTS, 0, unitCount0);

	// team1 - blue
	gl.uniform4f(colorUniform, 0.0, 0.5, 1.0, 1.0);
	gl.drawArrays(gl.POINTS, unitCount0, unitCount1);
};

Renderer.prototype.initControls = function()
{
	var canvas = this.canvas;
	var self = this;

	canvas.addEventListener("mousedown", function(mouseEvent)
	{
		self.onMouseDown(mouseEvent);
	});

	canvas.addEventListener("mousemove", function(mouseEvent)
	{
		self.onMouseMove(mouseEvent);
	});

	canvas.addEventListener("mouseup", function(mouseEvent)
	{
		self.onMouseUp(mouseEvent);
	});

	canvas.addEventListener("touchstart", function(touchEvent)
	{
		self.onTouchStart(touchEvent);
	});

	canvas.addEventListener("touchmove", function(touchEvent)
	{
		self.onTouchMove(touchEvent);
	});

	canvas.addEventListener("touchend", function(touchEvent)
	{
		self.onTouchEnd(touchEvent);
	});
};

// mouse events

Renderer.prototype.onMouseDown = function(mouseEvent)
{
	assertDOMEvent(mouseEvent);

	this.mouseDown = true;
	this.mouseX = mouseEvent.clientX;
	this.mouseY = mouseEvent.clientY;
};

Renderer.prototype.onMouseMove = function(mouseEvent)
{
	if (this.mouseDown)
	{
		assertDOMEvent(mouseEvent);

		var mouseX = mouseEvent.clientX;
		var mouseY = mouseEvent.clientY;

		var deltaX = mouseX - this.mouseX;
		var deltaY = mouseY - this.mouseY;

		this.camera.rotate(deltaX, deltaY);

		this.mouseX = mouseX;
		this.mouseY = mouseY;
	}
};

Renderer.prototype.onMouseUp = function(mouseEvent)
{
	this.mouseDown = false;
};

// touch events

Renderer.prototype.onTouchStart = function(touchEvent)
{
	assertDOMEvent(touchEvent);

	var touches = touchEvent.touches;
	if (!this.touchStart
	    && touches
	    && touches.length > 0)
	{
		this.touchStart = true;
		touchEvent.preventDefault();

		var touch0 = touches[0];
		this.touchX = touch0.clientX;
		this.touchY = touch0.clientY;
	}
};

Renderer.prototype.onTouchMove = function(touchEvent)
{
	assertDOMEvent(touchEvent);

	if (this.touchStart)
	{
		touchEvent.preventDefault();

		var touch0 = touchEvent.touches[0];

		var touchX = touch0.clientX;
		var touchY = touch0.clientY;

		var deltaX = touchX - this.touchX;
		var deltaY = touchY - this.touchY;

		this.camera.rotate(deltaX, deltaY);

		this.touchX = touchX;
		this.touchY = touchY;
	}
};

Renderer.prototype.onTouchEnd = function(touchEvent)
{
	assertDOMEvent(touchEvent);

	var touches = touchEvent.touches;
	if (touches
	    && touches.length === 0)
	{
		touchEvent.preventDefault();

		this.touchStart = false;
	}
};
