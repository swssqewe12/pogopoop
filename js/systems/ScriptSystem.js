function ScriptSystem()
{
	System.call(this);
	this.type = "ScriptSystem";
	this.requiresComponent("Scripts");
}

ScriptSystem.prototype = Object.create(System.prototype);

ScriptSystem.prototype.initEntity = function(entity)
{
	var scripts = [];
	for (var script_name of entity.getComponent("Scripts"))
		scripts.push(new window[script_name](entity));
	entity.setComponent("Scripts", scripts);
}

ScriptSystem.prototype.update = function(dt)
{
	for (var entity of this.entities)
	{
		for (var script of entity.getComponent("Scripts"))
		{
			if (script.update !== undefined)	script.update(dt);
		}
	}
}
