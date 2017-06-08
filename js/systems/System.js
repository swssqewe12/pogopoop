function System()
{
	this.entities = [];
}

System.prototype.requiresTag = function(name)
{
	this.requiredTag = name;
}

System.prototype.requiresType = function(name)
{
	this.requiredType = name;
}

System.prototype.requiresComponent = function(name)
{
	this.requiredComponent = name;
}

System.prototype.addEntity = function(entity)
{
	if (entity.hasTag(this.requiredTag) || entity.name == this.requiredType || entity.components.hasOwnProperty(this.requiredComponent))
	{
		this.entities.push(entity);
		this.initEntity(entity);
	}
}

System.prototype.init = function() {}
System.prototype.initEntity = function() {}
System.prototype.update = function() {}

System.prototype.acceptRequestedCommands = function()
{
	for (var entity of this.entities)
	{
		var commands = entity.getComponent("Commands");

		if (commands[this.type])
		{
			for (var command of commands[this.type])
			{
				var args = command.args;
				args.unshift(entity);					// Adds "entity" as first argument of function
				this[command.func].apply(null, args);	// Runs function
			}
		}

		commands[this.type] = [];	// Remove commands from queue
	}
}
