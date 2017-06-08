function Camera(canvas)
{
	this.offset = new Vector(0, -800);
	//this.offset = new Vector(0, -400);
	this.virtualSize = new Vector(450, 800);
	this.canvas = canvas;
}

Camera.prototype.update = function()
{
	this.realSize = new Vector(this.canvas.width, this.canvas.height);
	this.realOffset = this.offset["/"](this.virtualSize)["*"](this.realSize);
	this.canvas.style.backgroundPositionY = -(this.offset.y + 800) / 10 + "px";
	console.log("cp", this.offset);
}

Camera.prototype.realPosition = function(vector)
{
	var pos = this.translatePosition(vector);
	return this.realVector(pos);
}

Camera.prototype.realVector = function(vector)
{
	return vector["/"](this.virtualSize)["*"](this.realSize);
}

Camera.prototype.translatePosition = function(vector)
{
	return vector["-"](this.offset);
}

Camera.prototype.fixedPosition = function(vector)
{
	return vector["+"](this.offset);
}

Camera.prototype.setMinY = function(y)
{
	if (y < this.offset.y + 400)
	{
		this.offset.y = y;
		this.offset.y -= 400;
	}
}
