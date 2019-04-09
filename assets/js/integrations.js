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

  if (reqType === "checkIntegrations") {

    if (getData.status === "requestDone") {

      var sbmScript = "<!--SABETMIKONIM CONNECTION--><script src='http://amins-macbook-pro.local:5757/sabetmikonimv2/cdn/sabetmikonim_con.js?acc="+getData.sId+"'></script><!--END SABETMIKONIM CONNECTION-->";
      $('input[name=sabetMikonimIntg]').val(sbmScript);

      var intgVerify = getData.intgVerify;


      if (intgVerify === "True") {

        var intgVerifyOffset = getData.intgVerifyOffset;

        $('#connectionStatusBody').addClass('verified');
        $('#connectionStatusText').append(' تبریک! وبسایت شما با موفقیت متصل گردید.');

        $('#lastConnectText').removeClass('disn');
        $('#lastConnectText').append(' آخرین ارتباط با پنل: ' + intgVerifyOffset);

      } else {

        $('#connectionStatusText').append(' اتصال با سایت شما برقرار نشده است. ');

      }

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

  var checkIntegrations = { 'cookie' : sbmToken };

  ajaxReq(checkIntegrations,'http://api.sabetmikonim.com:8004/panel/check-start-page/','checkIntegrations');



});
