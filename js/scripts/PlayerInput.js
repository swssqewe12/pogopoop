function PlayerInput(player)
{
	this.player = player;
	window.addEventListener("keyPress", this.handleKeyPress.bind(this));
	window.addEventListener("click", this.attemptPlayerSpring.bind(this));
	window.addEventListener("touchStart", this.attemptPlayerSpring.bind(this));
}

PlayerInput.prototype.handleKeyPress = function(event)
{
	//if (event.keyCode == 32 || event.keyCode == 38)
		this.attemptPlayerSpring();
}

PlayerInput.prototype.attemptPlayerSpring = function()
{
	var collisions = this.player.getComponent("Collisions");
	if (collisions.some(collision => collision.hasTag("LeftWall")))				 // some collision has tag of LeftWall
	{
		this.springPlayer("Right");
	}
	else if (collisions.some(collision => collision.hasTag("RightWall")))		 // some collision has tag of RightWall
	{
		this.springPlayer("Left");
	}
	else
	{
		// Not touching any wall.. inAir
	}
}

PlayerInput.prototype.springPlayer = function(direction)
{
	this.player.getComponent("Actions").push("Spring" + direction);
}
