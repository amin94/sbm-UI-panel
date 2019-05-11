// functions
// function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     var expires = "expires="+d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

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



function callbackAjaxReq(getData,reqType) {

  if (reqType === "settings") {

    if (getData.status === "requestDone") {

      document.getElementById('settingsPackageName').innerHTML = getData.packageName;
      document.getElementById('settingsPackagePrice').innerHTML = getData.packagePrice + ' تومان / ' + getData.packagePeriod;

      document.getElementById('packageDateOffset').innerHTML = getData.packageDateOffset;
      $('#packageUsageProgressBar').css({'width': ''+getData.packageUsagePercent+'%'});

      // $('#packageUsageProgressBar').attr('aria-valuenow') = getData.packageUsagePercent;

      var packageUserPercentStyle = getData.packageUsagePercent+'%';
      // document.getElementById('packageUsageProgressBar').css('width': ' '+packageUserPercentStyle+' ');

      document.getElementById('packageDetailVisitorUsed').innerHTML = getData.packageVisitorUsed;
      document.getElementById('packageDetailVisitorDifference').innerHTML = getData.packageUsagePercent + '%';
      document.getElementById('packageDetailVisitor').innerHTML = getData.packageVisitor;

    } else {

      swal({
        title: "خطا!",
        text: " خطایی رخ داده است! ",
        icon: "error",
        button: "تلاش مجدد",
      });

    }

  }

}




$(document).ready(function() {

  var sbmToken = getCookie('sbm_token');

  var settingsData = { 'cookie' : sbmToken };

  ajaxReq(settingsData,'https://api.sabetmikonim.com/panel/settings/','settings');



});
