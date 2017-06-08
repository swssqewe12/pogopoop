function Entity(name) //Actions, Commands are more components!
{
	this.name = name;
	this.components = {
		"Actions": []
	}
}

Entity.prototype.hasComponent = function(component)
{
	return this.components[component] !== undefined;
}

Entity.prototype.hasTag = function(tag)
{
	return this.components.Tags.indexOf(tag) >= 0;
}

Entity.prototype.getComponent = function(name)
{
	return this.components[name];
}

Entity.prototype.setComponent = function(name, value)
{
	this.components[name] = value;
}

Entity.prototype.addComponents = function(components)
{
	Object.assign(this.components, components);
}

Entity.prototype.getEachComponent = function(name)
{
	var components = this.components[name];
	return {'getNextComponent': function(func) {
		components.forEach(component => {
			func(components)
		});
	}};
}

Entity.prototype.getPosition = function()
{
	return this.components.WorldObject.position;
}

Entity.prototype.getRotation = function()
{
	return this.components.WorldObject.rotation;
}

Entity.prototype.requestCommand = function(system, func)
{
	var self = this;

	return function()
	{
		var args = Array.prototype.slice.call(arguments);
		var commands = self.components.Commands;

		if (commands[system] === undefined)
			commands[system] = [];

		commands[system].push({
			'func': func,
			'args': args
		});
	}
}

Entity.prototype.addToComponent = function(component, value)
{
	this.components[component].push(value);
}
