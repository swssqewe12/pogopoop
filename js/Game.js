function Game()
{
	this.gameSpeed = 1;
	this.lastFrameTimeMs = 0;
	this.maxFPS = 60;

	this.systemManager = new SystemManager();
	this.entityFactory = new EntityFactory();
}

Game.prototype.init = function()
{
	this.systemManager.init();
	this.initCanvas();
	this.initEntities();
}

Game.prototype.initCanvas = function()
{
	var canvas = document.getElementById("game");
	this.resetCanvasSize(canvas);
	window.onresize = this.resetCanvasSize.bind(this, canvas);
}

Game.prototype.resetCanvasSize = function(canvas)
{
	canvas.width = canvas.scrollWidth;
	canvas.height = canvas.scrollHeight;
}

Game.prototype.initEntities = function()
{
	var player = this.entityFactory.createPlayer(new Vector(75, -500), Math.PI*(90/180));
	this.systemManager.addEntityToSystems(player);

	var wall1 = this.entityFactory.createWall("Left");
	this.systemManager.addEntityToSystems(wall1);

	var wall2 = this.entityFactory.createWall("Right");
	this.systemManager.addEntityToSystems(wall2);
}

Game.prototype.mainloop = function()
{
	this.boundGameLoop = this.gameloop.bind(this);
	requestAnimationFrame(this.boundGameLoop);
}

Game.prototype.gameloop = function(timestamp)
{
	var dt = timestamp - this.lastFrameTimeMs;

	if (dt > (1000 / this.maxFPS))
	{
		this.update(dt * this.gameSpeed);
		this.lastFrameTimeMs = timestamp;
	}

	requestAnimationFrame(this.boundGameLoop);
}

Game.prototype.update = function(dt)
{
	this.systemManager.update(dt);
}
