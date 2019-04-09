String.prototype.toFaDigit = function() {
	return this.replace(/\d+/g, function(digit) {
		var ret = '';
		for (var i = 0, len = digit.length; i < len; i++) {
			ret += String.fromCharCode(digit.charCodeAt(i) + 1728);
		}

		return ret;
	});
};

// get user id
var getScriptURL = (function() {
	var scripts = document.getElementsByTagName('script');
	var index = scripts.length - 1;
	var myScript = scripts[index];
	return myScript.src;
})();

var url = new URL(getScriptURL);
var acc = url.searchParams.get("acc");
// alert(acc);


// get url loaded
var currentUrl = window.location.href;
// alert(currentUrl);


// sned json data
var data, verifyData, xmlhttp, myObj, x, txt = "";
data = { "userID":acc, "currentUrl":currentUrl };
verifyData = JSON.stringify(data);
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		myObj = JSON.parse(this.responseText);
		// var count = Object.keys(myObj.recent_activity).length;
		// alert(count);
		// alert(myObj);

		var campaign = $.map(myObj, function(value, index) {
			return [value];
		});



		$('form').submit(function(event) {

			for (var campaignCounter = 0; campaignCounter < campaign.length; campaignCounter++) {

				var cid = campaign[campaignCounter]['cid'];

				if (campaign[campaignCounter][cid]['capture_status']) {

					var emailID = campaign[campaignCounter][cid]['capture'][currentUrl]['email_capture_id'];
					var nameID = campaign[campaignCounter][cid]['capture'][currentUrl]['name_capture_id'];

					var userEmail = $('input[id='+ emailID +']').val();
					var userName = $('input[id='+ nameID +']').val();



					var formData, formVerifyData, formXmlhttp, myObj, formDatas, txt = "";
					$.getJSON('https://ipinfo.io', function(ip){
						formData = { "cid":cid, "userEmail":userEmail, "userName":userName, "ip":ip.ip, "ipRegion": ip.region };
						formVerifyData = JSON.stringify(formData);
						formXmlhttp = new XMLHttpRequest();
						formXmlhttp.onreadystatechange = function() {
							if (this.readyState == 4 && this.status == 200) {

							}
						};
						xmlhttp.open("POST", "http://amins-macbook-pro.local:5757/sabetmikonimv2/cdn/sabetmikonim_proc.php", true);
						xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						xmlhttp.send("formDatas=" + formVerifyData);

					});



				}

			}

		});


		$(document).ready(function() {

			var i = 0;
			var campaignCounter = 0;
			var notifKind = ['recent_activity','hot_streak'];

			// add notification elements
			var sabetmikonimElements = '<div class="notifBody"><div class="notification notif-bottom recentActivity"><div class="notifIcon"><img src="" id="user_pic" alt="person Pic"></div><span class="notifName"><span id="notifName"> </span> از <span id="notifLocation"></span> </span><span class="notifDesc" id="notifDesc"></span><span class="notifDate"> <span id="notifDate"></span> قبل </span><span class="sabetMikonim"> <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.41 88.41"><defs><style>.cls-1{fill:#f4b61c;}</style></defs><title>poweredBy</title><polygon class="cls-1" points="46.41 0 13.26 0 0 47.73 13.28 47.73 1.99 88.41 5.97 88.41 44.42 40.67 24.94 40.67 46.41 0"/></svg> از <a href="#"> ثابت میکنیم </a> </span><div class="clear"></div></div></div>';
			$('body').append(sabetmikonimElements);

			var lastNotifCounter = [];

			var refreshId = window.setInterval(function() {

				var cid = campaign[campaignCounter]['cid'];

				if (campaign[campaignCounter][cid]['display_status']) {

					var notifs = campaign[campaignCounter][cid]['recent_activity']['notifs'];

					if ($('.notification').hasClass('notif-bottom')) {

						for (var m = 0; m < notifs.length; m++) {

							var notifCounter = Math.floor(Math.random() * notifs.length);

							var notifCounterCheck = lastNotifCounter.indexOf(notifCounter);

							if (notifCounterCheck===-1) {

								$.getJSON('https://ipinfo.io', function(ip) {

							    if (notifs[notifCounter]['ip']!=ip.ip) {



							  document.getElementById("user_pic").src = notifs[notifCounter]['user_pic'];
							  document.getElementById("notifName").innerHTML = notifs[notifCounter]['name'];
							  document.getElementById("notifLocation").innerHTML = notifs[notifCounter]['location'];
							  document.getElementById("notifDesc").innerHTML = notifs[notifCounter]['message'];
							  document.getElementById("notifDate").innerHTML = notifs[notifCounter]['time'].toFaDigit();

							  $('.notification').removeClass('notif-bottom');

							}

							});

								lastNotifCounter.push(notifCounter);

							  i = i + 1;
							  // console.log(notifCounter);

							  break;

							}

						}


					} else {

						// setTimeout(function(){

						$('.notification').addClass('notif-bottom');

						// }, j * 7000 );

					}

					if (i==notifs.length) {
						i=0;
						lastNotifCounter = [];
						campaignCounter = campaignCounter + 1;
						if (campaignCounter==campaign.length) {

							campaignCounter = 0;

						}

					}

				} //check recent activity
				else {
					campaignCounter = campaignCounter + 1;
					if (campaignCounter==campaign.length) {
						i=0;
						campaignCounter = 0;

					}
				}



			}, 5000);


		});



	}
};
xmlhttp.open("POST", "http://amins-macbook-pro.local:5757/sabetmikonimv2/cdn/sabetmikonim_proc.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("x=" + verifyData);



// add style sheet in site
var css = '.recentActivity span.notifDesc,.recentActivity span.notifName{font-family:isans;display:block;text-align:right;line-height:25px}.clear{clear:both}.notifBody{position:fixed;right:15px;bottom:15px;width:350px;direction:rtl;z-index:99}.notification{position:relative;bottom:15px;-webkit-transition:all .3s;-moz-transition:all .3s;-o-transition:all .3s}.notif-bottom{bottom:-250px!important}.recentActivity{width:100%;height:80px;background-color:#FFF;box-shadow:0 0 11px 0 rgba(0,0,0,.2);border-radius:100px;padding:.5em .5em .5em 2em;transition:all .3s}.recentActivity .notifIcon{float:right;margin-left:10px}.recentActivity .notifIcon img{width:67px;height:67px;border-radius:100%}.recentActivity span.notifName{font-weight:400;font-size:14px;color:#000}.recentActivity span.notifDesc{overflow:hidden;height:25px;color:#738c98;font-size:12px;font-weight:300;}.recentActivity span.notifDate{color:#738c98;font-size:12px;font-weight:300;float:right}.recentActivity span.sabetMikonim{float:left;text-align:left;color:#738c98;font-size:12px;font-weight:300}.recentActivity span.sabetMikonim svg{width:6px}.recentActivity span.sabetMikonim a{color:#08c;text-decoration:none}@media screen and (max-width:425px){.notifBody{right:0;left:0;bottom:0;width:100%}.recentActivity{border-radius:0;bottom:0;padding:7px 0 0}.recentActivity .notifIcon{margin-right:10px}.recentActivity span.sabetMikonim{margin-left:10px}}',
head = document.head || document.getElementsByTagName('head')[0],
style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
	style.styleSheet.cssText = css;
} else {
	style.appendChild(document.createTextNode(css));
}

head.appendChild(style);
