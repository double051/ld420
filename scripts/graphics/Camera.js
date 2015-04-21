// Camera.js

var Camera = function()
{
	this.targetPosition = vec3.create();

	this.distance = 100.0;
	this.position = vec3.create();
	this.up = vec3.create();
	vec3.set(this.up, 0, 1, 0);

	this.rotationHorizontal = Math.PI / 2;
	this.rotationVertical = Math.PI / 4;
	this.rotationScale = 0.01;

	this.viewMatrix = mat4.create();

	this.fieldOfViewY = 30.0;
	this.aspectRatio = 1.0;

	this.nearPlane = 1.0;
	this.farPlane = 1000.0;

	this.perspectiveMatrix = mat4.create();
	this.updateProjection();
};

Camera.prototype = {};

Camera.prototype.updateView = function()
{
	var viewMatrix = this.viewMatrix;
	var position = this.position;
	var targetPosition = this.targetPosition;
	var up = this.up;

	// this.rotationHorizontal += 0.01;

	vec3.set(position, 0, 0, this.distance);
	vec3.rotateX(position, position, targetPosition, this.rotationVertical);
	vec3.rotateY(position, position, targetPosition, this.rotationHorizontal);

	mat4.lookAt(viewMatrix, position, targetPosition, up);
};

Camera.prototype.updateProjection = function()
{
	mat4.perspective(this.perspectiveMatrix,
	                 this.fieldOfViewY,
	                 this.aspectRatio,
	                 this.nearPlane,
	                 this.farPlane);
};

Camera.prototype.glSetUniformData = function(gl, shaderComponent)
{
	assertWebGLContext(gl);
	assertInstance(shaderComponent, ShaderComponent);

	this.updateView();
	this.updateProjection();

	var viewMatrixUniform = shaderComponent.viewMatrixUniform;
	var projectionMatrixUniform = shaderComponent.projectionMatrixUniform;

	gl.uniformMatrix4fv(viewMatrixUniform, false, this.viewMatrix);
	gl.uniformMatrix4fv(projectionMatrixUniform, false, this.perspectiveMatrix);
};

Camera.prototype.rotate = function(deltaX, deltaY)
{
	var rotationScale = this.rotationScale;
	var rotationHorizontal = this.rotationHorizontal + (deltaX * rotationScale);
	var rotationVertical = this.rotationVertical + (deltaY * rotationScale);

	var halfPi = Math.PI / 2.0;
	rotationVertical = clamp(rotationVertical, -halfPi, halfPi);

	this.rotationHorizontal = rotationHorizontal;
	this.rotationVertical = rotationVertical;
};
