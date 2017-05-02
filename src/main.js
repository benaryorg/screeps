const HARVESTER_BODY = [WORK,CARRY,MOVE];

const ROLE_ACTIONS =
{
	'harvester': (function(creep)
	{
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

