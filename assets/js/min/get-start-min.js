function createView(e,t){var o={welcome:{title:"به سرویس ثابت میکنیم خوش آمدید",tmp:"http://amins-macbook-pro.local:5757/sabetmikonimv2/template/welcome.html",crumb:""},"add-domain":{title:"دامنه جدید را وارد نمایید",tmp:"http://amins-macbook-pro.local:5757/sabetmikonimv2/template/add-domain.html",crumb:"addDomainCrumb"},websiteIntg:{title:"وبسایت‌تان را متصل نمایید",tmp:"http://amins-macbook-pro.local:5757/sabetmikonimv2/template/website-intg.html",crumb:"intgCrumb"},skipIntg:{title:"نوع کمپین‌تان را در ثابت میکنیم انتخاب نمایید.",tmp:"http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/cType.html",crumb:"cFeatureCrumb"}};console.log(e),History.pushState(e,o[e.contentId].title,"http://amins-macbook-pro.local:5757/sabetmikonimv2/getstart.php/?page="+e.contentId),History.log()}function setCookie(e,t,o){var a=new Date;a.setTime(a.getTime()+24*o*60*60*1e3);var n="expires="+a.toUTCString();document.cookie=e+"="+t+";"+n+";path=/"}function getCookie(e){for(var t=e+"=",o=document.cookie.split(";"),a=0;a<o.length;a++){for(var n=o[a];" "==n.charAt(0);)n=n.substring(1);if(0==n.indexOf(t))return n.substring(t.length,n.length)}return""}function checkCookie(e){var t=getCookie(e);return""!=t?"cookieSet":"cookieNotSet"}function callbackAjaxReq(e,t){if("checkDomain"===t)"linkVerified"===e.status?(document.getElementById("helpBoxContent").innerHTML="<p> همه چیز عالیه! بزن بریم! </p>",$("input[name=dCheck]").val("true"),$("input[name=domain]").val(e.formLink),addNewDomain()):"linkNotVerified"===e.status?(document.getElementById("helpBoxContent").innerHTML="<p> سایت وارد شده نامعتبر است. </br> لطفا آدرس صحیح را وارد بفرمایید!  </p>",$("input[name=dCheck]").val("false")):(document.getElementById("helpBoxContent").innerHTML="<p>   حالا باید اولین سایت‌تان را ثبت نمایید! </br> ضمنا شما می‌توانید بی‌نهایت وبسایت جدید بدون پرداخت هرگونه هزینه‌ای درج نمایید. </p>",$("input[name=dCheck]").val("false"));else if("setNewDomain"===t)"domainSet"===e.status||"domainWasSet"===e.status?(setCookie("dId",e.dId,360),createView({contentId:"websiteIntg"},!0)):"dpDomain"===e.status&&(document.getElementById("helpBoxContent").innerHTML="<p> دامنه وارد شده توسط اکانت دیگری ثبت شده است! </p>",$(".helpBox").addClass("helpError"));else if("checkIntegrations"===t)if("requestDone"===e.status){var o="<!--SABETMIKONIM CONNECTION--><script src='http://amins-macbook-pro.local:5757/sabetmikonimv2/cdn/sabetmikonim_con.js?acc="+e.sId+"'></script><!--END SABETMIKONIM CONNECTION-->";$("input[name=sabetMikonimIntg]").val(o);var a=e.intgVerify;if("True"===a){$("#connectionStatusBody").attr("data-connection","true");var n=e.intgVerifyOffset;$("#connectionStatusBody").addClass("verified"),$("#connectionStatusText").html(" تبریک! وبسایت شما با موفقیت متصل گردید."),$("#lastConnectText").removeClass("disn"),$("#lastConnectText").append(" آخرین ارتباط با پنل: "+n)}else $("#connectionStatusBody").attr("data-connection","false"),$("#connectionStatusText").html(' <img src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/img/circle-loading.svg" alt="لودینگ ثابت میکنیم"> در حال تلاش برای برقراری اتصال با سایت شما... '),realCheckWebsiteIntg()}else swal({title:"خطا!",text:" خطایی رخ داده است! ",icon:"error",button:"تلاش مجدد"});else if("getEnteredDomain"===t)"progressGot"===e.status?$("input[name=domain]").val(e.pageProgress):"dpDomain"===e.status&&(document.getElementById("helpBoxContent").innerHTML="<p> دامنه وارد شده توسط اکانت دیگری ثبت شده است! </p>",$(".helpBox").addClass("helpError"));else if("getEnteredDomainForDeveloper"===t&&"progressGot"===e.status){var i=e.pageProgress,m="محمد امین مجیدی",c=$("input[name=sabetMikonimIntg]").val(),r=$("input[name=developerEmail]").val(),s="لطفا کد جاوا اسکریپت سرویس ثابت میکنیم را در سایت ما قرار دهید.",l="لطفا کد جاوا اسکریپت زیر را در وبسایت "+i+" قرار دهید. \n"+c+"\nبا احترام فراوان، "+m;window.location="mailto:"+r+"?subject="+s+"&body="+l}}function addNewDomain(){$(".help-block").remove(),$(".form-group").removeClass("has-error");var e=getCookie("sbm_token"),t=$("input[name=domain]").val();if(""===t)$("#domainGroup").addClass("has-error"),$("#domainGroup").append('<div class="help-block"> لطفا آدرس دامنه را وارد نمایید! </div>');else{var o={cookie:e,url:t,operation:"setDomain"};ajaxReq(o,"http://api.sabetmikonim.com:8004/panel/complete-information/","setNewDomain")}}function checkDomain(e){$(".help-block").remove(),$(".form-group").removeClass("has-error");var t=getCookie("sbm_token");if(""===$("input[name=domain]").val())$("#domainGroup").addClass("has-error"),$("#domainGroup").append('<div class="help-block"> لطفا آدرس دامنه را وارد نمایید! </div>');else{var o={cookie:t,formLink:e};delay(function(){ajaxReq(o,"http://api.sabetmikonim.com:8004/panel/check-form-link/","checkDomain")},2e3)}}function copyToClipboard(e){var t="_hiddenCopyText_",o="INPUT"===e.tagName||"TEXTAREA"===e.tagName,a,n;if(o)i=e,a=e.selectionStart,n=e.selectionEnd;else{if(i=document.getElementById(t),!i){var i=document.createElement("textarea");i.style.position="absolute",i.style.left="-9999px",i.style.top="0",i.id=t,document.body.appendChild(i)}i.textContent=e.textContent}var m=document.activeElement;i.focus(),i.setSelectionRange(0,i.value.length);var c;try{c=document.execCommand("copy")}catch(r){c=!1}return m&&"function"==typeof m.focus&&m.focus(),o?e.setSelectionRange(a,n):i.textContent="",$("#copyCodeBtn").text("کپی شد!"),c}var historyBool=!0;History.Adapter.bind(window,"statechange",function(){var e=History.getState();if(historyBool){historyBool=!1,stateObject=e.data;var t={welcome:{title:"به سرویس ثابت میکنیم خوش آمدید",tmp:"http://amins-macbook-pro.local:5757/sabetmikonimv2/template/welcome.html",crumb:""},"add-domain":{title:"دامنه جدید را وارد نمایید",tmp:"http://amins-macbook-pro.local:5757/sabetmikonimv2/template/add-domain.html",crumb:"addDomainCrumb"},websiteIntg:{title:"وبسایت‌تان را متصل نمایید",tmp:"http://amins-macbook-pro.local:5757/sabetmikonimv2/template/website-intg.html",crumb:"intgCrumb"},skipIntg:{title:"نوع کمپین‌تان را در ثابت میکنیم انتخاب نمایید.",tmp:"http://amins-macbook-pro.local:5757/sabetmikonimv2/template/campaign/cType.html",crumb:"cFeatureCrumb"}},o=getCookie("sbm_token");"cookieSet"===checkCookie("sbm_token")?$("#registerContent").load(t[stateObject.contentId].tmp,function(e){var a=stateObject.contentId;switch($(".crumbLink").removeClass("active"),$("#"+t[stateObject.contentId].crumb).addClass("active"),stateObject.contentId){case"websiteIntg":if("cookieSet"===checkCookie("dId")&&"null"!==getCookie("dId")){var n={cookie:o,dId:getCookie("dId")};ajaxReq(n,"http://api.sabetmikonim.com:8004/panel/check-start-page/","checkIntegrations")}else createView({contentId:"add-domain"},!0);break;case"add-domain":if("cookieSet"===checkCookie("dId")&&"null"!==getCookie("dId")){var i={cookie:o,dId:getCookie("dId"),pageProgressKey:"setDomain"};ajaxReq(i,"http://api.sabetmikonim.com:8004/panel/get-progress/","getEnteredDomain")}}}):window.location.href="http://amins-macbook-pro.local:5757/sabetmikonimv2/register.php/"}historyBool=!0});var delay=function(){var e=0;return function(t,o){clearTimeout(e),e=setTimeout(t,o)}}();$(document).ready(function(){var e=!1,t=window.location.href,o=new URL(t),a=o.searchParams.get("page");null!==a?createView({contentId:a},!0):createView({contentId:"welcome"},!0)});