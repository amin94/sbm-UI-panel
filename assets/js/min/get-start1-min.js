function setCookie(e,t,n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);var a="expires="+o.toUTCString();document.cookie=e+"="+t+";"+a+";path=/"}function getCookie(e){for(var t=e+"=",n=document.cookie.split(";"),o=0;o<n.length;o++){for(var a=n[o];" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf(t))return a.substring(t.length,a.length)}return""}function checkCookie(e){var t=getCookie(e);return""!=t?"cookieSet":"cookieNotSet"}function callbackAjaxReq(e,t){if("checkStartPage"===t)if("requestDone"===e.status){var n=e.getStartStatus,o=e.intgVerify;if("False"===n?$(".slotIcon").append('<svg id="Capa_1" width="30px" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.97 27.97"><defs><style>.cls-1{fill:#90a4ae;}</style></defs><title>flaticon1527769131-svg</title><g id="c142_x" data-name="c142 x"><path class="cls-1" d="M14,0A14,14,0,1,0,28,14,14,14,0,0,0,14,0Zm6,17.77L17.77,20A51.34,51.34,0,0,0,14,16.21,52.07,52.07,0,0,0,10.2,20L8,17.77A43.64,43.64,0,0,0,11.75,14,43,43,0,0,0,8,10.2L10.2,8s3.55,3.78,3.78,3.78S17.77,8,17.77,8L20,10.2A51.2,51.2,0,0,0,16.21,14C16.21,14.24,20,17.77,20,17.77Z"/></g></svg>'):$(".slotIcon").append('<svg width="30px" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.greenStyle{fill:#25ae88;}.cls-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title>checkTick</title><circle class="greenStyle" cx="25" cy="25" r="25"/><polyline class="cls-2" points="38 15 22 33 12 25"/></svg>'),"True"===o){var a=e.intgVerifyOffset;$("#connectionStatusBody").addClass("verified"),$("#connectionStatusBody").append(" تبریک! وبسایت شما با موفقیت متصل گردید. آخرین اتصال: "+a)}else $("#connectionStatusBody").append(" اتصال با سایت شما برقرار نشده است. ")}else swal({title:"خطا!",text:" خطایی رخ داده است! ",icon:"error",button:"تلاش مجدد"})}function openModalGetStart(e,t){return $(e).addClass("openModal"),$(".mask").fadeIn(),document.getElementById(t).innerHTML='<svg width="30px" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.greenStyle{fill:#25ae88;}.cls-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title>checkTick</title><circle class="greenStyle" cx="25" cy="25" r="25"/><polyline class="cls-2" points="38 15 22 33 12 25"/></svg>',!1}$(document).ready(function(){var e=getCookie("sbm_token"),t={cookie:e};ajaxReq(t,"https://api.sabetmikonim.com/panel/check-start-page/","checkStartPage")});