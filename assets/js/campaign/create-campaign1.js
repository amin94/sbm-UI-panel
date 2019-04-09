// functions
var historyBool = true;
History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
var State = History.getState(); // Note: We are using History.getState() instead of event.state

    //don't run our function when we do a pushState
    if(historyBool){
        historyBool = false;
        stateObject = State.data;

        var pageBoxes = {
          'welcome' : {'title' : 'به سرویس ثابت میکنیم خوش آمدید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/welcome.html', 'crumb' : ''},
          'add-domain' : {'title' : 'دامنه جدید را وارد نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/add-domain.html', 'crumb' : 'addDomainCrumb'},
          'websiteIntg' : {'title' : 'وبسایت‌تان را متصل نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/website-intg.html', 'crumb' : 'intgCrumb'},
          'skipIntg' : {'title' : 'نوع کمپین‌تان را در ثابت میکنیم انتخاب نمایید.', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/cType.html', 'crumb' : 'cFeatureCrumb'}
        };

        var sbmToken = getCookie('sbm_token');

          if (checkCookie('sbm_token')==="cookieSet") {

            $('#registerContent').load(pageBoxes[stateObject.contentId]['tmp'],function(e) {

              var currentPage = stateObject.contentId;

              // add crumb
              $('.crumbLink').removeClass('active');
              $('#'+pageBoxes[stateObject.contentId]['crumb']).addClass('active');


              switch (stateObject.contentId) {
                case 'websiteIntg':

                if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

                  var checkIntegrations = { 'cookie' : sbmToken, 'dId' : getCookie('dId') };

                  ajaxReq(checkIntegrations,'http://api.sabetmikonim.com:8004/panel/check-start-page/','checkIntegrations');

                } else {

                  createView({contentId: 'add-domain'},true);

                }

                  break;

                  case 'add-domain':
                    if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {
                      var getEnteredDomainData = { 'cookie' : sbmToken, 'dId' : getCookie('dId'), 'pageProgressKey' : 'setDomain' };

                      ajaxReq(getEnteredDomainData,'http://api.sabetmikonim.com:8004/panel/get-progress/','getEnteredDomain');

                    }
                    break;
                default:

              }


          });

        } else {
          window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/register.php/";
        }

    }
    historyBool = true;
});


function createView(stateObject, pushHistory) {

  var pageBoxes = {
    'welcome' : {'title' : 'به سرویس ثابت میکنیم خوش آمدید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/welcome.html', 'crumb' : ''},
    'add-domain' : {'title' : 'دامنه جدید را وارد نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/add-domain.html', 'crumb' : 'addDomainCrumb'},
    'websiteIntg' : {'title' : 'وبسایت‌تان را متصل نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/website-intg.html', 'crumb' : 'intgCrumb'},
    'skipIntg' : {'title' : 'نوع کمپین‌تان را در ثابت میکنیم انتخاب نمایید.', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/cType.html', 'crumb' : 'cFeatureCrumb'}
  };

  console.log(stateObject);

  History.pushState(stateObject,pageBoxes[stateObject.contentId]['title'],'http://amins-macbook-pro.local:5757/sabetmikonimv2/getstart.php/?page='+stateObject.contentId);

  History.log();

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



function callbackAjaxReq(getData,reqType) {

  if (reqType === "checkDomain") {

    if (getData.status === "linkVerified") {

      document.getElementById('helpBoxContent').innerHTML = '<p> همه چیز عالیه! بزن بریم! </p>';
      $('input[name=dCheck]').val('true');

      $('input[name=domain]').val(getData.formLink);

      addNewDomain();

    } else if (getData.status === "linkNotVerified") {

      document.getElementById('helpBoxContent').innerHTML = '<p> سایت وارد شده نامعتبر است. </br> لطفا آدرس صحیح را وارد بفرمایید!  </p>';
      $('input[name=dCheck]').val('false');

    } else {

      document.getElementById('helpBoxContent').innerHTML = '<p>   حالا باید اولین سایت‌تان را ثبت نمایید! </br> ضمنا شما می‌توانید بی‌نهایت وبسایت جدید بدون پرداخت هرگونه هزینه‌ای درج نمایید. </p>';
      $('input[name=dCheck]').val('false');

    }

  } else if (reqType === "setNewDomain") {

    if ((getData.status === "domainSet") || (getData.status === "domainWasSet")) {

      setCookie('dId',getData.dId,360);

      createView({contentId : 'websiteIntg'},true);

    } else if (getData.status === "dpDomain") {

      document.getElementById('helpBoxContent').innerHTML = '<p> دامنه وارد شده توسط اکانت دیگری ثبت شده است! </p>';
      $('.helpBox').addClass('helpError');

    }

  } else if (reqType === "checkIntegrations") {

    if (getData.status === "requestDone") {

      var sbmScript = "<!--SABETMIKONIM CONNECTION--><script src='http://amins-macbook-pro.local:5757/sabetmikonimv2/cdn/sabetmikonim_con.js?acc="+getData.sId+"'></script><!--END SABETMIKONIM CONNECTION-->";
      $('input[name=sabetMikonimIntg]').val(sbmScript);

      var intgVerify = getData.intgVerify;


      if (intgVerify === "True") {

        $('#connectionStatusBody').attr('data-connection','true');

        var intgVerifyOffset = getData.intgVerifyOffset;

        $('#connectionStatusBody').addClass('verified');
        $('#connectionStatusText').html(' تبریک! وبسایت شما با موفقیت متصل گردید.');

        $('#lastConnectText').removeClass('disn');
        $('#lastConnectText').append(' آخرین ارتباط با پنل: ' + intgVerifyOffset);

      } else {

        $('#connectionStatusBody').attr('data-connection','false');

        $('#connectionStatusText').html(' <img src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/img/circle-loading.svg" alt="لودینگ ثابت میکنیم"> در حال تلاش برای برقراری اتصال با سایت شما... ');

        realCheckWebsiteIntg();

      }

    } else {

      swal({
        title: "خطا!",
        text: " خطایی رخ داده است! ",
        icon: "error",
        button: "تلاش مجدد",
      });

    }

  } else if (reqType === "getEnteredDomain") {

    if (getData.status === "progressGot") {
      $('input[name=domain]').val(getData.pageProgress);

    } else if (getData.status === "dpDomain") {

      document.getElementById('helpBoxContent').innerHTML = '<p> دامنه وارد شده توسط اکانت دیگری ثبت شده است! </p>';
      $('.helpBox').addClass('helpError');

    }

  } else if (reqType === "sendSabetMikonimToDeveloper") {

    if (getData.status === "developerEmailSent") {

      swal({
        title: "تبریک!",
        text: "پیام تنظیم سرویس ثابت میکنیم بر روی وبسایت شما برای برنامه‌نویس‌تان ارسال گردید.",
        icon: "success",
        button: "عالیه! حالا کمپین‌تان را بسازید",
      })
      .then((isConfirm) => {
        if (isConfirm) {

         createView({contentId: 'skipIntg'},true)

        }
      });

    }

  }

}

 


function addNewDomain() {

  $('.help-block').remove();
  $('.form-group').removeClass('has-error');

  var sbmToken = getCookie('sbm_token');

  var domain = $('input[name=domain]').val();

  if (domain === "") {

    $('#domainGroup').addClass('has-error'); // add the error class to show red input
    $('#domainGroup').append('<div class="help-block"> لطفا آدرس دامنه را وارد نمایید! </div>'); // add the actual error message under our input

  } else {

  var setNewDomainData = { 'cookie' : sbmToken, 'url' : domain, 'operation' : 'setDomain' };

  ajaxReq(setNewDomainData,'http://api.sabetmikonim.com:8004/panel/complete-information/','setNewDomain');

}

}





var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

function checkDomain(domain) {

  $('.help-block').remove();
  $('.form-group').removeClass('has-error');

  var sbmToken = getCookie("sbm_token");

  if ($('input[name=domain]').val() === "") {

    $('#domainGroup').addClass('has-error'); // add the error class to show red input
    $('#domainGroup').append('<div class="help-block"> لطفا آدرس دامنه را وارد نمایید! </div>'); // add the actual error message under our input

  } else {

    var checkDomainData = { 'cookie' : sbmToken, 'formLink' : domain };

    delay(function(){
        ajaxReq(checkDomainData,'http://api.sabetmikonim.com:8004/panel/check-form-link/','checkDomain');
      }, 2000 );

  }

}





function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }

    $('#copyCodeBtn').text('کپی شد!');

    return succeed;
}





$(document).ready(function() {


  var refreshPageStatus = false;

  var currentUrl = window.location.href;

	var url = new URL(currentUrl);
	var page = url.searchParams.get("page");

  if (page!==null) {
    createView({contentId: page}, true);
  } else {
    createView({contentId: 'welcome'}, true);
  }






});
