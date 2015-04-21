// RenderComponent.js

var RenderComponent = function()
{
	this.renderComponentId = null;

	this.vertexBufferData = null;
	this.indexBufferData = null;

	this.shaderComponent = null;

	this.gl = null;
	this.glVertexBuffer = null;
	this.glIndexBuffer = null;
	this.glPrimitiveType = 0;
};

RenderComponent.prototype = {};

RenderComponent.prototype.

	RenderComponent.protype.setRenderComponentId = function(id)
{
	assertString(id);

	this.renderComponentId = id;
};

RenderComponent.prototype.setShaderComponent = function(shaderComponent)
{
	assertInstance(shaderComponent, ShaderComponent);

	this.shaderComponent = shaderComponent;
};

// gl lifecycle, to be called after all previous calls

RenderComponent.prototype.glInit = function(gl)
{
	assertWebGLContext(gl);

	this.gl = gl;

	this.glVertexBuffer = gl.createBuffer();
	this.glIndexBuffer = gl.createBuffer();

	this.bindBuffers();

	gl.bufferData(this.glIndexBuffer, this.indexBufferData, gl.STATIC_DRAW)
};

RenderComponent.prototype.bindBuffers = function()
{
	var gl = this.gl;

	gl.bindBuffer(gl.ARRAY_BUFFER, this.glVertexBuffer);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.glIndexBuffer);
};

RenderComponent.prototype.render = function(positions, directions, sizes, colors)
{
	var gl = this.gl;

};
