function XSystem()
{
	System.call(this);
	this.type = "XSystem";
}

XSystem.prototype = Object.create(System.prototype);

XSystem.prototype.init = function()
{

}

XSystem.prototype.update = function(dt)
{

}
