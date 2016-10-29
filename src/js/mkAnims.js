const mkAnims = {
	wiggling(timer, currentPos){
		const dirX = (timer[0] > timer[1] / 2) ? 1 : -1
		const dirY = (timer[0] > timer[1] / 2) ? -1 : 1
		return [currentPos[0] + dirX, currentPos[1] + dirY]
	}
}
