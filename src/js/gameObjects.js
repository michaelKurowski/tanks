const tank = function (position, type, rotation) {
	let newTank = Object.create(entity)
	newTank.sprite = type
	return newTank
}

const entity = {
	pos: [0, 0],
	accel: [0, 0],
	rotation: 0,
	mass: 1,
	sprite: "dummyTexture",
	move() {
		this.pos = mkMath.addVr(this.pos, this.accel)
	},
	applyForce(vec, mass) {
		this.accel = mkMath.scaleVector(vec, mass) / this.mass
	}
}
