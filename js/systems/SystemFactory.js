function SystemFactory()
{
	// Shared Components
	this.shared = {};

	this.shared.canvas = document.getElementById("game");
	this.shared.ctx = this.shared.canvas.getContext('2d');
	this.shared.camera = new Camera(this.shared.canvas);
	cam = this.shared.camera // debugging
}

SystemFactory.prototype.create = function(type)
{
	var system = new window[type]();
	this.shareComponents(system);
	system.init();
	return system;
}

SystemFactory.prototype.shareComponents = function(system)
{
	var wanted = this.GC.SystemSharedComponents[system.type];

	if (wanted)
	{
		for (var component of wanted)
		{
			system[component] = this.shared[component];
		}
	}
}

SystemFactory.prototype.GC = new GameConstants();
