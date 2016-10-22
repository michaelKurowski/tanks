// mkMath v. 00.00.01
/*
Small collection of functions that are essential for games related calculations

*/
var mkMath = {
	matrx: {
		addVector(vecA, vecB) {
			return vecA.map( (elem, index) => elem + vecB[index] )
		},
		scaleVector(vec, scalar) {
			return vecA.map( elem => elem * scalar )
		},
		subtractVector(vecA, vecB){
			return vecA.map( (elem, index) => elem - vecB[index] )
		},
		determineLength(vec){
			let dimension = vec.length;
			let vecLength = vec.reduce( (prevVal, currVal) => prevVal + currVal*currVal, 0 )
			return vecLength = Math.sqrt(vecLength)
		},
		toUnitVector(vec) {
			let vectorLength = this.determineLength(vec) 
			return vec.map( elem => elem / vectorLength )
		}

	}

}
