const assetsConfig = {
	images: texturesCnf
}
let assets = {
	images: {},
	imagesReadiness: [ //list of promises for loading images from ["images"] property

	]
}

//Loads assets from assets object, return promise
function loadAssets(){

	//load images
	//TODO rewrite function to serve as just universal assets loader (?)
	function loadImages() {
		let imagesPromises = []

		Object.keys(assetsConfig.images).forEach( (imgsGroup, imgTypeIndex, imgTypeArr) => { //Iterate through .images in config
			const loopedImgGroupKeys = Object.keys(assetsConfig.images[imgsGroup])
			loopedImgGroupKeys.forEach( (sprite, spriteIndex, spriteArr) => { //Iterate through sprites in image groups (example: through terrain tiles in Terrain group)
				assets.images[sprite] = {} //creating sprite
				const loopedSpriteInfo = assetsConfig.images[imgsGroup][sprite]
				const variations = loopedSpriteInfo.variations - 1

				let textureVariationsList = [] //set of sprite variations

				//reads all variations recursively and saves their onLoad promises to the value that will be returned
				;(function readTextureVariations (vars){
					const textureVariation = new Image()
					textureVariation.src = `assets/images/${imgsGroup}/${sprite}/${vars}.${loopedSpriteInfo.extension}`
					imagesPromises.push(
						new Promise ( (resolve, reject) =>
							textureVariation.onload = ev => resolve(ev) //Fullfils promise once image is loaded
						)
					)
					textureVariationsList.push(textureVariation)
					if (vars) readTextureVariations(--vars)
				})(variations)

				assets.images[sprite] = textureVariationsList //sprite is set of texture variations
			})
		})
		return imagesPromises
	};
	//Go to next step after all images will be loaded
	Promise.all(  loadImages()  )
		.then( (value, error) => {
	})
}
