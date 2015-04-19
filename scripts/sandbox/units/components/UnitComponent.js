// UnitComponent.js

var UnitComponent = function()
{
	this.unit = null;
};

UnitComponent.objects = [];

UnitComponent.allocate = function()
{
	return new UnitComponent();
};

UnitComponent.new = function()
{
	var object = null;
	var objects = this.objects;

	if (objects.length > 0)
	{
		object = objects.pop();
	}
	else
	{
		object = this.allocate();
	}

	return object;
};

UnitComponent.prototype = {};

UnitComponent.prototype.objects = UnitComponent.objects;

UnitComponent.prototype.allocate = function()
{
	return UnitComponent.allocate.call(this);
};

UnitComponent.prototype.new = function()
{
	return UnitComponent.new.call(this);
};

UnitComponent.prototype.copy = function()
{
	var copy = this.new();

	this.copyProperties(copy);

	return copy;
};

UnitComponent.prototype.copyProperties = function()
{

};

UnitComponent.prototype.destroy = function()
{
	this.objects.push(this);
};


UnitComponent.prototype.setUnit = function(unit)
{
	this.unit = unit;
};

UnitComponent.prototype.onApplyComponent = function()
{

};

UnitComponent.prototype.onUpdateComponent = function(time)
{

};

UnitComponent.prototype.onRemoveComponent = function()
{

};
