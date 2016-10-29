
////////////////////////////////////////// FACTORIES //////////////////////////////////////////

const tank = function (position, type, rotation = 0) {
	const newTank = Object.create(tankProto)
	newTank.sprite = type
	newTank.rotation = rotation
	return Object.create(newTank)
}
////////////////////////////////////////// PROTOTYPES //////////////////////////////////////////
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
		console.log(mkMath.addVr(force, this.accel))
		this.accel = mkMath.addVr(force, this.accel)
	},
	propagate() {
		this.move()
	},
	calcHeadingVr(){
		return [Math.cos(this.rotation), Math.sin(this.rotation)]
	}
}

const tankProto = Object.assign(entity, {
	sprite: '',
	thrust: 8,
	drivePush(forwardOrBackward) { //forward = 1, backward = -1
		const headingVector = this.calcHeadingVr()
		const direction = mkMath.scaleVr(mkMath.toUnitVr(headingVector), forwardOrBackward)
		const accelLength = mkMath.calcVrLength(this.accel)
		const leftToLimit = this.thrust - accelLength
		console.log('Dir and leftToLimit',direction, leftToLimit)
		if (leftToLimit > 0) this.applyForce(direction, leftToLimit )

	},
	propagate(){
		const headingVector = this.calcHeadingVr()
		this.accel = mkMath.scaleVr(this.accel, 0.98)
		this.adjustTrack()
		this.move()
	},
	adjustTrack(){ //TODO fix it
		const headingVector = this.calcHeadingVr()
		const facingDirection = mkMath.toUnitVr(headingVector)
		const accelLength = mkMath.calcVrLength(this.accel)

		const accelDirection = mkMath.hadamardProductVr(mkMath.getNegNumbersVr(this.accel), facingDirection)
		this.accel = mkMath.scaleVr(accelDirection, accelLength)
	}
})
