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

  if (reqType === "pay") {

    if (getData.status === "packageSubmitted") {

      window.location.href = "http://api.sabetmikonim.com:8004/request/zarinpal?bp-id="+getData.BPId;

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


  $('#packagePayForm').submit(function(event) {

    event.preventDefault();

    var packageName="false";
    $("input[name=packageOption]:checked").each(function(){
        packageName = $(this).val();
    });

    if (packageName !== "false") {

      var sbmToken = getCookie('sbm_token');

      var payData = { 'cookie' : sbmToken, 'packageName' : packageName };

      ajaxReq(payData,'http://api.sabetmikonim.com:8004/panel/order-package/','pay');

    } else {
      alert('لطفا یکی از پکیج‌ها را انتخاب نمایید.');
    }

  });



});
