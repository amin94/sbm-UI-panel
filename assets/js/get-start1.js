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


function checkCookie(cname) {
    var checkCookie = getCookie(cname);
    if (checkCookie != "") {
        return "cookieSet";
    } else {
        return "cookieNotSet";
    }
}



function callbackAjaxReq(getData,reqType) {

  if (reqType === "checkStartPage") {

    if (getData.status === "requestDone") {

      var getStartStatus = getData.getStartStatus;
      var intgVerify = getData.intgVerify;


      if (getStartStatus === "False") {

        $('.slotIcon').append('<svg id="Capa_1" width="30px" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.97 27.97"><defs><style>.cls-1{fill:#90a4ae;}</style></defs><title>flaticon1527769131-svg</title><g id="c142_x" data-name="c142 x"><path class="cls-1" d="M14,0A14,14,0,1,0,28,14,14,14,0,0,0,14,0Zm6,17.77L17.77,20A51.34,51.34,0,0,0,14,16.21,52.07,52.07,0,0,0,10.2,20L8,17.77A43.64,43.64,0,0,0,11.75,14,43,43,0,0,0,8,10.2L10.2,8s3.55,3.78,3.78,3.78S17.77,8,17.77,8L20,10.2A51.2,51.2,0,0,0,16.21,14C16.21,14.24,20,17.77,20,17.77Z"/></g></svg>');

      } else {

        $('.slotIcon').append('<svg width="30px" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.greenStyle{fill:#25ae88;}.cls-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title>checkTick</title><circle class="greenStyle" cx="25" cy="25" r="25"/><polyline class="cls-2" points="38 15 22 33 12 25"/></svg>');

      }



      if (intgVerify === "True") {

        var intgVerifyOffset = getData.intgVerifyOffset;

        $('#connectionStatusBody').addClass('verified');
        $('#connectionStatusBody').append(' تبریک! وبسایت شما با موفقیت متصل گردید. آخرین اتصال: ' + intgVerifyOffset);

      } else {

        $('#connectionStatusBody').append(' اتصال با سایت شما برقرار نشده است. ');

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




// get start opening modal function
function openModalGetStart(modalId, row) {

	$(modalId).addClass('openModal');

	$('.mask').fadeIn();

	document.getElementById(row).innerHTML = '<svg width="30px" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.greenStyle{fill:#25ae88;}.cls-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title>checkTick</title><circle class="greenStyle" cx="25" cy="25" r="25"/><polyline class="cls-2" points="38 15 22 33 12 25"/></svg>';

	return false;
}





$(document).ready(function() {

  var sbmToken = getCookie('sbm_token');

  var checkStartPageData = { 'cookie' : sbmToken };

  ajaxReq(checkStartPageData,'https://api.sabetmikonim.com/panel/check-start-page/','checkStartPage');



});
