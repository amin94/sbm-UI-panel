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
          'settings' : {'title' : 'وبسایت‌تان را متصل نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/panel/settings-panel.html', 'crumb' : 5},
          'profile' : {'title' : 'وبسایت‌تان را متصل نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/panel/profile-panel.html', 'crumb' : 6},
          'campaignDetails' : {'title' : 'جزئیات کمپین را مشاهده نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/panel/campaign-details-panel.html', 'crumb' : 7},
          'pay' : {'title' : 'خرید پکیج جدید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/panel/pay-panel.html', 'crumb' : 8},
        };

            if (checkCookie('sbm_token')==="cookieSet") {

              $('#pageBodyContent').load(pageBoxes[stateObject.contentId]['tmp'],function(e) {

                var currentPage = stateObject.contentId;


                switch (stateObject.contentId) {


									case 'domains':

                  managePanelMenu('domain');

										var sbmToken = getCookie('sbm_token');
										var getDomainsData = { 'cookie' : sbmToken, 'operation' : 'getUserDomains' };

									  ajaxReq(getDomainsData,'https://api.sabetmikonim.com/panel/get-user-information/','getUserDomains');

										break;



									case 'campaigns':

                  managePanelMenu('notDomain');

                  var sbmToken = getCookie('sbm_token');

									if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

										var sbmToken = getCookie('sbm_token');
										var dId = getCookie('dId');
										var getCampaignsData = { 'cookie' : sbmToken, 'dId' : dId };

									  ajaxReq(getCampaignsData,'https://api.sabetmikonim.com/panel/get-campaigns/','getCampaigns');


									} else {

										createViewPanel({contentId : 'domains'},true);

									}

										break;



                    case 'add-domain':

                      managePanelMenu('domain');

                      Cookies.remove('dId', {path: '/'});
                      Cookies.remove('cId', {path: '/'});

  										break;



                      case 'websiteIntg':

                      managePanelMenu('notDomain');

                      var sbmToken = getCookie('sbm_token');

                      if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

                        var checkIntegrations = { 'cookie' : sbmToken, 'dId' : getCookie('dId') };

                        ajaxReq(checkIntegrations,'https://api.sabetmikonim.com/panel/check-start-page/','checkIntegrations');

                      } else {

                        createView({contentId: 'add-domain'},true);

                      }

                        break;




                        case 'settings':


                        var sbmToken = getCookie('sbm_token');

                        var settingsData = { 'cookie' : sbmToken };

                        ajaxReq(settingsData,'https://api.sabetmikonim.com/panel/settings/','settings');

                        if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

                          managePanelMenu('notDomain');

                        } else {

                          managePanelMenu('domain');

                        }

                          break;





                        case 'profile':


                        var sbmToken = getCookie('sbm_token');

                        var profileData = { 'cookie' : sbmToken };

                        ajaxReq(profileData,'https://api.sabetmikonim.com/panel/get-profile/','getProfileData');

                        if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

                          managePanelMenu('notDomain');

                        } else {

                          managePanelMenu('domain');

                        }

                          break;





                        case 'campaignDetails':

                        managePanelMenu('notDomain');

                        if ((checkCookie('dId')==="cookieSet") && (getCookie('dId') !== "null")) {

                          var sbmToken = getCookie('sbm_token');
                          var cId = getCookie('cId');

                        	var eachCampaignDetailData = { 'cookie' : sbmToken, 'cId' : cId };

                        	ajaxReq(eachCampaignDetailData,'https://api.sabetmikonim.com/panel/get-campaign/','eachCampaignDetail');

                        } else {

                          createViewPanel({contentId : 'domains'},true);

                        }

                          break;








                          case 'pay':

                          managePanelMenu('notDomain');

                            break;


                  default:

                }


            });

          } else {
            window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/";
          }






    }
    historyBool = true;
});


var pageRepeat = 1;
function createViewPanel(stateObject, pushHistory) {


	var pageBoxes = {
		'domains' : {'title' : 'لیست دامنه‌ها', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/domains.html', 'crumb' : 1},
		'campaigns' : {'title' : 'لیست کمپین‌ها', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaigns.html', 'crumb' : 2},
    'add-domain' : {'title' : 'افزودن دامنه جدید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/panel/add-domain-panel.html', 'crumb' : 3},
    'websiteIntg' : {'title' : 'وبسایت‌تان را متصل نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/panel/website-intg-panel.html', 'crumb' : 4},
    'settings' : {'title' : 'وبسایت‌تان را متصل نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/panel/settings-panel.html', 'crumb' : 5},
    'profile' : {'title' : 'وبسایت‌تان را متصل نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/panel/profile-panel.html', 'crumb' : 6},
    'campaignDetails' : {'title' : 'وبسایت‌تان را متصل نمایید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/panel/campaign-details-panel.html', 'crumb' : 7},
    'pay' : {'title' : 'خرید پکیج جدید', 'tmp' : 'http://amins-macbook-pro.local:5757/sabetmikonimv2/template/panel/pay-panel.html', 'crumb' : 8},
	};

    console.log('stateObject: '+stateObject);

    var State = History.getState();
    var lastStateData = State.data;

    console.log(lastStateData);

    // alert(lastStateData.contentId);
    // alert(lastStateData.pageRepeat);

    if (lastStateData.contentId === stateObject.contentId) {

      // pageRepeat = pageRepeat + 1;
      if (lastStateData.pageRepeat === pageRepeat) {
        pageRepeat = pageRepeat + 1;
      }

      History.replaceState({contentId: stateObject.contentId, pageRepeat: pageRepeat },pageBoxes[stateObject.contentId]['title'],'http://amins-macbook-pro.local:5757/sabetmikonimv2/app.php?page='+stateObject.contentId);

    } else {

      History.pushState(stateObject,pageBoxes[stateObject.contentId]['title'],'http://amins-macbook-pro.local:5757/sabetmikonimv2/app.php?page='+stateObject.contentId);

    }

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

  ajaxReq(setNewDomainData,'https://api.sabetmikonim.com/panel/complete-information/','setNewDomain');

}

}



function displayCampaigns(campaignsData) {

	var campaignStatus;

  if (campaignsData.length === 0) {

    $('#campaignsDataBody').prepend('<div class="noCampaignBody"><div class="col-xs-12 col-md-6"><div class="noCampaignTitle"><h3> تا به حال در این دامنه کمپینی نساخته‌اید.</h3><a href="http://amins-macbook-pro.local:5757/sabetmikonimv2/getstart.php?page=campaignTypes" class="btn btn-fill pullRight"> همین حالا اولین کمپین‌تان را بسازید </a></div></div><div class="col-xs-12 col-md-6"><div class="noCampaignIcon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 355.01 320.22"><defs><style>.ncv-1{fill:#b2d3ea}.ncv-2{fill:#173d7a}.ncv-3{fill:#396caa}.ncv-4{fill:#274f89}.ncv-5{fill:#d4ecff}.ncv-6{fill:#721bd5}.ncv-7{fill:#983be9}.ncv-8{fill:#b45ef4}.ncv-9{fill:#7e23dc}.ncv-10{fill:#8a2ae3}.ncv-11{fill:#e83b1f}.ncv-12{fill:#5793ce}.ncv-13{fill:#e2e2e2}.ncv-14{fill:#fff}.ncv-15{fill:url(#_ÂÁ_Ï_ÌÌ_È_ËÂÌÚ_242)}.ncv-16{fill:#eaeaea}.ncv-17{fill:#e8a200}.ncv-18{fill:#fdd762}.ncv-19{fill:#ffc2b0}.ncv-20{fill:#ea9c92}.ncv-21{fill:#ff2c9c}.ncv-22{fill:#6614cf}.ncv-23{fill:#d8892b}.ncv-24{fill:#d29fff}</style><radialGradient id="_ÂÁ_Ï_ÌÌ_È_ËÂÌÚ_242" cx="106.7" cy="213" r="46.88" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#01c8ef"/><stop offset="0.09" stop-color="#03bee9"/><stop offset="0.24" stop-color="#08a5d7"/><stop offset="0.43" stop-color="#107bbb"/><stop offset="0.45" stop-color="#1177b8"/><stop offset="1" stop-color="#112564"/></radialGradient></defs><title>no-campaign</title><path class="ncv-1" d="M235.55,270.17c-7.34,4.24-19.25,4.24-26.59,0s-7.34-11.11,0-15.35,19.25-4.24,26.59,0S242.89,265.93,235.55,270.17Z" transform="translate(-127.99 -33.82)"/><path class="ncv-1" d="M155.54,276.27l-20.19-11.75c-1.7-1-1.49-2.7.48-3.84l19.24-11.21a7.39,7.39,0,0,1,6.65-.28l20.19,11.75c1.7,1,1.49,2.7-.48,3.84L162.19,276A7.39,7.39,0,0,1,155.54,276.27Z" transform="translate(-127.99 -33.82)"/><path class="ncv-2" d="M189.26,238.93h0v-5.07H162.51c-2.14-1.23-5.87-1.08-8.34.35l.8-.33-27,0v5.41a2.42,2.42,0,0,0,1.43,2.23l25.32,14.73c2.14,1.23,5.87,1.08,8.34-.35l24.13-14.06C188.65,241,189.34,239.92,189.26,238.93Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M158.64,233a9.61,9.61,0,0,0-4.47,1.17l.8-.33-27,0v5.41a2.42,2.42,0,0,0,1.43,2.23l25.32,14.73a7.55,7.55,0,0,0,3.87.83Z" transform="translate(-127.99 -33.82)"/><path class="ncv-1" d="M131.06,233.84H128v5.41a2.42,2.42,0,0,0,1.43,2.23l1.62.94Z" transform="translate(-127.99 -33.82)"/><path class="ncv-4" d="M155.29,256.48a9.5,9.5,0,0,0,6.66-.08v-7.09h-6.66Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M154.76,250.85l-25.32-14.73c-2.14-1.23-1.87-3.39.6-4.81l24.13-14.06c2.47-1.42,6.2-1.58,8.34-.35l25.32,14.73c2.14,1.23,1.87,3.39-.6,4.81L163.1,250.5C160.63,251.93,156.9,252.08,154.76,250.85Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M154.37,230.19a5.27,5.27,0,0,1-4.77,0c-1.31-.77-1.31-2,0-2.75a5.27,5.27,0,0,1,4.77,0C155.69,228.21,155.69,229.44,154.37,230.19Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M162,234.66a5.27,5.27,0,0,1-4.77,0c-1.31-.77-1.31-2,0-2.75a5.27,5.27,0,0,1,4.77,0C163.34,232.67,163.34,233.91,162,234.66Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M169.67,239.13a5.27,5.27,0,0,1-4.77,0c-1.31-.77-1.31-2,0-2.75a5.27,5.27,0,0,1,4.77,0C171,237.14,171,238.37,169.67,239.13Z" transform="translate(-127.99 -33.82)"/><path class="ncv-1" d="M364.43,353.37l-20.19-11.75c-1.7-1-1.49-2.7.48-3.84L364,326.58a7.39,7.39,0,0,1,6.65-.28L390.8,338c1.7,1,1.49,2.7-.48,3.84L371.08,353.1A7.39,7.39,0,0,1,364.43,353.37Z" transform="translate(-127.99 -33.82)"/><path class="ncv-2" d="M398.15,316h0V311H371.39c-2.14-1.23-5.87-1.08-8.34.35l.8-.33h-27v5.41a2.42,2.42,0,0,0,1.43,2.23l25.32,14.73c2.14,1.23,5.87,1.08,8.34-.35l24.13-14.06C397.54,318.09,398.23,317,398.15,316Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M367.53,310.11a9.62,9.62,0,0,0-4.47,1.17l.8-.33h-27v5.41a2.42,2.42,0,0,0,1.43,2.23l25.32,14.73a7.55,7.55,0,0,0,3.87.83Z" transform="translate(-127.99 -33.82)"/><path class="ncv-1" d="M339.94,310.94h-3.05v5.41a2.42,2.42,0,0,0,1.43,2.23l1.62.94Z" transform="translate(-127.99 -33.82)"/><path class="ncv-4" d="M364.18,333.58a9.5,9.5,0,0,0,6.66-.08v-7.09h-6.66Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M363.64,327.95l-25.32-14.73c-2.14-1.23-1.87-3.39.6-4.81l24.13-14.06c2.47-1.42,6.2-1.58,8.34-.35l25.32,14.73c2.14,1.23,1.87,3.39-.6,4.81L372,327.6C369.51,329,365.78,329.18,363.64,327.95Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M363.25,307.3a5.27,5.27,0,0,1-4.77,0c-1.31-.77-1.31-2,0-2.75a5.27,5.27,0,0,1,4.77,0C364.58,305.31,364.57,306.54,363.25,307.3Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M370.9,311.76a5.27,5.27,0,0,1-4.77,0c-1.31-.77-1.31-2,0-2.75a5.27,5.27,0,0,1,4.77,0C372.23,309.78,372.22,311,370.9,311.76Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M378.56,316.23a5.27,5.27,0,0,1-4.77,0c-1.31-.77-1.31-2,0-2.75a5.27,5.27,0,0,1,4.77,0C379.88,314.24,379.88,315.48,378.56,316.23Z" transform="translate(-127.99 -33.82)"/><path class="ncv-1" d="M186.18,109.52,166,97.77c-1.7-1-1.49-2.7.48-3.84l19.24-11.21a7.39,7.39,0,0,1,6.65-.28l20.19,11.75c1.7,1,1.49,2.7-.48,3.84l-19.24,11.21A7.39,7.39,0,0,1,186.18,109.52Z" transform="translate(-127.99 -33.82)"/><path class="ncv-2" d="M219.89,72.18h0V67.1l-26.94,0h.19c-2.14-1.23-5.87-1.08-8.34.35l.8-.33-27,0v5.41a2.42,2.42,0,0,0,1.43,2.23l25.32,14.73c2.14,1.23,5.87,1.08,8.34-.35l24.13-14.06C219.29,74.23,220,73.17,219.89,72.18Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M189.27,66.26a9.62,9.62,0,0,0-4.47,1.17l.8-.33-27,0v5.41a2.42,2.42,0,0,0,1.43,2.23l25.32,14.73a7.55,7.55,0,0,0,3.87.83Z" transform="translate(-127.99 -33.82)"/><path class="ncv-1" d="M161.69,67.08h-3.05v5.41a2.42,2.42,0,0,0,1.43,2.23l1.62.94Z" transform="translate(-127.99 -33.82)"/><path class="ncv-4" d="M185.93,89.72a9.5,9.5,0,0,0,6.66-.08V82.56h-6.66Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M185.39,84.09,160.07,69.36c-2.14-1.23-1.87-3.39.6-4.81L184.8,50.48c2.47-1.42,6.2-1.58,8.34-.35l25.32,14.73c2.14,1.23,1.87,3.39-.6,4.81L193.73,83.75C191.26,85.17,187.53,85.32,185.39,84.09Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M185,63.44a5.27,5.27,0,0,1-4.77,0c-1.31-.77-1.31-2,0-2.75a5.27,5.27,0,0,1,4.77,0C186.33,61.45,186.32,62.68,185,63.44Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M192.65,67.9a5.27,5.27,0,0,1-4.77,0c-1.31-.77-1.31-2,0-2.75a5.27,5.27,0,0,1,4.77,0C194,65.92,194,67.15,192.65,67.9Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M200.3,72.37a5.27,5.27,0,0,1-4.77,0c-1.31-.77-1.31-2,0-2.75a5.27,5.27,0,0,1,4.77,0C201.63,70.39,201.62,71.62,200.3,72.37Z" transform="translate(-127.99 -33.82)"/><path class="ncv-1" d="M449.15,191.05l-21-12.22c-1.77-1-1.55-2.81.5-4l20-11.66a7.68,7.68,0,0,1,6.91-.29l21,12.22c1.77,1,1.55,2.81-.5,4l-20,11.66A7.68,7.68,0,0,1,449.15,191.05Z" transform="translate(-127.99 -33.82)"/><path class="ncv-6" d="M483,153.17h0V148.1H456.24c-2.14-1.23-5.87-1.08-8.34.35l.8-.33h-27v5.41a2.42,2.42,0,0,0,1.43,2.23l25.32,14.73c2.14,1.23,5.87,1.08,8.34-.35L481,156C482.39,155.22,483.07,154.16,483,153.17Z" transform="translate(-127.99 -33.82)"/><path class="ncv-7" d="M452.37,147.25a9.62,9.62,0,0,0-4.47,1.17l.8-.33h-27v5.41a2.42,2.42,0,0,0,1.43,2.23l25.32,14.73a7.55,7.55,0,0,0,3.87.83Z" transform="translate(-127.99 -33.82)"/><path class="ncv-8" d="M424.79,148.07h-3.05v5.41a2.42,2.42,0,0,0,1.43,2.23l1.62.94Z" transform="translate(-127.99 -33.82)"/><path class="ncv-9" d="M449,170.71a9.5,9.5,0,0,0,6.66-.08v-7.09H449Z" transform="translate(-127.99 -33.82)"/><path class="ncv-10" d="M448.49,165.08l-25.32-14.73c-2.14-1.23-1.87-3.39.6-4.81l24.13-14.06c2.47-1.42,6.2-1.58,8.34-.35l25.32,14.73c2.14,1.23,1.87,3.39-.6,4.81l-24.13,14.06C454.36,166.16,450.63,166.32,448.49,165.08Z" transform="translate(-127.99 -33.82)"/><path class="ncv-8" d="M446.56,144.33a5.27,5.27,0,0,1-4.77,0c-1.31-.77-1.31-2,0-2.75a5.27,5.27,0,0,1,4.77,0C447.88,142.35,447.88,143.58,446.56,144.33Z" transform="translate(-127.99 -33.82)"/><path class="ncv-8" d="M454.21,148.8a5.27,5.27,0,0,1-4.77,0c-1.31-.77-1.31-2,0-2.75a5.27,5.27,0,0,1,4.77,0C455.53,146.81,455.53,148,454.21,148.8Z" transform="translate(-127.99 -33.82)"/><path class="ncv-8" d="M461.86,153.27a5.27,5.27,0,0,1-4.77,0c-1.31-.77-1.31-2,0-2.75a5.27,5.27,0,0,1,4.77,0C463.19,151.28,463.18,152.51,461.86,153.27Z" transform="translate(-127.99 -33.82)"/><path class="ncv-1" d="M231.07,183.22,395.34,287.12l69-39.82c4.12-2.38,3.6-6.53-1.15-9.28L306.86,147.79c-4.76-2.75-12-3-16.07-.67Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-1" points="311.85 205.87 314.37 207.33 336.89 194.32 334.37 192.87 311.85 205.87"/><polygon class="ncv-1" points="303.84 201.25 306.36 202.7 328.88 189.7 326.36 188.24 303.84 201.25"/><polygon class="ncv-1" points="289.25 192.83 291.77 194.28 314.3 181.28 311.77 179.82 289.25 192.83"/><polygon class="ncv-1" points="281.24 188.2 283.76 189.66 306.29 176.65 303.76 175.2 281.24 188.2"/><polygon class="ncv-1" points="266.65 179.78 269.17 181.24 291.7 168.23 289.18 166.78 266.65 179.78"/><polygon class="ncv-1" points="258.64 175.16 261.16 176.61 283.69 163.61 281.17 162.15 258.64 175.16"/><polygon class="ncv-1" points="244.06 166.73 246.58 168.19 269.1 155.19 266.58 153.73 244.06 166.73"/><polygon class="ncv-1" points="236.04 162.11 238.57 163.56 261.09 150.56 258.57 149.1 236.04 162.11"/><polygon class="ncv-1" points="221.46 153.69 223.98 155.14 246.5 142.14 243.98 140.68 221.46 153.69"/><polygon class="ncv-1" points="213.45 149.06 215.97 150.52 238.5 137.51 235.97 136.06 213.45 149.06"/><polygon class="ncv-1" points="198.86 140.64 201.38 142.1 223.91 129.09 221.39 127.64 198.86 140.64"/><polygon class="ncv-1" points="190.85 136.02 193.37 137.47 215.9 124.47 213.38 123.01 190.85 136.02"/><polygon class="ncv-1" points="176.26 127.59 178.78 129.05 201.31 116.05 198.79 114.59 176.26 127.59"/><polygon class="ncv-1" points="168.25 122.97 170.78 124.43 193.3 111.42 190.78 109.96 168.25 122.97"/><path class="ncv-3" d="M398,167.09V282.78c0,3.93-2.76,5.52-6.16,3.56L235.57,196.1a13.61,13.61,0,0,1-6.16-10.67V69.74Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M229.41,46.76v23L398,167.09v-23a13.61,13.61,0,0,0-6.16-10.67L235.57,43.21C232.17,41.24,229.41,42.84,229.41,46.76ZM381.9,135.31c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,381.9,135.31Zm-7-4.07c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,374.85,131.25Zm-15.35-8.86c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,359.5,122.38Zm-7-4.07c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,352.45,118.31Zm-15.35-8.86c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,337.1,109.45Zm-7-4.07c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,330.05,105.38ZM314.7,96.52c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,314.7,96.52Zm-7-4.07c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,307.65,92.45ZM292.3,83.58c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,292.3,83.58Zm-7-4.07c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,285.25,79.52ZM269.9,70.65c0-1.62,1.14-2.28,2.54-1.47A5.62,5.62,0,0,1,275,73.59c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,269.9,70.65Zm-7-4.07c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,262.85,66.58ZM247.5,57.72c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,247.5,57.72Zm-7-4.07c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,240.45,53.65Z" transform="translate(-127.99 -33.82)"/><path class="ncv-11" d="M255,76.72,372.4,144.47c.93.54,1.69,0,1.69-1.27h0A4,4,0,0,0,372.4,140L255,72.22c-.93-.54-1.69,0-1.69,1.27h0A4,4,0,0,0,255,76.72Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-12" points="124.65 82.63 136.66 89.56 136.66 79.4 124.65 72.47 124.65 82.63"/><polygon class="ncv-12" points="143.01 93.23 155.02 100.16 155.02 90 143.01 83.06 143.01 93.23"/><polygon class="ncv-12" points="124.65 99.23 136.66 106.16 136.66 95.99 124.65 89.06 124.65 99.23"/><polygon class="ncv-12" points="143.01 109.82 155.02 116.76 155.02 106.59 143.01 99.66 143.01 109.82"/><polygon class="ncv-13" points="161.37 120.42 173.37 127.35 173.37 117.19 161.37 110.26 161.37 120.42"/><polygon class="ncv-13" points="179.72 131.02 191.73 137.95 191.73 127.79 179.72 120.86 179.72 131.02"/><polygon class="ncv-13" points="198.08 141.62 210.08 148.55 210.08 138.38 198.08 131.45 198.08 141.62"/><polygon class="ncv-13" points="216.43 152.22 228.44 159.15 228.44 148.98 216.43 142.05 216.43 152.22"/><polygon class="ncv-13" points="234.79 162.81 246.79 169.75 246.79 159.58 234.79 152.65 234.79 162.81"/><polygon class="ncv-12" points="124.65 115.82 136.66 122.75 136.66 112.59 124.65 105.66 124.65 115.82"/><polygon class="ncv-12" points="143.01 126.42 155.02 133.35 155.02 123.19 143.01 116.26 143.01 126.42"/><polygon class="ncv-13" points="161.37 137.02 173.37 143.95 173.37 133.79 161.37 126.85 161.37 137.02"/><polygon class="ncv-13" points="179.72 147.62 191.73 154.55 191.73 144.38 179.72 137.45 179.72 147.62"/><polygon class="ncv-13" points="198.08 158.21 210.08 165.15 210.08 154.98 198.08 148.05 198.08 158.21"/><polygon class="ncv-13" points="216.43 168.81 228.44 175.74 228.44 165.58 216.43 158.65 216.43 168.81"/><polygon class="ncv-13" points="234.79 179.41 246.79 186.34 246.79 176.18 234.79 169.25 234.79 179.41"/><polygon class="ncv-12" points="124.65 132.42 136.66 139.35 136.66 129.19 124.65 122.25 124.65 132.42"/><polygon class="ncv-12" points="143.01 143.02 155.02 149.95 155.02 139.78 143.01 132.85 143.01 143.02"/><polygon class="ncv-13" points="161.37 153.61 173.37 160.55 173.37 150.38 161.37 143.45 161.37 153.61"/><polygon class="ncv-13" points="179.72 164.21 191.73 171.14 191.73 160.98 179.72 154.05 179.72 164.21"/><polygon class="ncv-13" points="198.08 174.81 210.08 181.74 210.08 171.58 198.08 164.65 198.08 174.81"/><polygon class="ncv-13" points="216.43 185.41 228.44 192.34 228.44 182.18 216.43 175.24 216.43 185.41"/><polygon class="ncv-13" points="234.79 196 246.79 202.94 246.79 192.77 234.79 185.84 234.79 196"/><polygon class="ncv-12" points="124.65 149.01 136.66 155.95 136.66 145.78 124.65 138.85 124.65 149.01"/><polygon class="ncv-12" points="143.01 159.61 155.02 166.54 155.02 156.38 143.01 149.45 143.01 159.61"/><polygon class="ncv-13" points="161.37 170.21 173.37 177.14 173.37 166.98 161.37 160.05 161.37 170.21"/><polygon class="ncv-13" points="179.72 180.81 191.73 187.74 191.73 177.58 179.72 170.64 179.72 180.81"/><polygon class="ncv-13" points="198.08 191.41 210.08 198.34 210.08 188.17 198.08 181.24 198.08 191.41"/><polygon class="ncv-13" points="216.43 202 228.44 208.94 228.44 198.77 216.43 191.84 216.43 202"/><polygon class="ncv-13" points="234.79 212.6 246.79 219.53 246.79 209.37 234.79 202.44 234.79 212.6"/><polygon class="ncv-13" points="266.49 254 268.24 252.95 266.42 252.57 266.49 254"/><path class="ncv-5" d="M396.29,168.13V283.82c0,3.93-2.76,5.52-6.16,3.56l-156.3-90.24a13.61,13.61,0,0,1-6.16-10.67V70.78Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M381.66,134.54a2.27,2.27,0,0,0-.27,1.15,5.63,5.63,0,0,0,2.55,4.42,2.36,2.36,0,0,0,1.05.34c-.42.73-1.27.9-2.27.33a5.64,5.64,0,0,1-2.55-4.42C380.16,135.16,380.78,134.49,381.66,134.54Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M374.62,130.47a2.27,2.27,0,0,0-.27,1.15,5.63,5.63,0,0,0,2.55,4.42,2.36,2.36,0,0,0,1.05.34c-.42.73-1.27.9-2.27.33a5.63,5.63,0,0,1-2.55-4.42C373.12,131.09,373.73,130.42,374.62,130.47Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M359.26,121.6a2.27,2.27,0,0,0-.27,1.15,5.64,5.64,0,0,0,2.55,4.42,2.36,2.36,0,0,0,1.05.34c-.42.73-1.27.9-2.27.33a5.63,5.63,0,0,1-2.55-4.42C357.76,122.22,358.38,121.56,359.26,121.6Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M352.22,117.53a2.27,2.27,0,0,0-.27,1.15,5.64,5.64,0,0,0,2.55,4.42,2.36,2.36,0,0,0,1.05.34c-.42.73-1.27.9-2.27.33a5.63,5.63,0,0,1-2.55-4.42C350.72,118.15,351.33,117.49,352.22,117.53Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M336.86,108.67a2.27,2.27,0,0,0-.27,1.15,5.64,5.64,0,0,0,2.55,4.42,2.36,2.36,0,0,0,1.05.34c-.42.73-1.27.9-2.27.33a5.64,5.64,0,0,1-2.55-4.42C335.36,109.29,336,108.62,336.86,108.67Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M329.82,104.6a2.27,2.27,0,0,0-.27,1.15,5.64,5.64,0,0,0,2.55,4.42,2.36,2.36,0,0,0,1.05.34c-.42.73-1.27.9-2.27.33a5.63,5.63,0,0,1-2.55-4.42C328.32,105.22,328.93,104.55,329.82,104.6Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M314.46,95.73a2.27,2.27,0,0,0-.27,1.15,5.64,5.64,0,0,0,2.55,4.42,2.36,2.36,0,0,0,1.05.34c-.42.73-1.27.9-2.27.33A5.63,5.63,0,0,1,313,97.54C313,96.35,313.58,95.69,314.46,95.73Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M307.42,91.66a2.27,2.27,0,0,0-.27,1.15,5.63,5.63,0,0,0,2.55,4.42,2.36,2.36,0,0,0,1.05.34c-.42.73-1.27.9-2.27.33a5.63,5.63,0,0,1-2.55-4.42C305.92,92.28,306.53,91.62,307.42,91.66Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M292.06,82.8a2.27,2.27,0,0,0-.27,1.15,5.64,5.64,0,0,0,2.55,4.42,2.36,2.36,0,0,0,1.05.34c-.42.73-1.27.9-2.27.33a5.64,5.64,0,0,1-2.55-4.42C290.56,83.42,291.18,82.75,292.06,82.8Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M285,78.73a2.27,2.27,0,0,0-.27,1.15,5.63,5.63,0,0,0,2.55,4.42,2.36,2.36,0,0,0,1.05.34c-.42.73-1.27.9-2.27.33a5.63,5.63,0,0,1-2.55-4.42C283.52,79.35,284.13,78.68,285,78.73Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M269.66,69.86a2.27,2.27,0,0,0-.27,1.15,5.63,5.63,0,0,0,2.55,4.42,2.36,2.36,0,0,0,1.05.34c-.42.73-1.27.9-2.27.33a5.63,5.63,0,0,1-2.55-4.42C268.16,70.48,268.78,69.82,269.66,69.86Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M262.62,65.79a2.27,2.27,0,0,0-.27,1.15,5.63,5.63,0,0,0,2.55,4.42,2.36,2.36,0,0,0,1.05.34c-.42.73-1.27.9-2.27.33a5.63,5.63,0,0,1-2.55-4.42C261.12,66.41,261.73,65.75,262.62,65.79Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M247.26,56.93a2.27,2.27,0,0,0-.27,1.15,5.64,5.64,0,0,0,2.55,4.42,2.36,2.36,0,0,0,1.05.34c-.42.73-1.27.9-2.27.33a5.63,5.63,0,0,1-2.55-4.42C245.76,57.54,246.38,56.88,247.26,56.93Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M240.22,52.86a2.27,2.27,0,0,0-.27,1.15,5.64,5.64,0,0,0,2.55,4.42,2.36,2.36,0,0,0,1.05.34c-.42.73-1.27.9-2.27.33a5.63,5.63,0,0,1-2.55-4.42C238.72,53.47,239.33,52.81,240.22,52.86Z" transform="translate(-127.99 -33.82)"/><path class="ncv-12" d="M227.68,47.8v23l168.62,97.35v-23a13.61,13.61,0,0,0-6.16-10.67L233.84,44.25C230.43,42.28,227.68,43.88,227.68,47.8Zm152.49,88.55c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,380.16,136.35Zm-7-4.07c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,373.12,132.29Zm-15.35-8.86c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,357.76,123.42Zm-7-4.07c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,350.72,119.35Zm-15.35-8.86c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,335.36,110.49Zm-7-4.07c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,328.32,106.42ZM313,97.56c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,313,97.56Zm-7-4.07c0-1.62,1.14-2.28,2.54-1.47A5.62,5.62,0,0,1,311,96.43c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,305.92,93.49Zm-15.35-8.86c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,290.56,84.62Zm-7-4.07c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,283.52,80.56Zm-15.35-8.86c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,268.16,71.69Zm-7-4.07c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,261.12,67.62Zm-15.35-8.86c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,245.76,58.76Zm-7-4.07c0-1.62,1.14-2.28,2.54-1.47a5.62,5.62,0,0,1,2.54,4.41c0,1.62-1.14,2.28-2.54,1.47A5.62,5.62,0,0,1,238.72,54.69Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M253.3,77.75l117.36,67.76c.93.54,1.69,0,1.69-1.27h0a4,4,0,0,0-1.69-3.22L253.3,73.26c-.93-.54-1.69,0-1.69,1.27h0A4,4,0,0,0,253.3,77.75Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="122.92 83.67 134.93 90.6 134.93 80.44 122.92 73.5 122.92 83.67"/><polygon class="ncv-3" points="141.28 94.27 153.28 101.2 153.28 91.03 141.28 84.1 141.28 94.27"/><polygon class="ncv-3" points="122.92 100.27 134.93 107.2 134.93 97.03 122.92 90.1 122.92 100.27"/><polygon class="ncv-3" points="141.28 110.86 153.28 117.8 153.28 107.63 141.28 100.7 141.28 110.86"/><polygon class="ncv-14" points="159.63 121.46 171.64 128.39 171.64 118.23 159.63 111.3 159.63 121.46"/><polygon class="ncv-14" points="177.99 132.06 189.99 138.99 189.99 128.83 177.99 121.89 177.99 132.06"/><polygon class="ncv-14" points="196.34 142.66 208.35 149.59 208.35 139.42 196.34 132.49 196.34 142.66"/><polygon class="ncv-14" points="214.7 153.25 226.71 160.19 226.71 150.02 214.7 143.09 214.7 153.25"/><polygon class="ncv-14" points="233.06 163.85 245.06 170.78 245.06 160.62 233.06 153.69 233.06 163.85"/><polygon class="ncv-3" points="122.92 116.86 134.93 123.79 134.93 113.63 122.92 106.7 122.92 116.86"/><polygon class="ncv-3" points="141.28 127.46 153.28 134.39 153.28 124.23 141.28 117.3 141.28 127.46"/><polygon class="ncv-14" points="159.63 138.06 171.64 144.99 171.64 134.82 159.63 127.89 159.63 138.06"/><polygon class="ncv-14" points="177.99 148.66 189.99 155.59 189.99 145.42 177.99 138.49 177.99 148.66"/><polygon class="ncv-14" points="196.34 159.25 208.35 166.19 208.35 156.02 196.34 149.09 196.34 159.25"/><polygon class="ncv-14" points="214.7 169.85 226.71 176.78 226.71 166.62 214.7 159.69 214.7 169.85"/><polygon class="ncv-14" points="233.06 180.45 245.06 187.38 245.06 177.22 233.06 170.28 233.06 180.45"/><polygon class="ncv-3" points="122.92 133.46 134.93 140.39 134.93 130.23 122.92 123.29 122.92 133.46"/><polygon class="ncv-3" points="141.28 144.06 153.28 150.99 153.28 140.82 141.28 133.89 141.28 144.06"/><polygon class="ncv-14" points="159.63 154.65 171.64 161.59 171.64 151.42 159.63 144.49 159.63 154.65"/><polygon class="ncv-14" points="177.99 165.25 189.99 172.18 189.99 162.02 177.99 155.09 177.99 165.25"/><polygon class="ncv-14" points="196.34 175.85 208.35 182.78 208.35 172.62 196.34 165.69 196.34 175.85"/><polygon class="ncv-14" points="214.7 186.45 226.71 193.38 226.71 183.21 214.7 176.28 214.7 186.45"/><polygon class="ncv-14" points="233.06 197.04 245.06 203.98 245.06 193.81 233.06 186.88 233.06 197.04"/><polygon class="ncv-3" points="122.92 150.05 134.93 156.99 134.93 146.82 122.92 139.89 122.92 150.05"/><polygon class="ncv-3" points="141.28 160.65 153.28 167.58 153.28 157.42 141.28 150.49 141.28 160.65"/><polygon class="ncv-14" points="159.63 171.25 171.64 178.18 171.64 168.02 159.63 161.09 159.63 171.25"/><polygon class="ncv-14" points="177.99 181.85 189.99 188.78 189.99 178.62 177.99 171.68 177.99 181.85"/><polygon class="ncv-14" points="196.34 192.44 208.35 199.38 208.35 189.21 196.34 182.28 196.34 192.44"/><polygon class="ncv-14" points="214.7 203.04 226.71 209.97 226.71 199.81 214.7 192.88 214.7 203.04"/><polygon class="ncv-14" points="233.06 213.64 245.06 220.57 245.06 210.41 233.06 203.48 233.06 213.64"/><path class="ncv-5" d="M371.16,128c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S371.16,122.45,371.16,128ZM373,127a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C376.12,133.16,373,131.37,373,127Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-5" points="246.57 100.56 245.6 99.83 246.43 100.03 246.57 100.56"/><polygon class="ncv-5" points="258.48 78.61 259.82 79.59 258.72 79.92 258.48 78.61"/><path class="ncv-3" d="M372.37,128.93c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S372.37,123.33,372.37,128.93Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C377.33,134,374.24,132.25,374.24,127.85Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="253.5 95.83 254.81 94.39 258.57 96.57 256.16 97.8 253.5 95.83"/><path class="ncv-12" d="M381.45,129.47l3.41,2-2.34,2.32-4.35,1.94a5.43,5.43,0,0,0-1.48-4Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M348.75,115.11c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S348.75,109.51,348.75,115.11Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C353.71,120.22,350.62,118.43,350.62,114Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-5" points="224.16 87.62 223.19 86.89 224.02 87.09 224.16 87.62"/><polygon class="ncv-5" points="236.07 65.67 237.41 66.65 236.31 66.98 236.07 65.67"/><path class="ncv-3" d="M350,116c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S350,110.39,350,116Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C354.92,121.1,351.83,119.31,351.83,114.91Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="231.09 82.89 232.39 81.45 236.16 83.63 233.75 84.86 231.09 82.89"/><path class="ncv-12" d="M359,116.53l3.41,2-2.34,2.32-4.35,1.94a5.43,5.43,0,0,0-1.48-4Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M355.8,119.18c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S355.8,113.58,355.8,119.18Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C360.77,124.29,357.67,122.51,357.67,118.1Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-5" points="231.22 91.69 230.25 90.97 231.07 91.17 231.22 91.69"/><polygon class="ncv-5" points="243.12 69.75 244.47 70.73 243.36 71.06 243.12 69.75"/><path class="ncv-3" d="M357,120.07c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S357,114.47,357,120.07Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C362,125.18,358.88,123.39,358.88,119Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="238.14 86.97 239.45 85.53 243.22 87.7 240.8 88.94 238.14 86.97"/><path class="ncv-12" d="M366.09,120.6l3.41,2-2.34,2.32-4.35,1.94a5.43,5.43,0,0,0-1.48-4Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M326.33,102.13c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S326.33,96.53,326.33,102.13ZM328.2,101a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C331.3,107.24,328.2,105.45,328.2,101Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-5" points="201.75 74.64 200.78 73.92 201.6 74.12 201.75 74.64"/><polygon class="ncv-5" points="213.65 52.69 215 53.68 213.89 54 213.65 52.69"/><path class="ncv-3" d="M327.54,103c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S327.54,97.41,327.54,103Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C332.51,108.12,329.41,106.34,329.41,101.93Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="208.67 69.92 209.94 68.49 213.71 70.67 211.33 71.89 208.67 69.92"/><path class="ncv-12" d="M336.59,103.59l3.41,1.95-2.32,2.3-4.31,1.92a5.55,5.55,0,0,0-1.52-4Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M333.38,106.21c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21S347,88.2,342.17,91,333.38,100.61,333.38,106.21Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C338.35,111.32,335.26,109.53,335.26,105.13Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-5" points="208.8 78.72 207.83 77.99 208.66 78.19 208.8 78.72"/><polygon class="ncv-5" points="220.71 56.77 222.05 57.76 220.94 58.08 220.71 56.77"/><path class="ncv-3" d="M334.59,107.09c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S334.59,101.49,334.59,107.09Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C339.56,112.2,336.47,110.42,336.47,106Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="215.72 74 217.03 72.55 220.8 74.73 218.38 75.96 215.72 74"/><path class="ncv-12" d="M343.67,107.63l3.41,2-2.34,2.32-4.32,1.93a5.48,5.48,0,0,0-1.51-4Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M303.91,89.15c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S303.91,83.55,303.91,89.15Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C308.88,94.26,305.79,92.48,305.79,88.07Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-5" points="179.33 61.67 178.36 60.94 179.19 61.14 179.33 61.67"/><polygon class="ncv-5" points="191.24 39.72 192.58 40.7 191.47 41.03 191.24 39.72"/><path class="ncv-3" d="M305.12,90c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S305.12,84.44,305.12,90ZM307,89a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C310.09,95.15,307,93.36,307,89Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="186.25 56.94 187.52 55.55 191.27 57.71 188.91 58.91 186.25 56.94"/><path class="ncv-12" d="M314.13,90.61l3.46,2-2.32,2.26L311,96.78a5.7,5.7,0,0,0-1.57-4Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M311,93.23c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S311,87.63,311,93.23Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C315.94,98.34,312.84,96.56,312.84,92.15Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-5" points="186.38 65.74 185.41 65.02 186.24 65.22 186.38 65.74"/><polygon class="ncv-5" points="198.29 43.8 199.63 44.78 198.53 45.1 198.29 43.8"/><path class="ncv-3" d="M312.18,94.12c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21S325.81,76.1,321,78.9,312.18,88.52,312.18,94.12ZM314.05,93a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4A15.27,15.27,0,0,1,321,97C317.14,99.23,314.05,97.44,314.05,93Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="193.31 61.02 194.58 59.62 198.34 61.78 195.97 62.99 193.31 61.02"/><path class="ncv-12" d="M321.19,94.68l3.43,2-2.3,2.28-4.3,1.94a5.7,5.7,0,0,0-1.56-4Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M281.5,76.18c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S281.5,70.58,281.5,76.18Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C286.46,81.29,283.37,79.5,283.37,75.1Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-5" points="156.91 48.69 155.94 47.97 156.77 48.16 156.91 48.69"/><polygon class="ncv-5" points="168.82 26.74 170.16 27.73 169.06 28.05 168.82 26.74"/><path class="ncv-3" d="M282.71,77.06c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S282.71,71.46,282.71,77.06ZM284.58,76a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C287.67,82.17,284.58,80.39,284.58,76Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="163.84 43.97 165.08 42.59 168.82 44.75 166.5 45.93 163.84 43.97"/><path class="ncv-12" d="M291.68,77.65l3.47,2-2.3,2.24-4.26,1.9a5.73,5.73,0,0,0-1.59-4Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M288.55,80.26c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S288.55,74.66,288.55,80.26Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C293.52,85.37,290.43,83.58,290.43,79.17Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-5" points="163.97 52.77 163 52.04 163.83 52.24 163.97 52.77"/><polygon class="ncv-5" points="175.88 30.82 177.22 31.8 176.11 32.13 175.88 30.82"/><path class="ncv-3" d="M289.76,81.14c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S289.76,75.54,289.76,81.14Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C294.73,86.25,291.63,84.46,291.63,80.06Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="170.89 48.04 172.14 46.67 175.88 48.83 173.55 50.01 170.89 48.04"/><path class="ncv-12" d="M298.74,81.72l3.46,2L299.91,86l-4.27,1.91a5.83,5.83,0,0,0-1.61-4Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M259.08,63.2c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S259.08,57.6,259.08,63.2ZM261,62.12a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C264,68.31,261,66.53,261,62.12Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-5" points="134.5 35.72 133.53 34.99 134.36 35.19 134.5 35.72"/><polygon class="ncv-5" points="146.41 13.77 147.75 14.75 146.64 15.08 146.41 13.77"/><path class="ncv-3" d="M260.29,64.09c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S260.29,58.49,260.29,64.09ZM262.16,63a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C265.26,69.2,262.16,67.41,262.16,63Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="141.42 30.99 142.65 29.64 146.37 31.79 144.08 32.96 141.42 30.99"/><path class="ncv-12" d="M269.22,64.68l3.47,2-2.25,2.23-4.24,1.89a5.55,5.55,0,0,0-1.63-3.94Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M266.14,67.28c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S266.14,61.68,266.14,67.28ZM268,66.2a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C271.1,72.39,268,70.6,268,66.2Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-5" points="141.55 39.79 140.58 39.07 141.41 39.27 141.55 39.79"/><polygon class="ncv-5" points="153.46 17.84 154.8 18.83 153.7 19.15 153.46 17.84"/><path class="ncv-3" d="M267.35,68.16c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21S281,50.15,276.13,53,267.35,62.56,267.35,68.16Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C272.31,73.27,269.22,71.49,269.22,67.08Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="148.48 35.07 149.7 33.71 153.43 35.87 151.14 37.03 148.48 35.07"/><path class="ncv-12" d="M276.29,68.76l3.45,2L277.49,73l-4.25,1.9a5.27,5.27,0,0,0-1.64-4Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M236.67,50.23c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S236.67,44.63,236.67,50.23Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C241.63,55.34,238.54,53.55,238.54,49.15Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-5" points="112.08 22.74 111.11 22.02 111.94 22.21 112.08 22.74"/><polygon class="ncv-5" points="123.99 0.79 125.33 1.78 124.23 2.1 123.99 0.79"/><path class="ncv-3" d="M237.88,51.11c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S237.88,45.51,237.88,51.11ZM239.75,50a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C242.84,56.22,239.75,54.44,239.75,50Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="119.01 18.02 120.21 16.69 123.93 18.83 121.67 19.98 119.01 18.02"/><path class="ncv-12" d="M246.8,51.73l3.45,2L248,55.94l-4.22,1.89a5.52,5.52,0,0,0-1.69-3.94Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M243.72,54.3c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S243.72,48.7,243.72,54.3Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C248.69,59.42,245.59,57.63,245.59,53.22Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-5" points="119.14 26.82 118.17 26.09 119 26.29 119.14 26.82"/><polygon class="ncv-5" points="131.04 4.87 132.39 5.85 131.28 6.18 131.04 4.87"/><path class="ncv-3" d="M244.93,55.19c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S244.93,49.59,244.93,55.19Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C249.9,60.3,246.8,58.51,246.8,54.11Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="126.06 22.09 127.27 20.76 130.98 22.91 128.72 24.06 126.06 22.09"/><path class="ncv-12" d="M253.85,55.8l3.46,2L255.08,60,250.84,62a5.6,5.6,0,0,0-1.68-4Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M378.21,132.12c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21-3.93-7.87-8.78-5.07S378.21,126.52,378.21,132.12Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4A15.27,15.27,0,0,1,387,135C383.17,137.23,380.08,135.44,380.08,131Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-5" points="253.62 104.63 252.65 103.91 253.48 104.1 253.62 104.63"/><polygon class="ncv-5" points="265.53 82.68 266.87 83.67 265.76 83.99 265.53 82.68"/><path class="ncv-3" d="M379.41,133c0,5.6,3.93,7.87,8.78,5.07s8.78-9.61,8.78-15.21S393,115,388.2,117.79,379.41,127.4,379.41,133Zm1.87-1.08a15.27,15.27,0,0,1,6.91-12c3.82-2.2,6.91-.42,6.91,4a15.27,15.27,0,0,1-6.91,12C384.38,138.11,381.29,136.33,381.29,131.92Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-3" points="268.3 134.31 270.03 133.27 270.03 130.27 268.3 131.38 268.3 134.31"/><path class="ncv-3" d="M388.54,133.72l1.31-1.44a22.42,22.42,0,0,1,3.64,2.35l-2.29,1.06Z" transform="translate(-127.99 -33.82)"/><path class="ncv-12" d="M388.49,133.54a16.46,16.46,0,0,1,4.18,3c1.33,1.58-7.46,3.19-7.46,3.19a5.43,5.43,0,0,0-1.48-4Z" transform="translate(-127.99 -33.82)"/><path class="ncv-1" d="M322,317c-7.35,4.25-19.28,4.25-26.63,0s-7.35-11.13,0-15.38,19.28-4.25,26.63,0S329.37,312.78,322,317Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M318.76,302.59a15.59,15.59,0,0,0-2-.95h0L313,299.94l.29.67a24.68,24.68,0,0,0-9-.1l.18-.74-4.5,2h0a15.37,15.37,0,0,0-1.68.82c-5.64,3.26-5.64,8.54,0,11.8s14.79,3.26,20.43,0S324.4,305.84,318.76,302.59Z" transform="translate(-127.99 -33.82)"/><path class="ncv-12" d="M313.33,305.66a10.58,10.58,0,0,1-9.57,0c-2.64-1.53-2.64-4,0-5.53a10.58,10.58,0,0,1,9.57,0C316,301.66,316,304.14,313.33,305.66Z" transform="translate(-127.99 -33.82)"/><path class="ncv-12" d="M308.54,304h0a2.3,2.3,0,0,1-2.3-2.3V272.56h4.6v29.09A2.3,2.3,0,0,1,308.54,304Z" transform="translate(-127.99 -33.82)"/><path class="ncv-12" d="M310.16,273.61a3.67,3.67,0,0,1-3.32,0,1,1,0,0,1,0-1.92,3.67,3.67,0,0,1,3.32,0A1,1,0,0,1,310.16,273.61Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M308.54,273.55h0a1.87,1.87,0,0,1-1.87-1.87V244.34h3.73v27.35A1.87,1.87,0,0,1,308.54,273.55Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M335.37,258.67V257.6l1.51-.22,1.69-1.27a1.14,1.14,0,0,1,1.12,0l1.25.72,1.24-.18v1.09h0a.41.41,0,0,1-.28.33l-3.94,1.76a1.24,1.24,0,0,1-1,0L335.6,259a.38.38,0,0,1-.22-.32Z" transform="translate(-127.99 -33.82)"/><path class="ncv-12" d="M335.53,257.31l3-2.28a1.14,1.14,0,0,1,1.12,0L342,256.3c.32.18.28.49-.07.64l-3.94,1.76a1.24,1.24,0,0,1-1,0l-1.31-.76C335.32,257.75,335.29,257.49,335.53,257.31Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M330.4,262.48a2.48,2.48,0,0,0,1.22-.3l4.73-2.73a.55.55,0,0,0-.55-.95l-4.73,2.73a1.57,1.57,0,0,1-1.35,0l-7.86-4.55a.55.55,0,1,0-.55.95l7.86,4.55A2.47,2.47,0,0,0,330.4,262.48Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-15" points="156.93 218.65 164.52 214.24 160.26 212.32 156.62 214.9 156.93 218.65"/><path class="ncv-12" d="M333.69,245.92a10,10,0,0,1-1.28-.8l-16.18-11.86c-2.92-2.14-5.93-2.69-8.26-1.51l-.17.11h0l-22.35,13,2,.67,7.83,3.55,10.65,7.55,8.4,4.46.38.08c2-1.65,4.15-3.07,5.36-5.47,2.08-3.64,7.87-4.68,11.28-7.64.34.22.69.42,1,.6A7.65,7.65,0,0,0,333.69,245.92Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M340.79,240.57a1.49,1.49,0,0,0-.92.32h0L318,253.55l.8,3.27.82-.39c-1.25,2-3.17,3.24-4.91,4.7l2.47.52,21.42-12.46.3-.13a5.35,5.35,0,0,0,.82-.52l0,0h0c1.63-1.26,2.55-3.45,2.55-6.19v-.26A1.5,1.5,0,0,0,340.79,240.57Z" transform="translate(-127.99 -33.82)"/><path class="ncv-16" d="M310.84,231.15a9.16,9.16,0,0,1,4.29,1.39A9.16,9.16,0,0,0,310.84,231.15Z" transform="translate(-127.99 -33.82)"/><path class="ncv-12" d="M320.8,254.57v-.26a1.5,1.5,0,0,0-3,0v.26c0,2-.64,3.49-1.75,4.05s-3.17.17-5.12-1.26L294.73,245.5c-2.49-1.83-5-2.48-7.18-1.91l13.37-7.75-15.49,9,2,.67,7.83,3.55,10.65,7.55,8.4,4.46.38.08c2-1.65,4.15-3.07,5.36-5.47a6.31,6.31,0,0,1,.73-1S320.8,254.59,320.8,254.57Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M314.31,262.39a9.75,9.75,0,0,1-5.63-2.12L292.5,248.41c-1.95-1.43-3.86-1.9-5.12-1.26s-1.75,2-1.75,4.05a1.5,1.5,0,0,1-3,0c0-3.18,1.24-5.64,3.4-6.73,2.32-1.18,5.33-.63,8.26,1.51l16.18,11.86c1.95,1.43,3.86,1.89,5.12,1.26s1.75-2,1.75-4.05v-.26a1.5,1.5,0,1,1,3,0v.26c0,3.18-1.24,5.64-3.4,6.73A5.75,5.75,0,0,1,314.31,262.39Z" transform="translate(-127.99 -33.82)"/><path class="ncv-2" d="M301.59,288.91s-3-1.54-4.92.75S292.13,297.35,292,301s2.89,3.4,4.66,2.54,6.93-8.35,7.24-9.82a5.09,5.09,0,0,0-.87-3.84C302.58,289.5,301.59,288.91,301.59,288.91Z" transform="translate(-127.99 -33.82)"/><path class="ncv-17" d="M302.26,288.17l.14,3.16a1.79,1.79,0,0,1-.89,1.64,3.51,3.51,0,0,1-2.35.37c-2.3-.37-2.5-1-2.67-4.18S302.26,288.17,302.26,288.17Z" transform="translate(-127.99 -33.82)"/><path class="ncv-2" d="M290.44,282.83s-3-1.54-4.92.75-4.55,7.69-4.63,11.34,2.89,3.4,4.66,2.54,6.93-8.35,7.24-9.82a5.09,5.09,0,0,0-.87-3.84C291.42,283.42,290.44,282.83,290.44,282.83Z" transform="translate(-127.99 -33.82)"/><path class="ncv-17" d="M291.1,282.1l.14,3.16a1.79,1.79,0,0,1-.89,1.64,3.51,3.51,0,0,1-2.35.37c-2.3-.37-2.5-1-2.67-4.18S291.1,282.1,291.1,282.1Z" transform="translate(-127.99 -33.82)"/><path class="ncv-18" d="M318.3,224.12c-.9-14.68-15.9,2.16-15.9,2.16l-10.26,10.06-9.24,10.15a9.11,9.11,0,0,0-2.3,7.32l3.74,28.47a2.8,2.8,0,0,0,2.81,2.43,9.51,9.51,0,0,0,1.38-.12,3.48,3.48,0,0,0,3.09-3.69l-.68-26.62,19.41-11.7S319.2,238.8,318.3,224.12Z" transform="translate(-127.99 -33.82)"/><path class="ncv-18" d="M329.46,229.71c-.9-14.68-15.9,2.16-15.9,2.16L303.3,241.93l-9.24,10.15a9.11,9.11,0,0,0-2.3,7.32l3.74,28.47a2.8,2.8,0,0,0,2.81,2.43,9.51,9.51,0,0,0,1.38-.12,3.48,3.48,0,0,0,3.09-3.69l-.68-26.62,19.41-11.7S330.36,244.39,329.46,229.71Z" transform="translate(-127.99 -33.82)"/><path class="ncv-7" d="M320.59,182.6C332,187.31,331.73,194,331.73,194s-2.23,24.64-1.47,41.09c.32,6.88-36.54,7.4-31-10.95,6.48-21.64,4.05-39.15,7.09-41.79S317.65,181.38,320.59,182.6Z" transform="translate(-127.99 -33.82)"/><ellipse class="ncv-19" cx="318.57" cy="187.09" rx="4.32" ry="5.86" transform="translate(-70.07 415.1) rotate(-75.56)"/><path class="ncv-14" d="M319.41,192.06a8.27,8.27,0,0,1-2.05-.26,7.56,7.56,0,0,1-4-2.44,4.34,4.34,0,0,1-1-3.86c.67-2.59,4-4,7.42-3.11a7.57,7.57,0,0,1,4,2.44,4.35,4.35,0,0,1,1,3.86h0C324.24,190.76,322,192.06,319.41,192.06Zm-1.71-8.86c-2.11,0-3.88,1-4.28,2.56a3.29,3.29,0,0,0,.8,2.9,6.47,6.47,0,0,0,3.41,2.08c2.84.73,5.57-.31,6.09-2.33a3.29,3.29,0,0,0-.8-2.9,6.47,6.47,0,0,0-3.41-2.08A7.28,7.28,0,0,0,317.7,183.21Z" transform="translate(-127.99 -33.82)"/><path class="ncv-19" d="M316,182.08a28,28,0,0,1-.1,4.06c-.06,1.13,3.9,2.19,4.93,1.17s.62-2.09.86-5.95S316,182.08,316,182.08Z" transform="translate(-127.99 -33.82)"/><path class="ncv-20" d="M321.72,181.36s-1,3.57-5.79,4.94l.07-3.25Z" transform="translate(-127.99 -33.82)"/><circle class="ncv-19" cx="316.3" cy="174.47" r="8.75" transform="matrix(0.97, -0.25, 0.25, 0.97, -161.6, 50.91)"/><path class="ncv-20" d="M318.31,174.79s-4.82,2.06-8.15,2.09-2.6-2.77-2.6-2.77l9.9-1.43Z" transform="translate(-127.99 -33.82)"/><path class="ncv-21" d="M309.16,175.34s4.2-1.78,7.88-1a3.86,3.86,0,0,1,2.22,1.32,1.31,1.31,0,0,0,.67.49c.65.15,1.72-2.56,3-2.62s2.12.84,1.08,2.5-.69,3.53-.21,3.8,5.56-3.62,1.08-12.5S309,163.2,307.24,165c0,0-1.86,1.62-3.38.18C303.86,165.17,302.16,177.9,309.16,175.34Z" transform="translate(-127.99 -33.82)"/><path class="ncv-19" d="M325.35,212v6.66a2.71,2.71,0,0,1-.88,2l-13.68,12.47,1.55,2.38,18.06-13.1a3.67,3.67,0,0,0,1.5-2.59l1.22-11.61Z" transform="translate(-127.99 -33.82)"/><path class="ncv-7" d="M330.76,190.7s4.15,6.24,5.69,22.66c0,0-7.09,2.29-11.11,1S330.76,190.7,330.76,190.7Z" transform="translate(-127.99 -33.82)"/><path class="ncv-22" d="M324.59,198.59a115.67,115.67,0,0,0-1.72,12.78,2.61,2.61,0,0,0,1.72,2.52h0Z" transform="translate(-127.99 -33.82)"/><path class="ncv-2" d="M321,241.81l-3-.4-19.51-11.26a2.71,2.71,0,0,0-2.44.1l-13.83,8-1.83-.24v1.82h0a.71.71,0,0,0,.42.64L303,253.21a2.71,2.71,0,0,0,2.44-.1l15.06-8.69a1,1,0,0,0,.6-.82h0Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M306.38,234.69l-1.39-.8H289.76l-7.51,4.33-1.83-.24v1.82h0a.71.71,0,0,0,.42.64L303,253.21a2.29,2.29,0,0,0,1.26.24Z" transform="translate(-127.99 -33.82)"/><path class="ncv-12" d="M281.23,238.09l-.81-.11v1.82h0a.71.71,0,0,0,.42.64l.39.23Z" transform="translate(-127.99 -33.82)"/><path class="ncv-4" d="M303.17,253.32a2.83,2.83,0,0,0,2.07-.13v-3.1h-2.07Z" transform="translate(-127.99 -33.82)"/><path class="ncv-14" d="M303,251.4l-22.11-12.77c-.63-.36-.55-1,.18-1.41l15.06-8.69a2.71,2.71,0,0,1,2.44-.1l22.11,12.77c.63.36.55,1-.18,1.41l-15.06,8.69A2.71,2.71,0,0,1,303,251.4Z" transform="translate(-127.99 -33.82)"/><path class="ncv-5" d="M302.58,249.46l-18.39-10.61c-.52-.3-.45-.82.15-1.17l8.07-4.54a2.26,2.26,0,0,1,2-.08l18.39,10.61c.52.3.45.82-.15,1.17l-8.07,4.54A2.26,2.26,0,0,1,302.58,249.46Z" transform="translate(-127.99 -33.82)"/><path class="ncv-19" d="M296.93,228.11l-.23,1.53a11.28,11.28,0,0,0,.1,3.91l.27,1.34a1.89,1.89,0,0,0,1.51,1.49h0a1,1,0,0,0,1.22-.91l.36-3.26s.83,1.09,1.24,1.09S301,230,300,228.19,296.93,228.11,296.93,228.11Z" transform="translate(-127.99 -33.82)"/><path class="ncv-19" d="M304.42,203.86l-2.37,4.7a9.21,9.21,0,0,0-1,3.56l-1,16.06-3.12-.07-1.42-18a6.6,6.6,0,0,1,.08-1.67l1.62-9.15Z" transform="translate(-127.99 -33.82)"/><path class="ncv-2" d="M302.2,252.62l-1.85-2.42-19.5-11.29a2.71,2.71,0,0,1-1.13-2.17l0-16-1.12-1.46,1.05-.61h0a.71.71,0,0,1,.76,0l22.1,12.79a2.71,2.71,0,0,1,1.13,2.17l0,17.38a1,1,0,0,1-.41.93h0Z" transform="translate(-127.99 -33.82)"/><path class="ncv-3" d="M288.72,243.47l-1.39-.8-7.6-13.21v-8.67l-1.12-1.46,1.05-.61h0a.71.71,0,0,1,.76,0l22.1,12.79a2.29,2.29,0,0,1,.83,1Z" transform="translate(-127.99 -33.82)"/><path class="ncv-12" d="M279.11,220l-.5-.65,1.05-.61h0a.71.71,0,0,1,.76,0l.39.23Z" transform="translate(-127.99 -33.82)"/><path class="ncv-4" d="M302.73,231.69a2.83,2.83,0,0,1,.92,1.86l-2.16,1.25-1-1.8Z" transform="translate(-127.99 -33.82)"/><path class="ncv-12" d="M301.48,232.16l-22.1-12.79c-.62-.36-1.13,0-1.13.85l0,17.38a2.71,2.71,0,0,0,1.13,2.17l22.1,12.79c.63.36,1.13,0,1.13-.85l0-17.38A2.71,2.71,0,0,0,301.48,232.16Z" transform="translate(-127.99 -33.82)"/><path class="ncv-19" d="M312.34,235.53l-.35.73a4.91,4.91,0,0,1-1.85,2l-2.19,1.35a2.19,2.19,0,0,1-2.24.05l-.07,0a1.32,1.32,0,0,1-.19-2l2.29-2.36s-1.29,1-1.65.59,1.25-1.71,2.41-1.76a4.59,4.59,0,0,0,2.29-1Z" transform="translate(-127.99 -33.82)"/><path class="ncv-7" d="M306.53,182.34s-8.41,9.15-11.8,17.54a17.17,17.17,0,0,0,9.91,7.21C311.68,209.13,306.53,182.34,306.53,182.34Z" transform="translate(-127.99 -33.82)"/><path class="ncv-22" d="M303.06,206.55l1.36-13.16-3.21,12.33A18.4,18.4,0,0,0,303.06,206.55Z" transform="translate(-127.99 -33.82)"/><path class="ncv-14" d="M312.83,180.5l-2.26-.62a5.45,5.45,0,0,0,2.65,2.13c1.57.43,1.82-.9,1.82-.9Z" transform="translate(-127.99 -33.82)"/><path class="ncv-22" d="M210.4,125.25s.5,10.4,1.3,17.39,17.62-5.37,17.62-5.37v-8Z" transform="translate(-127.99 -33.82)"/><path class="ncv-2" d="M219.37,254.63c.25.63,4.61,5.94,9,7.27a10,10,0,0,0,4,.55,1.32,1.32,0,0,0,1.07-1.76,16.57,16.57,0,0,0-8.37-9.22C217.66,247.81,219.37,254.63,219.37,254.63Z" transform="translate(-127.99 -33.82)"/><path class="ncv-2" d="M217.91,256.67a36.1,36.1,0,0,1,2.15,7.08c.31,2-.77,4.52-1.66,6.21a1.81,1.81,0,0,1-2.83.49,10.49,10.49,0,0,1-3.54-6.77c-.51-5.44,0-6.38,0-6.38Z" transform="translate(-127.99 -33.82)"/><path class="ncv-18" d="M207.41,191a103.37,103.37,0,0,0,0,14.44c.57,7.58,2.61,43.05,3,51.58,0,0-.19,2.58,4.81,2s4.6-3.44,4.6-3.44,7-.09,7.24-4.23,7.19-49.43,7.19-65.72Z" transform="translate(-127.99 -33.82)"/><path class="ncv-19" d="M236.84,155.53l3.44,5.33,11.83,14.29a2.65,2.65,0,0,1-1.88,1.67c-1.15.27-11.1-9.22-15.39-13.38a3.3,3.3,0,0,1-.45-4.19Z" transform="translate(-127.99 -33.82)"/><path class="ncv-10" d="M230.12,133.65s5.47-.14,7.37,7.76,3.39,17.79,1.74,18.61c-5,2.47-8.11-.42-8.11-.42Z" transform="translate(-127.99 -33.82)"/><path class="ncv-7" d="M231.76,134a4.47,4.47,0,0,0-3-.16c-4.66,1.34-22.17,6.48-25.05,8.94-3.33,2.85,5,18.86,4.88,24.11s-.71,11.44-1.18,17.15-1.09,8.84,3.58,11.26,12.64,2.54,18.61-2,4.88-7.66,4.64-11-2.28-17.58-2.1-21.63a15.33,15.33,0,0,0,3.66-4.2c1.56-2.66-1.19-7.54-2.34-10.71s.64-6.8.29-9.39A2.94,2.94,0,0,0,231.76,134Z" transform="translate(-127.99 -33.82)"/><ellipse class="ncv-14" cx="219.58" cy="140.29" rx="6.63" ry="5.26" transform="matrix(0.99, -0.13, 0.13, 0.99, -144.04, -4.78)"/><ellipse class="ncv-19" cx="219.58" cy="140.29" rx="4.74" ry="3.76" transform="translate(-144.04 -4.78) rotate(-7.3)"/><path class="ncv-19" d="M221.71,132.92s-3.16-2.6-3.78-1.28-1.13,7-1.13,7l6.28,1.69-1-5.72S223.37,133.5,221.71,132.92Z" transform="translate(-127.99 -33.82)"/><circle class="ncv-19" cx="222.16" cy="126.17" r="9.37" transform="translate(-44.89 306.69) rotate(-86.62)"/><path class="ncv-20" d="M217.49,133.27c-.06.29-.11.61-.16.93.63,3.26,5.51,4.69,5.51,4.69l-.72-4.33s.59-.5.42-1C220.61,133,218.18,132.41,217.49,133.27Z" transform="translate(-127.99 -33.82)"/><circle class="ncv-19" cx="222.16" cy="126.17" r="9.37" transform="translate(-44.89 306.69) rotate(-86.62)"/><polygon class="ncv-19" points="71.07 132.03 72.12 157.11 75.79 157.48 78.18 134.91 71.07 132.03"/><path class="ncv-10" d="M211.12,163.75c-1.21-5.36-3.61-17.19-3.61-17.19l-1,11.77c1.18,3.49,2.2,6.69,2.15,8.55-.07,3.08-.3,6.49-.58,9.93h0S212.33,169.1,211.12,163.75Z" transform="translate(-127.99 -33.82)"/><path class="ncv-8" d="M204.46,142.25s-2.93,1.12-4.59,10.13-2.9,18,.06,19.19,5.43,2,6.3-.37,1.41-14,1.52-18.19S208,143.08,204.46,142.25Z" transform="translate(-127.99 -33.82)"/><path class="ncv-19" d="M251.23,174.1a7.87,7.87,0,0,1,2.74,1.83,17.83,17.83,0,0,1,1.87,2.51c.91,1.36,1.68,4.31,1.13,4.67s-3.74-4.93-4.26-3.7,0,2.37-.65,2.39-2.95-5.32-4.75-7S251.23,174.1,251.23,174.1Z" transform="translate(-127.99 -33.82)"/><path class="ncv-23" d="M219.8,255.58a14.37,14.37,0,0,0,2-.21h0l1.38-55.13Z" transform="translate(-127.99 -33.82)"/><path class="ncv-7" d="M214.49,225.8l-2-2.55L192,211.37a2.85,2.85,0,0,1-1.19-2.28l0-16.8-1.18-1.54,1.11-.64h0a.75.75,0,0,1,.8,0l23.25,13.46A2.85,2.85,0,0,1,216,205.9l0,18.29a1,1,0,0,1-.44,1h0Z" transform="translate(-127.99 -33.82)"/><path class="ncv-24" d="M200.31,216.17l-1.46-.84-8-13.9V192.3l-1.18-1.54,1.11-.64h0a.75.75,0,0,1,.8,0l23.25,13.46a2.41,2.41,0,0,1,.88,1Z" transform="translate(-127.99 -33.82)"/><path class="ncv-24" d="M190.2,191.44l-.52-.68,1.11-.64h0a.75.75,0,0,1,.8,0l.41.24Z" transform="translate(-127.99 -33.82)"/><path class="ncv-7" d="M215.05,203.77a3,3,0,0,1,1,2L213.75,207l-1.09-1.89Z" transform="translate(-127.99 -33.82)"/><path class="ncv-8" d="M213.73,204.27,190.48,190.8c-.66-.38-1.19,0-1.19.9l0,18.29a2.85,2.85,0,0,0,1.19,2.28l23.25,13.46c.66.38,1.19,0,1.19-.9l0-18.29A2.85,2.85,0,0,0,213.73,204.27Z" transform="translate(-127.99 -33.82)"/><path class="ncv-19" d="M200.15,190.71a56.81,56.81,0,0,0-.82,7.73c.15,1.88,1.15,5,1.91,4.9s0-7.54,1.36-6.8,1.48,2,2.08,1.57-1.06-6.84-.61-9.61S200.15,190.71,200.15,190.71Z" transform="translate(-127.99 -33.82)"/><path class="ncv-20" d="M225.76,127c4.7,1.67,5.62.65,5.66.6,0-.28.08-.57.09-.86a9.35,9.35,0,0,0-.31-3L219,122.08A13.29,13.29,0,0,0,225.76,127Z" transform="translate(-127.99 -33.82)"/><path class="ncv-22" d="M231.85,117.39c-1.11-.95-5.11-5.65-12.27-4.54-4.48.69-8.25,3.75-9.09,10.71a16,16,0,0,0,4.33,12.73,3.84,3.84,0,0,0,.51-.26c1.79-1.18,2-1.83,2-1.84l.4-3.55a1,1,0,0,0-.89-1,1.79,1.79,0,0,1-1.31-.8c-1-1.35-.55-3.44,1.5-3.52a1.58,1.58,0,0,0,1.64-1.17.84.84,0,0,1,1.1-.57c2.34.85,8.11,2.67,11.82,1.62C236.33,123.88,233,118.34,231.85,117.39Z" transform="translate(-127.99 -33.82)"/><path class="ncv-14" d="M226.51,131.23l2.87-.79a6.92,6.92,0,0,1-3.37,2.7c-2,.55-2.31-1.14-2.31-1.14Z" transform="translate(-127.99 -33.82)"/><polygon class="ncv-24" points="77.03 164.12 74.58 162.72 75.5 164.22 76.74 164.68 77.03 164.12"/></svg></div></div></div>');

  }

	else {
    var j =1;
  	for (var i = 0; i < campaignsData.length; i++) {

  			if (campaignsData[i]['status'] === 'active') {
  				campaignStatus = '<div class="campaignStatus pullLeft active"> <span> فعال </span></div>';
  			} else if (campaignsData[i]['status'] === 'deActive') {
  				campaignStatus = '<div class="campaignStatus pullLeft"> <span> غیرفعال </span></div>';
  			}

  			var cId = "'" + campaignsData[i]['cId'] + "'";

        if (campaignsData[i]['campaignDetails']['campaignSubTypeTemplate'] === null) {

          $('#campaignsDataBody').prepend('<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 campaignGrid"><div class="campaignCard" id="campaignCard'+ campaignsData[i]['cId'] +'"><div class="campaignMenu"><a href="javascript:;"> <i class="fas fa-ellipsis-h"></i> </a><ul class="uiList subMenu"><li> <a href="javascript:;" onclick="editCampaign('+ cId +')"> ویرایش </a></li><li> <a href="javascript:;" onclick="copyCampaign('+ cId +')"> کپی </a></li><li> <a href="javascript:;" onclick="deleteCampaign('+ cId +')"> حذف </a></li></ul></div><div class="campaignTitle"><div class="campaignSubTypePic"><img src="'+ campaignsData[i]['campaignDetails']['defaults']['subTypeImage'] +'" alt="'+ campaignsData[i]['name'] +'"></div><div class="campaignTitleContent"><div class="campaignTool"><span>'+ campaignsData[i]['campaignDetails']['defaults']['subTypeTitle'] +' | دسته: <span> '+ campaignsData[i]['campaignDetails']['campaignTypeTitle'] +' </span> </span></div><h4> '+ campaignsData[i]['name'] +' </h4></div></div><div class="campaignContent"><div class="campaignCat pullRight"> <span> آخرین ویرایش: '+ campaignsData[i]['modifyDate'] +' </span></div>'+ campaignStatus +'<div class="clear"></div></div><a href="javascript:;" data-cid="'+ campaignsData[i]['cId'] +'" onclick="openCampaignDetails('+ cId +')" class="more">'+ campaignsData[i]['name'] +' </a></div></div>');


        } else {

          $('#campaignsDataBody').prepend('<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 campaignGrid"><div class="campaignCard" id="campaignCard'+ campaignsData[i]['cId'] +'"><div class="campaignMenu"><a href="javascript:;"> <i class="fas fa-ellipsis-h"></i> </a><ul class="uiList subMenu"><li> <a href="javascript:;" onclick="editCampaign('+ cId +')"> ویرایش </a></li><li> <a href="javascript:;" onclick="copyCampaign('+ cId +')"> کپی </a></li><li> <a href="javascript:;" onclick="deleteCampaign('+ cId +')"> حذف </a></li></ul></div><div class="campaignTitle"><div class="campaignSubTypePic"><img src="'+ campaignsData[i]['campaignDetails']['campaignSubTypeTemplate']['connectionSettings']['metas']['image'] +'" alt="'+ campaignsData[i]['name'] +'"></div><div class="campaignTitleContent"><div class="campaignTool"><span> کمپین '+ campaignsData[i]['campaignDetails']['campaignSubTypeTitle'] +' | دسته: <span> '+ campaignsData[i]['campaignDetails']['campaignTypeTitle'] +' </span> </span></div><h4> '+ campaignsData[i]['name'] +' </h4></div></div><div class="campaignContent"><div class="campaignCat pullRight"> <span> آخرین ویرایش: '+ campaignsData[i]['modifyDate'] +' </span></div>'+ campaignStatus +'<div class="clear"></div></div><a href="javascript:;" data-cid="'+ campaignsData[i]['cId'] +'" onclick="openCampaignDetails('+ cId +')" class="more">'+ campaignsData[i]['name'] +' </a></div></div>');

        }

  			j=j+1;
  	}
  }

}





function editCampaign(cId) {

  Cookies.set('cId', cId, { expires: 1, path: '/' });
  Cookies.set('remember_edit',"true", { expires: 1, path: '/' });

  window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/campaign/campaign.php/?page=campaignTypes&mode=editCampaign";

}



function deleteCampaign(cId) {

	var sbmToken = getCookie('sbm_token');

	var deleteCampaignData = { 'cookie' : sbmToken, 'cId' : cId };

	$("#campaignCard"+cId).css({'opacity' : '0.5'});

	swal(" از حذف کمپین مطمئن هستید؟ ", {
  dangerMode: true,
  buttons: [false,'حذف',],
	})
	.then((isConfirm) => {
		if (isConfirm) {

	 	 	ajaxReq(deleteCampaignData,'https://api.sabetmikonim.com/panel/delete-campaign/','deleteCampaign');

		}
	});

}


function copyCampaign(cId) {

  var sbmToken = getCookie('sbm_token');
  var dId = getCookie('dId');

  var copyCampaignData = { 'cookie' : sbmToken, 'cId' : cId, 'operation' : 'copyCampaign', 'dId' : dId };

  ajaxReq(copyCampaignData,'https://api.sabetmikonim.com/panel/action/','copyCampaign');

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

      var cId = "'"+ getData.campaignsDetailData.cId +"'";

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


			$('a[name=detailEditCampaign]').attr('onclick','editCampaign('+cId+')');
			$('a[name=deleteCampaign]').attr('onclick','deleteCampaign('+cId+')');

			document.getElementById('campaignID').innerHTML = getData.campaignsDetailData.cId;


			document.getElementById('campaignDetailName').innerHTML = getData.campaignsDetailData.campaignName;
			document.getElementById('campaignPageViews').innerHTML = getData.campaignsDetailData.statisticalInformation.pageViews;
			document.getElementById('campaignVisitors').innerHTML = getData.campaignsDetailData.statisticalInformation.visitors;
			document.getElementById('campaignClicks').innerHTML = getData.campaignsDetailData.statisticalInformation.clicks;
			document.getElementById('CTRBoxStatistics').innerHTML = getData.campaignsDetailData.statisticalInformation.ctr+"%";
			document.getElementById('campaignContactsCount').innerHTML = getData.campaignsDetailData.contactCount;

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

			$("#campaignCard"+getData.cId).remove();
      createViewPanel({contentId : 'campaigns'},true);

      Cookies.remove('cId',{path: "/sabetmikonimv2"});

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

      createViewPanel({contentId : 'campaignDetails'},true);

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

      Cookies.set('dId', getData.dId, { expires: 7, path: '/' });

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

  } else if (reqType === "settings") {

    if (getData.status === "requestDone") {

      document.getElementById('settingsPackageName').innerHTML = getData.packageName;
      document.getElementById('settingsPackagePrice').innerHTML = getData.packagePrice + ' تومان / ' + getData.packagePeriod;

      document.getElementById('packageDateOffset').innerHTML = getData.packageDateOffset;
      $('#packageUsageProgressBar').css({'width': ''+getData.packageUsagePercent+'%'});

      // $('#packageUsageProgressBar').attr('aria-valuenow') = getData.packageUsagePercent;

      var packageUserPercentStyle = getData.packageUsagePercent+'%';
      // document.getElementById('packageUsageProgressBar').css('width': ' '+packageUserPercentStyle+' ');

      document.getElementById('packageDetailVisitorUsed').innerHTML = getData.packageVisitorUsed;
      document.getElementById('packageDetailVisitorDifference').innerHTML = getData.packageUsagePercent + '%';
      document.getElementById('packageDetailVisitor').innerHTML = getData.packageVisitor;

    } else {

      swal({
        title: "خطا!",
        text: " خطایی رخ داده است! ",
        icon: "error",
        button: "تلاش مجدد",
      });

    }

  } else if (reqType === "getProfileData") {

    if (getData.status === "requestDone") {

      if (getData.emailVerifyStatus === "False") {
        $('#emailGroup').addClass('has-error'); // add the error class to show red input
        $('#emailGroup').append('<div class="help-block"> ایمیل شما تایید نشده است! آن را حتما تایید کنید: <a href="javascript:;" onclick="resendActivitationEmail()"> ارسال مجدد ایمیل فعالسازی </a> </div>'); // add the actual error message under our input

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

  } else if (reqType === "copyCampaign") {

    if (getData.status === "campaignCopied") {

      createViewPanel({contentId : 'campaigns'},true);

    }

  } else if (reqType === "pay") {

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



function loginToDomain(dId, domainStatus) {

  var oldDid = getCookie('dId');

  var sbmToken = getCookie('sbm_token');
  var getCampaignsData = { 'cookie' : sbmToken, 'toDid' : dId, 'operation' : 'enterDomain', 'dId' : oldDid };

  ajaxReq(getCampaignsData,'https://api.sabetmikonim.com/panel/action/','loginToDomain');

  Cookies.set('dId',dId, { expires: 30, path: '/' });

  if (domainStatus === "True") {

    createViewPanel({contentId : 'campaigns'},true);

  } else if (domainStatus === "False") {

    createViewPanel({contentId : 'websiteIntg'},true);

  }

}



function openCampaignDetails(cId) {

  Cookies.set('cId', cId, { expires: 1, path: '/' });

  createViewPanel({contentId : 'campaignDetails'},true);;

}



function deleteNotif(notifId) {

	$('.listItem#contact-'+notifId).css({"opacity" : "0.5"});

	var cid = getCookie('cId');

	var sbmToken = getCookie('sbm_token');

	var notifArray = [notifId];

	var deleteNotifData = { 'cookie' : sbmToken, 'cId' : cid, 'contactsId' : notifArray };

	ajaxReq(deleteNotifData,'https://api.sabetmikonim.com/panel/delete-notifications/','deleteNotif');

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

	var cid = getCookie('cId');

	var sbmToken = getCookie('sbm_token');

	var notifSelect = [];
	$("input[name=deleteNotification]:checked").each(function(){
			notifSelect.push($(this).val());
	});

	if (notifSelect.length > 0) {

		var deleteNotifData = { 'cookie' : sbmToken, 'cId' : cid, 'contactsId' : notifSelect };

		ajaxReq(deleteNotifData,'https://api.sabetmikonim.com/panel/delete-notifications/','deleteNotif');

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

	  ajaxReq(paymentData,'https://api.sabetmikonim.com/panel/order-complete/','checkPayment');

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

	  ajaxReq(campaignStatusData,'https://api.sabetmikonim.com/panel/edit-campaign/','editCampaignStatus');


  });













});
