var d = "";  //作為判斷enter或方向鍵用

/***********/
/* Loading */
/***********/
document.onreadystatechange = function () {
	if (document.readyState === "complete") {
		$('#loading').fadeOut();
		$('.container').fadeIn();
		console.log(document.readyState);
	};
}


$(function () {
	var count_all = 0; //獎項總數量，判斷資料庫有無數量; Y: 撈取最大值; N:預設為0
	var count_allDet = count_all; //php回傳值數量帶回最小值
	if (count_all != '0') {
		//當資料庫有數值，重整或誤按關閉就不跳出輸入視窗
		$('#Fkindex').attr('style', 'opacity:0; z-index:-9999;');
		d="0";
		/*
		php迴圈跑五個，替換msg_wds，呼叫list_emAdd()產生框
		msg_wds = `獎序：0 <br>部門：${list_all[count_str][0]}<br>工號：${list_all[count_str][1]}<br>姓名：${list_all[count_str][2]} `;
		list_emAdd();
		*/
	};

	// list_all:預設陣列 ; count_str:起始陣列數 ; 加入資料庫後可刪
	let list_all = [["MIS", "09136", "林鈺真"], ["MIS", "07076", "陳達韋"], ["MIS", "02001", "楊宗原"]];
	var count_str = 0;

	var bgC = 1; //背景圖數
	$("#iframe_bg" + bgC).toggleClass("bg"); //初始背景1
	var msg_wds = ''; //當前獲獎人字串

	/*****************************/
	/** function gift & msg動畫 **/
	/****************************/
	function gift() {
		$('#open_present_top').attr("class", function (index, attr) { return attr == "open_present_top" ? null : "open_present_top"; });
		$('#present_bgLight').attr("class", function (index, attr) { return attr == "present_bgLight" ? null : "present_bgLight"; });
		$('#present_bear').attr("class", function (index, attr) { return attr == "present_bear" ? null : "present_bear"; });
		$('#present_card').attr("class", function (index, attr) { return attr == "present_card" ? null : "present_card"; });
		$('#present_balloon').attr("class", function (index, attr) { return attr == "present_balloon" ? null : "present_balloon"; });
	}
	function msg() {
		$("#msg_bg").fadeToggle(1000);
		setTimeout(function () {
			$("#msg_bgD").stop(true, true).animate({
				opacity: "toggle"
			}, 0);
			$("#msg_content").attr("class", function (index, attr) { return attr == "msg_contentS" ? null : "msg_contentS"; });
			$(".msg").toggleClass("msg_contentS");
		}, 200);
	}

	/*************************/
	/* enter / 點選禮物盒觸發 */
	/************************/
	function enter_fu() {
		//暫存當前獲獎人，與下方顯示當前抽取前五項連動
		msg_wds = `獎序：${count_allDet} <br>部門：${list_all[count_str][0]}<br>工號：${list_all[count_str][1]}<br>姓名：${list_all[count_str][2]} `;
		console.log(msg_wds);
		document.getElementById('msg').innerHTML = msg_wds;

		//判斷陣列數，換成資料庫可刪
		if (count_str != list_all.length - 1) {
			count_str += 1;
		} else {
			count_str = 0;
		}

		console.log("enter");
		d = "1"; //限制左右方向鍵
		gift();
		msg();
	}

	/***********************/
	/* 重新抽取當前獎項人選 */
	/**********************/
	function new_fu() {
		gift();
		msg();
		//延遲1s自動抽取，此時案enter不會重複觸發
		setTimeout(function () {
			enter_fu();
		}, 800);
	}

	/******************/
	/*** 清空獎項欄位 **/
	/******************/
	function btnSuc_fun() {
		alert("clear");

		/* 清除資料庫紀錄抽取編號之資料欄位，並重新整理 */

		setTimeout(function () {
			location.reload();
		}, 500);
	}

	/********************/
	/*** 下方前五項紀錄 **/
	/*******************/
	function list_emAdd() {
		var list_emN = document.querySelectorAll("#list_em div");
		if (list_emN.length == '5') {
			list_emN[0].remove();
		}
		var list_em_t = document.createElement("div");
		list_em_t.innerHTML = msg_wds;
		document.getElementById('list_em').appendChild(list_em_t);
	}


	/******************/
	/**   keycode    **/
	/******************/
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
		} else {
			switch (d) {
				case "0":
					// Enter
					if (event.isComposing || event.keyCode === 13) {
						enter_fu();
						return;
					}
					break;
				case "1":
					// Next
					if (event.isComposing || event.keyCode === 39 || event.keyCode === 68) {
						console.log(d);
						list_emAdd();
						d = "0";

						if (count_allDet > count_all) {
							count_allDet += 1;
						}
						if (count_allDet === 1) {
							count_allDet = count_all;
							count_allDet += 1;
						}
						if (count_allDet <= count_all) {
							count_allDet -= 1;
						}
						gift();
						msg();
						return;
					}
					// New
					if (event.isComposing || event.keyCode === 37 || event.keyCode === 65) {
						$('#WR_NEW').click();
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
	$('#inpt_btn').off('click').on('click', function () {
		count_all = parseInt($('#inpt_txt').val()); // 暫存使用者輸入獎項總數值
		count_allDet = count_all;
		if (count_all <= 1) {
			alert("獎項數量不可小於1，請重新輸入！");
		} else {
			$('#Fkindex').fadeOut();
			d="0";
		}
	});
	$('#WR_NEXT').off('click').on('click', function () {
		list_emAdd();
		d = "0";//判斷按鍵enter
		gift();
		msg();
	});
	$('#open_present_frame').off('click').on('click', function () {
		enter_fu();
	});
	/******************/
	/** modal通知視窗 **/
	/******************/
	$('#myModal').on('show.bs.modal', function (e) {
		var t = d;//暫存當前按鍵
		d = "-1"; //禁止modal彈出後按任何按鍵
		//獲取典籍打開的按鈕
		var button = $(e.relatedTarget);
		//根據標籤傳入參數
		var recipient = button.data('whatever');
		console.log(recipient);
		if (recipient === 'star') {
			md_content.innerHTML = "\
			<h4><font class='bg-danger text-white'>請注意！</font></br></h4>\
			此動作將清空已抽取獎項之紀錄，</br>\
			請再次確認是否要清空資料？";
			$('#bt_suc').off('click').on('click', btnSuc_fun);
		};
		if (recipient === 'WR_NEW') {
			md_content.innerHTML = "<h4><font class='bg-danger text-white'>請確認是否重新抽取人選！</font></h4>";
			$('#bt_suc').off('click').on('click', new_fu);
		};
		$('#btn_clo').off('click').on('click', function () { d = t; }); // close後返還當前按鍵值

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
