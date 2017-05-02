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
		let spawn = Game.spawns[i];
		if(spawn.energy >= spawn.energyCapacity)
		{
			let creepName = spawn.createCreep(HARVESTER_BODY,undefined,{role:'harvester'});
		}
	}
	for(const i in Game.creeps)
	{
		let creep = Game.creeps[i];
		ROLE_ACTIONS[creep.memory.role](creep);
	}
});

