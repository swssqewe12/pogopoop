function PlayerActions(player)
{
	this.player = player;
}

PlayerActions.prototype.update = function()
{
	this.performActions();
}

PlayerActions.prototype.performActions = function()
{
	var actions = this.player.getComponent("Actions")

	while (actions.length > 0)
	{
		var action = actions[0];
		this.performAction(action);
		actions.shift();	// remove first element (next element)
	}
}

PlayerActions.prototype.performAction = function(action)
{
	var power = Math.random()*10; //temp (1->10)
	var yForce = -0.6 - 0.2 * power;

	var physics = this.player.getComponent("Physics");

	switch (action) {
		case "SpringLeft":
			physics.velocity.add(new Vector(-0.6, yForce));
		break;
		case "SpringRight":
			physics.velocity.add(new Vector(0.6, yForce));
		break;
		case "Freeze":
			physics.velocity.multiplyByScalar(0);
		break;
	}
}
