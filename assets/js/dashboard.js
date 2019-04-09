// functions
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
          'domains' : {'title' : 'لیست دامنه‌ها', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/domains.html', 'crumb' : '1'},
          'campaigns' : {'title' : 'لیست کمپین‌ها', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaigns.html', 'crumb' : '2'},
        };

          var sbmToken = getCookie('sbm_token');

            if (checkCookie('sbm_token')==="cookieSet") {

              $('#pageBodyContent').load(pageBoxes[stateObject.contentId]['tmp'],function(e) {

                var currentPage = stateObject.contentId;


                switch (stateObject.contentId) {


									case 'domains':

										var sbmToken = getCookie('sbm_token');
										var getDomainsData = { 'cookie' : sbmToken, 'operation' : 'getUserDomains' };

									  ajaxReq(getDomainsData,'http://api.sabetmikonim.com:8004/panel/get-user-information/','getUserDomains');

										break;



									case 'campaigns':

									if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

										var sbmToken = getCookie('sbm_token');
										var getCampaignsData = { 'cookie' : sbmToken };

									  ajaxReq(getCampaignsData,'http://api.sabetmikonim.com:8004/panel/get-campaigns/','getCampaigns');


									} else {

										createView({contentId : 'domains'},true);

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
		'domains' : {'title' : 'لیست دامنه‌ها', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/domains.html', 'crumb' : '1'},
		'campaigns' : {'title' : 'لیست کمپین‌ها', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaigns.html', 'crumb' : '2'},
	};

    console.log(stateObject);

    History.pushState(stateObject,pageBoxes[stateObject.contentId]['title'],'http://amins-macbook-pro.local:5757/sabetmikonimv2/dashboard.php/?page='+stateObject.contentId);

    History.log();



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

			$('#campaignsDataBody').prepend('<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 campaignGrid"><div class="campaignCard"><div class="campaignMenu"><a href="javascript:;"> <i class="fas fa-ellipsis-h"></i> </a><ul class="uiList subMenu"><li> <a href="javascript:;"> ویرایش </a></li><li> <a href="javascript:;"> کپی </a></li><li> <a href="javascript:;"> حذف </a></li></ul></div><div class="campaignTitle"><div class="campaignSubTypePic"><img src="'+ campaignsData[i]['campaignDetails']['campaignSubTypeTemplate']['connectionSettings']['metas']['image'] +'" alt="'+ campaignsData[i]['name'] +'"></div><div class="campaignTitleContent"><div class="campaignTool"><span> کمپین '+ campaignsData[i]['campaignDetails']['campaignSubTypeTitle'] +' | دسته: <span> فرم‌ها </span> </span></div><h4> '+ campaignsData[i]['name'] +' </h4></div></div><div class="campaignContent"><div class="campaignCat pullRight"> <span> آخرین ویرایش: '+ campaignsData[i]['modifyDate'] +' </span></div>'+ campaignStatus +'<div class="clear"></div></div><a href="javascript:;" data-cid="'+ campaignsData[i]['cId'] +'" name="modalLink" onclick="openCampaignModal('+ cId +')" class="more">'+ campaignsData[i]['name'] +' </a></div></div>');

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

			var userDomains = getData.userDomains;

			for (var i = 0; i < userDomains.length; i++) {

				$('#domainsDataBody').append('<tr style="position: relative" id="dId'+ userDomains[i]['dId'] +'"><td class="table-website-td center">'+ userDomains[i]['domainUrl'] +'<a href="#'+ userDomains[i]['dId'] +'" name="modalLink" class="more"> '+ userDomains[i]['domainUrl'] +' </a></td><td class="table-website-td center">'+ userDomains[i]['domainUrl'] +'<a href="#'+ userDomains[i]['dId'] +'" name="modalLink" class="more"> '+ userDomains[i]['domainUrl'] +' </a></td><td class="center campaignStatus"> '+ userDomains[i]['intgVerify'] +' <a href="#'+ userDomains[i]['dId'] +'" name="modalLink" class="more"> '+ userDomains[i]['intgVerify'] +' </a></td></tr>');

			}

		}

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
    createView({contentId: page}, true);
  } else {
    createView({contentId: 'campaigns'}, true);
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
