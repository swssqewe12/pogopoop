function EntityFactory()
{

}

EntityFactory.prototype.create = function(name)
{
	//var components = this.GC.EntityComponents[name];
	//console.dir(components)
	var entity = new Entity(name);
	return entity;
}

EntityFactory.prototype.createPlayer = function(position, rotation)
{
	var entity = this.create("Player");
	entity.addComponents({
		"Tags": [
			"Renderable",
			"Collidable",
		],
		"Sprites": [
			{
				"image": img_poop_default,
				"size": new Vector(90, 90),
				"position": new Vector(0, 0),
				"rotation": 0,
				"mode": "relative"
			},
			{
				"image": img_eyes_default,
				"size": new Vector(90, 90),
				"position": new Vector(0, 0),
				"rotation": 0,
				"mode": "relative"
			}
		],
		"Physics": {
			"velocity": new Vector(0, 0),
			"gravityForce": 0.02,
			"weight": 0.2,
		},
		"States": {
			"inAir": false,
		},
		"CollisionBox": {
			"r": 90
		},
		"Collisions": [],
		"Scripts": [
			"PlayerInput",
			"PlayerCollisions",
			"PlayerActions"
		],
		"WorldObject": {
			"position": position,	// Vector
			"rotation": rotation	// Radians
		}
	});
	return entity;
}

EntityFactory.prototype.createWall = function(direction)
{
	var entity = this.create("Wall");
	entity.addComponents({
		"Tags": [
			"Collidable",
			"Renderable",
			"Fixed",
			direction + "Wall"
		],
		"CollisionBox": {
			"size": new Vector(30, 800),
			"solid": true
		},
		"WorldObject": {
			"position": new Vector(direction == "Left" ? 15 : 435, 400),
			"rotation": 0
		},
		"Sprites": [{
			"image": img_wall,
			"size": new Vector(30, 800),
			"position": new Vector(0, 0),
			"rotation": 0,
			"mode": "relative"
		}]

	});
	return entity;
}

EntityFactory.prototype.GC = new GameConstants();
