// ObjectPool.js

var ObjectPool = {};

ObjectPool.types = {};

ObjectPool.getTypeName = function(type)
{
	var typeName = type.toString();

	typeName = typeName.substr('function '.length);
	typeName = typeName.substr(0, typeName.indexOf('('));

	return typeName;
};

ObjectPool.getInstance = function(type)
{
	var typeName = ObjectPool.getTypeName(type);
	var typeObjects = ObjectPool.types[typeName];

	if (!typeObjects)
	{
		typeObjects = [];
		ObjectPool.types[typeName] = typeObjects;
	}
};

ObjectPool.getNewInstance = function(type)
{
	var newInstance = type.apply(null);

	return newInstance;
};

