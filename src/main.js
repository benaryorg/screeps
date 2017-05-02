const HARVESTER_BODY = [WORK,CARRY,MOVE];

const ROLE_ACTIONS =
{
	'harvester': (function(creep)
	{
		if(creep.carry.energy < creep.carryCapacity)
		{
			const sources = creep.room.find(FIND_SOURCES);
			if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(sources[0]);
			}
		}
		else
		{
			const spawns = creep.room.find(FIND_MY_STRUCTURES,
			{
				filter:
				{
					structureType: STRUCTURE_SPAWN,
				}
			});
			if(spawns.length > 0)
			{
				const spawn = spawns[0];
				if(creep.transfer(spawn,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
				{
					creep.moveTo(spawn);
				}
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

