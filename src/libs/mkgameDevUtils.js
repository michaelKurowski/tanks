// mkMath v. 00.00.01
/*
Small collection of functions that are essential for games related calculations

*/
var mkMath = {
	addVr(vecA, vecB) {
		return vecA.map( (elem, index) => elem + vecB[index] )
	},
	sumVec(...vectors) {
		return vectors.reduce( (prevVal, currVal) => this.addVr(prevVal, currVal) ) 
	},
	scaleVr(vec, scalar) {
		return vec.map( elem => elem * scalar )
	},
	subtractVr(vecA, vecB) {
		return vecA.map( (elem, index) => elem - vecB[index] )
	},
	toUnitVr(vec) {
		const vectorLength = this.calcVrLength(vec)
		return vec.map( elem => elem / vectorLength )
	},
	angleBetween2Vr(vecA, vecB) {
		return Math.atan2( ...this.subtractVector(vecA, vecB) )
	},
	transpose(matrix) {
		return matrix[0].map( (col, i) => matrix.map(row => row[i]) )
	},
	multiplyMatrixes(matrixA, matrixB) {
		//TODO (this is not a proper hour to write matrix multiplication)
	},
	pyth(a, b, root = true){ //Pythagoras
		return root ? Math.sqrt(a*a + b*b) : a*a + b*b
	},
	srand(seed) {
		return 1103515245 * seed + 812345 % Math.pow(2,32)
	},
	calcVrLength(vec) {
		return this.pyth(vec[0], vec[1])
	},
	getNegNumbersVr(vec) { //takes vector and returns vector which describes signs of every vector element
		return [(vec[0] > 0) ? 1 : -1, (vec[1] > 0) ? 1 : -1]
	},
	crossProduct(vecA, vecB) {
		return [vecA[0] * vecB[0] + vecA[0] * vecB[1], vecA[1] * vecB[0] + vecA[1] * vecB[1]]
	},
	hadamardProductVr(vecA, vecB) {
		return [vecA[0] * vecB[0], vecA[1] * vecB[1]]
	},
	getPerpendicularVr(vec, clockwise) {
		if (clockwise) return [-vec[1], vec[0]]
		return [vec[1], -vec[0]]
	},
	quadrFunFac(a = 0, b = 0, c = 0) {
		return x => a * x * x + b * x + c
	},
	recurr(cbCondition, cbCode, val){ //Allows for recursion without exceeding maximum stack size
		while(cbCondition(val)) {
			val = cbCode(val)
		}
		return val
	}


}

var mkPhys = {
	gravity(mass1, mass2, r){
		return (6.674 * 0.00000000001) * (  (mass1 * mass2)/(r*r)  )
	},
	computeForce(acceleration, mass) {
		if (mass <= 0) throw "Mass must be bigger than 0."
		return mkMath.scaleVector(acceleration, mass)
	}

}
