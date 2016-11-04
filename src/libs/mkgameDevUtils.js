
/*
	Ulm math library. Copyright by Michael Kurowski

*/
/*
WORK IN PROGRESS


;(function(globalObj) {
	if (globalObj.ulmLibrary) throw 'Ulm Math Library: ulmLibrary name is already occupied.'
	var ulmObj = {}

	var vectorMethodsProperty = 'vec'
	var arithmeticMethodsProperty = 'ar'



	globalObj.ulmLibrary = function() {
		ulmObj[vectorMethodsProperty] = VectorMethods
		ulmObj[arithmeticMethodsProperty] = ArithmeticMethods
		return ulmObj
	}
	var VectorMethods = {
		sum: function(vectors) {
			//Destructurizing arguments
			var params = [];
			params.push.apply(params, arguments);
			//Summing vectors

			return params.reduce( function(previous, current) {
				return previous.map( function(element, index) {
					return element + current[index]
				})
			})
		},
		sub: function(vectorA, vectorB) {
			return vectorA.map( function(element, index) {
				return element - vectorB[index]
			})
		},
		scale: function(vector, scalar) {
			return vector.map( function(element) {
				return element * scalar
			})
		},
		normalize: function(vector) { //Converting to unit vector
			var vectorLength = this.getLength(vec)
			return vector.map( function(element) {
				return element / vectorLength
			})
		},
		getLength: function(vector) {
			return vector.reduce( function(previous, current) {
				return ulmObj[ arithmeticMethodsProperty ].pyth(vec[0], vec[1], true)
			})

		}
	}

	var ArithmeticMethods = {
		pyth: function(a, b, rootResult) {
			rootResult = rootResult || true
			return rootResult ? Math.sqrt( a * a + b * b ) : a * a + b * b
		}
	}
})(window)

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
	},
	reverseVec(vec){
		return [-vec[0], -vec[1]]
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
