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
	// $(".Merry_Christmas_fill")
	//bg_title.setAttribute("style", "animation:"+`fill 2s ease forwards ${logo_detime.toFixed(1)}s`);
	
});
