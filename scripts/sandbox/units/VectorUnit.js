// VectorUnit.js

var VectorUnit = function()
{
	var stateCount = this.stateIndexKeys.length;

	this.state = new Float32Array(stateCount);

	var indices = VectorUnit.stateIndices;
	this.position = this.state.subarray(indices.positionX,
	                                    indices.positionZ + 1);

	assertEqual(this.position.length, 3);

	this.renderComponentId = null;

	this.direction = new Float32Array(3);

	this.isAlive = false;

	this.unitIndex = 0;
};

// all state values

VectorUnit.stateIndices =
{
	positionX : 0,
	positionY : 1,
	positionZ : 2,

	speed      : 3,
	bodyRadius : 4,

	maxHealth : 5,
	health    : 6,
	armor     : 7,

	range         : 8,
	changeHealth  : 9,
	armorPiercing : 10,

	abilityRadius  : 11,
	abilityFalloff : 12,

	cooldown          : 13,
	cooldownRemaining : 14
};

VectorUnit.actions =
{
	wait    : 0,
	move    : 1,
	ability : 2
};

VectorUnit.stateIndexKeys = Object.keys(VectorUnit.stateIndices);

VectorUnit.objects = [];

VectorUnit.new = function()
{
	var object = null;

	var objects = this.objects;
	if (objects.length > 0)
	{
		object = objects.pop();
	}
	else
	{
		object = new VectorUnit();
	}

	// create alive dudes
	this.isAlive = true;

	return object;
};

VectorUnit.prototype = {};

VectorUnit.prototype.stateIndices = VectorUnit.stateIndices;
VectorUnit.prototype.stateIndexKeys = VectorUnit.stateIndexKeys;

VectorUnit.prototype.objects = VectorUnit.objects;

VectorUnit.prototype.new = VectorUnit.new;

VectorUnit.prototype.copy = function()
{
	var copy = this.new();

	copy.copyState(this);

	return copy;
};

VectorUnit.prototype.copyState = function(source)
{
	this.state.set(source.state);

	this.direction.set(source.direction);
	this.isAlive = source.isAlive;
	this.unitIndex = source.unitIndex;

	this.renderComponentId = source.renderComponentId;
};

VectorUnit.prototype.actOnTarget = function(selfCopy,
                                            target,
                                            targetCopy,
                                            timeDelta)
{
	var indices = VectorUnit.stateIndices;
	var cooldownRemainingIndex = indices.cooldownRemaining;
	var bodyRadiusIndex = indices.bodyRadius;

	var state = this.state;
	var targetState = target.state;
	var targetCopyState = targetCopy.state;

	var position = this.position;
	var bodyRadius = state[bodyRadiusIndex];

	var targetPosition = target.position;
	var targetBodyRadius = targetState[bodyRadiusIndex];

	// position deltas
	var distanceX = targetPosition[0] - position[0];
	var distanceY = targetPosition[1] - position[1];
	var distanceZ = targetPosition[2] - position[2];

	var distanceSquared = ((distanceX * distanceX)
	                       + (distanceY * distanceY)
	                       + (distanceZ * distanceZ));

	var distance = Math.sqrt(distanceSquared);

	var bodyDistance = Math.max(distance - bodyRadius - targetBodyRadius,
	                            0);

	// if in range
	var inRange = bodyDistance < state[indices.range];
	if (inRange)
	{
		// if off cooldown
		var cooldownRemaining = state[cooldownRemainingIndex];
		if (cooldownRemaining <= 0)
		{
			// use ability
			var healthDelta = 0;

			var changeHealth = state[indices.changeHealth];
			if (changeHealth >= 0)
			{
				healthDelta = changeHealth;
			}
			else
			{
				var armor = targetState[indices.armor];
				var armorPiercing = state[indices.armorPiercing];
				healthDelta = changeHealth + Math.max(armor - armorPiercing, 0);
			}

			targetCopyState[indices.health] += healthDelta;
			// console.log(""
			//             + targetCopyState[indices.health]
			//             + " + "
			//             + healthDelta);

			// reset cooldown
			state[cooldownRemaining] = state[indices.cooldown];
		}
		else
		{
			// sit, wait, grow cooldown
			state[cooldownRemainingIndex] -= timeDelta;
		}
	}
	else
	{
		// move to be in range
		var direction = selfCopy.direction;
		if (distance !== 0)
		{
			direction[0] = distanceX / distance;
			direction[1] = distanceY / distance;
			direction[2] = distanceZ / distance;

			var speed = state[indices.speed];
			var distanceMoved = speed * timeDelta;

			var positionCopy = selfCopy.position;
			positionCopy[0] += direction[0] * distanceMoved;
			positionCopy[1] += direction[1] * distanceMoved;
			positionCopy[2] += direction[2] * distanceMoved;
		}
	}
};

VectorUnit.prototype.useAbilityOnTargets = function(sourceUnit, targetUnits)
{
	var targetUnitCount = targetUnits.length;
	if (targetUnitCount > 0)
	{
		assertInstance(unit, VectorUnit);

		var indices = this.stateIndices;
		var bodyRadiusIndex = indices.bodyRadius;

		var sourceState = sourceUnit.state;

		var primaryTargetUnit = targetUnits[0];

		// non-splash damage
		this.attackTarget(sourceUnit, primaryTargetUnit);

		// source
		var changeHealth = sourceState[indices.changeHealth];
		var armorPiercing = sourceState[indices.armorPiercing];

		var abilityRadius = sourceState[indices.abilityRadius];
		var abilityFalloff = sourceState[indices.abilityFalloff];

		var primaryTargetPosition = primaryTargetUnit.position;

		for (var targetIndex = 0; targetIndex < targetUnitCount; targetIndex++)
		{
			var targetUnit = targetUnits[targetIndex];
			var targetState = targetUnit.state;

			var targetPosition = targetUnit.position;
			var targetBodyRadius = targetState[bodyRadiusIndex];

			// position deltas
			var positionDX = primaryTargetPosition[0] - targetPosition[0];
			var positionDY = primaryTargetPosition[1] - targetPosition[1];
			var positionDZ = primaryTargetPosition[2] - targetPosition[2];

			var positionDistanceSquared = ((positionDX * positionDX)
			                               + (positionDY * positionDY)
			                               + (positionDZ * positionDZ));

			var positionDistance = Math.sqrt(positionDistanceSquared);

			var distance = Math.max(positionDistance - targetBodyRadius, 0);
			var rangeFactor = distance / abilityRadius;
			if (rangeFactor <= 1.0)
			{
				var initialChangeHealth = changeHealth * (1.0 - rangeFactor);
				var falloffChangeHealth = (changeHealth
				                           * abilityFalloff
				                           * rangeFactor);
				var abilityChangeHealth = (initialChangeHealth
				                           + falloffChangeHealth);

				var health = targetState[indices.health];
				var maxHealth = targetState[indices.maxHealth];
				var armor = targetState[indices.armor];

				var newHealth = this.getNewHealth(health,
				                                  maxHealth,
				                                  armor,
				                                  armorPiercing,
				                                  abilityChangeHealth);
				targetState[indices.health] = newHealth;
			}
		}
	}
};

VectorUnit.prototype.getNewHealth = function(health,
                                             maxHealth,
                                             armor,
                                             armorPiercing,
                                             changeHealth)
{
	var absorb = changeHealth >= 0 ? 0 : Math.max(0.0, armor - armorPiercing);
	var newHealth = Math.min(maxHealth,
	                         health + Math.max(1, changeHealth - absorb));

	return newHealth;
};

VectorUnit.prototype.destroy = function()
{
	this.isAlive = false;

	this.objects.push(this);
};

VectorUnit.prototype.getAction = function(target)
{
	var actions = VectorUnit.actions;
	var action = actions.wait;

	return action;
};

VectorUnit.prototype.performAction = function(action,
                                              timeDelta,
                                              targetPosition,
                                              target)
{
	switch (action)
	{
		case VectorUnit.actions.wait:
			this.waitAction(timeDelta);
			break;
		case VectorUnit.actions.move:
			this.moveAction(timeDelta, targetPosition);
			break;
		case VectorUnit.actions.ability:
			this.abilityAction(target);
			break;
		default:
			break;
	}
};

VectorUnit.prototype.waitAction = function(timeDelta)
{
	this.state[this.stateIndices.cooldownRemaining] -= timeDelta;
};

VectorUnit.prototype.moveAction = function(timeDelta, targetPosition)
{
	var indices = this.stateIndices;
	var state = this.state;
	state[indices.cooldownRemaining] -= timeDelta;

	var speed = state[indices.speed];
	var position = this.position;

	var distanceX = targetPosition[0] - position[0];
	var distanceY = targetPosition[1] - position[1];
	var distanceZ = targetPosition[2] - position[2];
	var distance = Math.sqrt((distanceX * distanceX)
	                         + (distanceY * distanceY)
	                         + (distanceZ * distanceZ));

};

VectorUnit.prototype.abilityAction = function(target)
{
	this.useAbilityOnTargets(this, [target]);

	var indices = VectorUnit.stateIndices;
	var state = state;
	state[indices.cooldownRemaining] = state[indices.cooldown];
};

VectorUnit.prototype.getIsAlive = function()
{
	var isAlive = (this.isAlive
	               && (this.state[VectorUnit.stateIndices.health] > 0));
	this.isAlive = isAlive;

	return isAlive;
};