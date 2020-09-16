$(function () {
	
	/*********************/
	/*svg MERRY CHRISTMAS*/
	/*********************/
	var logo_detime = 0.0;
	var bg_title = document.querySelectorAll("#bg .T_title");

	bg_title.forEach(function (num) {
		num.setAttribute("style", "stroke-dasharray:" + num.getTotalLength() + "; stroke-dashoffset:" + num.getTotalLength() + "; animation:" + `line-anim 2s ease forwards ${logo_detime.toFixed(1)}s`);
		logo_detime += 0.3;
		// console.log(num.getTotalLength());
	});
	logo_detime += 1;
	document.getElementsByClassName("Merry_Christmas_fill")[0].setAttribute("style", "animation:"+`fill 2s linear infinite alternate ${logo_detime.toFixed(1)}s`);

	/*****************/
	/* svg lightball */
	/*****************/
	var bg_TlightBall = document.querySelectorAll("#bg circle");
	bg_TlightBall.forEach(function (lightball) {
		var cir_color = lightball.getAttribute('fill');
		switch (cir_color) {
			case '#0B5494':
				lightball.setAttribute('class', 'ball_1');
				break;
			case '#0AAA1A':
				lightball.setAttribute('class', 'ball_2');
				break;
			case '#CD0000':
				lightball.setAttribute('class', 'ball_3');
				break;
			case '#D6AE00':
				lightball.setAttribute('class', 'ball_4');
				break;
			default:
				break;
		};


	});
});
