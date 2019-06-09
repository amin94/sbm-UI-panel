// ajax functions

// callBack function to handle ajax reqs
function callbackHandler(httpRequest, rqType, getData) {

// response has been received so handle it now
if (httpRequest.readyState === 4) {
    //In case status is 200 is what you are looking for implementation
    // of this will change accordingly
    if (httpRequest.status >= 200 && httpRequest.status < 400) {
        // alert("Posted form successfully");
        var resp = JSON.parse(httpRequest.responseText);
        // console.log("reqRes " + httpRequest.responseText);
        console.log(resp);

        if (rqType === "campaignClick") {

          window.location.href = finalNotifLink;

        } else if (rqType === "getIP") {

          setCookie('ipNumber',resp.ip,1);

          if (resp.location.country == 'IR') {
            setCookie('ipRegion',resp.location.region,1);
          }

        } else if (rqType === "campaignEngage") {

            console.log('getData'+getData);
            if (getData.operation === "hoverNotification") {

              setCookie('hvrOK',true,1);

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
    return callbackHandler(httpRequest,reqType,data);
});
if (method && method.toUpperCase() == 'POST') {
    httpRequest.open(method, url, true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var verifyData = JSON.stringify(data);
    httpRequest.send("x=" + verifyData);
    console.log(data);
} else {
    httpRequest.open(method, url);
    httpRequest.send();
}
}








// other System functions
String.prototype.toPersianDigits= function(){
       var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
       return this.replace(/[0-9]/g, function(w){
           return id[+w];
       });
};

String.prototype.toFaDigit = function() {
    return this.replace(/\d+/g, function(digit) {
        var ret = '';
        for (var i = 0, len = digit.length; i < len; i++) {
            ret += String.fromCharCode(digit.charCodeAt(i) + 1728);
        }

        return ret;
    });
};


var pfx = ["webkit", "moz", "MS", "o", ""];
function PrefixedEvent(element, type, callback) {
	for (var p = 0; p < pfx.length; p++) {
		if (!pfx[p]) type = type.toLowerCase();
		element.addEventListener(pfx[p]+type, callback, false);
	}
}

function removePrefixedEvent(element, type, callback) {
	for (var p = 0; p < pfx.length; p++) {
		if (!pfx[p]) type = type.toLowerCase();
		element.removeEventListener(pfx[p]+type, callback, false);
	}
}


function animateValue(obj, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    // var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        var finalNS = ""+ current;
        obj.innerHTML = finalNS.toFaDigit();
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}



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










// =======
// every thing we want to run

// get user ip and related datas
  var ipData = "{\n\t\"apiKey\": \"at_PAP2UUAq7zErhhBPEAnmW75WGhNCx\"\n}";
  var action = "https://geoipify.whoisxmlapi.com/api/v1";
  var method = "POST";
  makeAjaxRequest(action,method,ipData,"getIP");



// get user id
var getScriptURL = (function() {
	var scripts = document.getElementsByTagName('script');
	var index = scripts.length - 1;
	var myScript = scripts[index];
	return myScript.src;
})();

var url = new URL(getScriptURL);
window.acc = url.searchParams.get("acc");
// alert(acc);




// get url loaded
var currentURL = window.location.href;




// send json data
// var uniqVisitor = getCookie('ipNumber');


// count just New Visitors and PageViews and detect those
var newVisitorStatus;
if (checkCookie('sbmNewVisitor') === "cookieSet") {
    newVisitorStatus = "False";
} else {
  newVisitorStatus = "True";
}





window.campaign = "";
var data, verifyData, xmlhttp, getData, x, txt = "";
data = { "sId":acc, "currentURL":currentURL, "newVisitorStatus":newVisitorStatus};
verifyData = JSON.stringify(data);
console.log(verifyData);
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		getData = JSON.parse(this.responseText);

    // get campaignsData to all file
    campaign = getData;

    console.log(campaign);



  // check this page is capture url or NO
  if (campaign.captureLinkStatus === "True") {


    try {

      var form = document.querySelectorAll("form");
      for (var fs = 0; fs < form.length; fs++) {


        form[fs].addEventListener('submit',function(){
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
              // verifyData1 = JSON.stringify(formData);
              console.log(verifyData1);
              var action = "https://api.sabetmikonim.com/cdn/get-form-data/";
              var method = "POST";
              makeAjaxRequest(action,method,formData,"formSubmit");

          }

  });

  }


    } catch(e){

    console.log("Form isn't here");

    }




  } else {

    console.log("we don't have form to capture");

  }





  // launch SabetMikonim Super Jet
		(function(){



			var i = 0;
			var ipNumber = getCookie('ipNumber');



      // get All HTML Templates and append them
      if ((campaign.displayPageStatus === "True") && (campaign.notificationStatus=="True")) {

        var el = document.getElementsByTagName("BODY")[0];
          // Make a new div
          var sbmElem = document.createElement('div');
          sbmElem.setAttribute("class", 'sbmNotifs');
          el.appendChild(sbmElem);

        for (var i = 0; i < campaign['notificationTemplateData']['nHtmlList'].length; i++) {

              // get main SBMNOTIFS div
              var mainSBMElem = document.getElementsByClassName("sbmNotifs")[0];

              elChild = document.createElement('div');

              elChild.setAttribute("id", campaign['notificationTemplateData']['nHtmlList'][i][0]);
              // add notification elements
        			var sabetmikonimElements = campaign['notificationTemplateData']['nHtmlList'][i][1];


              // Give the new div some content
              elChild.innerHTML = sabetmikonimElements;

              // Jug it into the parent element
              mainSBMElem.appendChild(elChild);

        }

        if (campaign['conversionStatus']) {

          // get main SBMNOTIFS div
          var mainSBMElem = document.getElementsByClassName("sbmNotifs")[0];

          elChild = document.createElement('div');

          elChild.setAttribute("class", "sabetmikonimMask");
          elChild.setAttribute("onclick", "closeConversion()");

          // Jug it into the parent element
          mainSBMElem.appendChild(elChild);





          // check scroll Function to open conversionBox
          for (var cb = 0; cb < campaign['conversionData'].length; cb++) {

              if (campaign['conversionData'][cb]['cbSettings']['cbAutoScroll'] === "true") {

                window.addEventListener('scroll', function() {

                  conversionDisplayOnce = getCookie('sbmDisplayCBOnce');

                  if (conversionDisplayOnce!=="true") {

                    var scrolled = document.documentElement.scrollTop;

                    checkScrollOpenConversonBox(scrolled, openedNotifCID);

                  }

                });

                break;

              }

          }


        }



      }













        // check display size to show notifications in mobile or no
        // display notifications in desktop
        if (window.innerWidth > 425) {


        // check display status in desktop
        if ((campaign.displayPageStatus === "True") && (campaign.notificationStatus=="True")) {

          // if visitor is new we set cookie
          if (campaign.newVisitorStatus === "True") {
            setCookie('sbmNewVisitor','True',365);
          }


          // set while to display notifs
          recursive_func();

        }

      }



















      // mobile Functions to display notifs
      else if (window.innerWidth <= 425) {

        var displayNotifsCount = 0;

        // check display status in mobile
        if ((campaign.displayPageStatus === "True") && (campaign.mobileNotificationStatus=="True")) {

          // if visitor is new we set cookie
          if (campaign.newVisitorStatus === "True") {
            setCookie('sbmNewVisitor','True',365);
          }

           mobile_recursive_func();

        }

      }








      // try {
      //
      //   jQuery('.notification').hover(function(ev){
      //       pauseCampaigns = true;
      //
      //   }, function(ev){
      //       pauseCampaigns = false;
      //   });
      //
      //
      // } catch(e){
      //
      // console.log("hover didn't work");
      //
      // }









		})();


  }
};
xmlhttp.open("POST", "https://api.sabetmikonim.com/cdn/onload-request/", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("x=" + verifyData);














// to start css animations over and over with pure js
function animateReplace(node, className) {
    var clone = node.cloneNode(true);
    clone.classList.add(className);
    node.parentNode.replaceChild(clone, node);
    return clone;
}



function openConversionBox(cbTempId, cId) {


  pauseCampaigns = true;

  var notifItem = document.getElementsByClassName('notification');
  addClass(notifItem,'disn');

  var conversionData = campaign['conversionData'];

  // get conversion box mother id with temp id number
  var cbId = campaign['notificationTemplateData']['idMotherDict'][cbTempId];

  // find specific conversionbox data
  for (var i = 0; i < conversionData.length; i++) {

    if (conversionData[i]['cId'] === cId) {

      // replace data in conversionBox
      for (var j = 0; j < conversionData[i]['data'].length; j++) {

        var cbElem = document.getElementById(cbId).querySelector('.'+conversionData[i]['data'][j]['tag']);

        if (conversionData[i]['data'][j]['tag'] === "cbIcon") {

          cbElem.setAttribute('src',conversionData[i]['data'][j]['content']);

        } else if (conversionData[i]['data'][j]['tag'] === "cbBtnLink") {

          cbElem.setAttribute('data-link',conversionData[i]['data'][j]['content']);

          cbElem.addEventListener('click',function(e){

            e.preventDefault();

            clickOnConversionBtn(this, cId);

          });



        } else {

          var dataContent = conversionData[i]['data'][j]['content'];

          if (dataContent!=="") {

            var isnum = /^\d+$/.test(dataContent);

            if (isnum) {

              animateValue(cbElem, 0, dataContent, 900);

            } else {

              cbElem.textContent = dataContent.toFaDigit();

            }

          } else {

            cbElem.textContent = '.';

          }

        }


      }




      var duration = conversionData[i]['cbSettings']['cbDisplayTime']+'s';

      addClass(document.getElementById(cbId).getElementsByClassName('conversionBox'), 'openCB');
      addClass(document.getElementById(cbId).getElementsByClassName('conversionBox'), openedNotifPosition);

      var sbmMask = document.getElementsByClassName('sabetmikonimMask');
      addClass(sbmMask, 'open');



      // start progress time bar
      var progressbar = document.getElementById(cbId).getElementsByClassName('sbmProgressBar');

      // Now we set the animation parameters
      progressbar[0].style.animationDuration = duration;

      // When everything is set up we start the animation
      progressbar[0].style.animationPlayState = 'running';

      var progressStarter = animateReplace(progressbar[0], "progressStart");

      PrefixedEvent(progressStarter, "AnimationEnd", closeConversion);


    }


  }


} // open conversion box



// close conversion function
function closeConversion() {

  removeClass(document.getElementsByClassName('sbmProgressBar'), "progressStart");

  addClass(document.getElementsByClassName('conversionBox'),'closeCB');

  setTimeout(function(){

    removeClass(document.getElementsByClassName('conversionBox'),'openCB');
    removeClass(document.getElementsByClassName('conversionBox'),'closeCB');
    removeClass(document.getElementsByClassName('notification'),'disn');
    removeClass(document.getElementsByClassName('conversionBox'),'rightNotif');
    removeClass(document.getElementsByClassName('conversionBox'),'leftNotif');

  },500);

  removeClass(document.getElementsByClassName('sabetmikonimMask'),'open');

  pauseCampaigns = false;
} // close conversion




function clickOnNotification(notifClicked){
  var notifLinkAction = false;

  window.campaignCID = notifClicked.getAttribute('data-cid');

  if (campaign['conversionStatus']) {

    // find specific conversion box and open that
    for (var i = 0; i < campaign['conversionData'].length; i++) {

      if (campaign['conversionData'][i]['cId'] === campaignCID ) {

        notifLinkAction = false;

        openConversionBox(campaign['conversionData'][i]['nTemplateId'], campaignCID);


        // count click when conversion box opened
        var formData = { "sId" : acc,"cId":campaignCID, 'operation' : 'openConversionBox' };
        // var campaignLinkVerifyData = JSON.stringify(formData);
        var action = "https://api.sabetmikonim.com/cdn/submit-engagement/";
        var method = "POST";
        makeAjaxRequest(action,method,formData,"justCount");

        break;

      } else {

        notifLinkAction = true;

      }

    }

  } else {

    notifLinkAction = true;

  }


  if (notifLinkAction) {

    // count campaign clicks
    window.finalNotifLink = notifClicked.getAttribute('data-link');

    if ((finalNotifLink!='') && (finalNotifLink!='/')) {

      var formData = { "sId" : acc,"cId":campaignCID, 'operation' : 'clickNotification' };
      // var campaignLinkVerifyData = JSON.stringify(formData);
      var action = "https://api.sabetmikonim.com/cdn/submit-engagement/";
      var method = "POST";
      makeAjaxRequest(action,method,formData,"campaignClick");

    }

  }

} // click on notification







function clickOnConversionBtn(cbBtnClicked, cbOfCid) {

  // count campaign clicks
  window.finalNotifLink = cbBtnClicked.getAttribute('data-link');

  if ((finalNotifLink!='') && (finalNotifLink!='/')) {

    var formData = { "sId" : acc,"cId":cbOfCid, 'operation' : 'clickCbButton' };
    // var campaignLinkVerifyData = JSON.stringify(formData);
    var action = "https://api.sabetmikonim.com/cdn/submit-engagement/";
    var method = "POST";
    makeAjaxRequest(action,method,formData,"campaignClick");

  }

}



var lastScroll = 0;
function checkScrollOpenConversonBox(scrolled, cbCID) {

  var conversionData = campaign['conversionData'];

  if (lastScroll < scrolled) {

    for (var i = 0; i < conversionData.length; i++) {

      if (conversionData[i]['cId'] === cbCID) {

        scrollPx = conversionData[i]['cbSettings']['cbAutoScrollPixel'];

        // if (conversionData[i]['cbSettings']['scroll'] <= scrolled) {
        if (scrollPx <= scrolled) {

          // console.log(scrollPx);

          openConversionBox(conversionData[i]['nTemplateId'], conversionData[i]['cId']);

          setCookie('sbmDisplayCBOnce','true',1);

          // count click when conversion box opened
          var formData = { "sId" : acc,"cId":conversionData[i]['cId'], 'operation' : 'scrollOpenConversionBox' };
          // var campaignLinkVerifyData = JSON.stringify(formData);
          var action = "https://api.sabetmikonim.com/cdn/submit-engagement/";
          var method = "POST";
          makeAjaxRequest(action,method,formData,"justCount");

        }

      }


    }

  }


  lastScroll = scrolled;


}











// display desktop notifications
window.openedNotifCID = '';
window.openedNotifPosition = '';
var displayNotifsCount = 0;
var notifDisplayPriority = 1;
var notifTime;
function recursive_func() {
  var i = 0;
  window.pauseCampaigns = false;

  var userPermissionDisplayNotif = getCookie('ndo');
  if (userPermissionDisplayNotif !== "True") {
    recursive_func_next();
  }

  function recursive_func_next() {


    var displayNotifs = campaign['notificationData'];
    var displayMobileNotifs = campaign['mobileNotificationData'];

    if (displayNotifsCount < displayNotifs.length) {

      if (!pauseCampaigns) {

        var nTemplateId = displayNotifs[displayNotifsCount]['nTemplateId'];
        var nHTMLContentId = campaign['notificationTemplateData']['idMotherDict'][nTemplateId];



        // modify notif position
        var notifPosition = displayNotifs[displayNotifsCount]['nSettings']['notifPosition'];

        // check display notifs right or left on display
        if (notifPosition == "true") {

          var els = document.getElementsByClassName('notification');
          addClass(els, 'leftNotif');
          removeClass(els, 'rightNotif');

          var notifSetPositionElement = document.getElementById(nHTMLContentId).querySelector('.notifLink');
          // notifSetPositionElement.setAttribute('data-position','leftNotif');
          openedNotifPosition = 'leftNotif';

        } else {

          var els = document.getElementsByClassName('notification');
          removeClass(els, 'leftNotif');
          addClass(els, 'rightNotif');

          var notifSetPositionElement = document.getElementById(nHTMLContentId).querySelector('.notifLink');
          // notifSetPositionElement.setAttribute('data-position','rightNotif');
          openedNotifPosition = 'rightNotif';

        }





        if (notifDisplayPriority === 1) {


          notifTime = displayNotifs[displayNotifsCount]['nSettings']['deskNTime'];

          // replace data on notifications
          for (var notifContentCounter = 0; notifContentCounter < displayNotifs[displayNotifsCount]['data'].length; notifContentCounter++) {


            var notifElm = document.getElementById(nHTMLContentId).querySelector('.'+displayNotifs[displayNotifsCount]['data'][notifContentCounter]['tag']);

            if (displayNotifs[displayNotifsCount]['data'][notifContentCounter]['tag'] === "notifImg") {

              notifElm.setAttribute('src',displayNotifs[displayNotifsCount]['data'][notifContentCounter]['content']);

            } else {

              var dataContent = displayNotifs[displayNotifsCount]['data'][notifContentCounter]['content'];

              if (dataContent!=="") {

                var isnum = /^\d+$/.test(dataContent);

                if (isnum) {

                  animateValue(notifElm, 0, dataContent, 900);

                } else {

                  notifElm.textContent = dataContent.toFaDigit();

                }

              } else {

                notifElm.textContent = '.';

              }

            }




          }


          // change notif Link
          var finalNotif = document.getElementById(nHTMLContentId).querySelector('.notifLink');
          finalNotif.setAttribute('data-link',displayNotifs[displayNotifsCount]['nSettings']['finalNLink']);
          finalNotif.setAttribute('data-cid',displayNotifs[displayNotifsCount]['cId']);

          openedNotifCID = displayNotifs[displayNotifsCount]['cId'];


          var els = document.getElementById(nHTMLContentId).getElementsByClassName('notification');
          removeClass(els, 'notif-bounce-out');
          addClass(els, 'notif-bounce');


          notifDisplayPriority = 0;

        } else {


          var els = document.getElementById(nHTMLContentId).getElementsByClassName('notification');

          addClass(els,'notif-bounce-out');
          setTimeout(function(){
            removeClass(els,'notif-bounce');
            removeClass(els,'notif-bounce-out');
          },500);


          // first notif displaied

          notifTime = displayNotifs[displayNotifsCount]['nSettings']['deskBetNTime'];

          displayNotifsCount+=1;

          notifDisplayPriority = 1;



        }





      }


      // create loop to display all notifications
      setTimeout(function() {
        recursive_func_next();
      }, 1000*notifTime);



    } else if (displayNotifsCount === displayNotifs.length) {

        displayNotifsCount=0;
        recursive_func_next();

    }


  }




  // find all campaign links and listen to them when clicked
  var notifItem = document.getElementsByClassName('notification');
  var notifLinks = document.querySelectorAll("a[name=campaignLink]");
  for (var nl = 0; nl < notifLinks.length; nl++) {

    notifLinks[nl].addEventListener('click',function(e){

      e.preventDefault();

      clickOnNotification(this);

    });





    // count campaign Engagements and mouse enter
    notifLinks[nl].addEventListener('mouseenter',function(e){

      pauseCampaigns = true;


      // count mouse hover
      if (!getCookie('hvrOK')) {

        var campaignCID = this.getAttribute('data-cid');
        var engageData = { "sId" : acc,"cId":campaignCID, "operation" : "hoverNotification" };
        // var campaignEngageData = JSON.stringify(engageData);
        makeAjaxRequest("https://api.sabetmikonim.com/cdn/submit-engagement/","POST",engageData,"campaignEngage");

      }

      e.preventDefault();


    });


    notifLinks[nl].addEventListener('mouseleave',function(e){

        pauseCampaigns = false;

      e.preventDefault();


    });



  }



}









// display mobile notifications
var mobileDisplayNotifsCount = 0;
var mobileNotifDisplayPriority = 1;
var mobileNotifTime;
function mobile_recursive_func() {
  var i = 0;
  window.pauseCampaigns = false;

  var userPermissionDisplayNotif = getCookie('ndo');
  if (userPermissionDisplayNotif !== "True") {
    mobile_recursive_func_next();
  }

  function mobile_recursive_func_next() {


    var displayNotifs = campaign['mobileNotificationData'];
    // var displayMobileNotifs = campaign['mobileNotificationData'];

    if (mobileDisplayNotifsCount < displayNotifs.length) {

      if (!pauseCampaigns) {

        var nTemplateId = displayNotifs[mobileDisplayNotifsCount]['nTemplateId'];
        var nHTMLContentId = campaign['notificationTemplateData']['idMotherDict'][nTemplateId];




        if (mobileNotifDisplayPriority === 1) {


          mobileNotifTime = displayNotifs[mobileDisplayNotifsCount]['nSettings']['mobNTime'];

          // replace data on notifications
          for (var notifContentCounter = 0; notifContentCounter < displayNotifs[mobileDisplayNotifsCount]['data'].length; notifContentCounter++) {


            var notifElm = document.getElementById(nHTMLContentId).querySelector('.'+displayNotifs[mobileDisplayNotifsCount]['data'][notifContentCounter]['tag']);

            if (displayNotifs[mobileDisplayNotifsCount]['data'][notifContentCounter]['tag'] === "notifImg") {

              notifElm.setAttribute('src',displayNotifs[mobileDisplayNotifsCount]['data'][notifContentCounter]['content']);

            } else {

              var dataContent = displayNotifs[mobileDisplayNotifsCount]['data'][notifContentCounter]['content'];

              if (dataContent!=="") {

                var isnum = /^\d+$/.test(dataContent);

                if (isnum) {

                  animateValue(notifElm, 0, dataContent, 900);

                } else {

                  notifElm.textContent = dataContent.toFaDigit();

                }

              } else {

                notifElm.textContent = '.';

              }

            }




          }


          // change notif Link
          var finalNotif = document.getElementById(nHTMLContentId).querySelector('.notifLink');
          finalNotif.setAttribute('data-link',displayNotifs[mobileDisplayNotifsCount]['nSettings']['finalNLink']);
          finalNotif.setAttribute('data-cid',displayNotifs[mobileDisplayNotifsCount]['cId']);





          // modify notif position - top or down
          var notifPosition = displayNotifs[mobileDisplayNotifsCount]['nSettings']['topOfMobDisplay'];
          // check display notifs top or bottom on display
          if (notifPosition === "true") {

            var els = document.getElementsByClassName('notification');
            addClass(els, 'topNotification');
            removeClass(els, 'bottomNotification');

            var notifSetPositionElement = document.getElementById(nHTMLContentId).querySelector('.notifLink');
            // notifSetPositionElement.setAttribute('data-position','leftNotif');
            openedNotifPosition = 'topNotif';

          } else {

            var els = document.getElementsByClassName('notification');
            removeClass(els, 'topNotification');
            addClass(els, 'bottomNotification');

            var notifSetPositionElement = document.getElementById(nHTMLContentId).querySelector('.notifLink');
            // notifSetPositionElement.setAttribute('data-position','rightNotif');
            openedNotifPosition = 'bottomNotif';

          }



          


          var els = document.getElementById(nHTMLContentId).getElementsByClassName('notification');
          removeClass(els, 'notif-bounce-out');
          removeClass(els,'disn');
          setTimeout(function(){
            addClass(els, 'notif-bounce');
          },500);


          mobileNotifDisplayPriority = 0;

        } else {


          var els = document.getElementById(nHTMLContentId).getElementsByClassName('notification');

          addClass(els,'notif-bounce-out');
          setTimeout(function(){
            addClass(els,'disn');
            removeClass(els,'notif-bounce');
            removeClass(els,'notif-bounce-out');
          },500);


          // first notif displaied

          mobileNotifTime = displayNotifs[mobileDisplayNotifsCount]['nSettings']['deskBetNTime'];

          mobileDisplayNotifsCount+=1;

          mobileNotifDisplayPriority = 1;



        }





      }


      // create loop to display all notifications
      setTimeout(function() {
        mobile_recursive_func_next();
      }, 1000*mobileNotifTime);



    } else if (mobileDisplayNotifsCount === displayNotifs.length) {

        mobileDisplayNotifsCount=0;
        mobile_recursive_func_next();

    }


  }




  // find all campaign links and listen to them when clicked
  var notifItem = document.getElementsByClassName('notification');
  var notifLinks = document.querySelectorAll("a[name=campaignLink]");
  for (var nl = 0; nl < notifLinks.length; nl++) {

    notifLinks[nl].addEventListener('click',function(e){

      e.preventDefault();

      clickOnNotification(this);

    });





    // count campaign Engagements and mouse enter
    notifLinks[nl].addEventListener('mouseenter',function(e){

      pauseCampaigns = true;


      // count mouse hover
      var campaignCID = this.getAttribute('data-cid');
      var engageData = { "sId" : acc,"cId":campaignCID, "operation" : "hoverNotification" };
      // var campaignEngageData = JSON.stringify(engageData);
      makeAjaxRequest("https://api.sabetmikonim.com/cdn/submit-engagement/","POST",engageData,"campaignEngage");

      e.preventDefault();


    });


    notifLinks[nl].addEventListener('mouseleave',function(e){

        pauseCampaigns = false;

      e.preventDefault();


    });



  }



}
// mobile display notifs







function closeAllNotifs() {

  pauseCampaigns = true;

  var els = document.getElementsByClassName('notification');

  addClass(els,'notif-bounce-out');
  setTimeout(function(){
    removeClass(els,'notif-bounce');
    removeClass(els,'notif-bounce-out');
  },500);

  setCookie('ndo','True',1);



  // request to submit close counts
  var formData = { "sId" : acc, "cId": openedNotifCID, 'operation' : 'closeAllNotifs' };
  // var campaignLinkVerifyData = JSON.stringify(formData);
  var action = "https://api.sabetmikonim.com/cdn/submit-engagement/";
  var method = "POST";
  makeAjaxRequest(action,method,formData,"justCount");

}




// add isans font to head
loadjscssfile("http://amins-macbook-pro.local:5757/sabetmikonimv2/cdn/fonts/sabetmikonim-font.css", "css");
loadjscssfile("http://amins-macbook-pro.local:5757/sabetmikonimv2/cdn/sabetmikonim-style.css", "css");
