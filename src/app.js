/*


















*/
let renderFrequency = 5;


let cnv = document.getElementById('cnv');
let cnvBuff = document.getElementById("cnvBuff");

let ctx = cnv.getContext("2d");
let ctxBuff = cnvBuff.getContext("2d");

let lastRender = new Date().getTime();

void function init () {
	fitCanvas();

	//Loading assets
	loadAssets().then( () => {
		
	})
}()

function logicTick() {


	let currentTime = new Date().getTime();
	if ( (lastRender + renderFrequency) < currentTime ) renderAnimationFrame(renderScene);
}
function renderScene() {

}



function fitCanvas(){
	cnv.width = window.innerWidth;
	cnv.height = window.innerHeight;
	cnvBuff.width = window.innerWidth;
	cnvBuff.height = window.innerHeight;
}
