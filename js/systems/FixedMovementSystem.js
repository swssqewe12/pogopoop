function FixedMovementSystem()
{
	System.call(this);
	this.type = "FixedMovementSystem";
	this.camera;
	this.requiresTag("Fixed")
}

FixedMovementSystem.prototype = Object.create(System.prototype);

FixedMovementSystem.prototype.initEntity = function(entity)
{
	var wo = entity.getComponent("WorldObject");
	wo.fixed_position = wo.position;
}

FixedMovementSystem.prototype.update = function(dt)
{
	for (var entity of this.entities)
	{
		var wo = entity.getComponent("WorldObject");
		wo.position = this.camera.fixedPosition(wo.fixed_position);
	}
}
