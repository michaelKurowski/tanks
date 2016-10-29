onresize = () => {
	fitCanvas();
}
onkeydown = e => {
	let modifier
	switch (e.which) {
		case 40://down
			modifier = -1
			break
		case 38://up
			modifier = 1
			break
		case 37://left
			player.rotation-= 0.02
			return
		case 39://right
			player.rotation+= 0.02
			return
		default:
			return
	}

	player.drivePush(modifier)
}
