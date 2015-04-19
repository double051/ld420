// assert.js

var assert = function(condition, message)
{
	if (!condition)
	{
		var error = message || "assertion failed";
		throw error;
	}
};

var assertFalse = function(condition, message)
{
	assert(!condition, message)
};

var assertDefined = function(value, message)
{
	assert(typeof value !== "undefined", message)
};

var assertNotNull = function(value, message)
{
	assert(value !== null, message)
};

var assertValid = function(value, message)
{
	assertDefined(value, message);
	assertNotNull(value, message);
};

var assertEqual = function(value0, value1, message)
{
	assert(value0 === value1, message)
};

var assertNotEqual = function(a, b, message)
{
	assert(a !== b, message);
};

var assertType = function(c, a, b)
{
	assert(typeof c === a, b)
};

var isArray = function(array)
{
	return Object.prototype.toString.call(array) === "[object Array]"
};

var assertInstance = function(value, type, message)
{
	assertValid(value, message);
	assert(value instanceof type, message)
};

var assertArray = function(b, a)
{
	assertValid(b, a);
	assert(isArray(b), a)
};

var assertArrayBuffer = function(a, b)
{
	assertInstance(a, ArrayBuffer, b)
};

assertWebGLContext = function(b, a)
{
	if (window.gli)
	{
		assertValid(b, a);
	}
	else
	{
		assertInstance(b, WebGLRenderingContext, a)
	}
};

var assertCanvas = function(a, b)
{
	assertValid(a, b);
	assert(a.tagName === "CANVAS")
};
var assertDOMEvent = function(a)
{
	assertValid(a)
};
var assertFunction = function(b, a)
{
	assertValid(b, a);
	assertType(b, "function", a)
};

var assertNumber = function(value, message)
{
	assertValid(value, message);
	assertType(value, "number", message)
};

var assertInteger = function(b, a)
{
	assertNumber(b, a);
	assert(b % 1 === 0, a)
};

var assertBoolean = function(a, b)
{
	assertValid(a, b);
	assertType(a, "boolean", b)
};

var assertString = function(b, a)
{
	assertValid(b, a);
	assertType(b, "string", a)
};

var assertStringArray = function(a, c)
{
	assertArray(a, c);
	for (var d = a.length, b = 0; b < d; b++)
	{
		var e = a[b];
		assertString(e, c)
	}
};

var assertPath = function(b, a)
{
	assertString(b, a)
};

var assertImage = function(b, a)
{
	assertValid(b, a)
};

var assertShaderUniform = function(b, a)
{
	assertInstance(b, WebGLUniformLocation, a)
};

var assertArrayInstances = function(array, type, message)
{
	assertArray(array, message);
	for (var d = array.length, b = 0; b < d; b++)
	{
		var e = array[b];
		assertInstance(e, type, message)
	}
};

var assertCollectionInstances = function(a, d, b)
{
	assertValid(a, b);
	for (var e in a)
	{
		if (a.hasOwnProperty(e))
		{
			var c = a[e];
			assertInstance(c, d, b)
		}
	}
};

var assertIn = function(value, container, message)
{
	assert(value in container, message);
};

assert(true);
assertFalse(false);
assertValid({});
assertString("");
assertArray([]);
assertEqual(2, 2);
assertNotEqual(1, "");
assertInteger(1.2345678901234567e19);
assertNumber(0, "zero is a number");
assertBoolean(false, "false is a boolean");
