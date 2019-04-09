<?php
require_once("header.php");
ob_start();
session_start();

?>‎

<script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/dashboard.js"></script>



<div class="main-panel">

  <div class="container">


    <div id="pageBodyContent">



    </div>


  </div>

</div>














  <div class="modalOption" id="modalOptionBody" data-cid="">

    <div class="modalHeader">

      <div class="titles section" style="border-bottom: none">

        <div class="col-md-6 noPaddingLeft noPaddingRight">

          <h4 id="campaignDetailName"></h4>

        </div> <!-- grid -->

        <div class="col-md-6 noPaddingLeft noPaddingRight">

          <div class="checkBodySwitch" id="campaignStatusSwitch">

            <span style="padding-left: 5px"> غیرفعال </span>

            <input type="checkbox" class="switchdemo" name="campaignStatusSwitch" value="active">

            <span style="padding-right: 5px"> فعال </span>

          </div> <!-- checkbox switch -->

        </div> <!-- grid -->

      </div> <!-- title -->

    </div> <!-- modal header -->

    <div class="modalRow">

      <div class="modalButtons">

        <a href="" name="editCampaign" class="btn btn-fill"> ویرایش کمپین </a>

        <a href="javascript:;" data-cid="" name="deleteCampaign" class="btn btn-danger"> حذف کمپین </a>

      </div> <!-- modal buttons -->



      <div class="card">



        <div class="content">
          <div class="row">

              <div class="col-xs-6 col-md-3">

                <div class="statisticsContent">

                    <div class="headerBoxTitle">
                      <h5>

                         بازدید صفحات


                         <span class="info input" id="pageViewsSelector" data-tippy> <i class="fas fa-question"></i> </span>

                         <div id="pageViewsHelp" class="disn">
                           <p> تعداد بازدید صفحاتی که در آن نوتیفیکیشن‌های این کمپین نمایش داده می‌شود. </p>
                         </div>

                       </h5>
                    </div>

                    <div class="boxStatistics">
                      <span id="campaignPageViews"> </span>
                    </div>



                </div> <!-- statisticsContent -->

              </div> <!-- grid -->



              <div class="col-xs-6 col-md-3">

                <div class="statisticsContent">

                    <div class="headerBoxTitle">
                      <h5>

                         تعداد بازدیدکننده


                         <span class="info input" id="uniqueVisitorSelector" data-tippy> <i class="fas fa-question"></i> </span>

                         <div id="uniqueVisitorHelp" class="disn">
                           <p> تعداد بازدیدکننده‌های منحصر بفرد که صفحات نمایش نوتیفیکیشن‌ها را مشاهده کرده‌اند.</p>
                         </div>

                       </h5>
                    </div>

                    <div class="boxStatistics">

                      <span id="campaignVisitors"></span>

                    </div>



                </div> <!-- statisticsContent -->

              </div> <!-- grid -->



              <div class="col-xs-6 col-md-3">

                <div class="statisticsContent">

                    <div class="headerBoxTitle">
                      <h5>

                            تعداد کلیک

                            <span class="info input" id="clicksSelector" data-tippy> <i class="fas fa-question"></i> </span>

                            <div id="clicksHelp" class="disn">
                              <p> تعداد کلیک‌هایی که روی نوتیفیکیشن‌های شما شده است. </p>
                            </div>

                       </h5>
                    </div>

                    <div class="boxStatistics">

                      <span id="campaignClicks"> </span>

                      <span class="CTRBoxStatistics" id="CTRBoxStatistics">

                          <?php

                              $ctr = ($campaign["clicks"]/$campaign['visitors'])*100;

                              $formattedAmount = number_format($ctr, 2);
                              echo $formattedAmount.'%';

                           ?>

                      </span>
                    </div>



                </div> <!-- statisticsContent -->

              </div> <!-- grid -->




              <div class="col-xs-6 col-md-3">

                <div class="statisticsContent">

                    <div class="headerBoxTitle">
                      <h5>

                            مخاطبان

                            <span class="info input" id="contactsSelector" data-tippy> <i class="fas fa-question"></i> </span>

                            <div id="contactsHelp" class="disn">
                              <p> تعداد کاربرانی که توسط «ثابت میکنیم» اطلاعاتشان ثبت شده است. </p>
                            </div>

                       </h5>
                    </div>

                    <div class="boxStatistics">
                      <span id="campaignContactsCount"> </span>
                    </div>



                </div> <!-- statisticsContent -->

              </div> <!-- grid -->




          </div>


        </div>

      </div>






      <div class="card listCard websiteList">
        <div class="header">
          <h4 class="title"> لینک صفحات حاوی فرم برای دریافت اطلاعات </h4>

        </div>
        <div class="content">
          <div class="row" id="campaignCaptureLinks">


          </div>


        </div>

      </div>


      <div class="card listCard websiteList">
        <div class="header">
          <h4 class="title"> لینک صفحاتی که نوتیفیکشن‌ها در آن نمایش داده می‌شود </h4>

        </div>
        <div class="content">
          <div class="row" id="campaignDisplayLinks">


          </div>


        </div>

      </div>






    <div class="card listCard">
      <div class="header">
        <h4 class="title pullRight"> لیست مخاطبان </h4>

        <a href="javascript:;" onclick="submitMultipleDelete()" name="submitMultipleDelete" class="whiteBtn pullLeft disn"> <span class="icon" style="margin-left: 5px"> <i class="fas fa-trash-alt"></i> </span> حذف مخاطبان انتخاب شده </a>

        <div class="clear"></div>

      </div>
      <div class="content">
        <div class="row" id="campaignContactsBody">





     </div> <!-- row -->

   </div> <!-- content -->

 </div> <!-- card -->




      <p class="campaignID"> شناسه کمپین: <span id="campaignID"></span> </p>

    </div> <!-- row -->


  </div> <!-- modal -->







</body>


<!--   Core JS Files   -->
<script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/bootstrap.min.js" type="text/javascript"></script>

<script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/jquery.simpleswitch.min.js"></script>
<script>

$(".switchdemo").simpleSwitch();

</script>






<script type="text/javascript">

  tippy('#pageViewsSelector', {
  html: '#pageViewsHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});

  tippy('#uniqueVisitorSelector', {
  html: '#uniqueVisitorHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});

  tippy('#clicksSelector', {
  html: '#clicksHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});

  tippy('#contactsSelector', {
  html: '#contactsHelp',
  arrow: true,
  arrowType: 'round',
  maxWidth: '250px',
  interactive: true,
});

</script>



</html>


<?php ob_end_flush(); ?>
