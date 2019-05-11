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



function ajaxReq(formData,url,reqType) {

	var verifyData, sendData;

  $(".loadingBar").addClass('active');
  // $(".loadingMask").fadeIn();



verifyData = JSON.stringify(formData);

sendData = { 'x' : verifyData };

console.log(sendData);

$.ajax({
	type    : 'POST', // define the type of HTTP verb we want to use (POST for our form)
	url     : url, // the url where we want to POST
	data    : sendData, // our data object
	dataType  : 'json', // what type of data do we expect back from the server
	async: true,
	encode    : true
})
	// using the done promise callback

	.done(function(data) {

		$(".loadingBar").removeClass('active');
		// $(".loadingMask").fadeOut();

		console.log('ok! Status:'+data.status);
		console.log(data);


    if (reqType === "logOut") {

      if (data.status === "loggedOut") {

        // setCookie('sbm_token',null);
        // setCookie('dId',null);

        Cookies.remove('sbm_token', {path: '/'});
        Cookies.remove('dId', {path: '/'});
        Cookies.remove('cId', {path: '/'});

        // alert(checkCookie('sbm_token'));

        window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/";

      } else {

        swal({
  				title: "خطا!",
  				text: " خطایی رخ داده است! ",
  				icon: "error",
  				button: "تلاش مجدد",
  			});

      }

    } else if (reqType === "getHeaderProfileData") {

      if (data.status === "requestDone") {

        document.getElementById('headerProfileName').innerHTML = data.userName;

      }

    }
    else {


      if (data.status === "securityError") {

        // setCookie('sbm_token',null);
        // setCookie('dId',null);

        Cookies.remove('sbm_token', {path: '/'});
        Cookies.remove('dId', {path: '/'});
        Cookies.remove('cId', {path: '/'});

  			swal({
  				title: "خطا!",
  				text: " خطای امنیتی رخ داده است! ",
  				icon: "error",
  				button: "تلاش مجدد",
  			});

  			setTimeout(function(){

  				window.location.href="http://amins-macbook-pro.local:5757/sabetmikonimv2/";

  			}, 800);


  		} else {

  			callbackAjaxReq(data,reqType);

  		}



    }






	})

	// using the fail promise callback
	.fail(function(data) {

		$(".loadingBar").removeClass('active');
		// $(".loadingMask").fadeOut();

		console.log('no! '+data.status);
		console.log(data);

		swal({
							title: "خطا!",
							text: "متاسفانه ارتباط با سرور قطع شده است.",
							icon: "error",
							button: "تماس با پشتیبانی: ۲۸۴۲۵۷۳۳ - ۰۲۱",
		});

	});


}





$(document).ready(function() {

		var currentUrl = window.location.href;

		if (checkCookie('sbm_token') === "cookieNotSet") {

			// setCookie('redirect_url',currentUrl,1);
      Cookies.set('redirect_url', currentUrl, { expires: 1, path: '/' });

			window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/index.php?redirect=true";

		} else if (checkCookie('sbm_token') === "cookieSet") {

		} else {

			// setCookie('redirect_url',currentUrl,1);
      Cookies.set('redirect_url', currentUrl, { expires: 1, path: '/' });

			window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/index.php?redirect=true";

		}





    if (page!== "getStart") {

      var sbmToken = getCookie('sbm_token');

      var profileData = { 'cookie' : sbmToken };

      ajaxReq(profileData,'https://api.sabetmikonim.com/panel/get-profile/','getHeaderProfileData');

    }





    // logout of system
  	$('a[name=logOutPanel]').click(function(e) {

  		e.preventDefault();

      var sbmToken = getCookie('sbm_token');

      var logoutData = { 'cookie' : sbmToken };

      ajaxReq(logoutData,'https://api.sabetmikonim.com/panel/logout/','logOut');

  	});



});
