
const tileSize = 100
const renderFrequency = 16
const logicFrequency = 10
const terrainSeed = 515525

const cnv = document.getElementById('cnv')
const cnvBuff = document.getElementById("cnvBuff")

const ctx = cnv.getContext("2d")
const ctxBuff = cnvBuff.getContext("2d")

const keysStatus = new Array(300)

const debugmode = false

let player = {}

let entities = []
let lastRender = new Date().getTime()



void function init () {
	fitCanvas()
	entities.push( tank([20, 20], ['tanks', 'rhino'], 0) )
	player = entities[0]
	Promise.all(loadAssets()).then(() => {
		setInterval(logicTick, logicFrequency)
	})//Temp
}()

function logicTick() {

	let modifier
	if (keysStatus[37]) player.turretRotation-= 0.06
	if (keysStatus[39]) player.turretRotation+= 0.06

	if (keysStatus[32]) player.shoot()

	if (keysStatus[83]) modifier = -1
	if (keysStatus[87]) modifier = 1

	if (keysStatus[65]) player.rotation -= 0.07
	if (keysStatus[68]) player.rotation += 0.07

	if (modifier) player.drivePush(modifier)
	//player.propagate()
	entities.forEach( entity => {
		entity.propagate()
	})
	let currentTime = new Date().getTime();
	if ( (lastRender + renderFrequency) < currentTime ) requestAnimationFrame(renderScene)
}
function renderScene() {





	//Drawing terrain
	const tilesHorizontally = Math.round(cnv.width / tileSize)
	const tilesVertically = Math.round(cnv.height / tileSize)
	let horizontally = tilesHorizontally
	let vertically = tilesVertically
	while(horizontally-- > -1){ //TODO fix these statements
		while(vertically-- > -1){
			const variant = Math.abs( Math.round( mkMath.srand(horizontally) + mkMath.srand(vertically) ) ) % assets.images.terrain.grass.length
			ctx.drawImage(assets.images.terrain.grass[variant], horizontally * tileSize, vertically * tileSize, tileSize, tileSize)
		}
		vertically = tilesVertically
	}
	//TODO: finish it
	entities.forEach( entity => {
		const sprite = entity.sprite.reduce( (prevVal, currVal) => prevVal[currVal]
		, assets.images) //Loads sprite



		const angle = entity.rotation - 1.57079633
		//
		ctx.save()
		if (entity.sprite[0] === 'tanks') {
			//entity.animateHull(mkAnims.wiggling)
			//entity.animateTurret(mkAnims.push)
			ctx.save();
			ctx.translate(entity.pos[0] + sprite[0].width / 2, entity.pos[1] + sprite[0].height / 2)
			// rotate the canvas to the specified degrees
			ctx.rotate(angle)
			ctx.translate(-sprite[0].width / 2 - entity.pos[0], -sprite[0].height / 2 - entity.pos[1])

			ctx.drawImage(sprite[2], entity.pos[0], entity.pos[1], 250, 250)
			ctx.drawImage(sprite[1], entity.pos[0] + entity.hullOffset[0], entity.pos[1] + entity.hullOffset[1], 250, 250)

			const turretAngle = entity.turretRotation
			ctx.translate(entity.pos[0] + sprite[0].width / 2, entity.pos[1] + sprite[0].height / 2)
			// rotate the canvas to the specified degrees
			ctx.rotate(turretAngle)
			ctx.translate(-sprite[0].width / 2 - entity.pos[0] + entity.turretOffset[0], -sprite[0].height / 2 - entity.pos[1] + entity.turretOffset[1])

			ctx.drawImage(sprite[0], entity.pos[0] + entity.hullOffset[0], entity.pos[1] + entity.hullOffset[1], 250, 250)


		} else {
			ctx.translate(entity.pos[0] + sprite[0].width / 2, entity.pos[1] + sprite[0].height / 2)
			// rotate the canvas to the specified degrees
			ctx.rotate(angle)
			ctx.translate(-sprite[0].width / 2 - entity.pos[0], -sprite[0].height / 2 - entity.pos[1])

			ctx.drawImage(sprite[0], entity.pos[0], entity.pos[1], 250, 250)


		}
		ctx.restore()
		//TODO remove
		const headingVector = entity.calcHeadingVr()
		const facingDirection = mkMath.toUnitVr(headingVector)
		const velocLength = mkMath.calcVrLength(entity.veloc)

		const leftVr = mkMath.scaleVr(mkMath.getPerpendicularVr(facingDirection, true), 200*velocLength)
		const rightVr = mkMath.scaleVr(mkMath.getPerpendicularVr(facingDirection, false), 200*velocLength)
		const frontVr = mkMath.scaleVr(facingDirection, 200*velocLength)


		if (debugmode) {
			ctx.beginPath()
			ctx.strokeStyle="red"
			ctx.moveTo(entity.pos[0],entity.pos[1])
			ctx.lineTo(entity.pos[0] +leftVr[0],entity.pos[1] + leftVr[1])
			ctx.stroke()
			ctx.closePath()
			ctx.strokeStyle="green"
			ctx.beginPath()
			ctx.moveTo(entity.pos[0],entity.pos[1])
			ctx.lineTo(entity.pos[0] + rightVr[0], entity.pos[1] + rightVr[1])
			ctx.stroke()
			ctx.closePath()
			ctx.strokeStyle="blue"
			ctx.beginPath()
			ctx.moveTo(entity.pos[0],entity.pos[1])
			ctx.lineTo(entity.pos[0] +frontVr[0],entity.pos[1] +frontVr[1])
			ctx.stroke()
			ctx.closePath()
		}

	})
	//Drawing entities
}



function fitCanvas(){
	cnv.width = window.innerWidth;
	cnv.height = window.innerHeight;
	cnvBuff.width = window.innerWidth;
	cnvBuff.height = window.innerHeight;
}
