let assetsConfig = {
	images: new Map()
}
let assets = {
	images: new Map(),
	imagesReadiness: [ //list of promises for loading images from ["images"] property

	]
}

//Loads assets from assets object, return promise
function loadAssets(){
	//TODO: reading assets config from assets/config.json instead of from var
	//Loads images
	
	assetsConfig.images.forEach( (element, index, arr) => {
		let asset = new Image();
		asset.src = element;
		assets.imagesReadiness[index] = new Promise ( (resolve, reject) => {
			asset.onload = (ev) => {
				resolve();
			}
		});
		assets.images[index] = asset;
	});

	return Promise.all(assets.imagesReadiness);
}
