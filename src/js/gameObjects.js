const tank = function (position, type, rotation) {
	let newTank = Object.create(entity)
	newTank.sprite = type
	newTank.thrust = 1

	newTank.drivePush = function (forwardOrBackward) { //forward = 1, backward = -1
		const headingVector = [Math.cos(this.rotation), Math.sin(this.rotation)]
		const direction = mkMath.scaleVr(mkMath.toUnitVr(headingVector), forwardOrBackward)
		console.log(mkMath.toUnitVr(headingVector))
		this.applyForce(direction, this.thrust)
	}
	newTank.propagate = function (){
		const headingVector = [Math.cos(this.rotation), Math.sin(this.rotation)]
		//TODO write function that will keep tank on "rails"
		this.move()
	}

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
		const force = mkMath.scaleVr(vec, mass / this.mass)
		this.accel = mkMath.addVr(force, this.accel)
	},
	propagate() {
		this.move()
	},

}
