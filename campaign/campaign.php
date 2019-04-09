<?php
require("../header.php");
 ?>‎

 <!-- <script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/campaignModal.js"></script> -->
 <script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/campaign/create-campaign.js"></script>

<div class="main-panel">

  <div class="campaignHeader">

    <h2> یک کمپین جدید بسازید </h2>

  </div> <!-- campaign header -->

  <div class="secondCampaignNav">

    <div class="crumbsGrid">

      <div id="crumbs" class="crumbsList">

        <ul>
          <li>
            <a href="javascript:;" onclick="createView({contentId: 'campaignTypes'},true);" class="crumbLink secondLink disn" id="3"> انتخاب نوع کمپین </a>
          </li>
          <li>
            <a href="javascript:;" onclick="createView({contentId: 'subType'},true);" class="crumbLink secondLink disn" id="4"> انتخاب ابزار </a>
          </li>
          <li>
            <a href="javascript:;" onclick="createView({contentId: 'toolDesc'},true);" class="crumbLink secondLink disn" id="5"> مشاهده ابزار </a>
          </li>
          <li>
            <a href="javascript:;" onclick="createView({contentId: 'toolCustomForm'},true);" class="crumbLink secondLink disn" id="6"> تنظیمات اتصال ابزار </a>
          </li>
          <li>
            <a href="javascript:;" onclick="createView({contentId: 'toolSettings'},true);" class="crumbLink secondLink disn" id="7"> نوع نوتیفیکیشن </a>
          </li>
          <li>
            <a href="javascript:;" onclick="createView({contentId: 'toolDisplayPages'},true);" class="crumbLink secondLink disn" id="8"> تنظیمات کمپین </a>
          </li>
        </ul>

      </div>


      <!-- <div id="secondCrumbs" class="crumbsList disn">

        <ul>
          <li>
            <a href="javascript:;" class="crumbLink secondLink" id="3"> انتخاب نوع کمپین </a>
          </li>
          <li>
            <a href="javascript:;" class="crumbLink secondLink" id="4"> انتخاب ابزار </a>
          </li>
          <li>
            <a href="javascript:;" class="crumbLink secondLink" id="5"> مشاهده ابزار </a>
          </li>
          <li>
            <a href="javascript:;" class="crumbLink secondLink" id="6"> تنظیمات اتصال ابزار </a>
          </li>
          <li>
            <a href="javascript:;" class="crumbLink secondLink" id="7"> نوع نوتیفیکیشن </a>
          </li>
          <li>
            <a href="javascript:;" class="crumbLink secondLink" id="8"> تنظیمات کمپین </a>
          </li>
        </ul>

      </div> -->

    </div> <!-- col 12 -->

  </div> <!-- secondCampaignNav -->

  <div class="content newCampaignBody" style="position: relative; padding-bottom: 100px">
    <div class="container-fluid" id="registerContent">




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

<!--  Notifications Plugin    -->
<script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/bootstrap-notify.js"></script>


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


  tippy('#campaignCaptureFieldsSelector', {
  html: '#campaignCaptureFieldsHelp',
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
