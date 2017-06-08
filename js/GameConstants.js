function GameConstants() {}

GameConstants.prototype.Systems = [
	"FixedMovementSystem",
	"ScriptSystem",
	"PhysicsSystem",
	"CollisionSystem",
	"RenderSystem",
]

GameConstants.prototype.SystemSharedComponents = {
	"RenderSystem": [
		"canvas",
		"ctx",
		"camera"
	],
	"FixedMovementSystem": [
		"camera"
	]
}
