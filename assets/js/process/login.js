// functions

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



$(document).ready(function() {

	var currentUrl = window.location.href;

	var url = new URL(currentUrl);
	var code = url.searchParams.get("code");
	var reqType = url.searchParams.get("mode");
	var verifiedEmail = url.searchParams.get("email");

	if (reqType=='emailVerify') {


		var formData = {
			'code' 			: code,
			'email' 			: verifiedEmail
		};

		verifyData = JSON.stringify(formData);

    sendData = { 'x' : verifyData };

		console.log(sendData);

		// process the form
		$.ajax({
			type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
			url 		: 'http://api.sabetmikonim.com:8004/accounts/email-accept/', // the url where we want to POST
			data 		: sendData, // our data object
			dataType 	: 'json', // what type of data do we expect back from the server
			encode 		: true,
      async: true,
		})
			// using the done promise callback
			.done(function(data) {

				console.log(data);


				if (data.status === "emailVerified") {

					var cookie = data.cookie;
					var getStartStatus = data.getStartStatus;

							// ALL GOOD!
							if (getStartStatus === "False") {

								swal({
								  title: " حساب کاربری شما تایید شد ",
								  icon: "success",
									button: "ورود به پنل",
                  closeOnClickOutside: false,
                  closeOnEsc: false,
								})
								.then((isConfirm) => {
								  if (isConfirm) {

								   window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/getstart.php/";

								  }
								});



					} else {

						swal({
							title: " حساب کاربری شما تایید شد ",
							icon: "success",
							button: "ورود به پنل",
						})
						.then((isConfirm) => {
							if (isConfirm) {

							 window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/app.php/";

							}
						});


					}

				} else {

					swal({
						title: "خطا!",
						text: "ایمیل شما تایید نشد",
						icon: "warning",
						button: "تماس با پشتیبانی: ۲۸۴۲۵۷۳۳ - ۰۲۱",
					});

				}


			})

			// using the fail promise callback
			.fail(function(data) {

				$(".loadingBar").removeClass('active');

        console.log(data);

				swal({
					title: "خطا!",
					text: " متاسفانه ارتباط شما با سرور قطع شده است! ",
					icon: "error",
					button: "تماس با پشتیبانی: ۲۸۴۲۵۷۳۳ - ۰۲۱",
				});

			});

	} else if (reqType === "resetPassword") {

    var formData = {
			'code' 			: code,
			'email' 			: verifiedEmail
		};

		verifyData = JSON.stringify(formData);

    sendData = { 'x' : verifyData };

		console.log(sendData);

		// process the form
		$.ajax({
			type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
			url 		: 'http://api.sabetmikonim.com:8004/accounts/check-forget-code/', // the url where we want to POST
			data 		: sendData, // our data object
			dataType 	: 'json', // what type of data do we expect back from the server
			encode 		: true,
      async: true,
		})
			// using the done promise callback
			.done(function(data) {

				console.log(data);


				if (data.status === "validCode") {

          $('.loginForms').fadeOut();

          setTimeout(function(){

            $('#setNewPassBody').fadeIn();

          },500);

          $('input[name=sbmcodeaskldjsakl29834782974dldjadk]').val(data.token);

				} else {

					swal({
						title: "خطا!",
						text: "درخواست شما نامعتبر است!",
						icon: "warning",
						button: "تماس با پشتیبانی: ۲۸۴۲۵۷۳۳ - ۰۲۱",
					});

				}


			})

			// using the fail promise callback
			.fail(function(data) {

        $(".loadingBar").removeClass('active');

				console.log(data);

				swal({
					title: "خطا!",
					text: " متاسفانه ارتباط شما با سرور قطع شده است! ",
					icon: "error",
					button: "تماس با پشتیبانی: ۲۸۴۲۵۷۳۳ - ۰۲۱",
				});

			});

  } else {

    if ((checkCookie('sbm_token') === "cookieSet") && (getCookie('sbm_token') !== "null")) {
      window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/app.php/";
    }

  }


	// process the form
	$('#loginForm').submit(function(event) {

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


		if (errorStatus === "false") {

			$(".loadingBar").addClass('active');

			$('.form-group').removeClass('has-error'); // remove the error class
			$('.help-block').remove(); // remove the error text

			// get the form data
			// there are many ways to get this data using jQuery (you can use the class or id also)



			var formData = {
				'email' 			: $('input[name=email]').val(),
				'password' 			: $('input[name=passwd]').val()

			};

      verifyData = JSON.stringify(formData);

      sendData = { 'x' : verifyData };


			// process the form
			$.ajax({
				type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
				url 		: 'http://api.sabetmikonim.com:8004/accounts/login/', // the url where we want to POST
				data 		: sendData, // our data object
				dataType 	: 'json', // what type of data do we expect back from the server
				encode 		: true,
        async: true,
			})
				// using the done promise callback
				.done(function(data) {

          console.log(sendData);

					$(".loadingBar").removeClass('active');

					// log data to the console so we can see
					console.log(data);

          // setCookie('sbm_token',data.cookie,1);

          var currentUrl = window.location.href;

        	var url = new URL(currentUrl);
        	var redirectStatus = url.searchParams.get("redirect");


          // ALL GOOD!
          if (data.status === "loginSuccess") {

            Cookies.set('sbm_token',data.cookie, { expires: 1, path: '/' });
            Cookies.set('dId',data.lastLoginedDid, { expires: 365, path: '/' });

            if (data.getStartStatus=='False') {

              window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/getstart.php/";

            } else {

              if (redirectStatus === "true") {

                if (checkCookie('redirect_url') === "cookieSet") {

                  var redirectUrl = getCookie('redirect_url');

                  window.location.href = redirectUrl;

                } else {

                  window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/app.php/";

                }

              } else {

                window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/app.php/";

              }

          }



        } else if ((data.status === "wrongPass") || (data.status === "wrongEmail")) {

          swal({
						title: "خطا!",
						text: "نام کاربری یا رمز عبور را اشتباه وارد نمودید.",
						icon: "warning",
						buttons: ["تلاش مجدد", "ثبت نام"],
					})
					.then((isConfirm) => {
						if (isConfirm) {

						 window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/register.php/";

						}
					});


        } else {

          swal({
            title: "خطا!",
            text: "متاسفانه یک خطای سیستمی رخ داده است.",
            type: "error",
            confirmButtonText: "دوباره تلاش کنید"
          });

        }


				})

				// using the fail promise callback
				.fail(function(data) {

          $(".loadingBar").removeClass('active');

					// show any errors
					// best to remove for production
					console.log(data);

					$('.submit_txt').delay(200).fadeIn('fast');
					$('.process_txt').fadeOut('fast');
					$('.signup_btn').addClass('btn-primary');
					$('.signup_btn').removeClass('signup_btn_process');

					swal({   title: "خطا!",   text: "متاسفانه ارتباط با سرور قطع شده است.",   type: "error",   confirmButtonText: "دوباره تلاش کنید" });

				});

		}

		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
	});










  $('#forgotPassForm').submit(function(event) {

		var errorStatus = 'false';

    // handle errors for acc_type ---------------
    if ($('input[name=forgotEmail]').val() === "") {
      $('#forgotEmail_group').addClass('has-error'); // add the error class to show red input
      $('#forgotEmail_group').append('<div class="help-block"> برای ارسال لینک بازیابی رمز عبور، باید آدرس ایمیل‌تان را وارد نمایید. </div>'); // add the actual error message under our input

      errorStatus = 'true';
    }


		if (errorStatus === "false") {

			$(".loadingBar").addClass('active');

			$('.form-group').removeClass('has-error'); // remove the error class
			$('.help-block').remove(); // remove the error text

			// get the form data
			// there are many ways to get this data using jQuery (you can use the class or id also)



			var formData = {
				'email' 			: $('input[name=forgotEmail]').val(),

			};

      verifyData = JSON.stringify(formData);

      sendData = { 'x' : verifyData };


			// process the form
			$.ajax({
				type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
				url 		: 'http://api.sabetmikonim.com:8004/accounts/forget-password/', // the url where we want to POST
				data 		: sendData, // our data object
				dataType 	: 'json', // what type of data do we expect back from the server
				encode 		: true,
        async: true,
			})
				// using the done promise callback
				.done(function(data) {

          console.log(sendData);

					$(".loadingBar").removeClass('active');

					// log data to the console so we can see
					console.log(data);

          // ALL GOOD!
          if (data.status=='emailSent') {

            swal({
              title: "تبریک!",
              text: "ایمیل بازیابی رمز عبور ارسال گردید!",
              icon: "success",
              button: " لطفا ایمیل‌تان را بررسی نمایید ",
            });

          }


				})

				// using the fail promise callback
				.fail(function(data) {

          $(".loadingBar").removeClass('active');

					// show any errors
					// best to remove for production
					console.log(data);

					$('.submit_txt').delay(200).fadeIn('fast');
					$('.process_txt').fadeOut('fast');
					$('.signup_btn').addClass('btn-primary');
					$('.signup_btn').removeClass('signup_btn_process');

					swal({   title: "خطا!",   text: "متاسفانه ارتباط با سرور قطع شده است.",   type: "error",   confirmButtonText: "دوباره تلاش کنید" });

				});

		}

		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
	});









  $('#setNewPassForm').submit(function(event) {

		var errorStatus = 'false';

    // handle errors for acc_type ---------------
    if ($('input[name=newPass1]').val() === "") {
      $('#newPass1_group').addClass('has-error'); // add the error class to show red input
      $('#newPass1_group').append('<div class="help-block"> رمز عبور را وارد نمایید! </div>'); // add the actual error message under our input

      errorStatus = 'true';
    }

    if ($('input[name=newPass2]').val() === "") {
      $('#newPass2_group').addClass('has-error'); // add the error class to show red input
      $('#newPass2_group').append('<div class="help-block"> تکرار رمز عبور را وارد نمایید! </div>'); // add the actual error message under our input

      errorStatus = 'true';
    }


    if ($('input[name=newPass1]').val() !== $('input[name=newPass2]').val()) {
      $('#newPass2_group').addClass('has-error'); // add the error class to show red input
      $('#newPass2_group').append('<div class="help-block"> تکرار رمز عبور با رمز عبور مطابقت ندارد! </div>'); // add the actual error message under our input

      errorStatus = 'true';
    }


		if (errorStatus === "false") {

			$(".loadingBar").addClass('active');

			$('.form-group').removeClass('has-error'); // remove the error class
			$('.help-block').remove(); // remove the error text

			// get the form data
			// there are many ways to get this data using jQuery (you can use the class or id also)



			var formData = {
				'newPassword' 			: $('input[name=newPass2]').val(),
				'token' 			: $('input[name=sbmcodeaskldjsakl29834782974dldjadk]').val(),
			};

      verifyData = JSON.stringify(formData);

      sendData = { 'x' : verifyData };


			// process the form
			$.ajax({
				type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
				url 		: 'http://api.sabetmikonim.com:8004/accounts/reset-password/', // the url where we want to POST
				data 		: sendData, // our data object
				dataType 	: 'json', // what type of data do we expect back from the server
				encode 		: true,
        async: true,
			})
				// using the done promise callback
				.done(function(data) {

          console.log(sendData);

					$(".loadingBar").removeClass('active');

					// log data to the console so we can see
					console.log(data);

          // ALL GOOD!
          if (data.status==='passwordReset') {

            // setCookie('sbm_token',data.cookie,1);

            Cookies.set('sbm_token',data.cookie, { expires: 1, path: '/' });

            // check getstart status to redirect user
            var redirectUserUrl
            if (data.getStartStatus === "False") {

              redirectUserUrl = "http://amins-macbook-pro.local:5757/sabetmikonimv2/getstart.php/";

            } else {

              redirectUserUrl = "http://amins-macbook-pro.local:5757/sabetmikonimv2/app.php/";

            }

            swal({
              title: "تبریک!",
              text: "رمز عبور شما با موفقیت تغییر پیدا کرد!",
              icon: "success",
              button: "ورود به پنل",
            }).then((isConfirm) => {
              if (isConfirm) {

               window.location.href = redirectUserUrl;

              }
            });

          } else if (data.status === "dpPassword") {

            $('#newPass1_group').addClass('has-error'); // add the error class to show red input
            $('#newPass1_group').append('<div class="help-block"> رمز عبور انتخابی شما با رمز قبلی برابر است! لطفا رمز جدیدی را انتخاب نمایید! </div>'); // add the actual error message under our input

          } else if(data.status === "securityError") {

            swal({
              title: "خطا!",
              text: " خطای امنیتی رخ داده است! ",
              icon: "error",
              button: "تلاش مجدد",
            });

            setTimeout(function(){

              window.location.href="http://amins-macbook-pro.local:5757/sabetmikonimv2/";

            }, 800);

          }


				})

				// using the fail promise callback
				.fail(function(data) {

          $(".loadingBar").removeClass('active');

					// show any errors
					// best to remove for production
					console.log(data);

					$('.submit_txt').delay(200).fadeIn('fast');
					$('.process_txt').fadeOut('fast');
					$('.signup_btn').addClass('btn-primary');
					$('.signup_btn').removeClass('signup_btn_process');

					swal({   title: "خطا!",   text: "متاسفانه ارتباط با سرور قطع شده است.",   type: "error",   confirmButtonText: "دوباره تلاش کنید" });

				});

		}

		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
	});











  // change form function
  $('a[name=changeForm]').click(function(e) {
    //لغو حالت پیش فرض عملکرد لینک
    e.preventDefault();

    var targetForm = $(this).data('form');

    $('.loginForms').fadeOut();

    setTimeout(function(){

      $('#'+targetForm).fadeIn();

    },500);


  });



});
