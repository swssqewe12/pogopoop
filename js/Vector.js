function Vector(x, y)
{
	this.x = x !== undefined ? x : 0;
	this.y = y !== undefined ? y : 0;
}


Vector.prototype.add = function(vec)
{
	this.x += vec.x;
	this.y += vec.y;
}

Vector.prototype.subtract = function(vec)
{
	this.x -= vec.x;
	this.y -= vec.y;
}

Vector.prototype.multiply = function(vec)
{
	this.x *= vec.x;
	this.y *= vec.y;
}

Vector.prototype.multiplyByScalar = function(value)
{
	this.x *= value;
	this.y *= value;
}

Vector.prototype.divide = function(vec)
{
	this.x /= vec.x;
	this.y /= vec.y;
}


Vector.prototype.divideByScalar = function(value)
{
	this.x /= value;
	this.y /= value;
}


Vector.prototype.copy = function()
{
	return new Vector(this.x, this.y);
}


Vector.prototype.normalize = function()
{
	this.divideByScalar(this.getLength());
}


Vector.prototype.getDotProduct = function(vec)
{
	return (this.x * vec.x) + (this.y * vec.y);
}

Vector.prototype.getLength = function()
{
	Math.sqrt((this.x * this.x) + (this.y * this.y));
}


Vector.prototype["*"] = function(value)
{
	return value instanceof Vector ?
	new Vector(this.x * value.x, this.y * value.y) :
	new Vector(this.x * value, this.y * value);
}

Vector.prototype["/"] = function(value)
{
	return value instanceof Vector ?
	new Vector(this.x / value.x, this.y / value.y) :
	new Vector(this.x / value, this.y / value);
}

Vector.prototype["-"] = function(value)
{
	return value instanceof Vector ?
	new Vector(this.x - value.x, this.y - value.y) :
	new Vector(this.x - value, this.y - value);
}

Vector.prototype["+"] = function(value)
{
	return value instanceof Vector ?
	new Vector(this.x + value.x, this.y + value.y) :
	new Vector(this.x + value, this.y + value);
}
