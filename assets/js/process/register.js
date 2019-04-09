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


function registerTabs(stepId) {
	//دریافت آیدی عنصر پاپ آپ
	// var stepId = $(this).attr('href');
	var preStepId = stepId-1;
	var goStep = false;

	if (stepId != 1) {

		if ($("input[name=email]").val() == '') {

			goStep = false;

			alert('ایمیل را وارد نمایید.');

			$('#step'+(stepId-1)+' input[name=email]').addClass('error');


		} else if ($("input[name=name]").val() == '') {

			goStep = false;

			alert(' نام و نام خانوادگی را وارد نمایید. ');

			$('#step'+(stepId-1)+' input[name=name]').addClass('error');


		} else if ($("input[name=passwd]").val() == '') {

			goStep = false;

			alert(' رمز عبور را وارد نمایید. ');

			$('#step'+(stepId-1)+' input[name=passwd]').addClass('error');


		} else if ($("input[name=mobile]").val() == '') {

			goStep = false;

			alert('  شماره موبایل‌تان را وارد نمایید ');

			$('#step'+(stepId-1)+' input[name=mobile]').addClass('error');


		} else {
			goStep = true;
			$('#step1 input').removeClass('error');





		}

	} else {
		goStep = true;
	}



	if (goStep) {

		$('.registerSteps').css({'display':'none'});
		$('#step'+stepId).css({'display':'block'});

		$('.stepItem').removeClass('active');
		$('#stepItem'+stepId).addClass('active');

		if (stepId == 1) {

			// $('a[name=nextStep]').attr('href', stepId);
			// $('a[name=preStep]').attr('href', +stepId + 1);
			document.getElementById('nextStep').setAttribute('onclick', 'campaignTabs('+ (stepId+1) +')');
			document.getElementById('preStep').setAttribute('onclick', 'campaignTabs('+ stepId +')');
			$("a[name=preStep]").css({'display':'none'});
			$("a[name=nextStep]").css({'display':'block'});
			$("button[name=submitForm]").css({'display':'none'});

		} else if ((stepId==2) || (stepId==3) || (stepId==4)) {

			document.getElementById('nextStep').setAttribute('onclick', 'campaignTabs('+ (stepId+1) +')');
			document.getElementById('preStep').setAttribute('onclick', 'campaignTabs('+ (stepId-1) +')');
			$("a[name=preStep]").css({'display':'block'});
			$("a[name=nextStep]").css({'display':'block'});
			$("button[name=submitForm]").css({'display':'none'});

		} else if (stepId==5) {

			document.getElementById('preStep').setAttribute('onclick', 'campaignTabs('+ (stepId-1) +')');
			$('a[name=nextStep]').attr('href', stepId);
			$('a[name=preStep]').attr('href', +stepId - 1);
			$("a[name=preStep]").css({'display':'block'});

			$("a[name=nextStep]").css({'display':'none'});
			$("button[name=submitForm]").css({'display':'block'});

		}

		goStep = false;

	}

	// return false;


}



$(document).ready(function() {


  $('#registerForm').submit(function(event) {


    var errorStatus = 'false';

    // handle errors for acc_type ---------------
    if ($('input[name=email]').val() === "") {
      $('#email_group').addClass('has-error'); // add the error class to show red input
      $('#email_group').append('<div class="help-block"> لطفا ایمیل‌تان را وارد نمایید </div>'); // add the actual error message under our input

      errorStatus = 'true';
    }

    // handle errors for passwd ---------------
    if ($('input[name=passwd]').val() === "") {
      $('#passwd_group').addClass('has-error'); // add the error class to show red input
      $('#passwd_group').append('<div class="help-block"> لطفا رمز عبورتان وارد نمایید! </div>'); // add the actual error message under our input

      errorStatus = 'true';
    }

    // handle errors for input name ---------------
    if ($('input[name=name]').val() === "") {
      $('#name_group').addClass('has-error');
      $('#name_group').append('<div class="help-block"> لطفا نام خودتان را وارد نمایید! </div>'); // add the actual error message under our input

      errorStatus = 'true';
    }

    // handle errors for input name ---------------
    if ($('input[name=mobile]').val() === "") {
      $('#mobile_group').addClass('has-error');
      $('#mobile_group').append('<div class="help-block"> لطفا شماره موبایل‌تان را وارد نمایید </div>'); // add the actual error message under our input

      errorStatus = 'true';
    }



    if (errorStatus === "false") {

      $(".loadingBar").addClass('active');


      $('.form-group').removeClass('has-error'); // remove the error class
      $('.help-block').remove(); // remove the error text

      // get the form data
      // there are many ways to get this data using jQuery (you can use the class or id also)



      var formData = {
        'updatePackage': 'false',
        'name' 			: $('input[name=name]').val(),
        'mobile' 			: $('input[name=mobile]').val(),
        'email' 			: $('input[name=email]').val(),
        'password' 			: $('input[name=passwd]').val(),
      };


      verifyData = JSON.stringify(formData);

      sendData = { 'x' : verifyData };


      // process the form
      $.ajax({
        type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url 		: 'http://api.sabetmikonim.com:8004/accounts/register/', // the url where we want to POST
        data 		: sendData, // our data object
        dataType 	: 'json', // what type of data do we expect back from the server
        async: true,
        encode 		: true
      })
        // using the done promise callback
        .done(function(data) {

          $(".loadingBar").removeClass('active');

          // log data to the console so we can see
          console.log(data);

          if (data.status === "dpEmail") {

            $('#email_group').addClass('has-error'); // add the error class to show red input
            $('#email_group').append('<div class="help-block"> ایمیل شما تکراری است! لطفا از <a href="http://amins-macbook-pro.local:5757/sabetmikonimv2/index.php/"> اینجا </a> وارد شوید! </div>'); // add the actual error message under our input

          } else {

            Cookies.set('sbm_token',data.cookie, { expires: 1, path: '' });
            // Cookies.set('userEmail',data.email, { expires: 1, path: '' });
            Cookies.remove('dId', { path: '' });
            Cookies.remove('cId', { path: '' });

            // setCookie('sbm_token',data.cookie,1);
            // setCookie('userEmail',formData.email,1);
            // setCookie('dId',null);
            swal({
              title: "تبریک!",
              text: "ثبت نام شما با موفقیت انجام شد!",
              icon: "success",
              button: "ورود",
            })
            .then((isConfirm) => {
              if (isConfirm) {

               window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/getstart.php/";

              }
            });

            setTimeout(function(){
    					window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/getstart.php/";
    				},3000);

            // document.getElementById("yourEmail").innerHTML = formData.email;

            // $('.registerSteps').css({'display':'none'});
            // $('#step2').css({'display':'block'});

            // createView({contentId: 'welcome', title:'به سرویس ثابت میکنیم خوش آمدید!'}, true);



          }




        })

        // using the fail promise callback
        .fail(function(data) {

          $(".loadingBar").removeClass('active');

          // show any errors
          // best to remove for production
          console.log(data);

          swal({
            title: "خطا!",
            text: "متاسفانه ارتباط با سرور قطع شده است.",
            icon: "warning",
            button: "لطفا یکبار دیگر امتحان کنید",
          });

        });

    }



    event.preventDefault();

  });







	$('a[name=registerStepLink]').click(function(e) {

			e.preventDefault();

	});





  // resend veerify email
  $('a[name=resendEmail]').click(function() {

    $(".loadingBar").addClass('active');

		var sbmToken = getCookie('sbm_token');
		var userEmail = getCookie('userEmail');

    var formData = {
			'email': userEmail,
			'cookie': sbmToken
    };

    verifyData = JSON.stringify(formData);

    sendData = { 'x' : verifyData };

    $.ajax({
      type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
      url 		: 'http://api.sabetmikonim.com:8004/accounts/resend-email/', // the url where we want to POST
      data 		: sendData, // our data object
      dataType 	: 'json', // what type of data do we expect back from the server
      encode 		: true,
      async: true,
    })
    // using the done promise callback
    .done(function(data) {

      console.log(formData);
      console.log(data);

      $(".loadingBar").removeClass('active');

      if (data.status === "emailReSent") {

        swal({
          // title: "تبریک!",
          text: "ایمیل فعال‌سازی مجددا ارسال گردید!",
          icon: "success",
          button: "ایمیلتان را تایید نمایید",
        });

      }



    })

    // using the fail promise callback
    .fail(function(data) {

      // show any errors
      // best to remove for production
      console.log(data);

      $('.submit_txt').delay(200).fadeIn('fast');
      $('.process_txt').fadeOut('fast');
      $('.signup_btn').addClass('btn-primary');
      $('.signup_btn').removeClass('signup_btn_process');

      swal({
        title: "خطا!",
        text: "متاسفانه ارتباط با سرور قطع شده است.",
        icon: "warning",
        button: "لطفا یکبار دیگر امتحان کنید",
      });

    });


  });



});

function past_exp() {


	$('.past_exp').fadeToggle('medium');

}

function merchant_info() {


	$('.merchant_info').fadeToggle('medium');

}
