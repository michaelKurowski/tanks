
////////////////////////////////////////// FACTORIES //////////////////////////////////////////

const tank = function (position, type, rotation = 0) {
	const newTank = Object.create(tankProto)
	newTank.sprite = type
	newTank.rotation = rotation
	return newTank
}

const projectile = function (rotation, speed, position, sprite) {
	const newProjectile = Object.create(projectileProto)
	newProjectile.rotation = rotation
	newProjectile.veloc = mkMath.scaleVr(newProjectile.calcHeadingVr(), speed)
	newProjectile.pos = position
	newProjectile.sprite = sprite
	return newProjectile
}
////////////////////////////////////////// PROTOTYPES //////////////////////////////////////////
const entity = {
	pos: [0, 0],
	veloc: [0, 0],
	rotation: 0,
	mass: 1,
	move() {
		this.pos = mkMath.addVr(this.pos, this.veloc)
	},
	applyForce(vec, mass) {
		const force = mkMath.scaleVr(vec, mass / this.mass)
		console.log(mkMath.addVr(force, this.veloc))
		this.veloc = mkMath.addVr(force, this.veloc)
	},
	propagate() {
		this.move()
	},
	calcHeadingVr(){
		return [Math.cos(this.rotation), Math.sin(this.rotation)]
	}
}

const graphicalObject = {
	sprite: ''
}

const projectileProto = Object.assign({}, entity, graphicalObject, {
	rotation: 0,
	position: [0, 0],
	veloc: [0, 0],
	sprite: '',
	propagate(){
		this.move()
	}
})

const tankProto = Object.assign({}, entity, graphicalObject, {
	thrust: 8,
	rotation: 0,
	turretRotation: 0,
	hullOffset: [-2 ,-2],
	turretOffset: [0, 0],
	hullAnimTimer: [0, 5],
	turretAnimTimer: [0, 5],
	projectileSprite: '',
	drivePush(forwardOrBackward) { //forward = 1, backward = -1
		const headingVector = this.calcHeadingVr()
		const direction = mkMath.scaleVr(mkMath.toUnitVr(headingVector), forwardOrBackward)
		const velocLength = mkMath.calcVrLength(this.veloc)
		const leftToLimit = this.thrust - velocLength
		console.log('Dir and leftToLimit',direction, leftToLimit)
		if (leftToLimit > 0) this.applyForce(direction, leftToLimit )

	},
	propagate(){
		const headingVector = this.calcHeadingVr()
		this.veloc = mkMath.scaleVr(this.veloc, 0.98)
		this.adjustTrack()
		this.move()
		this.animateHull(mkAnims.wiggling)
		this.animateTurret(mkAnims.push)
	},
	adjustTrack(){ //TODO fix it

		const forwardFacingVec = mkMath.toUnitVr( this.calcHeadingVr() )
		const backwardFacingVec = mkMath.reverseVec(forwardFacingVec)
		const velocLength = mkMath.calcVrLength(this.veloc)

		const differenceNegatv = mkMath.subtractVr(this.veloc, backwardFacingVec)
		const differencePositv = mkMath.subtractVr(this.veloc, forwardFacingVec)

		let correctedVec
		if (mkMath.calcVrLength(differenceNegatv) > mkMath.calcVrLength(differencePositv)) {
			correctedVec = mkMath.scaleVr(forwardFacingVec, velocLength)
		} else {
			correctedVec = mkMath.scaleVr(backwardFacingVec, velocLength)
		}
		this.veloc = [ (correctedVec[0] + this.veloc[0]) / 2, (correctedVec[1] + this.veloc[1]) /2  ] //Tracks friction

	},
	animateHull(animFunction){//Definitelly deserves some refactoring and redesign
		if (this.hullAnimTimer[0]++ > this.hullAnimTimer[1]) { //Reseting anim
			this.hullAnimTimer[0] = 0
		}
		this.hullOffset = animFunction(this.hullAnimTimer, this.hullOffset)

	},
	animateTurret(animFunction){

		if (this.turretAnimTimer[0] !== 0) {
			this.turretAnimTimer[0]++
			if (this.turretAnimTimer[0] > this.turretAnimTimer[1]) { //Reseting anim
				this.turretAnimTimer[0] = 0
			}
			this.turretOffset= animFunction(this.turretAnimTimer, this.turretOffset)
		}
		/*
		if (this.turretAnimTimer[0]++) {
			this.turretAnimTimer[0] = animFunction(this.turretAnimTimer, this.turretOffset)
		} else if (this.turretAnimTimer[0] === this.turretAnimTimer[1]) {
			this.turretAnimTimer[0] = 0
		}
		*/
	},
	shoot(){
		const newProj = projectile(this.turretRotation + this.rotation, 10, this.pos, ['projectiles','AA'] )
		this.turretAnimTimer[0] = 1
		console.log(newProj)
		entities.push(newProj)
	}


})
