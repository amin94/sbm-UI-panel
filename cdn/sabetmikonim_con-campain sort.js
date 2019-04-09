// functions
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}


// get user ip
jQuery.getJSON('https://ipinfo.io', function(ip){

	setCookie('ipNumber',ip.ip,1);
	setCookie('ipRegion',ip.region,1);

	});





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
var uniqVisitor = getCookie('ipNumber');
var data, verifyData, xmlhttp, myObj, x, txt = "";
data = { "userID":acc, "currentUrl":currentUrl, "ip":uniqVisitor };
verifyData = JSON.stringify(data);
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		myObj = JSON.parse(this.responseText);
		// var count = Object.keys(myObj.recent_activity).length;
		// alert(count);
		// alert(myObj);

		var campaign = jQuery.map(myObj, function(value, index) {
			return [value];
		});

    console.log(campaign);



		jQuery('form').on('submit',function(event) {
			// event.preventDefault();

			for (var campaignCounter = 0; campaignCounter < campaign.length; campaignCounter++) {

				var cid = campaign[campaignCounter]['cid'];

				if (campaign[campaignCounter][cid]['capture_status']) {

					var emailID = campaign[campaignCounter][cid]['capture'][currentUrl]['email_capture_id'];
					var nameID = campaign[campaignCounter][cid]['capture'][currentUrl]['name_capture_id'];

					var userEmail = jQuery('input[id='+ emailID +']').val();
					var userName = jQuery('input[id='+ nameID +']').val();

					var formData, formVerifyData, formXmlhttp, myObj, formDatas, txt = "";

					var ipNumber = getCookie('ipNumber');
					var ipRegion = getCookie('ipRegion');

						formData = { "submitForm":1, "cid":cid, "userEmail":userEmail, "userName":userName, "ip":ipNumber, "ipRegion":ipRegion };

						jQuery.ajax({
							type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
							url 		: 'http://amins-macbook-pro.local:5757/sabetmikonimv2/cdn/sabetmikonim_proc.php', // the url where we want to POST
							data 		: formData, // our data object
							dataType 	: 'json', // what type of data do we expect back from the server
							async: false,
							encode 		: true
						})
							// using the done promise callback
							.done(function(testObj) {

                // console.log('data sent!');

							})

							// using the fail promise callback
							.fail(function(testObj) {

							});


				}

			}

			return true;

		});


		jQuery(document).ready(function() {

			var i = 0;
			var campaignCounter = 0;
			var notifKind = ['recent_activity','hot_streak'];
			var ipNumber = getCookie('ipNumber');

			// add notification elements
			var sabetmikonimElements = '<div class="notifBody"><div class="notification notif-bottom"><div class="recentActivity"><div class="notifIcon"><img src="" id="user_pic" alt="person Pic"></div><span class="notifName"><span id="notifName"> </span> <span id="notifLocation"></span> </span><span class="notifDesc" id="notifDesc"></span><span class="notifDate"> <span id="notifDate"></span> قبل </span><span class="sabetMikonim"> <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.41 88.41"><defs><style>.cls-1{fill:#f4b61c;}</style></defs><title>poweredBy</title><polygon class="cls-1" points="46.41 0 13.26 0 0 47.73 13.28 47.73 1.99 88.41 5.97 88.41 44.42 40.67 24.94 40.67 46.41 0"/></svg> از <a href="http://amins-macbook-pro.local:5757/sabetmikonimv2/" name="sabetMikonimCopyRight" rel="کپی رایت ثابت میکنیم"> ثابت میکنیم </a> </span><div class="clear"></div><a href="#" class="more"> کارت تبدیل </a></div></div></div>';
			jQuery('body').append(sabetmikonimElements);
      // add last jquery to head
      jQuery('head').prepend('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');

			var lastNotifCounter = [];
      var hoverStatus = false;

      var noLoopCampaigns = [];
      var serviceActivity = true;

			var displayNotif = window.setInterval(function() {

				    if (!hoverStatus) {


              if (noLoopCampaigns.length>=1) {

                for (var noLoopCampaignsCounter = 0; noLoopCampaignsCounter < noLoopCampaigns.length; noLoopCampaignsCounter++) {

                  if (noLoopCampaigns[noLoopCampaignsCounter]==campaignCounter) {

                    serviceActivity = false;
                    console.log(campaign[campaignCounter]['cid']+": "+serviceActivity);

                    jQuery('.notification').addClass('notif-bottom');

                    campaignCounter = campaignCounter + 1;
                    if (campaignCounter==campaign.length) {

                      campaignCounter = 0;

                    }

                  } else {

                    serviceActivity = true;
                    console.log(campaign[campaignCounter]['cid']+": "+serviceActivity);

                  }

                }

              } else {

                serviceActivity = true;
                console.log(campaign[campaignCounter]['cid']+": "+serviceActivity);

              }







              // check service activity to loop campaign or no
              if (serviceActivity) {

                var cid = campaign[campaignCounter]['cid'];

                if (campaign[campaignCounter][cid]['display_status']) {

                  var notifs = campaign[campaignCounter][cid]['recent_activity']['notifs'];

                  if (jQuery('.notification').hasClass('notif-bottom')) {

                    for (var m = 0; m < notifs.length; m++) {

                      var notifCounter = Math.floor(Math.random() * notifs.length);

                      var notifCounterCheck = lastNotifCounter.indexOf(notifCounter);


                      if (notifCounterCheck===-1) {


                          if (notifs[notifCounter]['ip']!=ipNumber) {



                        document.getElementById("user_pic").src = notifs[notifCounter]['user_pic'];
                        document.getElementById("notifName").innerHTML = notifs[notifCounter]['name'];
                        document.getElementById("notifDesc").innerHTML = notifs[notifCounter]['message'];
                        document.getElementById("notifDate").innerHTML = notifs[notifCounter]['time'].toFaDigit();

                        if (notifs[notifCounter]['location']!='') {

                          document.getElementById("notifLocation").innerHTML = 'از ' + notifs[notifCounter]['location'];

                        }

                        jQuery('.notification').removeClass('notif-bottom');

                      }

                        lastNotifCounter.push(notifCounter);

                        i = i + 1;
                        // console.log(notifCounter);

                        break;

                      }

                    }


                  } else {

                    // setTimeout(function(){

                    jQuery('.notification').addClass('notif-bottom');

                    // }, j * 7000 );

                  }

                  if (i==notifs.length) {

                    console.log('notifNumber: '+notifs.length);

                    if (campaign[campaignCounter][cid]['recent_activity']['options']['loop']=='false') {

                      noLoopCampaigns.push(campaignCounter);

                    }

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


                    // exit from the loop when we don't have any display settings
                    clearInterval(displayNotif);

                  }
                }

              }




            }



			}, 5000);



      jQuery('.notification').hover(function(ev){
          hoverStatus = true;
      }, function(ev){
          hoverStatus = false;
      });




		});



	}
};
xmlhttp.open("POST", "http://amins-macbook-pro.local:5757/sabetmikonimv2/cdn/sabetmikonim_proc.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("x=" + verifyData);



// add isans font to head
$("head").prepend('<link rel="stylesheet" media="screen" href="http://amins-macbook-pro.local:5757/sabetmikonimv2/cdn/fonts/sabetmikonim-font.css" type="text/css"/>');


// add style sheet in site
var css = 'span.sabetMikonim{font-family:IRANSans !important;}span.sabetMikonim a{font-family:IRANSans !important;}span.notifDate{font-family:IRANSans !important;}.recentActivity span.notifDesc,.recentActivity span.notifName{font-family:IRANSans !important;display:block;text-align:right;line-height:25px}.clear{clear:both}a.more{position:absolute;right:0;top:0;width:100%;height:100%;text-indent:-9999px}.notification{position:fixed;right:15px;width:350px;direction:rtl;z-index:99999;bottom:15px;-webkit-transition:all .3s;-moz-transition:all .3s;-o-transition:all .3s}.notif-bottom{bottom:-250px!important}.recentActivity{background-color:#FFF;border:1px solid #CCC;border-radius:100px;padding:.5em .5em .5em 2em;transition:all .3s}.recentActivity:hover{box-shadow:0 0 0 3px #CCC}.recentActivity .notifIcon{float:right;margin-left:10px}.recentActivity .notifIcon img{width:67px;height:67px;border-radius:100%}.recentActivity span.notifName{font-weight:400;font-size:14px;color:#000}.recentActivity span.notifDesc{color:#738c98;font-size:12px;font-weight:300;margin-bottom:5px}.recentActivity span.notifDate{color:#738c98;font-size:12px;font-weight:300;float:right}.recentActivity span.sabetMikonim{float:left;text-align:left;color:#738c98;font-size:12px;font-weight:300}.recentActivity span.sabetMikonim svg{width:6px}.recentActivity span.sabetMikonim a{color:#08c;text-decoration:none;position:relative;z-index:9999}@media screen and (max-width:425px){.notifBody{right:0;left:0;bottom:0;width:100%}.recentActivity{border-radius:0;bottom:0;padding:7px 0 0}.recentActivity .notifIcon{margin-right:10px}.recentActivity span.sabetMikonim{margin-left:10px}}',
head = document.head || document.getElementsByTagName('head')[0],
style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
	style.styleSheet.cssText = css;
} else {
	style.appendChild(document.createTextNode(css));
}

head.appendChild(style);
