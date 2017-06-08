function PlayerCollisions(player)
{
	this.player = player;
}

PlayerCollisions.prototype.update = function()
{
	this.checkCollisions();
}

PlayerCollisions.prototype.checkCollisions = function()
{
	for (var collision of this.player.getComponent("Collisions"))
	{
		this.checkCollision(collision);
	}
}

PlayerCollisions.prototype.checkCollision = function(collision)
{
	var lastCollisions = this.player.getComponent("LastCollisions");

	if (collision.hasTag("LeftWall"))
	{
		if (!lastCollisions.includes(collision))	// this is a new collision
		{
			this.player.addToComponent("Actions", "Freeze");
		}
	}
	else if (collision.hasTag("RightWall"))
	{
		if (!lastCollisions.includes(collision))	// this is a new collision
		{
			this.player.addToComponent("Actions", "Freeze");
		}
	}
}
