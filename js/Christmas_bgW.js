function gift() {
	$('#open_present_top').attr("class",function(index, attr){return attr == "open_present_top" ? null : "open_present_top";});
	$('#present_bgLight').attr("class",function(index, attr){return attr == "present_bgLight" ? null : "present_bgLight";});
	$('#present_bear').attr("class",function(index, attr){return attr == "present_bear" ? null : "present_bear";});
	$('#present_card').attr("class",function(index, attr){return attr == "present_card" ? null : "present_card";});
	$('#present_balloon').attr("class",function(index, attr){return attr == "present_balloon" ? null : "present_balloon";});
}

function msg() {
	$("#msg_bg").fadeToggle(1000);
	setTimeout(function () {
		$("#msg_bgD").stop(true, true).animate({
			opacity: "toggle"
		}, 0);
		$("#msg_content").attr("class",function(index, attr){return attr == "msg_contentS" ? null : "msg_contentS";});
		$(".msg").toggleClass("msg_contentS");
	}, 200);
}



$(function () {
	let list_all=[["MIS", "09136", "林鈺真"],["MIS", "07076", "陳達韋"],["MIS", "02001", "楊宗原"]];
	var count_str=0;
	var d = "0";
	var bgC = 1;
	$("#iframe_bg" + bgC).toggleClass("bg");
	document.addEventListener("keyup", event => {
		if (event.isComposing || event.keyCode === 40 || event.keyCode === 83) {  //按方向鍵"下"
			console.log(bgC);
			$("#iframe_bg" + bgC).toggleClass("bg");
			if (bgC === 3) {
				bgC = 1;
			} else {
				bgC += 1;
			};
			$("#iframe_bg" + bgC).toggleClass("bg");
		}else{
			switch (d) {
				case "0":
					// Enter
					if (event.isComposing || event.keyCode === 13) {
	
						var msg_wds=`部門：${list_all[count_str][0]}<br>工號：${list_all[count_str][1]}<br>姓名：${list_all[count_str][2]} `;
						console.log(msg_wds);
						document.getElementById('msg').innerHTML=msg_wds;
	
						if(count_str != list_all.length-1){
							count_str+=1;
						}else{
							count_str=0;
						}
	
						console.log(d);
						d = "1";
						gift();
						msg();
						// document.getElementById("msg").innerHTML=d;//替換成得獎者
						return;
					}
	
					break;
				case "1":
					// Next
					if (event.isComposing || event.keyCode === 39) {
						console.log(d);
						// alert(event.code);
						d = "0";
						// $("#msg_bg").fadeToggle(1000);
						gift();
						msg();
						return;
					}
					// New
					if (event.isComposing || event.keyCode === 37) {					
						console.log(d);
						alert("確定重新抽取？");
						return;
					}
					break;
				default:
					break;
			};
		};	
		
	});

	/******************/
	/**    click     **/
	/******************/
	WR_NEW.addEventListener("click", function(){
		alert("確定重新抽取？");
	});
	WR_NEXT.addEventListener("click", function(){
		d = "0";//判斷按鍵enter
		gift();
		msg();
	});

	/******************/
	/**svg tree_light**/
	/******************/
	var bg_treeLight = document.querySelectorAll(".tree_light");
	var tree_light_D = 0.0;
	bg_treeLight.forEach(function (Tlight) {
		var bg_treeLight_color = Tlight.getAttribute('fill');
		switch (bg_treeLight_color) {
			case '#F44336':
				Tlight.setAttribute("style", "animation:" + `Tlight_R 1s ${tree_light_D}s linear infinite`);
				break;
			case '#FFEE58':
				Tlight.setAttribute("style", "animation:" + `Tlight_Y 1s ${tree_light_D}s linear infinite`);
				break;
			default:
				break;
		};
		tree_light_D += 0.2;
	});



});
