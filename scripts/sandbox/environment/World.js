// World.js

var World = function()
{
	this.unitsTeam0 = [];
	this.unitsTeam1 = [];
};

World.prototype = {};

World.prototype.addUnit = function(unit, teamIndex)
{
	if (teamIndex === 0)
	{
		this.unitsTeam0.push(unit);
	}
	else
	{
		this.unitsTeam1.push(unit);
	}
};

World.prototype.addUnits = function(units, teamIndex)
{
	assertArrayInstances(units, VectorUnit);

	var unitCount = units.length;
	for (var unitIndex = 0; unitIndex < unitCount; unitIndex++)
	{
		var unit = units[unitIndex];
		this.addUnit(unit, teamIndex);
	}
};

World.prototype.getAllUnits = function()
{
	var allUnits = [];

	var unitsTeam0 = this.unitsTeam0;
	var unitsTeam1 = this.unitsTeam1;

	var unitCount0 = unitsTeam0.length;
	var unitCount1 = unitsTeam1.length;

	for (var index0 = 0; index0 < unitCount0; index0++)
	{
		allUnits.push(unitsTeam0[index0]);
	}

	for (var index1 = 0; index1 < unitCount1; index1++)
	{
		allUnits.push(unitsTeam1[index1]);
	}

	return allUnits;
};

World.prototype.getTeamTargetIndices = function(teamUnitsSortedZ,
                                                enemyUnitsUnitsSortedZ,
                                                direction)
{
	var teamTargetIndices = [];

	var stateIndices = VectorUnit.stateIndices;
	var teamUnitCount = teamUnitsSortedZ.length;
	for (var unitIndex = 0; unitIndex < teamUnitCount; unitIndex)
	{
		var unit = teamUnitsSortedZ[unitIndex];
		var changeHealth = unit.state[stateIndices.changeHealth];

		var targetIndex = 0;
		if (changeHealth < 0)
		{
			targetIndex = this.getClosestTarget(unit,
			                                    enemyUnitsUnitsSortedZ,
			                                    direction);
		}
		else
		{
			targetIndex = this.getClosestTarget(unit,
			                                    teamUnitsSortedZ,
			                                    direction);

			// negative target index for your own team
			targetIndex += 1;
			targetIndex *= -1;
		}

		teamTargetIndices.push(targetIndex);
	}

	return teamTargetIndices;
};

World.prototype.getClosestTarget = function(unit, unitsSortedZ, direction)
{
	var closestTarget = null;

	var indices = VectorUnit.stateIndices;
	var state = unit.state;

	var position = unit.position;
	var positionX = position[0];
	var positionY = position[1];
	var positionZ = position[2];

	var rangeIndex = indices.range;
	var range = state[rangeIndex];
	// var rangeSquared = range * range;

	var bodyRadiusIndex = indices.bodyRadius;
	var bodyRadius = state[bodyRadiusIndex];
	var bodyRadiusSquared = bodyRadius * bodyRadius;

	var closestDistanceSquared = 65535;

	// keep targeting closestZ
	var targetsBehindOutOfRangeZ = true;

	// checking for closer targets
	var targetsBehindInRangeZ = false;
	var targetsInFrontInRangeZ = false;

	// stop checking for targets
	var targetsInFrontOutOfRangeZ = false;

	// done after first targets in front out of range

	var unitCount = unitsSortedZ.length;
	for (var unitIndex = 0; unitIndex < unitCount; unitIndex++)
	{
		var target = unitsSortedZ;
		var targetState = target.state;

		var targetBodyRadius = targetState[bodyRadiusIndex];
		var targetBodyRadiusSquared = targetBodyRadius * targetBodyRadius;

		var targetPosition = target.position;

		var deltaZ = targetPosition[2] - positionZ;
		var bodyDeltaZ = Math.max(deltaZ - bodyRadius - targetBodyRadius, 0);

		var inRangeZ = bodyDeltaZ <= range;
		if (inRangeZ)
		{
		}

		if (targetsBehindOutOfRangeZ && inRangeZ)
		{
			targetsBehindOutOfRangeZ = false;
			targetsBehindInRangeZ = true;
		}

		var targetInFront = (deltaZ * direction >= 0);

		if (targetsBehindInRangeZ && targetInFront)
		{
			targetsBehindInRangeZ = false;
			targetsInFrontInRangeZ = true;
		}

		if (targetsInFrontInRangeZ && !inRangeZ)
		{
			targetsInFrontInRangeZ = false;
			targetsInFrontOutOfRangeZ = true;
		}

		if (targetsInFrontOutOfRangeZ)
		{
			closestTarget = closestTarget || target;

			// done searching
			break;
		}
		else if (targetsBehindInRangeZ || targetsInFrontInRangeZ)
		{
			var deltaX = targetPosition[0] - positionX;
			var deltaY = targetPosition[1] - positionY;

			var distanceSquared = (deltaX * deltaX
			                       + deltaY * deltaY
			                       + deltaZ * deltaZ);
			var bodyDistanceSquared = Math.max(distanceSquared
			                                   - bodyRadiusSquared
			                                   - targetBodyRadiusSquared,
			                                   0);
			if (bodyDistanceSquared < closestDistanceSquared)
			{
				closestTarget = target;
				closestDistanceSquared = bodyDistanceSquared;
			}
		}
		else if (targetsBehindOutOfRangeZ)
		{
			closestTarget = target;
			closestDistanceSquared = bodyDeltaZ * bodyDeltaZ;
		}
	}

	return closestTarget;
};

World.prototype.getUnitActions = function(units, targetIndices)
{
	var unitActions = [];

	var unitCount = units.length;
	var targetIndicesCount = targetIndices.length;
	assertEqual(unitCount, targetIndicesCount);

	for (var unitIndex = 0; unitIndex < unitCount; unitIndex++)
	{
		var targetIndex = targetIndices[unitIndex];
		var unit = units[unitIndex];

		var target = units[targetIndex];
		var action = unit.getAction(target);
		unitActions.push(action);
	}

	return unitActions;
};

World.prototype.update = function(timeDelta)
{
	var stateIndices = VectorUnit.stateIndices;

	var unitsTeam0 = this.unitsTeam0;
	var unitsTeam1 = this.unitsTeam1;

	var unitCount0 = unitsTeam0.length;
	var unitCount1 = unitsTeam1.length;

	if (unitCount0 <= 0
	    || unitCount1 <= 0)
	{
		return;
	}

	// sort team units along Z axis
	unitsTeam0.sort(UnitComparators.positionZDescending);
	unitsTeam1.sort(UnitComparators.positionZAscending);

	var unitsAll = this.getAllUnits();
	var unitCountAll = unitsAll.length;

	var unitsAllCopy = [];
	for (var i = 0; i < unitCountAll; i++)
	{
		unitsAllCopy[i] = unitsAll[i].copy();
	}

	// var targetIndices0 = this.getTeamTargetIndices(unitsTeam0, unitsTeam1, 1);
	// var targetIndices1 = this.getTeamTargetIndices(unitsTeam1, unitsTeam0, -1);

	// determine target indices
	var targetIndices = [];
	for (var index0 = 0; index0 < unitCount0; index0++)
	{
		// var targetIndex0 = targetIndices0[index0];
		var targetIndex0 = 0;
		targetIndices.push(targetIndex0 >= 0
			                   ? targetIndex0 + unitCount0
			                   : -targetIndex0 - 1);
	}

	for (var index1 = 0; index1 < unitCount1; index1++)
	{
		// var targetIndex1 = targetIndices1[index1];
		var targetIndex1 = 0;
		targetIndices.push(targetIndex1 >= 0
			                   ? targetIndex1
			                   : -targetIndex1 - 1 + unitCount0);
	}

	var unit = null;

	// perform actions on targets
	for (var unitIndex = 0; unitIndex < unitCountAll; unitIndex++)
	{
		var targetIndex = targetIndices[unitIndex];

		var target = unitsAll[targetIndex];
		var targetCopy = unitsAllCopy[targetIndex];

		unit = unitsAll[unitIndex];
		var selfCopy = unitsAllCopy[unitIndex];
		unit.actOnTarget(selfCopy, target, targetCopy, timeDelta);
	}

	var healthIndex = stateIndices.health;
	var maxHealthIndex = stateIndices.maxHealth;

	var aliveUnits0 = [];
	var aliveUnits1 = [];

	// backwards and clean up
	for (unitIndex = unitCountAll - 1; unitIndex >= 0; unitIndex--)
	{
		unit = unitsAllCopy[unitIndex];
		var unitState = unit.state;
		var health = unitState[healthIndex];
		if (health <= 0)
		{
			// dead unit
			unit.destroy();
			console.log("unit died");
		}
		else
		{
			var unitCopy = unit.copy();
			var unitCopyState = unitCopy.state;

			// alive unit, clamp health
			unitCopyState[healthIndex] = Math.min(health,
			                                      unitState[maxHealthIndex]);
			if (unitIndex < unitCount0)
			{
				aliveUnits0.push(unitCopy);
			}
			else
			{
				aliveUnits1.push(unitCopy);
			}
		}
	}

	this.unitsTeam0 = aliveUnits0;
	this.unitsTeam1 = aliveUnits1;
};

World.prototype.getUnitStates = function(units)
{
	var unitCount = units.length;
	var unitStateMatrix = this.getUnitStateMatrix(unitCount);

	var unitStateIndexCount = VectorUnit.stateIndexKeys.length;

	for (var unitIndex = 0; unitIndex < unitCount; unitIndex++)
	{
		var unitState = units[unitIndex].state;
		unitStateMatrix.set(unitState, unitIndex * unitStateIndexCount);
	}

	return unitStateMatrix;
};

World.prototype.unitStateMatrices = {};

World.prototype.getUnitStateMatrix = function(unitCount)
{
	var unitStateMatrix = null;
	var unitStateMatrixArray = this.unitStateMatrices[unitCount];
	if (unitStateMatrixArray
	    && unitStateMatrixArray.length > 0)
	{
		unitStateMatrix = unitStateMatrixArray.pop();
	}
	else
	{
		var stateIndexCount = VectorUnit.stateIndexKeys.length;
		unitStateMatrix = new Float32Array(unitCount * stateIndexCount);
	}

	return unitStateMatrix;
};

World.prototype.getTargets = function(unit,
                                      units,
                                      maxTargetCount)
{
	units.sort(UnitComparators.distanceAscending(unit.position));
	var targets = units.slice(0, Math.min(units.length, maxTargetCount));

	return targets;
};

World.prototype.getTargetIndexByDistance = function(unit,
                                                    enemyUnitsCopy)
{

};


