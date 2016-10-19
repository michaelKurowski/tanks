let assetsConfig = {
	images: [

	]
}
let assets = {
	images: [

	],
	imagesReadiness: [

	]
}

//Loads assets from assets object, return promise
function loadAssets(){

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
