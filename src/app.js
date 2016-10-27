/*


















*/

const tileSize = 100
const renderFrequency = 16;
const logicFrequency = 10;

const cnv = document.getElementById('cnv')
const cnvBuff = document.getElementById("cnvBuff")

const ctx = cnv.getContext("2d")
const ctxBuff = cnvBuff.getContext("2d")




let lastRender = new Date().getTime()


let terrainSeed = 515525


void function init () {
	fitCanvas();

	//Loading assets
	//loadAssets().then( () => { })
	console.log(Promise.all(loadAssets()).then(()=>{
		setInterval(logicTick, logicFrequency)
	}))//Temp
}()

function logicTick() {


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
			const variant = Math.abs(Math.round((terrainSeed * horizontally + vertically) / terrainSeed) % 2)
			ctx.drawImage(assets.images.terrain.grass[variant], horizontally * tileSize, vertically * tileSize, tileSize, tileSize)
		}
		vertically = tilesVertically
	}

}



function fitCanvas(){
	cnv.width = window.innerWidth;
	cnv.height = window.innerHeight;
	cnvBuff.width = window.innerWidth;
	cnvBuff.height = window.innerHeight;
}
