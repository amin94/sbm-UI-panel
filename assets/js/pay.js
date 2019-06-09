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

      window.location.href = "https://api.sabetmikonim.com/request/zarinpal?bp-id="+getData.BPId;

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



String.prototype.toFaDigit = function() {
    return this.replace(/\d+/g, function(digit) {
        var ret = '';
        for (var i = 0, len = digit.length; i < len; i++) {
            ret += String.fromCharCode(digit.charCodeAt(i) + 1728);
        }

        return ret;
    });
};



function changeTab(tab,period) {
  var parent = '';
  if (period === "M") {
    parent = '#monthPackages';
  } else if (period === "Y") {
    parent = '#yearPackages';
  }

  $(parent+' .tabItem').removeClass('tabCurrent');
  $(parent+' .packageTabItem').fadeOut('fast');

  setTimeout(function(){
    $(parent+' #'+tab+'.packageTabItem').fadeIn('fast');
  }, 200);

  $(parent+' #tab'+tab).addClass('tabCurrent');

}


function changePeriod(period) {

  $('#periodTabs .tabItem').removeClass('tabCurrent');
  $('.packagePeriodContent').fadeOut('fast');

  if (period === "M") {

    setTimeout(function(){
      $('#monthPackages').fadeIn('fast');
    }, 200);

    $('#periodM').addClass('tabCurrent');

  } else if (period === "Y") {

    setTimeout(function(){
      $('#yearPackages').fadeIn('fast');
    }, 200);

    $('#periodY').addClass('tabCurrent');

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

      ajaxReq(payData,'https://api.sabetmikonim.com/panel/order-package/','pay');

    } else {
      alert('لطفا یکی از پکیج‌ها را انتخاب نمایید.');
    }

  });



});
