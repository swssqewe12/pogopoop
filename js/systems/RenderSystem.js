function RenderSystem()
{
	System.call(this);
	this.type = "RenderSystem";
	this.canvas;
	this.camera;
	this.ctx;
	this.requiresTag("Renderable");
}

RenderSystem.prototype = Object.create(System.prototype);

RenderSystem.prototype.update = function(dt)
{
	this.clearCanvas();

	this.camera.update();

	this.entities.forEach(entity => {
		if (entity.name == "Player")
			this.camera.setMinY(entity.getPosition().y);
		entity.getComponent("Sprites").forEach(sprite => {
			this.renderSprite(entity, sprite);
		});
	});
}

RenderSystem.prototype.renderSprite = function(entity, sprite)
{
	var img = sprite.image;
	var relative = sprite.mode == "relative";
	var ent_pos = this.camera.realPosition(entity.getPosition());
	var spr_pos = this.camera.realVector(sprite.position);
	var pos = relative ? ent_pos : spr_pos;
	var rot = relative ? entity.getRotation() + sprite.rotation : sprite.rotation;
	var size = this.camera.realVector(sprite.size);

	this.ctx.save();
	this.ctx.translate(pos.x, pos.y);
	//this.ctx.translate(size.x/2, size.y/2);
	this.ctx.rotate(rot);
	this.ctx.translate(-size.x/2, -size.y/2);

	if (relative)
		this.ctx.drawImage(img, spr_pos.x, spr_pos.y, size.x, size.y);
	else
		this.ctx.drawImage(img, 0, 0, size.x, size.y);

	this.ctx.restore();

	if (entity.name == "Player")
		console.log("ptp", pos.x + spr_pos.x, pos.y + spr_pos.y);
}

RenderSystem.prototype.clearCanvas = function()
{
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
