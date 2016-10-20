//Version 00.00.01

var mkAx = function (params) {
	(  {target, type = "GET"} = params  )
	let xhttp = new XMLHttpRequest();
	let prom = new Promise ( (resolve, reject) => {
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				return resolve(this.responseText)
		  	}
	    };
	    xhttp.open(type, target, true);
	    xhttp.send();
	});
	return prom;
}
