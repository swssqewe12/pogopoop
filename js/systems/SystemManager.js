function SystemManager()
{
	this.systems = [];
	this.systemFactory = new SystemFactory();
}

SystemManager.prototype.init = function()
{
	this.GC.Systems.forEach(system => {
		this.systems.push(this.systemFactory.create(system));
	})
}

SystemManager.prototype.update = function(dt)
{
	this.systems.forEach(system => {
		system.update(dt);
	})
}

SystemManager.prototype.addEntityToSystems = function(entity)
{
	this.systems.forEach(system => {
		system.addEntity(entity);
	})
}

SystemManager.prototype.GC = new GameConstants();
