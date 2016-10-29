/*


















*/

const tileSize = 100
const renderFrequency = 16
const logicFrequency = 10
const terrainSeed = 515525

const cnv = document.getElementById('cnv')
const cnvBuff = document.getElementById("cnvBuff")

const ctx = cnv.getContext("2d")
const ctxBuff = cnvBuff.getContext("2d")

let player = {}

let entities = []
let lastRender = new Date().getTime()



void function init () {
	fitCanvas()
	entities.push( tank([20, 20], 'rhino', 0) )
	player = entities[0]
	//Loading assets
	//loadAssets().then( () => { })
	Promise.all(loadAssets()).then(()=>{
		setInterval(logicTick, logicFrequency)
	})//Temp
}()

function logicTick() {
	player.propagate()

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
		const sprite = assets.images.tanks[entity.sprite]
		const angle = entity.rotation
		entity.animateHull(mkAnims.wiggling)
		ctx.save();
		ctx.translate(entity.pos[0] + sprite[0].width / 2, entity.pos[1] + sprite[0].height / 2)
		// rotate the canvas to the specified degrees
		ctx.rotate(angle - 1.57079633)
		ctx.translate(-sprite[0].width / 2 - entity.pos[0], -sprite[0].height / 2 - entity.pos[1])

		ctx.drawImage(sprite[2], entity.pos[0], entity.pos[1], 250, 250)
		ctx.drawImage(sprite[1], entity.pos[0] + entity.hullOffset[0], entity.pos[1] + entity.hullOffset[1], 250, 250)

		const turretAngle = entity.turretRotation
		ctx.translate(entity.pos[0] + sprite[0].width / 2, entity.pos[1] + sprite[0].height / 2)
		// rotate the canvas to the specified degrees
		ctx.rotate(turretAngle)
		ctx.translate(-sprite[0].width / 2 - entity.pos[0], -sprite[0].height / 2 - entity.pos[1])

		ctx.drawImage(sprite[0], entity.pos[0] + entity.hullOffset[0], entity.pos[1] + entity.hullOffset[1], 250, 250)

		ctx.restore();

	})
	//Drawing entities
}



function fitCanvas(){
	cnv.width = window.innerWidth;
	cnv.height = window.innerHeight;
	cnvBuff.width = window.innerWidth;
	cnvBuff.height = window.innerHeight;
}
