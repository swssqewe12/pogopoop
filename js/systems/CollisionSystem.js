function CollisionSystem()
{
	System.call(this);
	this.type = "CollisionSystem";
	this.requiresTag("Collidable");
}

CollisionSystem.prototype = Object.create(System.prototype);

CollisionSystem.prototype.initEntity = function(entity)
{
	entity.setComponent("LastCollisions", []);
}

CollisionSystem.prototype.update = function(dt)
{
	/*var player = this.entities[0];
	var position = player.getPosition();

	if (position.x <= 45)
		player.getComponent("Actions").push("TouchingLeftWall");

	if (position.x >= 405)
		player.getComponent("Actions").push("TouchingRightWall");*/

	for (var entity of this.entities)
		if (entity.hasComponent("Collisions"))
			this.updateEntityCollisions(entity);
}

CollisionSystem.prototype.updateEntityCollisions = function(entity)
{
	var collisions = entity.getComponent("Collisions");

	entity.setComponent("LastCollisions", collisions)
	entity.setComponent("Collisions", []);

	for (var target of this.entities)
	{
		if (entity !== target	// don't check if you collide with yourself
		 && this.areEntitiesColliding(entity, target)	// are they colliding?
		){
			entity.getComponent("Collisions").push(target);
		}
	}
}

CollisionSystem.prototype.areEntitiesColliding = function(one, two)
{
	var a = one.getComponent("CollisionBox");
	var b = two.getComponent("CollisionBox");

	var awo = one.getComponent("WorldObject");
	var bwo = two.getComponent("WorldObject");

	var apos = awo.position;
	var bpos = bwo.position;

	console.log(two.name, two.getPosition())

	//console.log(bwo.mode,bpos)

	if (a.r && b.r)
	{
		//two circles
	}
	else if (a.size && b.size)
	{
		//two rects
	}
	else if (a.size && b.r)
	{
		return this.isCircleCollidingWithRect(b, a, bpos, apos);
	}
	else if (a.r && b.size)
	{
		return this.isCircleCollidingWithRect(a, b, apos, bpos);
	}

	//console.log("Error! Invalid collision boxes.")
	return false;
}

CollisionSystem.prototype.isCircleCollidingWithRect = function(circle_cb, rect_cb, circle_pos, rect_pos)
{
	var circleDistance = new Vector
	(
		Math.abs(circle_pos.x - rect_pos.x),
		Math.abs(circle_pos.y - rect_pos.y)
	)

    if (circleDistance.x > (rect_cb.size.x/2 + circle_cb.r)) { return false; }
    if (circleDistance.y > (rect_cb.size.y/2 + circle_cb.r)) { return false; }

    if (circleDistance.x <= (rect_cb.size.x/2)) { return true; }
    if (circleDistance.y <= (rect_cb.size.y/2)) { return true; }

    cornerDistance_sq = (circleDistance.x - rect_cb.size.x/2)^2 +
                         (circleDistance.y - rect_cb.size.y/2)^2;

    return cornerDistance_sq <= (circle_cb.r^2);
}
