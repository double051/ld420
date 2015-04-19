// AbilityAction.js

var AbilityAction = function()
{
	UnitAction.call(this);
};

AbilityAction.prototype = Object.create(UnitAction.prototype);

AbilityAction.prototype.onApplyAction = function(unit)
{

};
