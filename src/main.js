const HARVESTER_BODY = [WORK,CARRY,MOVE];

var harvest = (function(creep)
{
	const sources = creep.room.find(FIND_SOURCES);
	if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
	{
		creep.moveTo(sources[0]);
	}
});

var findStruct = (function(creep,type)
{
	const objs = creep.room.find(FIND_MY_STRUCTURES,
	{
		filter:
		{
			structureType: type,
		}
	});
	if(objs.length > 0)
	{
		return objs[0];
	}
});

const ROLE_ACTIONS =
{
	'harvester': (function(creep)
	{
		if(creep.carry.energy < creep.carryCapacity)
		{
			harvest(creep);
		}
		else
		{
			const spawn = findStruct(creep,STRUCTURE_SPAWN);
			if(creep.transfer(spawn,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(spawn);
			}
		}
	}),
	'upgrader': (function(creep)
	{
		if(creep.carry.energy < creep.carryCapacity)
		{
			harvest(creep);
		}
		else
		{
			const controller = findStruct(creep,STRUCTURE_CONTROLLER);
			if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(controller);
			}
		}
	}),
};

module.exports.loop = (function()
{
	for(const i in Game.spawns)
	{
		const spawn = Game.spawns[i];
		if(spawn.energy >= spawn.energyCapacity)
		{
			const creepName = spawn.createCreep(HARVESTER_BODY,undefined,{role:'harvester'});
		}
	}
	for(const i in Game.creeps)
	{
		const creep = Game.creeps[i];
		ROLE_ACTIONS[creep.memory.role](creep);
	}
});

