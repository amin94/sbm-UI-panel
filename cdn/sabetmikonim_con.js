// functions
function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);
}

function addClass(elements, className) {
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		if (element.classList) {
			element.classList.add(className);
		} else {
			element.className += ' ' + className;
		}
	}
}

function removeClass(elements, className) {
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		if (element.classList) {
			element.classList.remove(className);
		} else {
			element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}
}


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

function checkCookie(cname) {
    var checkCookie = getCookie(cname);
    if (checkCookie != "") {
        return "cookieSet";
    } else {
        return "cookieNotSet";
    }
}


/**
 * Shuffles array in place. ES6 version
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}





/*
*
* @param url
* @param method
* @param data
* @param callback (Callback function to handle response state)
* @returns {boolean}
*/
function callbackHandler(httpRequest, rqType) {
// response has been received so handle it now
if (httpRequest.readyState === 4) {
    //In case status is 200 is what you are looking for implementation
    // of this will change accordingly
    if (httpRequest.status >= 200 && httpRequest.status < 400) {
        // alert("Posted form successfully");
        var resp = JSON.parse(httpRequest.responseText);
        // console.log("reqRes " + httpRequest.responseText);
        console.log(resp);

        if (rqType == "campaignClick") {

          window.location.href = document.querySelector('a[name=campaignLink]').getAttribute('data-link');

        } else if (rqType == "getIP") {

          setCookie('ipNumber',resp.ip,1);

          if (resp.location.country == 'IR') {
            setCookie('ipRegion',resp.location.region,1);
          }

        }
    }
}
}


function makeAjaxRequest(url, method, data, reqType) {
var httpRequest, y;
if (window.XMLHttpRequest) { // Mozilla, Safari, ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
    try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
        try {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {
        }
    }
}

if (!httpRequest) {
    console.log('Giving up :( Cannot create an XMLHTTP instance');
    return false;
}
httpRequest.onreadystatechange = (function () {
    return callbackHandler(httpRequest,reqType);
});
if (method && method.toUpperCase() == 'POST') {
    httpRequest.open(method, url, true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.send("x=" + data);
    // console.log(data);
} else {
    httpRequest.open(method, url);
    httpRequest.send();
}
}








// get user ip
  var ipData = "{\n\t\"apiKey\": \"at_PAP2UUAq7zErhhBPEAnmW75WGhNCx\"\n}";
  var action = "https://geoipify.whoisxmlapi.com/api/v1";
  var method = "POST";
  makeAjaxRequest(action,method,ipData,"getIP");




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
var currentURL = window.location.href;




// send json data
// var uniqVisitor = getCookie('ipNumber');

var newVisitorStatus;
if (checkCookie('sbmNewVisitor') === "cookieSet") {
    newVisitorStatus = "False";
} else {
  newVisitorStatus = "True";
}

var data, verifyData, xmlhttp, getData, x, txt = "";
data = { "sId":acc, "currentURL":currentURL, "newVisitorStatus":newVisitorStatus};
verifyData = JSON.stringify(data);
console.log(verifyData);
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		getData = JSON.parse(this.responseText);


     var campaign = getData;

    console.log(campaign);



  // check this page is capture url or NO
  if (campaign.captureLinkStatus === "True") {


    try {

      var form = document.querySelectorAll("form");
      for (var fs = 0; fs < form.length; fs++) {


        form[fs].addEventListener('submit',function(e){
          // alert("test");
          // e.preventDefault();

          var emailID = campaign.emailField;
          var nameID = campaign.nameField;

          // console.log(emailID+" dm "+nameID);


          var userEmail = document.getElementById(emailID).value;
          var userName = document.getElementById(nameID).value;

          var cid = campaign.cId;
          // console.log(userEmail+" md "+userName);

          if(userEmail==='' || userName === '') {
              alert('empty data');
          } else {

              var ipNumber = getCookie('ipNumber');
              var ipRegion = getCookie('ipRegion');

              var formData = { "sId" : acc ,"cId":cid, "emailField":userEmail, "nameField":userName, "ip":ipNumber, "location":ipRegion };
              verifyData1 = JSON.stringify(formData);
              console.log(verifyData1);
              var action = "http://api.sabetmikonim.com:8004/cdn/get-form-data/";
              var method = "POST";
              makeAjaxRequest(action,method,verifyData1,"formSubmit");

          }

  });

  }


    } catch(e){

    console.log("Form isn't here");

    }




  } else {

    console.log("we don't have form to capture");

  }




		(function(){


			var i = 0;
			var ipNumber = getCookie('ipNumber');

			// add notification elements
			var sabetmikonimElements = '<div class="sabetmikonimNotifBody"><div class="notification notif-bottom"><div><div class="recentActivity notifKind"><div class="notifIcon"> <img src="" id="user_pic" alt="person Pic"></div><div class="notifContentBody"><div class="notifName"> <span id="notifName"></span> <span id="notifLocation"></span></div><div class="clear"></div><div class="notifDescContents"> <div class="notifDesc" id="notifDesc"> </div> <span class="notifDate"> <span id="notifDate"></span></span> <span class="sabetMikonim"> <span class="icon"> <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><style>.sbmSVG1{fill:none;}.sbmSVG2{fill:#377bff;}</style></defs><title>sabetMikonim Verified</title><path class="sbmSVG1" d="M0,0H48V48H0Z" transform="translate(0 0)"/><path class="sbmSVG2" d="M24,4A20,20,0,1,0,44,24,20,20,0,0,0,24,4ZM20,34,10,24l2.83-2.83L20,28.34,35.17,13.17,38,16Z" transform="translate(0 0)"/></svg> </span> تایید توسط <a href="https://sabetmikonim.com/panel/" name="sabetMikonimCopyRight" rel="کپی رایت ثابت میکنیم"> ثابت میکنیم </a> </span><div class="clear"></div></div></div> <a href="#" class="more" name="campaignLink" data-link="" data-cid="" target="_blank"> لینک کمپین </a></div></div></div></div>';
      // Grab an element
      var el = document.getElementsByTagName("BODY")[0],
          // Make a new div
          elChild = document.createElement('div');

      // Give the new div some content
      elChild.innerHTML = sabetmikonimElements;

      // Jug it into the parent element
      el.appendChild(elChild);


			var lastNotifCounter = [];
      var campaignList = [];
      var hoverStatus = false;





      // display notifs timeLine

      // check display size to show notifications in mobile or no
      if (window.innerWidth > 425) {

        var displayNotifsCount = 0;

      if ((campaign.displayPageStatus === "True") && (campaign.notificationStatus=="True")) {

        // if visitor is new we set cookie
        if (campaign.newVisitorStatus === "True") {
          setCookie('sbmNewVisitor','True',365);
        }

        // set while to display notifs
        recursive_func();
        function recursive_func()
        {
          var i = 0;
          recursive_func_next();
          function recursive_func_next() {

            var displayNotifs = campaign['notificationData'];
            var displayMobileNotifs = campaign['mobileNotificationData'];

            if (displayNotifsCount < displayNotifs.length) {

              if (!hoverStatus) {


                // check display notif time
                var notifTime;


                    notifTime = displayNotifs[displayNotifsCount]['displayTime'];

                    var notifPosition = displayNotifs[displayNotifsCount]['options']['nPosition'];

                    // check display notifs right or left on display
                    if (notifPosition == "true") {

                      var els = document.getElementsByClassName('notification');
                      addClass(els, 'leftNotif');

                    } else {

                      var els = document.getElementsByClassName('notification');
                      removeClass(els, 'leftNotif');

                    }



                    if (document.querySelector(".notification").classList.contains("notif-bottom")) {


                        if (displayNotifs[displayNotifsCount]['name']==="") {

                          document.getElementById("notifName").innerHTML = "کاربری";

                        } else {

                          document.getElementById("notifName").innerHTML = displayNotifs[displayNotifsCount]['name'];

                        }

                        document.getElementById("user_pic").src = "";
                        document.getElementById("user_pic").src = displayNotifs[displayNotifsCount]['userPicture'];
                        document.getElementById("notifDesc").innerHTML = displayNotifs[displayNotifsCount]['cMessage'];
                        document.getElementById("notifDate").innerHTML = displayNotifs[displayNotifsCount]['time'].toFaDigit();
                        document.querySelector("a[name='campaignLink']").setAttribute('data-link', displayNotifs[displayNotifsCount]['options']['finalNLink']);
                        document.querySelector("a[name='campaignLink']").setAttribute('data-cid', displayNotifs[displayNotifsCount]['cId']);

                        if (displayNotifs[displayNotifsCount]['location']!='') {

                          document.getElementById("notifLocation").innerHTML = 'از ' + displayNotifs[displayNotifsCount]['location'];

                        } else {
                          document.getElementById("notifLocation").innerHTML = '-';
                        }

                        var els = document.getElementsByClassName('notification');
                        removeClass(els, 'notif-bottom');

                      displayNotifsCount+=1;


                    } else {

                      notifTime = displayNotifs[displayNotifsCount]['options']['deskBetNTime'];

                      var els = document.getElementsByClassName('notification');
                      addClass(els, 'notif-bottom');

                    }


              }



              setTimeout(function() {
              recursive_func_next();}, 1000*notifTime);

            } else if (displayNotifsCount === displayNotifs.length) {

                displayNotifsCount=0;
                recursive_func_next();

            }
          }
        }



      }

    } else if (window.innerWidth <= 425) {

      var displayNotifsCount = 0;

      if ((campaign.displayPageStatus === "True") && (campaign.mobileNotificationStatus=="True")) {

        // if visitor is new we set cookie
        if (campaign.newVisitorStatus === "True") {
          setCookie('sbmNewVisitor','True',365);
        }

        // set while to display notifs
        recursive_func();
        function recursive_func()
        {
          var i = 0;
          recursive_func_next();
          function recursive_func_next() {

            var displayNotifs = campaign.mobileNotificationData;

            if (displayNotifsCount < displayNotifs.length) {

              if (!hoverStatus) {


                // check display notif time
                var notifTime;


                notifTime = displayNotifs[displayNotifsCount]['displayTime'];


                // check display notifications top of the page
                if (displayNotifs[displayNotifsCount]['options']['topMobDisplay'] === "true") {

                  var els = document.getElementsByClassName('notification');
                  addClass(els, 'topNotification');

                } else {

                  var els = document.getElementsByClassName('notification');
                  removeClass(els, 'topNotification');

                }

                var displayCid = displayNotifs[displayNotifsCount]['cId'];
                if (document.querySelector(".notification").classList.contains("notif-bottom")) {


                  if (displayNotifs[displayNotifsCount]['name']==="") {

                    document.getElementById("notifName").innerHTML = "فردی";

                  } else {

                    document.getElementById("notifName").innerHTML = displayNotifs[displayNotifsCount]['name'];

                  }


                  document.getElementById("user_pic").src = "";
                  document.getElementById("user_pic").src = displayNotifs[displayNotifsCount]['userPicture'];
                  document.getElementById("notifDesc").innerHTML = displayNotifs[displayNotifsCount]['cMessage'];
                  document.getElementById("notifDate").innerHTML = displayNotifs[displayNotifsCount]['time'].toFaDigit();
                  document.querySelector("a[name='campaignLink']").setAttribute('data-link', displayNotifs[displayNotifsCount]['link']);
                  document.querySelector("a[name='campaignLink']").setAttribute('data-cid', displayNotifs[displayNotifsCount]['cId']);

                  if (displayNotifs[displayNotifsCount]['location']!='') {

                    document.getElementById("notifLocation").innerHTML = 'از ' + displayNotifs[displayNotifsCount]['location'];

                  } else {
                      document.getElementById("notifLocation").innerHTML = ' ';
                  }

                    var els = document.getElementsByClassName('notification');
                    removeClass(els, 'notif-bottom');

                  displayNotifsCount+=1;


                } else {

                  notifTime = displayNotifs[displayNotifsCount]['options']['mobBetNTime'];

                  var els = document.getElementsByClassName('notification');
                  addClass(els, 'notif-bottom');


                }

                if (displayNotifsCount==displayNotifs.length) {

                    displayNotifsCount=0;

                }




              }



              setTimeout(function() {
              recursive_func_next();}, 1000*notifTime);

            } else if (displayNotifsCount === displayNotifs.length) {

                displayNotifsCount=0;
                recursive_func_next();

            }
          }
        }

      }

    }













      try {

        jQuery('.notification').hover(function(ev){
            hoverStatus = true;
        }, function(ev){
            hoverStatus = false;
        });


      } catch(e){

      console.log("hover didn't work");

      }





      // count campaign clicks
      document.querySelector('a[name=campaignLink]').onclick = function(e){

        e.preventDefault();

        var campaignCID = document.querySelector('a[name=campaignLink]').getAttribute('data-cid');

        var formData = { "sId" : acc,"cId":campaignCID };
        var campaignLinkVerifyData = JSON.stringify(formData);
        var action = "http://api.sabetmikonim.com:8004/cdn/submit-click/";
        var method = "POST";
        makeAjaxRequest(action,method,campaignLinkVerifyData,"campaignClick");

      };




		})();


  }
};
xmlhttp.open("POST", "http://api.sabetmikonim.com:8004/cdn/onload-request/", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("x=" + verifyData);






// add isans font to head
loadjscssfile("http://amins-macbook-pro.local:5757/sabetmikonimv2/cdn/fonts/sabetmikonim-font.css", "css");
loadjscssfile("http://amins-macbook-pro.local:5757/sabetmikonimv2/cdn/sabetmikonim-style.css", "css");
