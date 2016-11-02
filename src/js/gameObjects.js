
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
	rotation: 0,
	turretRotation: 0,
	hullOffset: [-2 ,-2],
	turretOffset: [0, 0],
	hullAnimTimer: [0, 5],
	turretAnimTimer: [0, 20],
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

		const leftVr = mkMath.scaleVr(mkMath.getPerpendicularVr(facingDirection, true), accelLength)
		const rightVr = mkMath.scaleVr(mkMath.getPerpendicularVr(facingDirection, false), accelLength)

		const correctVec = mkMath.scaleVr(facingDirection, accelLength)



		this.accel = [ (correctVec[0] + this.accel[0]) / 2, (correctVec[1] + this.accel[1]) /2  ] //Tracks friction

	},
	animateHull(animFunction){//Definitelly deserves some refactoring and redesign
		if (this.hullAnimTimer[0]++ > this.hullAnimTimer[1]) { //Reseting anim
			this.hullAnimTimer[0] = 0
		}
		this.hullOffset = animFunction(this.hullAnimTimer, this.hullOffset)

		if (this.hullOffset[0] > 5) this.hullOffset[0] = 5
		if (this.hullOffset[1] > 5) this.hullOffset[1] = 5
		if (this.hullOffset[0] < -5) this.hullOffset[0] = -5
		if (this.hullOffset[1] < -5) this.hullOffset[1] = -5

	}


})
