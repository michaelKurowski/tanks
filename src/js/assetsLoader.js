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

	//load images
	//TODO rewrite function to serve as just universal assets loader 
	function loadImages() {
		assetsConfig.images.forEach( (element, index, arr) => {
			var imagesPromises = [];
			let asset = new Image();
			asset.src = element;
			imagesPromises.push(
					new Promise ( (resolve, reject) => {
					asset.onload = (ev) => {
						resolve();
					}
				});
			);
			assets.images[index] = asset;
		});
		return imagesPromises;
	};
	//Go to next step after all images will be loaded
	Promise.all(  loadImages()  )
		.then( (value, error) => {
	})
}
