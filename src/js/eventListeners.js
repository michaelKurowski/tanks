onresize = () => {
	fitCanvas();
}
onkeydown 	= 	e 	=> 	(keysStatus[e.which] = true) && false //&& false, to make lambda return false, which blocks default key usage
onkeyup 	= 	e 	=> 	(keysStatus[e.which] = false) && false
