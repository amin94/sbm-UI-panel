// functions
function timeRadioValue(timeRadioValue) {
	var realTime;
	if (timeRadioValue === "24h") {
		realTime = " ۲۴ ساعت ";
	} else if (timeRadioValue === "7d") {
		realTime = " ۷ روز ";
	} else if (timeRadioValue === "30d") {
		realTime = " ۳۰ روز ";
	}


	document.getElementById('hsOptionTime').innerHTML = realTime;
}







window.featureData = {};
var eachFeaturesData = {};
var finalFeaturesData = {};
function saveFeatureSettings(notificationTemplateId) {

	$('.notifSection').html('');

	for (var i = 0; i < notifFormTemplate.length; i++) {

		if (notificationTemplateId === notifFormTemplate[i]['notificationTemplateId']) {

			eachFeaturesData[notificationTemplateId] = {};

				var formTemps = notifFormTemplate[i]['templateData']['formTemplate']['formTemp'];


				for (var j = 0; j < formTemps.length; j++) {

					if (formTemps[j]['fieldBodyType'] === "section") {

						eachFeaturesData[notificationTemplateId][formTemps[j]['fieldName']] = $('input[name='+formTemps[j]['fieldName']+']').val();

					} else if (formTemps[j]['fieldBodyType'] === "option") {

						var fieldCount = formTemps[j]['fieldCount'];
						var eachFormTempField = formTemps[j]['eachFormTempField'];

						for (var k = 0; k < fieldCount; k++) {

							if (eachFormTempField[k]['fieldType'] === "text") {

								eachFeaturesData[notificationTemplateId][eachFormTempField[k]['fieldName']] = $('input[name='+eachFormTempField[k]['fieldName']+']').val();

							} else if (eachFormTempField[k]['fieldType'] === "iphoneCheckbox") {

								if ($('input[name='+eachFormTempField[k]['fieldName']+']').prop('checked')) {

			            eachFeaturesData[notificationTemplateId][eachFormTempField[k]['fieldName']] = 'true';

			          } else {

			            eachFeaturesData[notificationTemplateId][eachFormTempField[k]['fieldName']] = 'false';

			          }

							} else if (eachFormTempField[k]['fieldType'] === "radio") {

								eachFeaturesData[notificationTemplateId][eachFormTempField[k]['fieldName']] = $('input[name='+ eachFormTempField[k]['fieldName'] +']:checked').val();

							} else if (eachFormTempField[k]['fieldType'] === "select") {

								eachFeaturesData[notificationTemplateId][eachFormTempField[k]['fieldName']] = $('select[name='+ eachFormTempField[k]['fieldName'] +'] option:selected').val();

							}

						}

					}



				}



				featureData[notificationTemplateId] = eachFeaturesData[notificationTemplateId];
				console.log(featureData);


				break;

		}

	}

	$('.mask').fadeOut();
	$('.modalOption').fadeOut();
	$('.modalOption').removeClass('openModal');

}






// open deactive fetaures Dialog
var toolSettingsHistory = false;
function openFeaturesModal(notificationTemplateId) {

	// check edit or setupped tools settings
	if (typeof featureData[notificationTemplateId]!=="undefined") {
		toolSettingsHistory = true;
	}

	$('#featureModal').attr('data-templateId',notificationTemplateId);
	$('#saveFeatureSettingsBtn').attr('onclick',"saveFeatureSettings('"+ notificationTemplateId +"')");
	$('.mask').attr('onclick',"saveFeatureSettings('"+ notificationTemplateId +"')");

	$('#featureOptionsBody .section').remove();
	$('#featuresOptionsBody .inlineOption').remove();

	for (var i = 0; i < notifFormTemplate.length; i++) {


		// detect which notif selected
		if (notificationTemplateId === notifFormTemplate[i]['notificationTemplateId']) {

			// add notif demo to modal
			$('.notifSection').html(notifFormTemplate[i]['templateData']['template']);

			var notificationSelectTemp = notifFormTemplate[i]['templateData']['formTemplate']['selectTemp'];
			// add titles to modal
			$('#modalHeaderId h4').text(notificationSelectTemp['title']);
			$('#modalHeaderId p#featureDesc').text(notificationSelectTemp['desc']);



			var formTemps = notifFormTemplate[i]['templateData']['formTemplate']['formTemp'];
			// create forms and place them
			var checkBoxCheck = false;
			for (var j = 0; j < formTemps.length; j++) {

				if (formTemps[j]['fieldBodyType'] === "section") {


					var panelHelp = '';
					if ((formTemps[j]['inputHelp'] !=='') && (typeof formTemps[j]['inputHelp'] !=='undefined')) {

						panelHelp = '<span class="info tippyInput input" id="'+ formTemps[j]['fieldName'] +'Help" data-tippy-content="'+formTemps[j]['inputHelp']+'" > <i class="fas fa-question"></i> </span>'

					}



					if (formTemps[j]['fieldType'] === "text") {

						$('#featureOptionsBody').append('<div class="section"><div class="title"><h5> '+ formTemps[j]['fieldBodyTitle'] +' '+ panelHelp +'</h5></div><div class="container"><input type="'+ formTemps[j]['fieldType'] +'" name="'+ formTemps[j]['fieldName'] +'" value="'+ formTemps[j]['fieldValue'] +'" '+ formTemps[j]['fieldFuncs'] +'></div></div>');

						// replace filled data by user in fields automaticaly
						if ((toolSettingsHistory) && (featureData[notificationTemplateId][formTemps[j]['fieldName']]!=="")) {

								$('input[name='+formTemps[j]['fieldName']+']').val(featureData[notificationTemplateId][formTemps[j]['fieldName']]);

						}

					} else if (formTemps[j]['fieldType'] === "file") {

						$('#featureOptionsBody').append('<div class="section"><div class="title"><h5> '+ formTemps[j]['fieldBodyTitle'] +' '+ panelHelp +' </h5></div><div class="container"> <label class="fileUpload"> <input type="'+ formTemps[j]['fieldType'] +'" name="'+ formTemps[j]['fieldName'] +'" value="'+ formTemps[j]['fieldValue'] +'" '+ formTemps[j]['fieldFuncs'] +'> <div class="icon"> <i class="fa fa-plus-circle"></i> </div> <div> فایل مورد نظر را انتخاب نمایید </div> </label></div></div>');

					} else if (formTemps[j]['fieldType'] === "siteInput") {

							$('#featureOptionsBody').append('<div class="section"><div class="title"><h5> '+ formTemps[j]['fieldBodyTitle'] +' <span class="info input" id="recentActivityMSG" data-tippy> <i class="fas fa-question"></i> </span><div id="recentActivityMSGHelp" class="disn"><p> این پیام مستقیما در نوتیفیکیشن‌های روی سایت شما مشابه نمونه بالای این صفحه نمایش داده می‌شود.</p></div></h5></div><div class="container"><input type="'+ formTemps[j]['fieldType'] +'" class="ltrInput" onclick="inPanelLinkVerify(this.value)" name="'+ formTemps[j]['fieldName'] +'" value="'+ formTemps[j]['fieldValue'] +'" '+ formTemps[j]['fieldFuncs'] +'></div></div>');

					}

				} else if (formTemps[j]['fieldBodyType'] === "option") {


					var fieldCount = formTemps[j]['fieldCount'];
					var eachFormTempField = formTemps[j]['eachFormTempField'];

					var inputHTML = formTemps[j]['fieldHTMLText'];
					for (var k = 0; k < fieldCount; k++) {

						// display all inputs
							if (eachFormTempField[k]['fieldType'] === "text") {


								// replace filled data by user in fields automaticaly
								if ((toolSettingsHistory) && (featureData[notificationTemplateId][eachFormTempField[k]['fieldName']]!=="")) {

									var inputOption = '<input type="'+ eachFormTempField[k]['fieldType'] +'" name="'+ eachFormTempField[k]['fieldName'] +'" value="'+ featureData[notificationTemplateId][eachFormTempField[k]['fieldName']] +'" '+ eachFormTempField[k]['fieldFuncs'] +'>';

								} else {

									var inputOption = '<input type="'+ eachFormTempField[k]['fieldType'] +'" name="'+ eachFormTempField[k]['fieldName'] +'" value="'+ eachFormTempField[k]['fieldValue'] +'" '+ eachFormTempField[k]['fieldFuncs'] +'>';

								}


							} else if (eachFormTempField[k]['fieldType'] === "select") {

								// get options
								var options='';
								var optionItem = eachFormTempField[k]['option'];
								for (var s = 0; s < optionItem.length; s++) {


									// replace filled data by user in fields automaticaly
									if ((toolSettingsHistory) && (featureData[notificationTemplateId][eachFormTempField[k]['fieldName']]!=="")) {

										if (featureData[notificationTemplateId][eachFormTempField[k]['fieldName']] === optionItem[s]['value']) {

											options = options + ' <option value="'+ optionItem[s]['value'] +'" selected> '+ optionItem[s]['text'] +' </option> ';

										} else {

											options = options + ' <option value="'+ optionItem[s]['value'] +'"> '+ optionItem[s]['text'] +' </option> ';

										}

									} else {

										options = options + ' <option value="'+ optionItem[s]['value'] +'"> '+ optionItem[s]['text'] +' </option> ';

									}



								}

								// create main select field
								var inputOption = ' <select name="'+ eachFormTempField[k]['fieldName'] +'" id=""> ' + options + '</select>';

							} else if (eachFormTempField[k]['fieldType'] === "radio") {

								var radios = '';
								var radioItem = eachFormTempField[k]['option'];
								var checkedRadio;
								for (var s = 0; s < radioItem.length; s++) {


									// replace filled data by user in fields automaticaly
									if ((toolSettingsHistory) && (featureData[notificationTemplateId][eachFormTempField[k]['fieldName']]!=="")) {

										if (radioItem[s]['value'] === featureData[notificationTemplateId][eachFormTempField[k]['fieldName']]) {

											checkedRadio = 'checked';

										} else {

											checkedRadio = '';

										}

									} else {

										if (s===0) {
											checkedRadio = 'checked';
										} else {
											checkedRadio = '';
										}

									}



									radios = radios + ' <input type="radio" name="'+ eachFormTempField[k]['fieldName'] +'" id="'+ radioItem[s]['id'] +'" value="'+ radioItem[s]['value'] +'" '+ checkedRadio +' '+radioItem[s]['fieldFuncs']+'> <label for="'+ radioItem[s]['id'] +'" class="radioInput"> '+ radioItem[s]['text'] +' </label> ';

								}

								var inputOption = radios;

							} else if (eachFormTempField[k]['fieldType'] === "iphoneCheckbox") {


								var checkboxStatus;

								// replace filled data by user in fields automaticaly
								if ((toolSettingsHistory) &&(featureData[notificationTemplateId][eachFormTempField[k]['fieldName']]!=="")) {

									if (featureData[notificationTemplateId][eachFormTempField[k]['fieldName']] === "true") {
										checkboxStatus = 'checked';
									} else {
										checkboxStatus = '';
									}

								} else {

									if (eachFormTempField[k]['fieldValue'] === "active") {
										checkboxStatus = 'checked';
									} else {
										checkboxStatus = '';
									}

								}



								var inputOption = "<input type='checkbox' class='switchdemo' name='"+ eachFormTempField[k]['fieldName'] +"' value='"+ eachFormTempField[k]['fieldValue'] +"' "+ eachFormTempField[k]['fieldFuncs'] +" "+checkboxStatus+">";

								checkBoxCheck = true;

							}





							// get Help Contents for inputs in panel
							var panelHelp = '';
							if ((eachFormTempField[k]['inputHelp'] !=='') && (typeof eachFormTempField[k]['inputHelp'] !=='undefined')) {

								panelHelp = '<span class="info tippyInput input" id="'+ eachFormTempField[k]['fieldName'] +'Help" data-tippy-content="'+ eachFormTempField[k]['inputHelp'] +'" > <i class="fas fa-question"></i> </span>'

							}



							// replace in main HTML
							inputHTML = inputHTML.replace('{{input'+ k +'}}', inputOption);


					}



					$('#featuresOptionsBody').append('<div class="inlineOption flex-inline"> '+ inputHTML +' '+ panelHelp +'</div>');

					tippy('.tippyInput', {
					arrow: true,
					arrowType: 'round',
					interactive: true,
					theme: 'sbmToolTip'
				});


				}




			}

			if (checkBoxCheck) {

				$(".switchdemo").simpleSwitch();

			}

		}

	}

	$('#featureModal').fadeIn();
	$('#featureModal').addClass('openModal');

	$('.mask').fadeIn();
}


function openDeactiveFeatureModal() {

	$('#deactiveFeatures').addClass('openModal');

	$('.mask').fadeIn();

}


// more form cards function in capture forms
function addForm(formSectionId) {

	// capture forms section
	if (formSectionId==1) {

		var cardCaptureCounter = $('#captureLinksBody .card').length;

		cardCaptureCounter = cardCaptureCounter + 1;
		var exampleUrl = 'https://blinkco.net/order-instagram-packages/';

		var cardCaptureHtml = '<div class="col-md-12" id="captureCardGrid'+ cardCaptureCounter +'"> <div class="card"> <div class="header"> <h4 class="title"> لینک '+ cardCaptureCounter +'</h4> <div class="siteStatus" style="display:none" id="status'+ cardCaptureCounter +'"> <p class="statusText statusSuccess" style="display:none"> <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <defs> <style>.cls-tick-1{fill: #00e640;}.cls-2{fill: #fff;}</style> </defs> <title>if_success_1646004</title> <circle class="cls-tick-1" cx="256" cy="256" r="256"/> <path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/> </svg> اتصال برقرار شد </p><p class="statusText statusUnSuccess" style="display:none"> <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"> <defs> <style>.clsss-1{fill: #d75a4a;}.clsss-2{fill: none; stroke: #fff; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 2px;}</style> </defs> <title>flaticon1533587820-svg</title> <circle class="clsss-1" cx="25" cy="25" r="25"/> <polyline class="clsss-2" points="16 34 25 25 34 16"/> <polyline class="clsss-2" points="16 16 25 25 34 34"/> </svg> اتصال برقرار نشد </p><p class="statusText statusLoading" style="display:none"> <img src="../assets/img/inputLoader.svg" alt="input loader"> در حال بررسی </p></div><div class="clear"></div></div><div class="content"> <div class="row"> <div class="col-md-12"> <div class="form-group" id="siteInputFormGroup'+ cardCaptureCounter +'"> <label> لینک صفحه حاوی فرم </label> <div class="inputs"> <div class="selectBody"> <select class="conditionsSelect" name="captureConditionsInput'+ cardCaptureCounter +'"> <option value="include"> شامل شود </option> <option value="exact"> دقیقا </option> </select> </div><input type="text" autocomplete="off" class="form-control captureSiteInput" onfocus="clearActions('+ cardCaptureCounter +',1)" onkeyup="realType(this.value,'+ cardCaptureCounter +',1)" name="siteInput'+ cardCaptureCounter +'" id="siteInput'+ cardCaptureCounter +'" placeholder="https://blinkco.net/order-instagram-packages/"> <div class="clear"></div></div><div onclick="test('+ cardCaptureCounter +',1,1)" class="selectLink selectLink'+ cardCaptureCounter +'" style="display:none"> <p id="siteInputLink'+ cardCaptureCounter +'"> </p><span> ثبت لینک </span> <div class="clear"></div></div></div></div></div><div class="row"> <div class="col-md-6"> <div class="form-group"> <label> آیدی فیلد ایمیل </label> <input type="text" class="form-control" name="emailField'+ cardCaptureCounter +'"> </div></div><div class="col-md-6"> <div class="form-group"> <label> آیدی فیلد نام (و نام خانوادگی) </label> <input type="text" class="form-control" name="nameField'+ cardCaptureCounter +'"> </div></div></div></div><div class="removeBtnBody"> <a onclick="removeLink('+ cardCaptureCounter +',1)" class="btn btn-fill btn-danger"> <i class="pe-7s-close-circle"></i> حذف لینک </a> </div></div></div>';

		$('#captureLinksBody').append(cardCaptureHtml);

	} else if (formSectionId==2) {

		var cardDisplayCounter = $('#displayLinksBody .card').length;

		cardDisplayCounter = cardDisplayCounter + 1;
		var exampleDisplayUrl = 'https://blinkco.net/';

		// var cardDisplayHtml = '<div class="col-md-12" id="displayCardGrid'+ cardDisplayCounter +'"> <div class="card"> <div class="header"> <h4 class="title"> لینک '+ cardDisplayCounter +'</h4> <div class="siteStatus" style="display:none" id="displayStatus'+ cardDisplayCounter +'"> <p class="statusText statusSuccess" style="display:none"> <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <defs> <style>.cls-tick-1{fill: #00e640;}.cls-2{fill: #fff;}</style> </defs> <title>if_success_1646004</title> <circle class="cls-tick-1" cx="256" cy="256" r="256"/> <path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/> </svg> اتصال برقرار شد </p><p class="statusText statusUnSuccess" style="display:none"> <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"> <defs> <style>.clsss-1{fill: #d75a4a;}.clsss-2{fill: none; stroke: #fff; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 2px;}</style> </defs> <title>flaticon1533587820-svg</title> <circle class="clsss-1" cx="25" cy="25" r="25"/> <polyline class="clsss-2" points="16 34 25 25 34 16"/> <polyline class="clsss-2" points="16 16 25 25 34 34"/> </svg> اتصال برقرار نشد </p><p class="statusText statusLoading" style="display:none"> <img src="../assets/img/inputLoader.svg" alt="input loader"> در حال بررسی </p></div><div class="clear"></div></div><div class="content"> <div class="row"> <div class="col-md-12"> <div class="form-group" id="displaySiteInputFormGroup'+ cardDisplayCounter +'"> <label> لینک صفحه نمایش نوتیفیکشن‌ها </label> <div class="inputs"> <div class="selectBody"> <select class="conditionsSelect" name="displayConditionsInput'+ cardDisplayCounter +'"> <option value="include"> شامل شود </option> <option value="exact"> دقیقا </option> </select> </div><input type="text" autocomplete="off" class="form-control displaySiteInput" onfocus="clearActions('+ cardDisplayCounter +',2)" onkeyup="realType(this.value,'+ cardDisplayCounter +',2)" name="displaySiteInput'+ cardDisplayCounter +'" id="displaySiteInput'+ cardDisplayCounter +'" placeholder="https://blinkco.net/"> <div class="clear"></div></div><div onclick="test('+ cardDisplayCounter +',2,2)" class="selectLink displaySelectLink'+ cardDisplayCounter +'" style="display:none"> <p id="displaySiteInputLink'+ cardDisplayCounter +'"> </p><span> ثبت لینک </span> <div class="clear"></div></div></div></div></div></div><div class="removeBtnBody"> <a onclick="removeLink('+ cardDisplayCounter +',2)" class="btn btn-fill btn-danger"> <i class="pe-7s-close-circle"></i> حذف لینک </a> </div></div></div>';


		var cardDisplayHtml = '<div class="col-md-12" id="displayCardGrid'+ cardDisplayCounter +'"> <div class="card cardBox"> <div class="header notifPrev"> <h4 class="title"> لینک صفحه وبسایت‌تان را وارد نمایید </h4> <div class="clear"></div></div><div class="content"> <div class="row"><div class="col-md-12"> <div class="form-group" id="displaySiteInputFormGroup'+ cardDisplayCounter +'"> <label> لینک صفحه نمایش نوتیفیکشن‌ها  '+ cardDisplayCounter +' <div class="siteStatus" style="display:none" id="displayStatus'+ cardDisplayCounter +'"> <p class="statusText statusSuccess" style="display:none"> <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-tick-1{fill:#00e640;}.cls-2{fill:#fff;}</style></defs><title>if_success_1646004</title><circle class="cls-tick-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/></svg> اتصال برقرار شد </p><p class="statusText statusUnSuccess" style="display:none"> <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.clsss-1{fill:#d75a4a;}.clsss-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:2px;}</style></defs><title>flaticon1533587820-svg</title><circle class="clsss-1" cx="25" cy="25" r="25"/><polyline class="clsss-2" points="16 34 25 25 34 16"/><polyline class="clsss-2" points="16 16 25 25 34 34"/></svg> اتصال برقرار نشد </p><p class="statusText statusLoading" style="display:none"> <img src="../assets/img/inputLoader.svg" alt="input loader"> در حال بررسی </p></div></label> <div class="inputs"> <div class="selectBody"> <select class="conditionsSelect" name="displayConditionsInput'+ cardDisplayCounter +'"> <option value="include"> شامل شود </option> <option value="exact"> دقیقا </option> </select> </div><input type="text" autocomplete="off" class="form-control displaySiteInput" onfocus="clearActions('+ cardDisplayCounter +',2)" onkeyup="realType(this.value,'+ cardDisplayCounter +',2)" name="displaySiteInput'+ cardDisplayCounter +'" id="displaySiteInput'+ cardDisplayCounter +'" placeholder="https://blinkco.net/"> <div class="clear"></div></div><div onclick="test('+ cardDisplayCounter +',,2,2)" class="selectLink displaySelectLink'+ cardDisplayCounter +'" style="display:none"> <p id="displaySiteInputLink'+ cardDisplayCounter +'"> </p><span> ثبت لینک </span> <div class="clear"></div></div></div><div class="removeBtnBody"> <a onclick="removeLink('+ cardDisplayCounter +',2)" class="btn btn-fill btn-danger"> <i class="pe-7s-close-circle"></i> حذف لینک </a> </div></div></div></div></div></div>';

		$('#displayLinksBody').append(cardDisplayHtml);

	}

}





// remove cards
// function removeLink(cardNumber,formNumber) {
// 		if (formNumber===1) {
// 			cardSelector = 'captureCardGrid';
// 		} else if (formNumber===2) {
// 			cardSelector = 'displayCardGrid';
// 		}
//     var element = document.getElementById(cardSelector+cardNumber);
//     element.parentNode.removeChild(element);
//
// 		return false;
// }
function removeLink(cardNumber,formNumber) {
		if (formNumber===1) {
			cardSelector = 'captureCardGrid';
		} else if (formNumber===2) {
			cardSelector = 'addedInput';
		}
    var element = document.getElementById(cardSelector+cardNumber);
    element.parentNode.removeChild(element);



		var numberAgain = 1;
		$('#displayPagesAdded').find('.notInput').each( function( index, element ) {

			$(this).attr("id","addedInput"+numberAgain);

			numberAgain = numberAgain + 1;
		});


		var numberAgain = 1;
		$('#displayPagesAdded').find('.removeDisplayLink').each( function( index, element ) {

			$(this).attr("onclick","removeLink("+numberAgain+",2)");

			numberAgain = numberAgain + 1;
		});


		var displaylinkscount = parseInt($('#displayPagesAdded').attr("data-displaylinkscount"), 10);
		$('#displayPagesAdded').attr('data-displaylinkscount', displaylinkscount - 1)

		return false;
}





// check links in campaign
			function test(card,currentFormId,testLinkPage,condition) {

				if (testLinkPage === 1) {

					$('.loadingBar').addClass('active');
					$('#indentifyFieldsBody').fadeOut();

				}

				$('.formsMask').fadeOut();

				var siteInput,status,formGroup;

				if (currentFormId===1) {
					siteInput = "siteInput";
					status = "status";
					formGroup = "siteInputFormGroup";
				} else if (currentFormId==2) {
					siteInput = "displaySiteInput";
					status = "displayStatus";
					formGroup = "displaySiteInputFormGroup";
				} else if (currentFormId==3) {
					siteInput = "notifLink";
					status = "notifLinkStatus";
					formGroup = "notifLinkStatusFormGroup";
				}

				$('#'+formGroup+card).removeClass("zIndexUp");

				$('#'+siteInput+card).removeClass('loading');
				$('.selectLink').fadeOut();

				$('#'+status+card).css("display","block");
				$('#'+status+card+' .statusLoading').css("display","block");

				url = $('input[name='+siteInput+card+']').val();

				var lastChar = url.substr(url.length - 1);
				if (lastChar !== '/') {

					finalUrl = url+'/';
					$('input[name='+siteInput+card+']').val(finalUrl);

				} else {
					finalUrl = url;
				}

				var sbmToken = getCookie('sbm_token');
				var dId = getCookie('dId');

				var formData = {
					'formLink' 			: finalUrl,
					'cookie'    : sbmToken,
					// 'dId' : dId,
				};

				var verifyData, sendData;

			verifyData = JSON.stringify(formData);

			sendData = { 'x' : verifyData };

					// process the form
					$.ajax({
						type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
						url 		: 'https://api.sabetmikonim.com/panel/check-form-link/', // the url where we want to POST
						data 		: sendData, // our data object
						dataType 	: 'json', // what type of data do we expect back from the server
						encode 		: true
					})

						// using the done promise callback
						.done(function(urlCheckData) {

							console.log(urlCheckData);

							// $('#captureSitePrev').load(urlCheckData['formLink']);

							if (urlCheckData.status === "linkVerified") {

								$('#'+status+card+' .statusLoading').css("display","none");
								$('#'+status+card+' .statusSuccess').css("display","block");


								if (testLinkPage === 1) {

									$('#'+siteInput+card).val(urlCheckData['formLink']);

									$("#captureSitePrevIframe").attr('src','http://amins-macbook-pro.local:5757/sabetmikonimv2/cdn/get-content.php?userurl='+urlCheckData['formLink']);

								} else if (testLinkPage === 2) {

									$('#'+siteInput+card).val('');

									var addedInput = parseInt($('#displayPagesAdded').attr("data-displaylinkscount"), 10);

									$("#displayPagesAdded").append('<div class="notInput" id="addedInput'+addedInput+'"> <input type="hidden" disabled id="conditionInput'+ addedInput +'" value="'+ condition +'"> <input type="text" id="addedDisplayLink'+ addedInput +'" disabled value="'+ urlCheckData['formLink'] +'"> <a class="removeDisplayLink" onclick="removeLink('+ addedInput +',2)"> <i class="fas fa-times-circle"></i> </a> </div>')

									$('#displayPagesAdded').attr("data-displaylinkscount",addedInput + 1);

								} else if (testLinkPage === 3) {

									$('#'+siteInput+card).val(urlCheckData['formLink']);

								}


							} else {

								$('.loadingBar').removeClass('active');

								$('#'+status+card+' .statusLoading').css("display","none");
								$('#'+status+card+' .statusUnSuccess').css("display","block");

							}

						})

						.fail(function(urlCheckData) {

							console.log(urlCheckData);

						});


			}



			function realNotif(notifText,optionNumber,boxId) {

				if (optionNumber === 2) {
					if (boxId === 1) {
						var realTextBoxId = "#hsOptionAction";
					} else if (boxId === 2) {
						var realTextBoxId = "#hsOptionCount";
					}
				} else if (optionNumber === 1) {
					if (boxId === 1) {
						var realTextBoxId = "#notifDesc";
					}
				} else if (optionNumber === 3) {

					if (boxId === 1) {
						var realTextBoxId = "#cbDesc p";
					} else if (boxId === 2) {
						var realTextBoxId = "#sbmCTABTN span";
					}

				}

				$(realTextBoxId).text(notifText);

			}



			// real typing
			function realType(string,dataNumber,currentFormId) {

				var siteInput,status,siteInputLink,selectLink;

				if (currentFormId===1) {
					siteInput = "siteInput";
					status = "status";
					siteInputLink = "siteInputLink";
					selectLink = "selectLink";
				} else if (currentFormId==2) {
					siteInput = "displaySiteInput";
					status = "displayStatus";
					siteInputLink = "displaySiteInputLink";
					selectLink = "displaySelectLink";
				} else if (currentFormId==3) {
					siteInput = "notifLink";
					status = "notifLinkStatus";
					siteInputLink = "notifLinkInput";
					selectLink = "notifLinkSelectLink";
				}

				$('#'+siteInput+dataNumber).addClass('loading');

				$('.'+selectLink+dataNumber).fadeIn();

				$('#'+siteInputLink+dataNumber).text(string);

			}

			// clear all changes from card and link connection and checker
			function clearActions(dataNumber,currentFormId) {

				$('.formsMask').fadeIn();

				var siteInput,status,formGroup;

				if (currentFormId===1) {
					siteInput = "siteInput";
					status = "status";
					formGroup = "siteInputFormGroup";
				} else if (currentFormId==2) {
					siteInput = "displaySiteInput";
					status = "displayStatus";
					formGroup = "displaySiteInputFormGroup";
				} else if (currentFormId==3) {
					siteInput = "notifLink";
					status = "notifLinkStatus";
					formGroup = "notifLinkStatusFormGroup";
				}

				$('#'+formGroup+dataNumber).addClass("zIndexUp");
				$('#'+status+dataNumber+' .statusText').css("display","none");
				$('#'+status+dataNumber+' .siteStatus').css("display","none");
				$('#'+status+dataNumber).css("display","none");
			}




function campaignWalking(stepId) {

	var loadStepsValue = 25;
	var finalLoadStepsValue = loadStepsValue * stepId;
	$('.loadSteps').css({'width' : finalLoadStepsValue+'%'});


	$(".loadingBar").removeClass('active');

	$('.campaignSteps').css({'display':'none'});
	$('#step'+stepId).css({'display':'block'});

	$('.stepItem').removeClass('active');
	$('#stepItem'+stepId).addClass('active');

	document.getElementById('nextStep').setAttribute('onclick', 'campaignSteps('+ (stepId+1) +',"next")');
	document.getElementById('preStep').setAttribute('onclick', 'campaignSteps('+ (stepId-1) +',"pre")');

	$("a[name=nextStep]").css({'display':'block'});
	$("button[name=submitForm]").css({'display':'none'});

	if (stepId !== 0) {

		$("a[name=preStep]").css({'display':'block'});
		$("a[name=nextStep]").css({'display':'block'});

	}

	if (stepId === 4) {

		$("a[name=nextStep]").css({'display':'none'});
		$("a[name=submitForm]").css({'display':'block'});

	} else {

		$("a[name=nextStep]").css({'display':'block'});
		$("a[name=submitForm]").css({'display':'none'});

	}


}



function campaignSteps(stepId, stepDirection) {

	var recentActivityData ={}, hotStreakData={}, realTimeData={}, conversionData={};

	if (stepDirection === "pre") {

		campaignWalking(stepId);

	} else {

		$(".loadingBar").addClass('active');

		// get cid if got from server
		if ($('input[name=cidInput]').val() === "") {
			cid = "Null";
		} else {
			cid = $('input[name=cidInput]').val();
		}

		var sbmToken = getCookie('sbm_token');
		var stepData;

		var stepCheck = false;

		if (stepId === 1) {

			if ($('input[name=campaignName]').val()=='') {

				stepCheck = false;
				$('input[name=campaignName]').addClass('error');

				$(".loadingBar").removeClass('active');

			} else {

				stepCheck = true;


				stepData = { "step" : (stepId - 1), "cookie" : sbmToken, "campaignName" : $('#step0 input[name=campaignName]').val(), "cId" : cid };

			}

		}




		if (stepId === 2) {

			var atLeastOneIsChecked = $('input[name=notifTypeOption]').is(':checked');

			if (!atLeastOneIsChecked) {

				$('#step'+(stepId-1)+' label.card').addClass('error');
				$('#step'+(stepId-1)+' label.card.deactiveFeature').removeClass('error');

				$(".loadingBar").removeClass('active');

				stepCheck = false;

			} else {

				stepCheck = true;

				$('#step'+(stepId-1)+' label.card').removeClass('error');

				var sbmFeature = [];
        $("input[name=notifTypeOption]:checked").each(function(){
            sbmFeature.push($(this).val());
        });



				// check what features selected
				for (var i = 0; i < sbmFeature.length; i++) {

					if (sbmFeature[i] === 'recent_activity') {

						var raMessage = $('input[name=raMessage]').val();
						var lastConversions = $('input[name=lastConversions]').val();
						var lastConversionsByDay = $('input[name=lastConversionsByDay]').val();
						var minConversions = $('input[name=minConversions]').val();
						var notificationLoop;
						var anonymousNotif;

						if ($('input[name=raCampaignLoop]').prop('checked')) {

							notificationLoop = 'true';

						} else {

							notificationLoop = 'false';

						}




						if ($('input[name=anonymousNotif]').prop('checked')) {

							anonymousNotif = 'true';

						} else {

							anonymousNotif = 'false';

						}





						var campaignRARules = { 'lastNotificationCount' : lastConversions, 'lastNotificationDays' : lastConversionsByDay, 'minNotificationSubmitted' : minConversions, 'notificationLoop' : notificationLoop, 'anonymousNotif' : anonymousNotif };

						recentActivityData = { 'campaignMessage' : raMessage, 'campaignRules' : campaignRARules };


					} else if (sbmFeature[i] === 'hot_streak') {

						var hsMessage = $('input[name=hsMessage]').val();
						var hsConversionName = $('input[name=hsConversionName]').val();
						var hsPeople = $('select[name=hsPeopleKind] option:selected').val();
						var hsTimeRadio = $('input[name=hsTimeRadio]:checked').val();

						hotStreakData = { 'hsMessage' : hsMessage, 'hsConversionName' : hsConversionName, 'hsPeople' : hsPeople, 'hsTime' : hsTimeRadio };


					} else if (sbmFeature[i] === 'real_time') {

						alert('real_time');

					} else if (sbmFeature[i] === 'conversion') {

						alert('conversion');

					}

				}



				var stepData = { "cId" : cid, "step" : (stepId - 1), "cookie" : sbmToken, 'recentActivity' : recentActivityData, 'hotStreak' : hotStreakData, 'realTime' : realTimeData, 'conversionBox' : conversionData };

			}

		}






		if (stepId === 3) {

			$("#step2 input[type=text]").removeClass('error');

			var formControlCounter = $("#step2 .captureSiteInput").length;

			for (var mn = 1; mn <= formControlCounter; mn++) {


				if ($("#step2 input[name=siteInput"+ mn +"]").val()=='') {

					$(".loadingBar").removeClass('active');

					$("#step2 input[name=siteInput"+ mn +"]").addClass('error');

					stepCheck = false;
					break;

				} else if ($("#step2 input[name=emailField"+ mn +"]").val()=='') {

					$(".loadingBar").removeClass('active');

					$("#step2 input[name=emailField"+ mn +"]").addClass('error');

					stepCheck = false;
					break;

				} else if ($("#step2 input[name=nameField"+ mn +"]").val()=='') {

					$(".loadingBar").removeClass('active');

					$("#step2 input[name=nameField"+ mn +"]").addClass('error');

					stepCheck = false;
					break;

				} else {
					stepCheck = true;

					var captureLinksCount = $('.captureSiteInput').length;
					var i = 1;
					var j = 0;
					var eachCaptureCard;
					var captureLinksData = [];
					while (j<captureLinksCount) {

						eachCaptureCard = { 'formLink' : $('input[name=siteInput'+i+']').val(), 'condition' : $('select[name=captureConditionsInput'+i+']').val(), 'emailField' : $('input[name=emailField'+i+']').val(), 'nameField' : $('input[name=nameField'+i+']').val() };

						captureLinksData.push(eachCaptureCard);

						i=i+1;
						j=j+1;
					}

					var stepData = { "cId" : cid, "step" : (stepId - 1), "cookie" : sbmToken, 'captureLinks' : captureLinksData };

				}

			} // for

			mn = 1;



		}

		if (stepId === 4) {

			$("#step3 input[type=text]").removeClass('error');

			var displayFormControlCounter = $("#step3 .displaySiteInput").length;

			for (var mn = 1; mn <= displayFormControlCounter; mn++) {


				if ($("#step3 input[name=displaySiteInput"+ mn +"]").val()=='') {

					$(".loadingBar").removeClass('active');

					$("#step3 input[name=displaySiteInput"+ mn +"]").addClass('error');

					stepCheck = false;
					break;

				} else {

					stepCheck = true;

					var displayLinksCount = $('.displaySiteInput').length;
					var i = 1;
					var j = 0;
					var eachdisplayCard;
					var displayLinksData = [];
					while (j<displayLinksCount) {

						eachdisplayCard = { 'formLink' : $('input[name=displaySiteInput'+i+']').val(), 'condition' : $('select[name=displayConditionsInput'+i+']').val()};

						displayLinksData.push(eachdisplayCard);

						i=i+1;
						j=j+1;
					}

					var stepData = { "cId" : cid, "step" : (stepId - 1), "cookie" : sbmToken, 'displayPages' : displayLinksData };


				}

			} // for

			mn = 1;

		}




		if (stepId === 5) {

			$("input[name=notifLink]").removeClass('error');

			var displayInMobile, notifOnTop, notifPosition, notifTimeDesktop, notifTimeMobile, deskBetweenNotifTime, mobileBetweenNotifTime;
			var finalNotifLink;


			if ($("input[name=notifLink]").val() === "") {

				$("input[name=notifLink]").addClass('error');

				stepCheck = false;

			} else {

				stepCheck = true;

				if ($('input[name=mobileDisplay]').prop('checked')) {

					displayInMobile = 'true';

				} else {

					displayInMobile = 'false';

				}



				if ($('input[name=topOfMobileDisplay]').prop('checked')) {

					notifOnTop = 'true';

				} else {

					notifOnTop = 'false';

				}




				if ($('input[name=notifPosition]').prop('checked')) {

					notifPosition = 'true';

				} else {

					notifPosition = 'false';

				}


				notifTimeDesktop = $('input[name=deskNotifTime]').val();

				notifTimeMobile = $('input[name=mobileNotifTime]').val();

				deskBetweenNotifTime = $('input[name=deskBetweenNotifTime]').val();

				mobileBetweenNotifTime = $('input[name=mobileBetweenNotifTime]').val();


				finalNotifLink = $("input[name=notifLink1]").val();

				var finalSettingsData = { 'finalNotifLink' : finalNotifLink, 'mobileDisplay' : displayInMobile, 'topOfMobileDisplay' : notifOnTop, 'notifPosition' : notifPosition, 'desktopNotifTime' : notifTimeDesktop, 'mobileNotifTime' : notifTimeMobile, 'deskBetweenNotifTime' : deskBetweenNotifTime, "mobileBetweenNotifTime" : mobileBetweenNotifTime };

				var stepData = { "cId" : cid, "step" : (stepId - 1), "cookie" : sbmToken, 'finalSettings' : finalSettingsData };


			}



		}

	}







	// if we cand forward or no
	if (stepCheck) {

		// create ajax request with step data
		var verifyData, sendData;

	verifyData = JSON.stringify(stepData);

	sendData = { 'x' : verifyData };

	console.log(sendData);

	$.ajax({
		type    : 'POST', // define the type of HTTP verb we want to use (POST for our form)
		url     : 'https://api.sabetmikonim.com/panel/new-campaign/', // the url where we want to POST
		data    : sendData, // our data object
		dataType  : 'json', // what type of data do we expect back from the server
		async: true,
		encode    : true
	})
		// using the done promise callback

		.done(function(data) {

			console.log('ok! Status:'+data.status);
			console.log(data);

			if (data.status === "stepDone") {

				if (stepId === 1) {

					$('input[name=cidInput]').val(data.cId);

					if (!data.recentActivity) {

						$('#raOption').prop('disabled', true);
						$('#raOptionLabel').addClass('deactiveFeature');

						$('#raOptionLabel').append('<div class="featureMask" onclick="openDeactiveFeatureModal()"></div>');

					}

					if (!data.hotStreak) {

						$('#hsOption').prop('disabled', true);
						$('#hsOptionLabel').addClass('deactiveFeature');

						$('#hsOptionLabel').append('<div class="featureMask" onclick="openDeactiveFeatureModal()"></div>');

					}

					if (!data.realTime) {

						$('#lvOption').prop('disabled', true);
						$('#lvOption').addClass('deactiveFeature');

						$('#lvOptionLabel').append('<div class="featureMask" onclick="openDeactiveFeatureModal()"></div>');

					}


					if (!data.conversionBox) {

						$('#cbOption').prop('disabled', true);
						$('#cbOption').addClass('deactiveFeature');

						$('#cbOptionLabel').append('<div class="featureMask" onclick="openDeactiveFeatureModal()"></div>');

					}


				}

				campaignWalking(stepId);

			} else if (data.status === "cidError") {

				swal({
									title: "خطا!",
									text: "خطا در ایجاد کمپین ایجاد شده است!",
									icon: "error",
									button: "تماس با پشتیبانی: ۲۸۴۲۵۷۳۳ - ۰۲۱",
				});

			} else if (data.status === "finalStepDone") {

				$(".loadingBar").removeClass('active');

				swal({
									title: "تبریک!",
									text: "کمپین شما با موفقیت ایجاد گردید!",
									icon: "success",
									button: " مشاهده کمپین‌ها ",
				}).then((isConfirm) => {
					if (isConfirm) {

					 window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/app.php";

					}
				});


				setTimeout(function(){
					window.location.href = "http://amins-macbook-pro.local:5757/sabetmikonimv2/app.php";
				},3000);

			}


		})

		// using the fail promise callback
		.fail(function(data) {

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






}



var emailStatus = "false", nameStatus = "false";
function submitUserField(submitFieldType) {

	var selectedInputStatus = "false";
	var selectedInputValue = $('#'+submitFieldType).attr("data-val");

	if (submitFieldType === "chooseFieldTypeEmail") {

		$('input[name=emailField1]').val(selectedInputValue);
		selectedInputStatus = "true";
		emailStatus = "true";

	} else if (submitFieldType === "chooseFieldTypeName") {

		$('input[name=nameField1]').val(selectedInputValue);
		selectedInputStatus = "true";
		nameStatus = "true";

	}


	if (selectedInputStatus === "true") {

		$("#"+submitFieldType).addClass('deactive');
		$('#fieldBox').fadeOut();

	}


	if ((nameStatus === "true") && (emailStatus === "true")) {

		$('#submitCaptureFieldData').prop('disabled',false);

	}

}




$(document).ready(function() {

	$('html, body').click(function(e) {

			$('#fieldBox').fadeOut();

	});


	$('a[name=campaignStep]').click(function(e) {

			e.preventDefault();

	});


	// next campaign step link
	$('a[name=nextStep]').click(function(e) {

		e.preventDefault();

	});




	// previous campaign step link
	$('a[name=preStep]').click(function(e) {

		e.preventDefault();

	});





	// $('.mask').click(function(e) {
	//
	// 	saveFeatureSettings();
	//
	// });

	$('a[name=closeModal]').click(function(e) {

		$('.mask').fadeOut();
		$('.modalOption').fadeOut();
		$('.modalOption').removeClass('openModal');

	});





$('#captureSitePrevIframe').load(function(){

	$('.indentifyFieldsBody').fadeIn();

	// setTimeout(function() {

		$('html, body').animate({
				scrollTop: $(".indentifyFieldsBody").offset().top
		}, 2000);

		$('.main-panel').animate({
				scrollTop: $(".indentifyFieldsBody").offset().top
		}, 2000);

	// }, 3000);

	var j =1;

	$('.loadingBar').removeClass('active');
	// $('#captureCardContent').fadeOut();
	$('.captureSitePrev').css({"display" : "block"});
	$('.captureSitePrev').css({"height":"650px"});

	$('#captureSitePrevIframe').contents().find('input').each( function( index, element ){

		var websiteAttrClass = $(this).attr('class');

		if (typeof websiteAttrClass !== typeof undefined && websiteAttrClass !== false) {

			var inputClass = $( this ).attr('class');
			var finalInputClass = inputClass + ' sabetmikonimInput';

		} else {

			var finalInputClass = 'sabetmikonimInput';

		}

		$( this ).attr('class',finalInputClass);

		$( this ).css({'cursor':'pointer'});
		$( this ).attr("readonly","true");


		j=j+1;

	});




	var input = $('#captureSitePrevIframe').contents().find('input.sabetmikonimInput');

	for (var fs = 0; fs < input.length; fs++) {


		input[fs].addEventListener('click',function(e){

			$("#fieldBox").css({
	      left: e.clientX+'px',
	      top: e.clientY+'px'
	    }).show();

			input.removeAttr('style');
			input.css({'cursor':'pointer'});

			var attrName = $(this).attr('name');

			if (typeof attrName !== typeof undefined && attrName !== false) {

				$('#chooseFieldTypeEmail').attr("data-val",attrName);
				$('#chooseFieldTypeEmail').attr("data-type",'name');

				$('#chooseFieldTypeName').attr("data-val",attrName);
				$('#chooseFieldTypeName').attr("data-type",'name');

			} else {

				var attrId = $(this).attr('id');

				if (typeof attrId !== typeof undefined && attrId !== false) {

					$('#chooseFieldTypeEmail').attr("data-val",attrId);
					$('#chooseFieldTypeEmail').attr("data-type",'id');

					$('#chooseFieldTypeName').attr("data-val",attrId);
					$('#chooseFieldTypeName').attr("data-type",'id');

				} else {

					alert('سایت شما مشخصه ای برای تعیین فیلدها ندارد! لطفا با پشتیبانی تماس بگیرید!');

				}

			}

			$(this).css({"border" : "4px solid rgb(245, 214, 11)"})

		});

	}

        console.log('iframe loaded successfully')
    });






});
