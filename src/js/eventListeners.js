onresize = () => {
	fitCanvas();
}
onkeydown = e => {
	let modifier
	//console.log(e)
	switch (e.which) {
		//Turret

		case 37://left
			player.turretRotation-= 0.06
			return
		case 39://right
			player.turretRotation+= 0.06
			return

		//Player
		case 83://down
			modifier = -1
			break
		case 87://up
			modifier = 1
			break
		case 65://left
			player.rotation-= 0.02
			return
		case 68://right
			player.rotation+= 0.02
			return
		default:
			return
	}

	player.drivePush(modifier)
}
