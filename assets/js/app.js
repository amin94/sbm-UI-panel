// functions
var fadeStatus = false;
var historyBool = true;
History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
var State = History.getState(); // Note: We are using History.getState() instead of event.state

    //don't run our function when we do a pushState
    if(historyBool){
        historyBool = false;
        stateObject = State.data;

        var pageBoxes = {
          'domains' : {'title' : 'لیست دامنه‌ها', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/domains.html', 'crumb' : 1},
          'campaigns' : {'title' : 'لیست کمپین‌ها', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaigns.html', 'crumb' : 2},
          'add-domain' : {'title' : 'افزودن دامنه جدید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/panel/add-domain-panel.html', 'crumb' : 3},
          'websiteIntg' : {'title' : 'وبسایت‌تان را متصل نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/panel/website-intg-panel.html', 'crumb' : 4},
        };

            if (checkCookie('sbm_token')==="cookieSet") {

              $('#pageBodyContent').load(pageBoxes[stateObject.contentId]['tmp'],function(e) {

                var currentPage = stateObject.contentId;


                switch (stateObject.contentId) {


									case 'domains':

                  managePanelMenu('domain');

										var sbmToken = getCookie('sbm_token');
										var getDomainsData = { 'cookie' : sbmToken, 'operation' : 'getUserDomains' };

									  ajaxReq(getDomainsData,'http://api.sabetmikonim.com:8004/panel/get-user-information/','getUserDomains');

										break;



									case 'campaigns':

                  managePanelMenu('notDomain');

                  var sbmToken = getCookie('sbm_token');

									if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

										var sbmToken = getCookie('sbm_token');
										var dId = getCookie('dId');
										var getCampaignsData = { 'cookie' : sbmToken, 'dId' : dId };

									  ajaxReq(getCampaignsData,'http://api.sabetmikonim.com:8004/panel/get-campaigns/','getCampaigns');


									} else {

										createViewPanel({contentId : 'domains'},true);

									}

										break;



                    case 'add-domain':

                      managePanelMenu('domain');

                      Cookies.remove('dId', {path: '/sabetmikonimv2'});
                      Cookies.remove('cId', {path: '/sabetmikonimv2'});

  										break;



                      case 'websiteIntg':

                      managePanelMenu('notDomain');

                      var sbmToken = getCookie('sbm_token');

                      if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

                        var checkIntegrations = { 'cookie' : sbmToken, 'dId' : getCookie('dId') };

                        ajaxReq(checkIntegrations,'http://api.sabetmikonim.com:8004/panel/check-start-page/','checkIntegrations');

                      } else {

                        createView({contentId: 'add-domain'},true);

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


function createViewPanel(stateObject, pushHistory) {


	var pageBoxes = {
		'domains' : {'title' : 'لیست دامنه‌ها', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/domains.html', 'crumb' : 1},
		'campaigns' : {'title' : 'لیست کمپین‌ها', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaigns.html', 'crumb' : 2},
    'add-domain' : {'title' : 'افزودن دامنه جدید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/panel/add-domain-panel.html', 'crumb' : 3},
    'websiteIntg' : {'title' : 'وبسایت‌تان را متصل نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/panel/website-intg-panel.html', 'crumb' : 4},
	};

    console.log('stateObject: '+stateObject);

    History.pushState(stateObject,pageBoxes[stateObject.contentId]['title'],'http://amins-macbook-pro.local:5757/sabetmikonimv2/app.php/?page='+stateObject.contentId);

    // History.log();



}




function managePanelMenu(panelSection) {

  if (panelSection === 'domain') {

    $('#sbmWebsiteNav').fadeOut('fast');
    $('#domainsMenu').fadeIn('fast');

  } else if (panelSection === 'notDomain') {

    $('#sbmWebsiteNav').fadeIn('fast');
    $('#domainsMenu').fadeOut('fast');

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

    var dId = getCookie('dId');

    if (dId === "null") {
      dId = '';
    }

  var setNewDomainData = { 'cookie' : sbmToken, 'url' : domain, 'operation' : 'setDomain', 'dId' : dId };

  ajaxReq(setNewDomainData,'http://api.sabetmikonim.com:8004/panel/complete-information/','setNewDomain');

}

}



function displayCampaigns(campaignsData) {

	var campaignStatus;

	var j =1;
	for (var i = 0; i < campaignsData.length; i++) {

			if (campaignsData[i]['status'] === 'active') {
				campaignStatus = '<div class="campaignStatus pullLeft active"> <span> فعال </span></div>';
			} else if (campaignsData[i]['status'] === 'deActive') {
				campaignStatus = '<div class="campaignStatus pullLeft"> <span> غیرفعال </span></div>';
			}

			var cId = "'" + campaignsData[i]['cId'] + "'";

      if (campaignsData[i]['campaignDetails']['campaignSubTypeTemplate'] === null) {

        $('#campaignsDataBody').prepend('<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 campaignGrid"><div class="campaignCard"><div class="campaignMenu"><a href="javascript:;"> <i class="fas fa-ellipsis-h"></i> </a><ul class="uiList subMenu"><li> <a href="javascript:;"> ویرایش </a></li><li> <a href="javascript:;"> کپی </a></li><li> <a href="javascript:;"> حذف </a></li></ul></div><div class="campaignTitle"><div class="campaignSubTypePic"><img src="'+ campaignsData[i]['campaignDetails']['defaults']['subTypeImage'] +'" alt="'+ campaignsData[i]['name'] +'"></div><div class="campaignTitleContent"><div class="campaignTool"><span>'+ campaignsData[i]['campaignDetails']['defaults']['subTypeTitle'] +' | دسته: <span> '+ campaignsData[i]['campaignDetails']['campaignTypeTitle'] +' </span> </span></div><h4> '+ campaignsData[i]['name'] +' </h4></div></div><div class="campaignContent"><div class="campaignCat pullRight"> <span> آخرین ویرایش: '+ campaignsData[i]['modifyDate'] +' </span></div>'+ campaignStatus +'<div class="clear"></div></div><a href="javascript:;" data-cid="'+ campaignsData[i]['cId'] +'" name="modalLink" onclick="openCampaignModal('+ cId +')" class="more">'+ campaignsData[i]['name'] +' </a></div></div>');

      } else {

        $('#campaignsDataBody').prepend('<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 campaignGrid"><div class="campaignCard"><div class="campaignMenu"><a href="javascript:;"> <i class="fas fa-ellipsis-h"></i> </a><ul class="uiList subMenu"><li> <a href="javascript:;"> ویرایش </a></li><li> <a href="javascript:;"> کپی </a></li><li> <a href="javascript:;"> حذف </a></li></ul></div><div class="campaignTitle"><div class="campaignSubTypePic"><img src="'+ campaignsData[i]['campaignDetails']['campaignSubTypeTemplate']['connectionSettings']['metas']['image'] +'" alt="'+ campaignsData[i]['name'] +'"></div><div class="campaignTitleContent"><div class="campaignTool"><span> کمپین '+ campaignsData[i]['campaignDetails']['campaignSubTypeTitle'] +' | دسته: <span> '+ campaignsData[i]['campaignDetails']['campaignTypeTitle'] +' </span> </span></div><h4> '+ campaignsData[i]['name'] +' </h4></div></div><div class="campaignContent"><div class="campaignCat pullRight"> <span> آخرین ویرایش: '+ campaignsData[i]['modifyDate'] +' </span></div>'+ campaignStatus +'<div class="clear"></div></div><a href="javascript:;" data-cid="'+ campaignsData[i]['cId'] +'" name="modalLink" onclick="openCampaignModal('+ cId +')" class="more">'+ campaignsData[i]['name'] +' </a></div></div>');

      }

			j=j+1;
	}

}


function callbackAjaxReq(getData,reqType) {

  if (reqType === "getCampaigns") {

    if (getData.status === "campaignsGot") {

			displayCampaigns(getData.campaignsData);

    }

  } else if (reqType === "eachCampaignDetail") {

		if (getData.status === "campaignGot") {

			$('.loadingBar').removeClass('active');

			$('.modalOption').fadeIn('fast');
			$('.modalOption').addClass('openModal');

			$('.mask').fadeIn();

			$('#modalOptionBody').attr('data-cid',getData.campaignsDetailData.cId);

			// check campaign status
			if (getData.campaignsDetailData.status === "active") {

				$('input[name=campaignStatusSwitch]').prop('checked', true);
				$('input[name=campaignStatusSwitch]').data('switch', true);

				$('.simple-switch-outter').removeClass('unChecked');
				$('.simple-switch-outter').addClass('checked');

			} else if (getData.campaignsDetailData.status === "deActive") {

				$('input[name=campaignStatusSwitch]').prop('checked', false);
				$('input[name=campaignStatusSwitch]').data('switch', false);

				$('.simple-switch-outter').addClass('unChecked');
				$('.simple-switch-outter').removeClass('checked');

			}


			$('a[name=deleteCampaign]').attr('data-cid',getData.campaignsDetailData.cId);

			document.getElementById('campaignID').innerHTML = getData.campaignsDetailData.cId;


			document.getElementById('campaignDetailName').innerHTML = getData.campaignsDetailData.campaignName;
			document.getElementById('campaignPageViews').innerHTML = getData.campaignsDetailData.pageViews;
			document.getElementById('campaignVisitors').innerHTML = getData.campaignsDetailData.visitorCount;
			document.getElementById('campaignClicks').innerHTML = getData.campaignsDetailData.clicks;
			document.getElementById('campaignContactsCount').innerHTML = getData.campaignsDetailData.contactCount;

			$('a[name=editCampaign]').attr('href','http://amins-macbook-pro.local:5757/sabetmikonimv2/campaign/edit.php?cid='+getData.campaignsDetailData.cId);



			$('.listItem').remove();
			// display capture links
			var captureLinks = getData.campaignsDetailData.captureLinks;

			if (jQuery.isEmptyObject(captureLinks)) {

				$('#campaignCaptureLinks').append('<div class="listItem" style="direction:rtl"><div> لینکی برای صفحه دریافت اطلاعات ثبت نشده است! </div></div>');

			} else {

				for (var i = 0; i < captureLinks.length; i++) {

						$('#campaignCaptureLinks').append('<div class="listItem"> <a href="'+ captureLinks[i]['formLink'] +'" target="_blank" rel="nofollow"> '+ captureLinks[i]['formLink'] +' </a> </div>');

				}

			}



			// display display pages
			var displayPages = getData.campaignsDetailData.displayPages;

			if (jQuery.isEmptyObject(displayPages)) {

				$('#campaignDisplayLinks').append('<div class="listItem" style="direction:rtl"><div> لینک‌ صفحات نمایش نوتیفیکیشن ثبت نشده است! </div></div>');

			} else {

				for (var i = 0; i < displayPages.length; i++) {

						$('#campaignDisplayLinks').append('<div class="listItem"> <a href="'+ displayPages[i]['formLink'] +'" target="_blank" rel="nofollow"> '+ displayPages[i]['formLink'] +' </a> </div>');

				}

			}





			// display contacts
			var notifsList = getData.campaignsDetailData.contactsData;
			var contactLocation;

			if (notifsList.length === 0) {

				$('#campaignContactsBody').append('<div class="listItem"><div>تا به حال مخاطبی ثبت نشده است!</div></div>');

			} else {

				for (var i = 0; i < notifsList.length; i++) {

					contactLocation = notifsList[i]['location'];
					if (contactLocation === "") {
						contactLocation = "-";
					}

						$('#campaignContactsBody').append('<div class="listItem" id="contact-'+notifsList[i]['contactId']+'"><div class="col-md-1"> <input type="checkbox" onclick="multipleDelete()" name="deleteNotification" value='+notifsList[i]['contactId']+'> </div><div class="col-md-3"> '+notifsList[i]['name']+'</div><div class="col-md-3"> '+notifsList[i]['email']+'</div><div class="col-md-2"> '+contactLocation+'</div><div class="col-md-2"> '+notifsList[i]['offsetDate']+'</div><div class="col-md-1"> <a href="javascript:;" name="deleteAction" onclick="deleteNotif('+notifsList[i]['contactId']+')"><i class="fas fa-trash-alt"></i></a></div><div class="clear"></div></div>');

				}

			}





		}

  } else if (reqType === "deleteCampaign") {

		if (getData.status === "campaignDeleted") {

			$("tr."+getData.cId).remove();

		}

  } else if (reqType === "editCampaignStatus") {

		if (getData.status === "campaignEditted") {

			// deactive or active campaign

		}

  } else if (reqType === "deleteNotif") {

		if (getData.status === "notificationsDeleted") {

			var contactsIdList = getData.contactsId;

			for (var i = 0; i < contactsIdList.length; i++) {

				$('.listItem#contact-'+contactsIdList[i]).remove();
				$('a[name=submitMultipleDelete]').fadeOut();

			}


		}

  } else if (reqType === "checkPayment") {

		var packagePopularName = getData.packagePopularName;
		var profileName = getData.userName;

		if (getData.payStatus === "paymentCompleted") {

			swal({
								title: "تبریک!",
								text: profileName+ " عزیز، پکیج "+ packagePopularName + " برای شما فعال گردید!",
								icon: "success",
								button: " مرسی، بزن بریم ",
			});

		} else if (getData.payStatus === "paymentCanceled") {

			swal({
								title: "خطا!",
								text: profileName+" عزیز، از خرید پکیج "+ packagePopularName + " منصرف شدید!",
								icon: "warning",
								button: " انتخاب و خرید پکیج ",
			}).then((isConfirm) => {
				if (isConfirm) {

				 window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/pay.php";

				}
			});

		} else if (getData.payStatus === "paymentError") {

			swal({
								title: "خطا!",
								text: profileName+" عزیز، مشکلی در خرید پکیج "+ packagePopularName + " برایتان ایجاد شده است! ",
								icon: "error",
								button: " یکبار دیگر برای خرید تلاش نمایید ",
			}).then((isConfirm) => {
				if (isConfirm) {

				 window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/pay.php";

				}
			});

		}

  } else if (reqType === "getUserDomains") {

		if (getData.status === "userDomainsGot") {

      managePanelMenu('domain');

      var domainStatus;
			var userDomains = getData.userDomains;

			for (var i = 0; i < userDomains.length; i++) {

        if (userDomains[i]['intgVerify'] === 'True') {
  				domainStatus = ' <span> <span class="greenCircle"></span> متصل شد </span>';
          domainSystemStatus = "'True'";
  			} else if (userDomains[i]['intgVerify'] === 'False') {
  				domainStatus = '<span> <span class="grayCircle"></span> متصل نشده </span>';
          domainSystemStatus = "'False'";
  			}

        var domainDID = "'"+ userDomains[i]['dId'] +"'";

				$('#domainsDataBody').append('<tr style="position: relative" id="dId'+ userDomains[i]['dId'] +'"><td class="table-website-td center">'+ userDomains[i]['domainUrl'] +'<a href="javascript:;" name="modalLink" onclick="loginToDomain('+ domainDID +','+domainSystemStatus+')" class="more"> '+ userDomains[i]['domainUrl'] +' </a></td><td class="table-website-td center">'+ userDomains[i]['domainUrl'] +'<a href="javascript:;" name="modalLink" onclick="loginToDomain('+ domainDID +','+domainSystemStatus+')" class="more"> '+ userDomains[i]['domainUrl'] +' </a></td><td class="center campaignStatus"> '+ domainStatus +' <a href="javascript:;" name="modalLink" onclick="loginToDomain('+ domainDID +','+domainSystemStatus+')" class="more"> '+ domainStatus +' </a></td></tr>');

			}

		}

  } else if (reqType === "checkDomain") {

    if (getData.status === "linkVerified") {

      $('input[name=domain]').val(getData.formLink);

      addNewDomain();

    } else if (getData.status === "linkNotVerified") {

      $('#domainGroup').addClass('has-error'); // add the error class to show red input
      $('#domainGroup').append('<div class="help-block"> آدرس وارد شده شما در دسترس نیست. لطفا آدرس صحیح سایت را وارد نمایید. </div>'); // add the actual error message under our input

    }

  } else if (reqType === "setNewDomain") {

    if ((getData.status === "domainSet") || (getData.status === "domainWasSet")) {

      Cookies.set('dId', getData.dId, { expires: 7, path: '/sabetmikonimv2' });

      // setCookie('dId',getData.dId,360);

      createViewPanel({contentId : 'websiteIntg'},true);

    } else if (getData.status === "dpDomain") {

      $('#domainGroup').addClass('has-error'); // add the error class to show red input
      $('#domainGroup').append('<div class="help-block"> دامنه وارد شده توسط اکانت دیگری ثبت شده است! </div>'); // add the actual error message under our input

    }

  } else if (reqType === "checkIntegrations") {

    if (getData.status === "requestDone") {

      var sbmScript = "<!--SABETMIKONIM CONNECTION--><script src='http://amins-macbook-pro.local:5757/sabetmikonimv2/cdn/sabetmikonim_con.js?acc="+getData.sId+"'></script><!--END SABETMIKONIM CONNECTION-->";
      $('input[name=sabetMikonimIntg]').val(sbmScript);

      var intgVerify = getData.intgVerify;


      if (intgVerify === "True") {

        $('#intgNextStep').html(' مرحله بعد ');

        $('#connectionStatusBody').attr('data-connection','true');

        var intgVerifyOffset = getData.intgVerifyOffset;

        $('#connectionStatusBody').addClass('verified');
        $('#connectionStatusText').html(' تبریک! وبسایت شما با موفقیت متصل گردید.');

        $('#lastConnectText').removeClass('disn');
        $('#lastConnectText').append(' آخرین ارتباط با پنل: ' + intgVerifyOffset);

      } else {

        $('#intgNextStep').html(' رد شدن از این مرحله ');

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

         createView({contentId: 'campaignTypes'},true);

        }
      });

    }

  }

}



function loginToDomain(dId, domainStatus) {

  Cookies.set('dId',dId, { expires: 30, path: '/sabetmikonimv2' });

  if (domainStatus === "True") {

    createViewPanel({contentId : 'campaigns'},true)

  } else if (domainStatus === "False") {

    createViewPanel({contentId : 'websiteIntg'},true)

  }

}



function openCampaignModal(cId) {

	$('.loadingBar').addClass('active');

	var cid = cId;

	var sbmToken = getCookie('sbm_token');

	var eachCampaignDetailData = { 'cookie' : sbmToken, 'cId' : cid };

	ajaxReq(eachCampaignDetailData,'http://api.sabetmikonim.com:8004/panel/get-campaign/','eachCampaignDetail');

}



function deleteNotif(notifId) {

	$('.listItem#contact-'+notifId).css({"opacity" : "0.5"});

	var cid = $('#modalOptionBody').attr("data-cid");

	var sbmToken = getCookie('sbm_token');

	var notifArray = [notifId];

	var deleteNotifData = { 'cookie' : sbmToken, 'cId' : cid, 'contactsId' : notifArray };

	ajaxReq(deleteNotifData,'http://api.sabetmikonim.com:8004/panel/delete-notifications/','deleteNotif');

}


function multipleDelete() {

	var notifSelect = [];
	$("input[name=deleteNotification]:checked").each(function(){
			notifSelect.push($(this).val());
	});

	if (notifSelect.length > 0) {

		$('a[name=submitMultipleDelete]').fadeIn();

	} else {

		$('a[name=submitMultipleDelete]').fadeOut();

	}

}


function submitMultipleDelete() {

	var cid = $('#modalOptionBody').attr("data-cid");

	var sbmToken = getCookie('sbm_token');

	var notifSelect = [];
	$("input[name=deleteNotification]:checked").each(function(){
			notifSelect.push($(this).val());
	});

	if (notifSelect.length > 0) {

		var deleteNotifData = { 'cookie' : sbmToken, 'cId' : cid, 'contactsId' : notifSelect };

		ajaxReq(deleteNotifData,'http://api.sabetmikonim.com:8004/panel/delete-notifications/','deleteNotif');

	} else {

		$('a[name=submitMultipleDelete]').fadeOut();

	}

}





$(document).ready(function() {


	var refreshPageStatus = false;

	// check payment verify
	var currentUrl = window.location.href;

	var url = new URL(currentUrl);
	var bpId = url.searchParams.get("bp-id");
	var page = url.searchParams.get("page");


  if (page!==null) {
    createViewPanel({contentId: page}, true);
  } else {
    createViewPanel({contentId: 'campaigns'}, true);
  }



	if (bpId!==null) {

		var sbmToken = getCookie('sbm_token');
		var paymentData = { 'cookie' : sbmToken, 'bpId' : bpId };

	  ajaxReq(paymentData,'http://api.sabetmikonim.com:8004/panel/order-complete/','checkPayment');

	}



	$('input[name=campaignStatusSwitch]').click(function() {

		var cid = $("#modalOptionBody").attr('data-cid');
		var sbmToken = getCookie('sbm_token');
		var cidStatus;

    if($(this).prop('checked') == true) {
      cidStatus = 'active';
      $('#cidStatus'+cid+' span').text('فعال');
      $('#cidStatus'+cid+' .grayCircle').addClass('greenCircle');
      $('#cidStatus'+cid+' .greenCircle').removeClass('grayCircle');
    } else {
      cidStatus = 'deActive';
      $('#cidStatus'+cid+' span').text('غیرفعال');
      $('#cidStatus'+cid+' .greenCircle').addClass('grayCircle');
      $('#cidStatus'+cid+' .grayCircle').removeClass('greenCircle');
    }


		var campaignStatusData = { 'cookie' : sbmToken, 'cId' : cid, 'status' : cidStatus };

	  ajaxReq(campaignStatusData,'http://api.sabetmikonim.com:8004/panel/edit-campaign/','editCampaignStatus');


  });







$("a[name=deleteCampaign]").click(function(event) {

	event.preventDefault();

	var cid = $("#modalOptionBody").attr('data-cid');
	var sbmToken = getCookie('sbm_token');

	var deleteCampaignData = { 'cookie' : sbmToken, 'cId' : cid };

	$("tr."+cid).css({'opacity' : '0.5'});

	$("#modalOptionBody").removeClass('openModal');
	$('.mask').fadeOut();

	swal(" از حذف کمپین مطمئن هستید؟ ", {
  dangerMode: true,
  buttons: [false,'حذف',],
	})
	.then((isConfirm) => {
		if (isConfirm) {

	 	 	ajaxReq(deleteCampaignData,'http://api.sabetmikonim.com:8004/panel/delete-campaign/','deleteCampaign');

		}
	});


});













});
