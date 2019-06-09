// Main Functions
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



function realTypeNotif(notifText,notifTagId) {

  $('.'+notifTagId).text(notifText);

}





// get lists from server and append in select element
function getListsData(listKind,input) {

  var getProductData = { 'cookie' : getCookie('sbm_token'), 'dId' : getCookie('dId'), 'cId' : getCookie('cId'), 'operation' : listKind };

  ajaxReq(getProductData,'https://api.sabetmikonim.com/panel/get-api-information/','getListData',{"inputField":input});

}




// send formID for GravityForms onChange
function sendGravityFormsFormID(formIdInput) {
  var apiData;
  var formId = $('select[name='+ formIdInput +'] option:selected').val();

  apiData = connectionSettingsProgress[subTypeId][0];

  apiData['formData']={};
  apiData['formData']['formId'] = formId;

  var getProductData = { 'cookie' : getCookie('sbm_token'), 'dId' : getCookie('dId'), 'cId' : getCookie('cId'), 'apiData': apiData, 'operation' : 'submitApi' };

  ajaxReq(getProductData,'https://api.sabetmikonim.com/panel/api-connection/');
}
