
$(function () {
	

	/*********************/
	/*svg MERRY CHRISTMAS*/
	/*********************/
	var logo_detime = 0.0;
	var bg_title = document.querySelectorAll("#bg .T_title");

	bg_title.forEach(function (num) {
		num.setAttribute("style", "stroke-dasharray:" + num.getTotalLength() + "; stroke-dashoffset:" + num.getTotalLength() + "; animation:" + `line-anim 2s ease forwards ${logo_detime.toFixed(1)}s`);
		logo_detime += 0.3;
		console.log(num.getTotalLength());
	});
	logo_detime += 1;
	document.getElementsByClassName("Merry_Christmas_fill")[0].setAttribute("style", "animation:"+`fill 2s linear infinite alternate ${logo_detime.toFixed(1)}s`);
	
	/*****************/
	/* svg bg_snow */
	/*****************/
	var snow = document.getElementById("snow");
	var snow_Fragment = document.createDocumentFragment();
	var snownum=200;
	for(var j=0; j<snownum; j++){
		var snow_t = document.createElement("div");
		snow_t.className = "snow";
		snow_Fragment.appendChild(snow_t);
	}
	snow.appendChild(snow_Fragment);


	var snow_2_Fragment = document.createDocumentFragment();
	var snow_2num=50;
	for(var i=0; i<snow_2num; i++){
		var snow2_t = document.createElement("div");
		snow2_t.className = "snow2";
		snow_2_Fragment.appendChild(snow2_t);
	}
	snow.appendChild(snow_2_Fragment);
	


});
