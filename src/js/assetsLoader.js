const assetsConfig = {
	images: new Map(texturesCnf.terrain)
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
		let imagesPromises = []
		assetsConfig.images.forEach( (element, index, arr) => {
			let asset = new Image()
			asset.src = element
			imagesPromises.push(
					new Promise ( (resolve, reject) =>
						asset.onload = ev => resolve(ev) //Fullfils promise once image is loaded
					)
			)
			assets.images[index] = asset;
		})
		return imagesPromises
	};
	//Go to next step after all images will be loaded
	Promise.all(  loadImages()  )
		.then( (value, error) => {
	})
}
