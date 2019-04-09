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

  if (reqType === "getProfileData") {

    if (getData.status === "requestDone") {

      if (getData.emailVerifyStatus === "False") {
        $('#emailGroup').addClass('has-error'); // add the error class to show red input
        $('#emailGroup').append('<div class="help-block"> ایمیل شما تایید نشده است! آن را حتما تایید کنید: <a href="javascript:;" name="resendActivitationEmail"> ارسال مجدد ایمیل فعالسازی </a> </div>'); // add the actual error message under our input

      }


      $('input[name=userEmail]').val(getData.userEmail);
      $('input[name=userName]').val(getData.userName);
      $('input[name=userMobile]').val(getData.userMobile);

    } else {

      swal({
        title: "خطا!",
        text: " خطایی رخ داده است! ",
        icon: "error",
        button: "تلاش مجدد",
      });

    }

  } else if (reqType === "updateProfileData") {

      if (getData.status === "profileUpdated") {

        swal({
          title: "تبریک!",
          text: " پروفایل شما با موفقیت به روز گردید! ",
          icon: "success",
          button: "مرسی",
        });


      } else {

        swal({
          title: "خطا!",
          text: " خطایی رخ داده است! ",
          icon: "error",
          button: "تلاش مجدد",
        });

      }

  } else if (reqType === "resendActiveEmail") {

    swal({
      // title: "تبریک!",
      text: "ایمیل فعال‌سازی مجددا ارسال گردید!",
      icon: "success",
      button: "ایمیلتان را تایید نمایید",
    });

  } else if (reqType === "updatePassword") {

    if (getData.status === "passwordChanged") {

      swal({
        title: "تبریک!",
        text: " رمز عبور شما با موفقیت به روز شد! ",
        icon: "success",
        button: "مرسی",
      });

    } else if (getData.status === "wrongPassword") {

      $('#oldPassGroup').addClass('has-error'); // add the error class to show red input
      $('#oldPassGroup').append('<div class="help-block"> رمز عبور فعلی‌تان اشتباه است! </div>'); // add the actual error message under our input

    }

  }

}




$(document).ready(function() {

  var sbmToken = getCookie('sbm_token');

  var profileData = { 'cookie' : sbmToken };

  ajaxReq(profileData,'http://api.sabetmikonim.com:8004/panel/get-profile/','getProfileData');



  $('#profileEditForm').submit(function(event) {

    $('.form-group').removeClass('has-error'); // remove the error class
    $('.help-block').remove(); // remove the error text

    event.preventDefault();

    var errorStatus = "false";

    var sbmToken = getCookie('sbm_token');

    var userName = $('input[name=userName]').val();
    var userMobile = $('input[name=userMobile]').val();

    if (userName === "") {

      errorStatus = "true";

      $('#nameGroup').addClass('has-error'); // add the error class to show red input
      $('#nameGroup').append('<div class="help-block"> فیلد نام و نام خانوادگی نمی‌تواند خالی باشد! </div>'); // add the actual error message under our input

    }


    if (userMobile === "") {

      errorStatus = "true";

      $('#mobileGroup').addClass('has-error'); // add the error class to show red input
      $('#mobileGroup').append('<div class="help-block"> فیلد شماره موبایل نمی‌تواند خالی باشد! </div>'); // add the actual error message under our input

    }

    if (errorStatus === "false") {

      var updateProfileData = { 'cookie' : sbmToken, 'userName' : userName, 'userMobile' : userMobile };

      ajaxReq(updateProfileData,'http://api.sabetmikonim.com:8004/panel/update-profile/','updateProfileData');

    }

  });






  // changePass Request
  $('#changePassForm').submit(function(event) {

    $('.form-group').removeClass('has-error'); // remove the error class
    $('.help-block').remove(); // remove the error text

    event.preventDefault();

    var errorStatus = "false";

    var sbmToken = getCookie('sbm_token');

    var oldPass = $('input[name=oldPass]').val();
    var newPass = $('input[name=newPass]').val();
    var repeatNewPass = $('input[name=repeatNewPass]').val();

    if (oldPass === "") {

      errorStatus = "true";

      $('#oldPassGroup').addClass('has-error'); // add the error class to show red input
      $('#oldPassGroup').append('<div class="help-block"> رمز فعلی‌تان را وارد نمایید! </div>'); // add the actual error message under our input

    }


    if (newPass === "") {

      errorStatus = "true";

      $('#newPass1Group').addClass('has-error'); // add the error class to show red input
      $('#newPass1Group').append('<div class="help-block"> رمز جدید‌تان را وارد نمایید! </div>'); // add the actual error message under our input

    }

    if (repeatNewPass === "") {

      errorStatus = "true";

      $('#repeatNewPassGroup').addClass('has-error'); // add the error class to show red input
      $('#repeatNewPassGroup').append('<div class="help-block"> تکرار رمز عبور را وارد نمایید! </div>'); // add the actual error message under our input

    }


    if (newPass !== repeatNewPass) {

      errorStatus = "true";

      $('#repeatNewPassGroup').addClass('has-error'); // add the error class to show red input
      $('#repeatNewPassGroup').append('<div class="help-block"> تکرار رمز عبور با رمز عبور جدید شما متفاوت است! </div>'); // add the actual error message under our input

    }



    if (errorStatus === "false") {

      var updatePassword = { 'cookie' : sbmToken, 'currentPassword' : oldPass, 'newPassword' : newPass };

      ajaxReq(updatePassword,'http://api.sabetmikonim.com:8004/panel/change-password/','updatePassword');

    }

  });





  // resend verification email
  $('a[name=resendActivitationEmail]').click(function(event){

    event.preventDefault();

		var sbmToken = getCookie('sbm_token');
		var userEmail = $('input[name=userEmail]').val();

    var resendActiveData = {
			'email': userEmail,
			'cookie': sbmToken
    };


    ajaxReq(resendActiveData,'http://api.sabetmikonim.com:8004/accounts/resend-email/','resendActiveEmail');


  });

});
