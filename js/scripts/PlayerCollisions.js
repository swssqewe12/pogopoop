function PlayerCollisions(player)
{
	this.player = player;
}

PlayerCollisions.prototype.update = function()
{
	console.log("pp",this.player.getPosition())
	this.checkCollisions();
}

PlayerCollisions.prototype.checkCollisions = function()
{
	//console.log("collisions=",this.player.getComponent("Collisions")) //_
	for (var collision of this.player.getComponent("Collisions"))
	{
		this.checkCollision(collision);
	}
}

PlayerCollisions.prototype.checkCollision = function(collision)
{
	var lastCollisions = this.player.getComponent("LastCollisions");
	//console.log("tigintuders",collision.getComponent("Tags")) //_

	if (collision.hasTag("LeftWall"))
	{
		//console.log("!!") //_
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
