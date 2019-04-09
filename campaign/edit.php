<script type="text/javascript">
  var thisPage = 'edit';
</script>

<?php
ob_start();
session_start();
require("../header.php");
?>‎


<script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/edit-campaign.js"></script>

    <div class="main-panel">

      <div class="campaignHeader">

        <h2> ویرایش کمپین « <span id="campaignNameTitle"></span> » </h2>

      </div> <!-- campaign header -->

      <div class="campaignNewSteps">

        <div class="loadSteps"></div>

        <div class="col-xs-12 col-sm-6 col-md-3 stepGrid">

          <div class="stepItem" id="stepItem1">

            <span class="stepNumber"> ۱ </span>

            <p class="stepName"> امکانات </p>

            <a href="1" onclick="campaignSteps(1,'next')" name="campaignStep" class="more"> امکانات </a>

          </div> <!-- step item -->

        </div> <!-- grid -->


        <div class="col-xs-12 col-sm-6 col-md-3 stepGrid">

          <div class="stepItem" id="stepItem2">

            <span class="stepNumber"> ۲ </span>

            <p class="stepName"> فرم‌ها </p>

            <a href="2" onclick="campaignSteps(2,'next')" name="campaignStep" class="more"> فرم ها </a>

          </div> <!-- step item -->

        </div> <!-- grid -->


        <div class="col-xs-12 col-sm-6 col-md-3 stepGrid">

          <div class="stepItem" id="stepItem3">

            <span class="stepNumber"> ۳ </span>

            <p class="stepName"> نمایش </p>

            <a href="3" onclick="campaignSteps(3,'next')" name="campaignStep" class="more">نمایش</a>

          </div> <!-- step item -->

        </div> <!-- grid -->

        <div class="col-xs-12 col-sm-6 col-md-3 stepGrid">

          <div class="stepItem" id="stepItem4">

            <span class="stepNumber"> ۴ </span>

            <p class="stepName"> تنظیمات </p>

            <a href="4" onclick="campaignSteps(4,'next')" name="campaignStep" class="more"> تنظیمات </a>

          </div> <!-- step item -->

        </div> <!-- grid -->

        <div class="clear"></div>

      </div> <!-- new campaign steps -->

      <div class="content newCampaignBody" style="position: relative; padding-bottom: 100px">
        <div class="container-fluid">

          <form action="" method="post" id="updateCampaign">

            <div class="row campaignSteps campaignName" style="display:block" id="step0">

              <div class="col-md-12">

                <input type="hidden" value="" name="cidInput">

                <div class="card">
                  <div class="header">
                    <h4 class="title"> نام دلخواه کمپین‌تان را بنویسید </h4>

                    <div class="clear"></div>
                  </div>
                  <div class="content">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>
                             نام کمپین - این نام به فرد دیگری نمایش داده نمی‌شود.

                               <span class="info input" id="campaignNameHelpSelector" data-tippy> <i class="fas fa-question"></i> </span>

                               <div id="campaignNameHelp" class="disn">
                                 <p> نامی برای کمپین‌تان انتخاب نمایید. این نام صرفا به شما نمایش داده خواهد شد. </p>
                               </div>


                           </label>
                          <input type="text" class="form-control" name="campaignName" placeholder="یک نام وارد نمایید" value="">
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div> <!-- grid -->

            </div> <!-- row -->





            <div class="row campaignSteps" style="display:none" id="step1">

              <h1>

                 نوع نوتیفیکیشن‌ها را انتخاب نمایید:

                 <span class="info page" id="campaignOptionsSelector" data-tippy> <i class="fas fa-question"></i> </span>

                 <div id="campaignOptionsHelp" class="disn">
                   <p> نسبت به پکیجی که خریداری کرده‌اید، می‌توانید از امکانات زیر در کمپین‌تان استفاده نمایید. </p>
                 </div>

               </h1>



              <div class="col-xs-12 col-md-4">

                  <input type="checkbox" name="notifTypeOption" id="raOption" value="recent_activity">

                <label for="raOption" class="card">

                  <div class="notifType">

                    <div class="notifCardBody">

                      <div class="selectTick">

                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-tick-1{fill:#00e640;}.cls-2{fill:#fff;}</style></defs><title>if_success_1646004</title><circle class="cls-tick-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/></svg>

                      </div> <!-- select tick -->

                      <img src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/img/campaignType/raIcon.jpg" alt="فعالیت های اخیر ">

                      <h4> فعالیت‌های اخیر </h4>

                      <p> نمایش افرادی که از خدمات شما در سایت استفاده کرده‌اند. </p>

                    </div> <!-- notif body -->

                    <footer class="setting">

                      <a href="#raModal" name="modalLink" class="btn btn-wd"> تنظیمات </a>

                    </footer>

                  </div> <!-- notif type -->

                </label>


              </div>









              <div class="col-xs-12 col-md-4">

                  <input type="checkbox" name="notifTypeOption" id="hsOption" value="hot_streak">


                <label for="hsOption" class="card">

                  <div class="notifType">

                    <div class="notifCardBody">

                      <div class="selectTick">

                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-tick-1{fill:#00e640;}.cls-2{fill:#fff;}</style></defs><title>if_success_1646004</title><circle class="cls-tick-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/></svg>

                      </div> <!-- select tick -->

                      <img src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/img/campaignType/hot-streak-sabetmikonim.jpg" alt=" آمار داغ ">

                      <h4> آمار داغ </h4>

                      <p> نمایش افرادی که در یک مدت زمان خاص از خدمات شما استفاده کرده‌اند. </p>

                    </div> <!-- notif body -->

                    <footer class="setting">

                      <a href="#hsModal" name="modalLink" class="btn btn-wd"> تنظیمات </a>

                    </footer>

                  </div> <!-- notif type -->

                </label>


              </div>





              <div class="col-xs-12 col-md-4">

                <input type="checkbox" name="notifTypeOption" id="lvOption" value="real_time">

                <label for="lvOption" class="card">

                  <div class="notifType">

                    <div class="notifCardBody">

                      <div class="selectTick">

                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-tick-1{fill:#00e640;}.cls-2{fill:#fff;}</style></defs><title>if_success_1646004</title><circle class="cls-tick-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/></svg>

                      </div> <!-- select tick -->

                      <img src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/img/campaignType/live-option-sabetmikonim.svg" alt=" نمایش لحظه‌ای ">

                      <h4> نمایش لحظه‌ای </h4>

                      <p> نمایش لحظه‌ای کاربرانی که صفحه‌ای را مشاهده می‌کنند. </p>

                    </div> <!-- notif body -->

                    <footer class="setting">

                      <a href="#lvModal" name="modalLink" class="btn btn-wd"> تنظیمات </a>

                    </footer>

                  </div> <!-- notif type -->

                </label>


              </div>



              <div class="col-xs-12 col-md-4"></div>
              <div class="col-xs-12 col-md-4">

                <input type="checkbox" name="notifTypeOption" id="cbOption" value="conversion">

                <label for="cbOption" class="card">

                  <div class="notifType">

                    <div class="notifCardBody">

                      <div class="selectTick">

                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-tick-1{fill:#00e640;}.cls-2{fill:#fff;}</style></defs><title>if_success_1646004</title><circle class="cls-tick-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/></svg>

                      </div> <!-- select tick -->

                      <img src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/img/campaignType/conversion-box-sabetmikonim.svg" alt=" نمایش لحظه‌ای ">

                      <h4> کارت‌های تبدیل </h4>

                      <p> تبدیل نرخ بیشتر کاربران به خریدار با نوتیفیکیشن‌های قابل کلیک </p>

                    </div> <!-- notif body -->

                    <footer class="setting">

                      <a href="#cbModal" name="modalLink" class="btn btn-wd"> تنظیمات </a>

                    </footer>

                  </div> <!-- notif type -->

                </label>


              </div>





              <div class="clear"></div>

            </div>



            <div class="row campaignSteps captureForms" style="display:none" id="step2">

              <h1>

                 لینک صفحه فرم شما برای دریافت اطلاعات

                 <span class="info page" id="campaignCaptureSelector" data-tippy> <i class="fas fa-question"></i> </span>

                 <div id="campaignCaptureHelp" class="disn">
                   <p> در این بخش باید لینک صفحه‌ای را که می‌خواهید اطلاعات فرم آن را به عنوان نوتیفیکیشن ذخیره نمایید را وارد کنید. </p>
                 </div>

               </h1>



              <div id="captureLinksBody">



              </div> <!-- capture links body -->






              <div class="indentifyFieldsBody disn" id="indentifyFieldsBody">


                <div class="title">

                  <h1>

                     فیلدهای نام و ایمیل را مشخص نمایید!

                     <span class="info page" id="campaignCaptureFieldsSelector" data-tippy> <i class="fas fa-question"></i> </span>

                     <div id="campaignCaptureFieldsHelp" class="disn">
                       <p> فرم‌تان را در صفحه وبسایت‌تان پیدا نمایید و با کلیک بر روی فیلد‌های ایمیل و نام، آن‌ها را مشخص نمایید. </p>
                     </div>

                   </h1>


                   <p> فرم‌تان را در صفحه وبسایت‌تان پیدا نمایید و با کلیک بر روی فیلد‌های ایمیل و نام، آن‌ها را مشخص نمایید. </p>

                </div>


                <div class="captureSitePrevBody" id="captureSitePrev">

                <iframe src="" width="100%" sandbox="allow-same-origin allow-scripts" id="captureSitePrevIframe" class="captureSitePrevIframe captureSitePrev"></iframe>

                <div id="fieldBox">

                  <ul>

                    <li class="boxTitle">

                      نوع فیلد انتخاب شده را انتخاب نمایید:

                    </li>

                    <li class="selectItem">

                      <div class="fieldBoxItem" id="chooseFieldTypeEmail" onclick="submitUserField('chooseFieldTypeEmail')" data-type="" data-val=""> فیلد ایمیل </div>

                    </li>

                    <li class="selectItem">

                      <div class="fieldBoxItem" id="chooseFieldTypeName" onclick="submitUserField('chooseFieldTypeName')" data-type="" data-val=""> فیلد نام </div>

                    </li>

                  </ul>

                </div>

              </div> <!-- captureSitePrevBody -->

            </div> <!-- indentifyFieldsBody -->





              <!-- <div class="moreCards">

                <button onclick="addForm('1');return false;" class="btn btn-fill"> <i class="pe-7s-plus"></i> اضافه کردن لینک </button>

              </div> -->

            </div> <!-- row -->





            <div class="row campaignSteps displayForms" style="display:none" id="step3">

              <h1>

                 لینک صفحاتی که نوتیفیکشن‌ها در آن نمایش داده می‌شود

                 <span class="info page" id="campaignDisplaySelector" data-tippy> <i class="fas fa-question"></i> </span>

                 <div id="campaignDisplayHelp" class="disn">
                   <p> در این بخش لینک صفحاتی که می‌خواهید نوتیفیکشن‌ها را در آن‌ها نمایش دهید، وارد نمایید. </p>
                 </div>


               </h1>




              <div id="displayLinksBody">



                </div> <!-- capture links body -->


                <div class="moreCards">

                  <button onclick="addForm('2');return false;" class="btn btn-fill"> <i class="pe-7s-plus"></i> اضافه کردن لینک </button>

                </div> <!-- more cards -->

              </div> <!-- row -->







              <div class="row campaignSteps customizeForms" style="display:none" id="step4">

                <h1> تنظیمات اضافه کمپین </h1>
                <h3> در صورتی که آماده شروع کمپین هستید، دکمه ثبت و ایجاد کمپین پایین را بزنید. </h3>

                <div class="col-md-8" style="margin: auto; float:none">

                  <div class="card">
                    <div class="header">
                      <h4 class="title"> تنظیمات ظاهری نوتیفیکیشن‌ها </h4>

                      <div class="clear"></div>
                    </div>
                    <div class="content">
                      <div class="row">
                        <div class="optionsBody">

                          <div class="inlineOption">

                            <div class="col-md-8 noPaddingRight">

                              در موبایل نمایش داده شود

                            </div>

                            <div class="col-md-4 noPaddingLeft">

                              <div class="checkBodySwitch" id="mobileDisplayOption">

                                <span style="padding-left: 5px"> غیرفعال </span>

                                <input type="checkbox" class="switchdemo" name="mobileDisplay" checked>

                                <span style="padding-right: 5px"> فعال </span>

                              </div> <!-- checkbox switch -->

                            </div>

                            <div class="clear"></div>

                          </div> <!-- inline option -->

                          <div class="inlineOption">

                            <div class="col-md-8 noPaddingRight">

                              نوتیفیکشن بالای صفحه موبایل نمایش داده شود.

                            </div>

                            <div class="col-md-4 noPaddingLeft">

                              <div class="checkBodySwitch" id="topOfMobileDisplayOption">

                                <span style="padding-left: 5px"> غیرفعال </span>

                                <input type="checkbox" class="switchdemo" name="topOfMobileDisplay">

                                <span style="padding-right: 5px"> فعال </span>

                              </div> <!-- checkbox switch -->

                            </div>

                            <div class="clear"></div>

                          </div> <!-- inline option -->

                          <div class="inlineOption">

                            <div class="col-md-8 noPaddingRight">

                              محل نمایش نوتیفیکیشن در صفحه

                            </div>

                            <div class="col-md-4 noPaddingLeft">

                              <div class="checkBodySwitch" id="notifPositionOption">

                                <span style="padding-left: 5px"> راست </span>

                                <input type="checkbox" class="switchdemo" name="notifPosition">

                                <span style="padding-right: 5px"> چپ </span>

                              </div> <!-- checkbox switch -->

                            </div>

                            <div class="clear"></div>

                          </div> <!-- inline option -->





                          <div class="inlineOption">

                            <div class="col-md-8 noPaddingRight">

                              زمان نمایش نوتیفیکیشن‌ها در کامپیوتر و تبلت

                            </div>

                            <div class="col-md-4 noPaddingLeft">

                              <div class="inlineField">

                                <input type="number" name="deskNotifTime" value="8" class="form-control">

                                <span style="padding-right: 5px"> ثانیه </span>

                              </div>

                            </div>

                            <div class="clear"></div>

                          </div> <!-- inline option -->



                          <div class="inlineOption">

                            <div class="col-md-8 noPaddingRight">

                              زمان نمایش نوتیفیکیشن‌ها در موبایل

                            </div>

                            <div class="col-md-4 noPaddingLeft">

                              <div class="inlineField">

                                <input type="number" name="mobileNotifTime" value="10" class="form-control">

                                <span style="padding-right: 5px"> ثانیه </span>

                              </div>

                            </div>

                            <div class="clear"></div>

                          </div> <!-- inline option -->





                          <div class="inlineOption">

                            <div class="col-md-8 noPaddingRight">

                              زمان بین نمایش ۲ نوتیفیکیشن‌ در دسکتاپ

                            </div>

                            <div class="col-md-4 noPaddingLeft">

                              <div class="inlineField">

                                <input type="number" name="deskBetweenNotifTime" value="1" class="form-control">

                                <span style="padding-right: 5px"> ثانیه </span>

                              </div>

                            </div>

                            <div class="clear"></div>

                          </div> <!-- inline option -->







                          <div class="inlineOption">

                            <div class="col-md-8 noPaddingRight">

                              زمان بین نمایش ۲ نوتیفیکیشن‌ در موبایل

                            </div>

                            <div class="col-md-4 noPaddingLeft">

                              <div class="inlineField">

                                <input type="number" name="mobileBetweenNotifTime" value="1" class="form-control">

                                <span style="padding-right: 5px"> ثانیه </span>

                              </div>

                            </div>

                            <div class="clear"></div>

                          </div> <!-- inline option -->









                        </div> <!-- options body -->
                      </div>

                    </div>

                  </div>

                </div> <!-- grid -->





                <div class="col-md-8" style="margin: auto; float:none">

                  <div class="card">
                    <div class="header">
                      <h4 class="title"> لینک </h4>

                      <div class="siteStatus" style="display:none" id="notifLinkStatus1">

                        <p class="statusText statusSuccess" style="display:none">
                          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.cls-tick-1{fill:#00e640;}.cls-2{fill:#fff;}</style></defs><title>if_success_1646004</title><circle class="cls-tick-1" cx="256" cy="256" r="256"/><path class="cls-2" d="M375,154,194.2,334.8,137,277.7a10.89,10.89,0,1,0-15.4,15.4L186.5,358a10.86,10.86,0,0,0,15.4,0L390.4,169.5A10.93,10.93,0,0,0,375,154Z"/></svg>
                           اتصال برقرار شد
                        </p>

                        <p class="statusText statusUnSuccess" style="display:none">
                          <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.clsss-1{fill:#d75a4a;}.clsss-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:2px;}</style></defs><title>flaticon1533587820-svg</title><circle class="clsss-1" cx="25" cy="25" r="25"/><polyline class="clsss-2" points="16 34 25 25 34 16"/><polyline class="clsss-2" points="16 16 25 25 34 34"/></svg>
                          اتصال برقرار نشد
                        </p>

                        <p class="statusText statusLoading" style="display:none">
                          <img src="../assets/img/inputLoader.svg" alt="input loader">
                           در حال بررسی
                        </p>

                      </div> <!-- site status -->

                      <div class="clear"></div>
                    </div>
                    <div class="content">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>

                               لینک نوتیفیکیشن‌

                                 <span class="info input" id="campaignLinkSelector" data-tippy> <i class="fas fa-question"></i> </span>

                                 <div id="campaignLinkHelp" class="disn">
                                   <p> شما می‌توانید لینکی را تعیین نمایید تا در صورت کلیک روی نوتیفیکیشن، کاربر به لینک (صفحه) مورد نظر شما ارسال گردد. </p>
                                 </div>


                             </label>
                            <input type="text" class="form-control notifLink" onfocus="clearActions(1,3)" onkeyup="realType(this.value,1,3)" name="notifLink1" id="notifLink1" placeholder="https://blinkco.net/">

                            <div onclick="test(1,3,3)" class="selectLink notifLinkSelectLink1" style="display:none">

                              <p id="notifLinkInput1">
                              </p>

                              <span>
                                ثبت لینک
                              </span>

                              <div class="clear"></div>

                            </div>


                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                </div> <!-- grid -->



              </div> <!-- row -->



              <div class="formFooter">

                <a href="javascript:;" name="preStep" id="preStep" onclick="campaignSteps(0,'pre')" class="btn btn-lg preButton" style="display: none"> مرحله قبل </a>

                <a href="javascript:;" name="nextStep" id="nextStep" onclick="campaignSteps(1,'next')" class="btn btn-lg btn-fill nextButton"> مرحله بعد  > </a>

                <a href="javascript:;" name="submitForm" id="submitEditForm" onclick="campaignSteps(1,'end')" class="btn btnSuccess btn-lg disb nextButton" style="margin-left: 15px"> ویرایش و اجرای کمپین </a>

              </div> <!-- form footer -->





              <!-- modal windows -->

              <!-- recent activity modal -->

              <div class="modalOption campaignModal" id="raModal">

                <div class="modalHeader">

                  <div class="titles section" style="border: none">

                    <h4> نمایش آخرین فعالیت‌ها </h4>

                    <p> نمایش آخرین افرادی که در یک بازه زمانی مشخص از بازدیدکننده به خریدار تبدیل شده‌اند. </p>

                  </div> <!-- title -->


                </div> <!-- modal header -->

                <div class="notifSection section">

                  <div class="sabetmikonimNotifBody">
                  <div class="notification">
                      <div>
                          <div class="recentActivity">
                              <div class="notifIcon">
                                <img src="https://sabetmikonim.com/core/assets/sabetmikonim/img/face-1.jpg" id="user_pic" alt="person Pic" style="border: 1px dashed #333">
                              </div>
                              <div class="notifContentBody">

                                <div class="notifName">
                                  <span id="notifName"> محمد امین مجیدی </span>
                                  <span id="notifLocation"> از تهران </span>
                                </div>
                                <div class="clear"></div>
                                 <div class="notifDescContents">
                                   <span class="notifDesc" id="notifDesc"> </span>
                                   <span class="notifDate"> <span id="notifDate">۳ دقیقه قبل</span></span>


                                   <span class="sabetMikonim">
                                     <span class="icon"> <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><style>.sbmSVG1{fill:none;}.sbmSVG2{fill:#377bff;}</style></defs><title>sabetMikonim Verified</title><path class="sbmSVG1" d="M0,0H48V48H0Z" transform="translate(0 0)"/><path class="sbmSVG2" d="M24,4A20,20,0,1,0,44,24,20,20,0,0,0,24,4ZM20,34,10,24l2.83-2.83L20,28.34,35.17,13.17,38,16Z" transform="translate(0 0)"/></svg> </span>
                                      تایید توسط <a href="https://sabetmikonim.com/panel/" name="sabetMikonimCopyRight" rel="کپی رایت ثابت میکنیم"> ثابت میکنیم </a>
                                    </span>
                                  <div class="clear"></div>
                                 </div>

                              </div>
                              <a href="#" class="more" name="campaignLink" data-link="" data-cid="" target="_blank"> لینک کمپین </a>
                            </div>
                      </div>
                  </div>
                  </div>

                </div> <!-- notif section -->


                <div class="section">

                  <div class="title">

                    <h5>

                       پیام کمپین

                       <span class="info input" id="recentActivityMSG" data-tippy> <i class="fas fa-question"></i> </span>

                       <div id="recentActivityMSGHelp" class="disn">
                         <p> این پیام مستقیما در نوتیفیکیشن‌های روی سایت شما مشابه نمونه بالای این صفحه نمایش داده می‌شود. </p>
                       </div>

                     </h5>

                  </div> <!-- title -->

                  <div class="container">


                    <input type="text" name="raMessage" onkeyup="realNotif(this.value,1,1)">


                  </div> <!-- container -->

                </div> <!-- section -->



                <div class="section" style="padding-bottom: 0">

                  <div class="title">

                    <h5> قوانین نمایش </h5>

                  </div> <!-- title -->

                  <div class="optionsBody">

                    <div class="inlineOption flex-inline">

                      <div class="flex-inline-col"> نمایش </div>
                      <div class="flex-inline-col"> <input type="text" name="lastConversions" value=""> </div>
                      <div class="flex-inline-col"> نوتیفیکشن آخر </div>

                      <span class="info input" id="lastConversionSelector" data-tippy> <i class="fas fa-question"></i> </span>

                      <div id="lastConversionHelp" class="disn">
                        <p> با وارد کردن تعداد، آخرین تعداد نوتیفیکیشن‌هایی که تا الان ثبت شده است، نمایش داده خواهد شد. </p>
                      </div>

                    </div> <!-- inline option -->

                    <div class="inlineOption flex-inline">

                      <div class="flex-inline-col"> نمایش تبدیل‌های </div>
                      <div class="flex-inline-col"> <input type="text" name="lastConversionsByDay" value=""> </div>
                      <div class="flex-inline-col"> روز گذشته </div>

                      <span class="info input" id="lastConversionDaySelector" data-tippy> <i class="fas fa-question"></i> </span>

                      <div id="lastConversionDayHelp" class="disn">
                        <p> با وارد کردن تعداد روز گذشته، تنها نوتیفیکیشن‌هایی که در این چند روز اخیر ثبت شده است، نمایش داده خواهد شد. </p>
                      </div>

                    </div> <!-- inline option -->

                    <div class="inlineOption flex-inline">

                      <div class="flex-inline-col"> نمایش نوتیفیکیشن‌ها تنها در صورتی که حداقل </div>
                      <div class="flex-inline-col"> <input type="text" name="minConversions" value=""> </div>
                      <div class="flex-inline-col"> اعلان ثبت شده باشد. </div>


                      <span class="info input" id="minDisplaySelector" data-tippy> <i class="fas fa-question"></i> </span>

                      <div id="minDisplayHelp" class="disn">
                        <p> تا زمانی که این تعداد نوتیفیکیشن ثبت نشده باشد، هیچ نوتیفکیشنی روی سایت شما نمایش داده نخواهد شد </p>
                      </div>

                    </div> <!-- inline option -->




                    <div class="inlineOption flex-inline">

                      <div class="col-md-8 noPaddingRight">

                        نمایش کاربران به صورت «ناشناس» در سایت

                      </div>

                      <div class="col-md-4 noPaddingLeft">

                        <div class="checkBodySwitch" id="anonymousNotifOption">

                          <span style="padding-left: 5px"> غیرفعال </span>

                          <input type="checkbox" class="switchdemo" name="anonymousNotif">

                          <span style="padding-right: 5px"> فعال </span>

                        </div> <!-- checkbox switch -->

                      </div>

                    </div> <!-- inline option -->



                    <div class="inlineOption">

                      <div class="col-md-8 noPaddingRight">

                        لیست نوتیفیکیشن‌ها تکرار شود

                      </div>

                      <div class="col-md-4 noPaddingLeft">

                        <div class="checkBodySwitch" id="raCampaignLoopOption">

                          <span style="padding-left: 5px"> غیرفعال </span>

                          <input type="checkbox" class="switchdemo" name="raCampaignLoop" checked>

                          <span style="padding-right: 5px"> فعال </span>

                        </div> <!-- checkbox switch -->

                      </div>

                    </div> <!-- inline option -->



                    <div class="clear"></div>

                  </div> <!-- options body -->

                  <footer class="modalFooter">

                    <a href="#" name="closeModal" class="btn btn-fill"> ذخیره تنظیمات </a>

                  </footer>

                </div> <!-- section -->



              </div> <!-- modal -->

              <!-- recent activity modal -->






              <!-- hot streak modal -->

              <div class="modalOption" id="hsModal">

                <div class="modalHeader">

                  <div class="titles section">

                    <h4> آمار داغ </h4>

                     <p> نمایش افرادی که در یک مدت زمان خاص از خدمات شما استفاده کرده‌اند و یا در سایت ثبت نام نموده‌اند و ... . </p>

                  </div> <!-- title -->


                <div class="notifSection section">

                  <div class="sabetmikonimNotifBody">
                    <div class="notification">

                      <div class="hotStreak notifKind">

                        <div class="notifIcon">

                          <svg id="Capa_1" width="40px" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 572.8 572.8"><defs><style>.hs-1{fill:#ffebee;}.hs-2{fill:#d30915;}.hs-3{fill:#f1453d;}</style></defs><title>flaticon1529395761-svg</title><circle class="hs-1" cx="286.4" cy="286.4" r="286.4"/><rect class="hs-2" x="223.3" y="318.2" width="107.4" height="142.3"/><path class="hs-3" d="M553.3,448.6c-4.3-55.4-30-90-52.8-120.7-21.1-28.3-39.2-52.8-39.2-88.9a7.81,7.81,0,0,0-4.2-6.9,7.68,7.68,0,0,0-8,.6c-34.1,24.4-62.6,65.6-72.6,104.9-6.9,27.4-7.8,58.1-8,78.4-31.5-6.7-38.7-53.9-38.8-54.4a8,8,0,0,0-4-5.7,7.84,7.84,0,0,0-7-.1c-1.7.8-40.6,20.6-42.9,99.6-.2,2.6-.2,5.3-.2,7.9,0,76.7,62.4,139.2,139.2,139.2h.4c76.6-.2,138.8-62.6,138.8-139.2C554,459.4,553.3,448.6,553.3,448.6ZM414.9,586.9c-25.6,0-46.4-22.2-46.4-49.4,0-.9,0-1.9.1-3,.3-11.5,2.5-19.3,4.9-24.6,4.5,9.6,12.5,18.5,25.5,18.5a7.7,7.7,0,0,0,7.7-7.7c0-11,.2-23.7,3-35.2,2.4-10.2,8.3-21,15.7-29.6,3.3,11.3,9.7,20.4,15.9,29.2,8.9,12.7,18.2,25.9,19.8,48.3.1,1.3.2,2.7.2,4.1C461.3,564.8,440.4,586.9,414.9,586.9Z" transform="translate(-130.5 -126.4)"/></svg>

                        </div>

                        <div class="notifContent">

                          <div class="hotStreakContent">

                            <span class="count"> 523 <span id="hsOptionCount"> وبمستر </span> </span>
                            <span class="notifDesc">
                              در <span id="hsOptionTime"> ۲۴ ساعت </span> گذشته <span id="hsOptionAction"> در دوره ما شرکت کرده‌اند </span>


                              <span class="sabetMikonim">

                                <span class="icon"> <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><style>.sbmSVG1{fill:none;}.sbmSVG2{fill:#377bff;}</style></defs><title>sabetMikonim Verified</title><path class="sbmSVG1" d="M0,0H48V48H0Z" transform="translate(0 0)"/><path class="sbmSVG2" d="M24,4A20,20,0,1,0,44,24,20,20,0,0,0,24,4ZM20,34,10,24l2.83-2.83L20,28.34,35.17,13.17,38,16Z" transform="translate(0 0)"/></svg> </span>
                                 تایید توسط <a href="#"> ثابت میکنیم </a>

                             </span>

                            </span>

                          </div>


                        </div>

                        <div class="clear"></div>

                        <a href="#" class="more" name="campaignLink" data-link="" data-cid="" target="_blank"> لینک کمپین </a>

                    </div>

                  </div>
                  </div>

                </div> <!-- notif section -->

                </div> <!-- modal header -->




                <div class="section">

                  <div class="title">

                    <h5> عنوان نمایش آمار داغ </h5>

                  </div> <!-- title -->

                  <div class="container">

                    <input type="text" name="hsMessage" onkeyup="realNotif(this.value,2,1)" value="در دوره ما شرکت کرده‌اند">


                  </div> <!-- container -->

                </div> <!-- section -->




                <div class="section">

                  <div class="title">

                    <h5> نام تبدیل‌ها </h5>

                  </div> <!-- title -->

                  <div class="container">

                    <input type="text" name="hsConversionName" onkeyup="realNotif(this.value,2,2)" value="وبمستر">


                  </div> <!-- container -->

                </div> <!-- section -->



                <div class="section" style="padding-bottom: 0">

                  <div class="title">

                    <h5> قوانین نمایش </h5>

                  </div> <!-- title -->

                  <div class="optionsBody">

                    <div class="inlineOption flex-inline">

                      <div class="flex-inline-col"> نمایش </div>
                      <div class="flex-inline-col">

                        <select class="hsPeople" name="hsPeopleKind" id="hsPeopleSelectKind">

                          <option value="visitor"> بازدیدکننده‌ها</option>
                          <option value="conversion"> تبدیل‌ها </option>

                        </select>

                       </div>
                      <div class="flex-inline-col"> در </div>

                      <div class="flex-inline-col">
                        <input type="radio" name="hsTimeRadio" id="twentyFourH" value="24h" checked>
                        <label for="twentyFourH" class="radioInput">

                          ۲۴ ساعت

                        </label>


                        <input type="radio" name="hsTimeRadio" id="sevenD" value="7d">
                        <label for="sevenD" class="radioInput">

                          ۷ روز

                        </label>

                        <input type="radio" name="hsTimeRadio" id="thirtyD" value="30d">
                        <label for="thirtyD" class="radioInput">

                          ۳۰ روز

                        </label>

                        گذشته

                      </div>

                    </div> <!-- inline option -->


                    <div class="clear"></div>

                  </div> <!-- options body -->

                  <footer class="modalFooter">

                    <a href="#" name="closeModal" class="btn btn-fill"> ذخیره تنظیمات </a>

                  </footer>

                </div> <!-- section -->




              </div> <!-- modal -->

              <!-- hot streak modal -->






              <!-- modal windows -->



            </form>


          </div>

          <div class="mask"></div>
          <div class="formsMask"></div>

        </div>



  </body>

  <!--   Core JS Files   -->
  <script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/bootstrap.min.js" type="text/javascript"></script>

  <script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/jquery.simpleswitch.min.js"></script>
  <script>

  $(".switchdemo").simpleSwitch();

</script>


<script type="text/javascript">

  tippy('#campaignNameHelpSelector', {
  html: '#campaignNameHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});



  tippy('#campaignOptionsSelector', {
  html: '#campaignOptionsHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});


  tippy('#campaignCaptureSelector', {
  html: '#campaignCaptureHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});


  tippy('#campaignEmailIdSelector', {
  html: '#campaignEmailIdHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});


  tippy('#campaignNameIdSelector', {
  html: '#campaignNameIdHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});


  tippy('#campaignDisplaySelector', {
  html: '#campaignDisplayHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});


  tippy('#campaignLinkSelector', {
  html: '#campaignLinkHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});


  tippy('#recentActivityMSG', {
  html: '#recentActivityMSGHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});


  tippy('#lastConversionSelector', {
  html: '#lastConversionHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});


  tippy('#lastConversionDaySelector', {
  html: '#lastConversionDayHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});


  tippy('#minDisplaySelector', {
  html: '#minDisplayHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});


  tippy('#ownNotifSelector', {
  html: '#ownNotifHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});

</script>


</html>


<?php ob_end_flush(); ?>
