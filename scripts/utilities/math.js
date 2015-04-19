// math.js

var clamp = function(value, min, max)
{
	return Math.min(max, Math.max(min, value));
};