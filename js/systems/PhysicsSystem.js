function PhysicsSystem()
{
	System.call(this);
	this.type = "PhysicsSystem";
	this.requiresType("Player");
}

PhysicsSystem.prototype = Object.create(System.prototype);

PhysicsSystem.prototype.init = function()
{

}

PhysicsSystem.prototype.update = function(dt)
{
	//this.acceptRequestedCommands();

	for (var entity of this.entities)
		this.updateEntity(entity, dt);
}

PhysicsSystem.prototype.updateEntity = function(entity, dt)
{
	var physics = entity.getComponent("Physics");
	var data = entity.getComponent("WorldObject");
	var collisions = entity.getComponent("Collisions");

	if (!physics.gravityVelocity) physics.gravityVelocity = new Vector(0, 0);

	physics.acceleration = new Vector(0, physics.gravityForce)["*"](physics.weight);

	var cancelGravity = false;
	for (var collision of collisions)
	{
		if (collision.getComponent("CollisionBox").solid)
		{
			//console.log("SOLID COLLISION!")
			cancelGravity = true;
			break;
		}

		//temp!!!

		/*if (collision.hasTag("LeftWall") && entity.getPosition().x < 75)
		{
			entity.getPosition().x = 75;
			if (physics.velocity.x < 0) physics.velocity.x = 0;
		}
		else if (collision.hasTag("RightWall") && entity.getPosition().x > 385)
		{
			entity.getPosition().x = 385;
			if (physics.velocity.x > 0) physics.velocity.x = 0;
		}*/

	}

	if (!cancelGravity)
	{
		physics.gravityVelocity.add(physics.acceleration["*"](dt));
	}

	if (cancelGravity)
	{
		physics.gravityVelocity.multiplyByScalar(0);
	}

	// How do we stop current gravity entirely instead of just removing future gravity acceleration?

	data.position.add(physics.velocity["*"](dt));
	data.position.add(physics.gravityVelocity["*"](dt))
}

PhysicsSystem.prototype.applyForce = function(entity, force)
{
	entity.getComponent("Physics").velocity.add(force);
}

PhysicsSystem.prototype.clearForce = function(entity)
{
	entity.getComponent("Physics").velocity.multiplyByScalar(0);
}
