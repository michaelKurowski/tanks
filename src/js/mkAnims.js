
const mkAnims = {
	wiggling(timer, currentOffset){
		const dirX = (timer[0] > timer[1] / 2) ? 1 : -1
		const dirY = (timer[0] > timer[1] / 2) ? -1 : 1
		if (currentOffset[0] > 5) currentOffset[0] = 5
		if (currentOffset[1] > 5) currentOffset[1] = 5
		if (currentOffset[0] < -5) currentOffset[0] = -5
		if (currentOffset[1] < -5) currentOffset[1] = -5
		return [currentOffset[0] + dirX, currentOffset[1] + dirY]
	},
	push(timer, currentOffset) {

		return (timer[0] > Math.round(currentOffset[1] / 2)) ? [currentOffset[0], currentOffset[1] + 2] :
								[currentOffset[0], currentOffset[1] - 2]
	}
}
