var d = "";  //作為判斷enter或方向鍵用
var count_all = "";
var bgC = "";
var msg_wds = "";//當前獲獎人字串

var bg_treeLight = "";//svg
var tree_light_D = "";//svg
var bg_treeLight_color = "";//svg

/* Loading */
document.onreadystatechange = function () {
	if (document.readyState === "complete") {
		$('#loading').fadeOut();
		$('.container').fadeIn();
		console.log(document.readyState);
		$('#open_present_frame').focus();/* 20201110 */
	};
}

$(function () {

	count_all = 1; //**資料更換，查詢資料庫是否有獎序，無則設定1，有就回傳目前最大值，此為判斷抽取上一人的btn用
	d = "0";//初始enter
	if (count_all > "1") {
		$("#christmasMan").attr("data-target", "#myModal");
	}

	bgC = 1; //背景圖數
	$("#iframe_bg" + bgC).toggleClass("bg"); //初始背景1

	/** function gift & msg動畫 **/
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

	/* enter / 點選禮物盒觸發 */
	function enter_fu(click_data) {
		count_all += 1;
		d = "-1";//防止連續點enter
		if (click_data != "Previous") {
			msg_wds = `部門：MIS <br> 工號：0000${getRandom(1, 9)} <br> 姓名：ＸＸＸＸ`;//**資料更換
		}
		console.log(msg_wds);
		document.getElementById('msg').innerHTML = msg_wds;
		setTimeout(function () {
			d = "1"; //2.5秒後才可按左右鍵
		}, 2500);
		gift();
		msg();
	}

	/* 重新抽取當前獎項人選 */
	function new_fu() {
		d = "0";//判斷按鍵enter	
		$('#open_present_frame').focus();
		gift();
		msg();
	}

	/*** 清空獎項欄位 **/
	function btnSuc_fun() {
		alert("clear");
		/* **資料更換，清除資料庫紀錄抽取編號之資料欄位，並重新整理 */
		setTimeout(function () {
			location.reload();
		}, 500);
	}

	/**   keyup    **/
	document.addEventListener("keyup", event => {
		if (event.isComposing || event.keyCode === 40 || event.keyCode === 83) {  //按方向鍵"下"
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
						$('#open_present_frame').click();
						return;
					}
					break;
				case "1":
					// Next，重抽
					if (event.isComposing || event.keyCode === 39 || event.keyCode === 68) {
						$('#WR_NEXT').click();
						return;
					}
					// New，下一位
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

	/**    click     **/
	$('#WR_NEXT').off('click').on('click', function () {
		d = "0";//判斷按鍵enter	
		if (count_all > "1") {
			$("#christmasMan").attr("data-target", "#myModal");
		}
		$('#open_present_frame').focus();
		gift();
		msg();
	});

	$('#open_present_frame').off('click').on('click', function () {
		enter_fu();
	});

	/** modal通知視窗 **/
	$('#myModal').on('show.bs.modal', function (e) {
		var t = d;//暫存當前按鍵
		d = "-1"; //禁止modal彈出後按任何按鍵
		//獲取點擊打開的按鈕
		var button = $(e.relatedTarget);
		//根據標籤傳入參數
		var recipient = button.data('whatever');
		console.log(recipient);
		switch (recipient) {
			case 'star':
				md_content.innerHTML = "\
				<h4><font class='bg-danger text-white'>請注意！</font></br></h4>\
				此動作將清空已抽取獎項之紀錄，</br>\
				請再次確認是否要清空資料？";
				$('#bt_suc').off('click').on('click', btnSuc_fun);
				break;
			case 'WR_NEW':
				md_content.innerHTML = "<h4><font class='bg-danger text-white'>請確認是否重新抽取人選！</font></h4>";
				$('#bt_suc').off('click').on('click', new_fu);
				break;
			case 'christmasMan':
				md_content.innerHTML = "<h4><font class='bg-danger text-white'>請確認是否取回前一位得獎者！</font></h4>";
				$('#bt_suc').off('click').on('click', function () { enter_fu("Previous"); });
				break;
			default:
				break;
		}

		$('#btn_clo').off('click').on('click', function () { d = t; }); // close後返還當前按鍵值

	});

	/* 測試用，亂數替代，產出min(含) ~ max(含)之間的值 */
	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	/**svg tree_light**/
	bg_treeLight = document.querySelectorAll(".tree_light");
	tree_light_D = 0.0;
	bg_treeLight.forEach(function (Tlight) {
		bg_treeLight_color = Tlight.getAttribute('fill');
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
