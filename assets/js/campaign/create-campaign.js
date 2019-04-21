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
          'campaignTypes' : {'title' : 'نوع کمپین‌تان را در ثابت میکنیم انتخاب نمایید.', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/cType.html', 'crumb' : 3},
          'subType' : {'title' : 'نحوه اتصال سرویس ثابت میکنیم را انتخاب نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/cType.html', 'crumb' : 4},
          'toolDesc' : {'title' : 'درباره ابزار انتخاب شده برای اتصال به سرویس ثابت میکنیم', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/tool-description.html', 'crumb' : 5},
          'toolConnectionSettings' : {'title' : 'تنظیمات ابزار اتصال به سرویس ثابت میکنیم', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/tool-connection-settings.html', 'crumb' : 6},
          'toolCustomForm' : {'title' : 'لینک صفحه حاوی فرم برای دریافت اطلاعات را وارد نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/tool-capture-form.html', 'crumb' : 6},
          'toolSettings' : {'title' : 'نوع نوتیفیکیشن‌ها و تنظیمات مرتبط با آن‌ها را انجام دهید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/tool-settings.html', 'crumb' : 7},
          'toolDisplayPages' : {'title' : 'لینک صفحاتی که می‌خواهید نوتیفیکیشن‌ها را در آن‌ها نمایش دهید را وارد نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/tool-display-pages.html', 'crumb' : 8},
          'campaignName' : {'title' : 'نامی برای کمپین‌تان انتخاب نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/campaign-name.html', 'crumb' : 9},
        };

          var sbmToken = getCookie('sbm_token');

            if (checkCookie('sbm_token')==="cookieSet") {

              $('#registerContent').load(pageBoxes[stateObject.contentId]['tmp'],function(e) {

                var currentPage = stateObject.contentId;

                // add crumb
                // $('.crumbLink').removeClass('active');
                if (pageBoxes[stateObject.contentId]['crumb'] === 3) {

                  $('.secondLink').fadeIn('fast');

                  // setTimeout(function() {
                  //   $('#secondCrumbs').fadeIn();
                  // },300);

                } else if (pageBoxes[stateObject.contentId]['crumb'] === 2) {

                  $('.secondLink').fadeOut('fast');

                  // setTimeout(function() {
                  //   $('#crumbs').fadeIn();
                  // },300);

                } else {

                  if ((fadeStatus===false) && ((pageBoxes[stateObject.contentId]['crumb'] >= 3))) {

                    fadeStatus = true;

                    $('.secondLink').fadeIn('fast');

                    // setTimeout(function() {
                    //   $('#secondCrumbs').fadeIn();
                    // },300);

                  } else if ((fadeStatus===false) && (pageBoxes[stateObject.contentId]['crumb'] <= 2)) {

                    fadeStatus = true;

                    $('.secondLink').fadeOut('fast');

                    // setTimeout(function() {
                    //   $('#crumbs').fadeIn();
                    // },300);

                  }

                }


                $('.crumbLink').removeClass('active');
                $('#'+pageBoxes[stateObject.contentId]['crumb']).addClass('active');


                switch (stateObject.contentId) {

                      case 'campaignTypes':

                      if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

                        var getMainCampaignData = { 'cookie' : sbmToken, 'mode' : 'main', 'dId' : getCookie('dId'), 'cId' : getCookie('cId') };

                        ajaxReq(getMainCampaignData,'http://api.sabetmikonim.com:8004/panel/get-campaign-types/','getMainCampaignTypes');


                      } else {

                        createView({contentId : 'add-domain'},true);

                      }

                        break;


                        case 'subType':

                        document.getElementById('campaignStepTitle').innerHTML = ' یکی از ابزارهای زیر را انتخاب نمایید ';

                        $('.campaignTypeItem').remove();

                        if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

                          var getSubCampaignData = { 'cookie' : sbmToken, 'mode' : 'sub', 'dId' : getCookie('dId'), 'cId' : getCookie('cId') };

                          ajaxReq(getSubCampaignData,'http://api.sabetmikonim.com:8004/panel/get-campaign-types/','getSubCampaignTypes');


                        } else {

                          createView({contentId : 'add-domain'},true);

                        }

                          break;



                          case 'toolDesc':

                          $('.campaignTypeItem').remove();

                          if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

                            var getToolDescData = { 'cookie' : sbmToken, 'dId' : getCookie('dId'), 'cId' : getCookie('cId') };

                            ajaxReq(getToolDescData,'http://api.sabetmikonim.com:8004/panel/get-subtype-template/','getToolDescription');


                          } else {

                            createView({contentId : 'add-domain'},true);

                          }

                            break;




                          case 'toolConnectionSettings':

                          $('.campaignTypeItem').remove();

                          if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

                            var gettoolConnectionSettingsData = { 'cookie' : sbmToken, 'dId' : getCookie('dId'), 'cId' : getCookie('cId') };

                            ajaxReq(gettoolConnectionSettingsData,'http://api.sabetmikonim.com:8004/panel/get-subtype-template/','gettoolConnectionSettings');


                          } else {

                            createView({contentId : 'add-domain'},true);

                          }

                            break;




                            case 'toolCustomForm':

                            if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {
                              var getConnectionSettingsData = { 'cookie' : sbmToken, 'dId' : getCookie('dId'), 'cId' : getCookie('cId'), 'pageProgressKey' : 'connectionSettings' };

                              ajaxReq(getConnectionSettingsData,'http://api.sabetmikonim.com:8004/panel/get-progress/','getConnectionSettings');

                            } else {

                              createView({contentId : 'add-domain'},true);

                            }

                              break;




                              case 'toolSettings':

                              if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

                                var getNotificationTypesData = { 'cookie' : sbmToken, 'dId' : getCookie('dId'), 'cId' : getCookie('cId') };

                                ajaxReq(getNotificationTypesData,'http://api.sabetmikonim.com:8004/panel/get-subtype-template/','getNotificationTypes');


                              } else {

                                createView({contentId : 'add-domain'},true);

                              }

                                break;






                              case 'toolDisplayPages':

                              if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

                                var getCampaignSettingsData = { 'cookie' : sbmToken, 'dId' : getCookie('dId'), 'cId' : getCookie('cId') };

                                ajaxReq(getCampaignSettingsData,'http://api.sabetmikonim.com:8004/panel/get-campaign-settings/','getCampaignSettings');


                              } else {

                                createView({contentId : 'add-domain'},true);

                              }

                                break;






                                case 'campaignName':

                                $('#helpBoxBody').append('<div class="helpBox"><span class="icon"> <i class="fas fa-info-circle"></i> </span><div class="content" id="helpBoxContent"><p> برای مدیریت بهتر کمپین‌هایتان نامی انتخاب نمایید. </br> این نام فقط برای شما است و به شما نمایش داده خواهد شد. </p></div></div>');

                                if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

                                  var getCampaignInfoData = { 'cookie' : sbmToken, 'dId' : getCookie('dId'), 'cId' : getCookie('cId'), 'operation' : 'getCampaignName' };

                                  ajaxReq(getCampaignInfoData,'http://api.sabetmikonim.com:8004/panel/get-campaign-information/','getCampaignInfo');


                                } else {

                                  createView({contentId : 'add-domain'},true);

                                }

                                  break;
                  default:

                }


            });

          } else {
            window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/index.php/";
          }






    }
    historyBool = true;
});


var pageRepeat = 1;
function createView(stateObject, pushHistory) {


  var pageBoxes = {
    'campaignTypes' : {'title' : 'نوع کمپین‌تان را در ثابت میکنیم انتخاب نمایید.', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/cType.html', 'crumb' : 3},
    'subType' : {'title' : 'نحوه اتصال سرویس ثابت میکنیم را انتخاب نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/cType.html', 'crumb' : 4},
    'toolDesc' : {'title' : 'درباره ابزار انتخاب شده برای اتصال به سرویس ثابت میکنیم', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/tool-description.html', 'crumb' : 5},
    'toolConnectionSettings' : {'title' : 'تنظیمات ابزار اتصال به سرویس ثابت میکنیم', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/tool-connection-settings.html', 'crumb' : 6},
    'toolCustomForm' : {'title' : 'لینک صفحه حاوی فرم برای دریافت اطلاعات را وارد نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/tool-capture-form.html', 'crumb' : 6},
    'toolSettings' : {'title' : 'نوع نوتیفیکیشن‌ها و تنظیمات مرتبط با آن‌ها را انجام دهید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/tool-settings.html', 'crumb' : 7},
    'toolDisplayPages' : {'title' : 'لینک صفحاتی که می‌خواهید نوتیفیکیشن‌ها را در آن‌ها نمایش دهید را وارد نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/tool-display-pages.html', 'crumb' : 8},
    'campaignName' : {'title' : 'نامی برای کمپین‌تان انتخاب نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/campaign-name.html', 'crumb' : 9},
  };

    console.log(stateObject);


    var State = History.getState();
    var lastStateData = State.data;

    console.log(lastStateData);

    // alert(lastStateData.contentId);
    // alert(lastStateData.pageRepeat);

    var campaignMode = getCookie('remember_edit');
    var campaignUrl;
    if (campaignMode === "true") {
      campaignUrl = 'http://amins-macbook-pro.local:5757/sabetmikonimv2/campaign/campaign.php/?page='+stateObject.contentId+'&mode=editCampaign';
    } else {
      campaignUrl = 'http://amins-macbook-pro.local:5757/sabetmikonimv2/campaign/campaign.php/?page='+stateObject.contentId;
    }

    if (lastStateData.contentId === stateObject.contentId) {

      // pageRepeat = pageRepeat + 1;
      if (lastStateData.pageRepeat === pageRepeat) {
        pageRepeat = pageRepeat + 1;
      }

      History.replaceState({contentId: stateObject.contentId, pageRepeat: pageRepeat },pageBoxes[stateObject.contentId]['title'],campaignUrl);

    } else {

      History.pushState(stateObject,pageBoxes[stateObject.contentId]['title'],campaignUrl);

    }

    History.log();



}




function checkSwitchData(inputName,parentTag,checkStatus) {

	if (checkStatus === "true") {

		$('input[name='+inputName+']').prop('checked', true);
		$('input[name='+inputName+']').data('switch', true);

		$('#'+parentTag+' .simple-switch-outter').removeClass('unChecked');
		$('#'+parentTag+' .simple-switch-outter').addClass('checked');

	} else if (checkStatus === "false") {

		$('input[name='+inputName+']').prop('checked', false);
		$('input[name='+inputName+']').data('switch', false);

		$('#'+parentTag+' .simple-switch-outter').addClass('unChecked');
		$('#'+parentTag+' .simple-switch-outter').removeClass('checked');

	}

}




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

  if (reqType === "checkDomain") {

    if (getData.status === "linkVerified") {

      document.getElementById('helpBoxContent').innerHTML = '<p> همه چیز عالیه! بزن بریم! </p>';
      $('input[name=dCheck]').val('true');

      $('input[name=domain]').val(getData.formLink);

      addNewDomain();

    } else if (getData.status === "linkNotVerified") {

      document.getElementById('helpBoxContent').innerHTML = '<p> سایت وارد شده نامعتبر است. </br> لطفا آدرس صحیح را وارد بفرمایید!  </p>';
      $('.helpBox').addClass('helpError');
      $('input[name=dCheck]').val('false');

    } else {

      document.getElementById('helpBoxContent').innerHTML = '<p>   حالا باید اولین سایت‌تان را ثبت نمایید! </br> ضمنا شما می‌توانید بی‌نهایت وبسایت جدید بدون پرداخت هرگونه هزینه‌ای درج نمایید. </p>';
      $('input[name=dCheck]').val('false');

    }

  } else if (reqType === "setNewDomain") {

    if ((getData.status === "domainSet") || (getData.status === "domainWasSet")) {

      // setCookie('dId',getData.dId,360);

      Cookies.set('dId',getData.dId, { expires: 1, path: '/sabetmikonimv2' });

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

  } else if (reqType === "getEnteredDomain") {

    if (getData.status === "progressGot") {
      $('input[name=domain]').val(getData.domainPageProgress);

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

         createView({contentId: 'campaignTypes'},true);

        }
      });

    }

  } else if (reqType === "getMainCampaignTypes") {

    if (getData.status === "campaignTypesGot") {

      var campaignTypes = getData.campaignTypes;

      for (var i = 0; i < campaignTypes.length; i++) {

        $('#campaignTypesBody').append('<div class="col-xs-12 col-md-4 campaignTypeItem"><input type="radio" name="campaignMainType" onclick="submitMainType(this.value)" id="campaignMainType'+ campaignTypes[i]['id'] +'" value="'+ campaignTypes[i]['id'] +'"><label for="campaignMainType'+ campaignTypes[i]['id'] +'" class="card"><div class="notifType"><div class="notifCardBody"><div class="selectTick"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-tick-1{fill:#00e640}.cls-2{fill:#fff}</style></defs><title>if_success_1646004</title><circle class="cls-tick-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/></svg></div><img src="'+ campaignTypes[i]['image'] +'" alt="'+ campaignTypes[i]['title'] +'"><h4> '+ campaignTypes[i]['title'] +'</h4><p> '+ campaignTypes[i]['description'] +'</p></div></div></label></div>');

      }

      if (getData.campaignTypeProgress !== "NOT") {

        $('#campaignMainType'+getData.campaignTypeProgress).prop('checked', true);

      }

    }

  } else if (reqType === "selectedMainCampaignType") {

    if (getData.status === "campaignTypeSubmitted") {

      createView({contentId: 'subType'},true);

      // setCookie('cId',getData.cId,1);

      Cookies.set('cId',getData.cId, { expires: 1, path: '/sabetmikonimv2' });

    }

  } else if (reqType === "getSubCampaignTypes") {

    if (getData.status === "campaignSubTypesGot") {

      var campaignSubTypes = getData.campaignSubTypes;

      for (var i = 0; i < campaignSubTypes.length; i++) {

        $('#campaignTypesBody').append('<div class="col-xs-12 col-md-4 campaignTypeItem"><input type="radio" name="campaignSubType" onclick="submitSubType(this.value)" id="campaignSubType'+ campaignSubTypes[i]['id'] +'" value="'+ campaignSubTypes[i]['id'] +'"><label for="campaignSubType'+ campaignSubTypes[i]['id'] +'" class="card"><div class="notifType"><div class="notifCardBody"><div class="selectTick"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-tick-1{fill:#00e640}.cls-2{fill:#fff}</style></defs><title>if_success_1646004</title><circle class="cls-tick-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/></svg></div><img src="'+ campaignSubTypes[i]['image'] +'" alt="'+ campaignSubTypes[i]['title'] +'"><h4> '+ campaignSubTypes[i]['title'] +'</h4><p> '+ campaignSubTypes[i]['description'] +'</p></div></div></label></div>');

      }

      if (getData.campaignSubTypeProgress !== "NOT") {

        $('#campaignSubType'+getData.campaignSubTypeProgress).prop('checked', true);

      }


    }

  } else if (reqType === "selectedSubCampaignType") {

    if (getData.status === "campaignSubTypeSubmitted") {

      createView({contentId: 'toolDesc'},true);

    }

  } else if (reqType === "getToolDescription") {

    if (getData.status === "campaignSubTypeTemplateGot") {

      var toolTemplate = getData.campaignSubTypeInformation.template;

      var toolTitle = toolTemplate.connectionSettings.metas.title;
      var toolConBtn = toolTemplate.connectionSettings.metas.button;
      var toolLogo = toolTemplate.connectionSettings.metas.image;
      var toolDesc = toolTemplate.connectionSettings.metas.description;
      var toolNote = toolTemplate.connectionSettings.metas.note;
      var toolFeatures = toolTemplate.connectionSettings.metas.features;
      var toolDeveloperUrl = toolTemplate.connectionSettings.metas.developerUrl;
      var toolDoc = toolTemplate.connectionSettings.metas.docUrl;
      var toolCat = toolTemplate.connectionSettings.metas.category;


      if (getData.campaignSubTypeProgress === "2") {

        $('#toolTitleBtn').attr('onclick','createView({contentId: "toolCustomForm"},true)');

      }

      document.getElementById('toolDescriptionTitle').innerHTML = toolTitle;
      document.getElementById('toolTitleBtn').innerHTML = toolConBtn;
      $('.toolBtnConnectionTitle').text(toolTitle);
      document.getElementById('toolDesc').innerHTML = toolDesc;
      document.getElementById('toolCategory').innerHTML = '<li>'+ toolCat +'</li>';

      $('#toolDoc').attr('href',toolDoc);

      if (toolDeveloperUrl === "#") {
        $('#toolDeveloperWebsite').remove();
      } else {

        $('#toolDeveloperWebsite').attr('href',toolDeveloperUrl);

      }


      for (var i = 0; i < toolFeatures.length; i++) {

        $('#toolFeatures').append('<li> <span class="icon"> <i class="fas fa-check"></i> </span> '+ toolFeatures[i]['title'] +' </li>');

      }


      $('#toolLogo').attr('src',toolLogo);

    }

  } else if (reqType === "gettoolConnectionSettings") {

    if (getData.status === "campaignSubTypeTemplateGot") {

      var toolTemplate = getData.campaignSubTypeInformation.template;
      var toolLogo = toolTemplate.connectionSettings.metas.image;

      $('#toolLogo').attr('src',toolLogo);

      $('#toolTitle').html(toolTemplate.connectionSettings.metas.title);

      createConnectionForm(toolTemplate.connectionSettings.fields);

    }

  } else if (reqType === "submitCaptureDatas") {

    if (getData.status === "connectionSettingsSubmitted") {

      createView({contentId: 'toolSettings'}, true);

    }

  } else if (reqType === "getConnectionSettings") {

    if (getData.status ==="progressGot") {

      if (getData.pageProgress!== "NOT") {

        $('input[name=siteInput1]').val(getData.pageProgress.customForm.formLink);
        $('input[name=emailField1]').val(getData.pageProgress.customForm.emailField);
        $('input[name=nameField1]').val(getData.pageProgress.customForm.nameField);
        test(1,1,1);
        $('#submitCaptureFieldData').prop('disabled',false);

      }


    }

  } else if (reqType === "getNotificationTypes") {

    if (getData.status === "campaignSubTypeTemplateGot") {

      // var notifTypesStyle = {
      //   "recentActivity": {
      //     "title": "فعالیت‌های اخیر",
      //     "desc": "نمایش افرادی که از خدمات شما در سایت استفاده کرده‌اند.",
      //     "icon": "http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/img/campaignType/raIcon.jpg"
      //   },
      //   "hotStreaks": {
      //     "title": "آمار داغ",
      //     "desc": "نمایش افرادی که در یک مدت زمان خاص از خدمات شما استفاده کرده‌اند.",
      //     "icon": "http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/img/campaignType/hot-streak-sabetmikonim.jpg"
      //   },
      //   "liveNotif": {
      //     "title": "آمار لحظه‌ای",
      //     "desc": "نمایش لحظه‌ای کاربرانی که صفحه‌ای را مشاهده می‌کنند.",
      //     "icon": "http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/img/campaignType/live-option-sabetmikonim.svg"
      //   },
      //   "conversionBox": {
      //     "title": "کارت‌های تبدیل",
      //     "desc": "تبدیل نرخ بیشتر کاربران به خریدار با نوتیفیکیشن‌های قابل کلیک",
      //     "icon": "http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/img/campaignType/conversion-box-sabetmikonim.svg"
      //   }
      // }


      // check campaignNotifTypes and display them
      window.notifFormTemplate = getData.NotificationTemplates;

      var notificationTemplates = getData.NotificationTemplates;
      var notificationTypeId;
      var notificationTypeModal;
      for (var i = 0; i < notificationTemplates.length; i++) {

        notificationTypeId = notificationTemplates[i]['notificationTypeId'];
        notificationTemplateId = notificationTemplates[i]['notificationTemplateId'];
        var notificationTemplateIdFunc = "'"+ notificationTemplateId +"'"

        var notificationSelectTemp = notificationTemplates[i]['templateData']['formTemplate']['selectTemp'];

        $('#notifTypesBody').append('<div class="col-xs-12 col-md-4"><input type="checkbox" id="'+notificationTemplateId+'" name="notifTypeOption" value="'+ notificationTemplateId +'"><label for="'+notificationTemplateId+'" class="card" id="label'+notificationTemplateId+'"><div class="notifType"><div class="notifCardBody"><div class="selectTick"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-tick-1{fill:#00e640}.cls-2{fill:#fff}</style></defs><title>if_success_1646004</title><circle class="cls-tick-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/></svg></div><img src="'+ notificationSelectTemp['icon'] +'" alt=" '+ notificationSelectTemp['title'] +' "><h4> '+ notificationSelectTemp['title'] +'</h4><p> '+ notificationSelectTemp['desc'] +'</p></div><footer class="setting"><a href="javascript:;" onclick="openFeaturesModal('+ notificationTemplateIdFunc +')" name="modalLink" class="btn btn-wd"> تنظیمات </a></footer></div></label></div>');



        // if tool settings was set
        var toolSettingsProgress = getData.toolSettingsProgress;
        if (toolSettingsProgress !== "NOT") {

          if (typeof toolSettingsProgress[notificationTemplateId] !== "undefined") {

            $('#'+notificationTemplateId).prop('checked',true);

          }

          featureData = toolSettingsProgress;
          console.log(featureData);

        }




        // if (notificationTypeId === "recentActivity") {
        //
        //   notificationTypeModal = "'raModal'";
        //
        //   $('#notifTypesBody').append('<div class="col-xs-12 col-md-4"><input type="checkbox" data-ntempid="'+notificationTemplateId+'" name="notifTypeOption" value="'+ notificationTypeId +'"><label for="raOption" class="card" id="raOptionLabel"><div class="notifType"><div class="notifCardBody"><div class="selectTick"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-tick-1{fill:#00e640}.cls-2{fill:#fff}</style></defs><title>if_success_1646004</title><circle class="cls-tick-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/></svg></div><img src="'+ notifTypesStyle[notificationTypeId]['icon'] +'" alt=" '+ notifTypesStyle[notificationTypeId]['title'] +' "><h4> '+ notifTypesStyle[notificationTypeId]['title'] +'</h4><p> '+ notifTypesStyle[notificationTypeId]['desc'] +'</p></div><footer class="setting"><a href="javascript:;" onclick="openFeaturesModal('+ notificationTypeModal +')" name="modalLink" class="btn btn-wd"> تنظیمات </a></footer></div></label></div>');
        //
        //
        //   // add notif style to modal
        //   $('#raModal .sabetmikonimNotifBody').append(notificationTemplates[i]['templateData']['template']);
        //
        //   var notifText = $("#notifDesc").text();
        //   $('input[name=raMessage]').val(notifText);
        //
        //
        // } else if (notificationTypeId === "hotStreaks") {
        //
        //   notificationTypeModal = "'hsModal'";
        //
        //   $('#notifTypesBody').append('<div class="col-xs-12 col-md-4"><input type="checkbox" data-ntempid="'+notificationTemplateId+'" name="notifTypeOption" id="hsOption" value="'+ notificationTypeId +'"><label for="hsOption" class="card" id="hsOptionLabel"><div class="notifType"><div class="notifCardBody"><div class="selectTick"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-tick-1{fill:#00e640}.cls-2{fill:#fff}</style></defs><title>if_success_1646004</title><circle class="cls-tick-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/></svg></div><img src="'+ notifTypesStyle[notificationTypeId]['icon'] +'" alt=" '+ notifTypesStyle[notificationTypeId]['title'] +'غ "><h4> '+ notifTypesStyle[notificationTypeId]['title'] +'</h4><p> '+ notifTypesStyle[notificationTypeId]['desc'] +'</p></div><footer class="setting"><a href="javascript:;" name="modalLink" onclick="openFeaturesModal('+ notificationTypeModal +')" class="btn btn-wd"> تنظیمات </a></footer></div></label></div>');
        //
        //   // add notif style to modal
        //   $('#hsModal .sabetmikonimNotifBody').append(notificationTemplates[i]['templateData']['template']);
        //
        // } else if (notificationTypeId === "liveNotif") {
        //
        //   notificationTypeModal = "'lvModal'";
        //
        //   $('#notifTypesBody').append('<div class="col-xs-12 col-md-4"><input type="checkbox" data-ntempid="'+notificationTemplateId+'" name="notifTypeOption" id="lvOption" value="'+ notificationTypeId +'"><label for="lvOption" class="card" id="lvOptionLabel"><div class="notifType"><div class="notifCardBody"><div class="selectTick"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-tick-1{fill:#00e640}.cls-2{fill:#fff}</style></defs><title>if_success_1646004</title><circle class="cls-tick-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/></svg></div><img src="'+ notifTypesStyle[notificationTypeId]['icon'] +'" alt="'+ notifTypesStyle[notificationTypeId]['title'] +'"><h4> '+ notifTypesStyle[notificationTypeId]['title'] +'</h4><p> '+ notifTypesStyle[notificationTypeId]['desc'] +'</p></div><footer class="setting"><a href="javascript:;" onclick="openFeaturesModal('+ notificationTypeModal +')" name="modalLink" class="btn btn-wd"> تنظیمات </a></footer></div></label></div>');
        //
        // } else if (notificationTypeId === "conversionBox") {
        //
        //   notificationTypeModal = "'cbModal'";
        //
        //   $('#notifTypesBody').append('<div class="col-xs-12 col-md-4"><input type="checkbox" data-ntempid="'+notificationTemplateId+'" name="notifTypeOption" id="cbOption" value="'+ notificationTypeId +'"><label for="cbOption" class="card"><div class="notifType"><div class="notifCardBody"><div class="selectTick"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-tick-1{fill:#00e640}.cls-2{fill:#fff}</style></defs><title>if_success_1646004</title><circle class="cls-tick-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/></svg></div><img src="'+ notifTypesStyle[notificationTypeId]['icon'] +'" alt=" '+ notifTypesStyle[notificationTypeId]['title'] +' "><h4> '+ notifTypesStyle[notificationTypeId]['title'] +'</h4><p> '+ notifTypesStyle[notificationTypeId]['desc'] +'</p></div><footer class="setting"><a href="javascript:;" onclick="openFeaturesModal('+ notificationTypeModal +')" name="modalLink" class="btn btn-wd"> تنظیمات </a></footer></div></label></div>');
        //
        // }

      }







      var toolTemplate = getData.campaignSubTypeInformation.template;

      var toolTitle = toolTemplate.connectionSettings.metas.title;
      var toolLogo = toolTemplate.connectionSettings.metas.image;

      document.getElementById('toolTitle').innerHTML = toolTitle;
      $('.toolBtnConnectionTitle').text(toolTitle);

      $('#toolLogo').attr('src',toolLogo);













        // if (toolSettingsProgress.recentActivity.status === "true") {
        //
        //   $('#raOption').prop('checked',true);
        //
        //
        //
        // }
        //
        // if (toolSettingsProgress.hotStreaks.status === "true") {
        //
        //   $('#hsOption').prop('checked',true);
        //
        // }
        //
        // if (toolSettingsProgress.liveNotif.status === "true") {
        //
        //   $('#lvOption').prop('checked',true);
        //
        // }
        //
        // if (toolSettingsProgress.conversionBox.status === "true") {
        //
        //   $('#cbOption').prop('checked',true);
        //
        // }



    }

  } else if (reqType === "submitToolSettings") {

    if (getData.status === "toolSettingsSubmitted") {

      createView({contentId: 'toolDisplayPages'}, true);

    }

  } else if (reqType === "submitCampaignSettings") {

    if (getData.status === "campaignSettingsSubmitted") {

      createView({contentId: 'campaignName'},true);

    }

  } else if (reqType === "getCampaignSettings") {

    if (getData.status === "campaignSettingsGot") {

      var displayPages = getData.progressPage.displayPages;

      var j = 1;
      for (var i = 0; i < displayPages.length; i++) {

        var condition = displayPages[i]['condition'];
        var displayLink = displayPages[i]['formLink'];

        var addedInput = j;

        $("#displayPagesAdded").append('<div class="notInput" id="addedInput'+addedInput+'"> <input type="hidden" disabled id="conditionInput'+ addedInput +'" value="'+ condition +'"> <input type="text" id="addedDisplayLink'+ addedInput +'" disabled value="'+ displayLink +'"> <a class="removeDisplayLink" onclick="removeLink('+ addedInput +',2)"> <i class="fas fa-times-circle"></i> </a> </div>')

        j = j + 1;
      }

      $('#displayPagesAdded').attr("data-displaylinkscount",getData.progressPage.displayPages.length + 1);



      var campaignSettings = getData.progressPage.finalSettings;

      checkSwitchData('mobileDisplay','mobileDisplayOption',campaignSettings['mobileDisplay']);
			checkSwitchData('topOfMobileDisplay','topOfMobileDisplayOption',campaignSettings['topOfMobileDisplay']);
			checkSwitchData('notifPosition','notifPositionOption',campaignSettings['notifPosition']);


      $('input[name=deskNotifTime]').val(campaignSettings['desktopNotifTime']);
      $('input[name=mobileNotifTime]').val(campaignSettings['mobileNotifTime']);
      $('input[name=deskBetweenNotifTime]').val(campaignSettings['deskBetweenNotifTime']);
      $('input[name=notifLink1]').val(campaignSettings['finalNotifLink']);

    }

  } else if (reqType === "getCampaignInfo") {

    if (getData.status === "campaignNameGot") {

      document.getElementById('campaignType').innerHTML = getData.campaignSubTypeTitle;

      if (getData.progressPage !== "NOT") {

        $('input[name=campaignName]').val(getData.progressPage);

      }

    }

  } else if (reqType === "submitCampaignName") {

    if (getData.status === "campaignNameSubmitted") {

      Cookies.remove('cId', {path: '/sabetmikonimv2'});

      swal({
        title: "تبریک!",
        text: "کمپین شما با موفقیت ایجاد شد!",
        icon: "success",
        button: "مرسی",
      })
      .then((isConfirm) => {
        if (isConfirm) {

         window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/app.php/";

        }
      });

      setTimeout(function(){
        window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/app.php/";
      },3000);

    }

  }

}




function createConnectionForm(formData) {

  var mainFormElements = '<form method="post">';

  for (var i = 0; i < formData.length; i++) {


    if (formData[i]['type'] === "text") {

      mainFormElements = mainFormElements + '<div class="form-group"> <label> '+ formData[i]['placeholder'] +'  </label>  <input type="'+formData[i]['type']+'" class="form-control" id="'+ formData[i]['id'] +'" placeholder=""> </div>';

    } else if (formData[i]['type'] === "submit") {

      $('#submitToolSettingBtn').html(formData[i]['value']);

    }

    if (i===(formData.length-1)) {

        mainFormElements = mainFormElements + '</form>';
    }


  }

  $('#connectionBody').append(mainFormElements);

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

    var dId = getCookie('dId');

    if (dId === "null") {
      dId = "";
    }

    var checkDomainData = { 'cookie' : sbmToken, 'formLink' : domain, 'dId' : dId };

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
	var mode = url.searchParams.get("mode");

  if (mode !== "editCampaign") {

    Cookies.remove('cId', {path: '/sabetmikonimv2'});
    Cookies.remove('remember_edit', {path: '/sabetmikonimv2'});

  } else if (mode === "editCampaign") {

    $('.campaignHeader h2').text('ویرایش کمپین');

    Cookies.set('remember_edit',"true", { expires: 1, path: '/sabetmikonimv2' });

  }


  if (page!==null) {

      createView({contentId: page}, true);

  } else {

      createView({contentId: 'campaignTypes'}, true);

  }




});
