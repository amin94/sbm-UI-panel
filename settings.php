<script type="text/javascript">
  var thisPage = 'settingsMenu';
</script>


<?php
  require("header.php");
 ?>

 <script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/settings.js?v=1.0.0"></script>


    <div class="main-panel settingsContent">

        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-9" style="margin:auto; float: none">

                        <!-- user information -->

                        <div class="cardOutHeader">
                          <h3> پکیج شما </h3>
                        </div> <!-- card out header -->

                        <div class="card">
                            <div class="settingHeader slot">
                                <div class="col-xs-12 col-md-6 noPaddingRight"> <h4 class="title" id="settingsPackageName">  </h4> </div>
                                <div class="col-xs-12 col-md-6 noPaddingLeft"> <p id="settingsPackagePrice">  </p> </div>

                                <div class="clear"></div>
                            </div>
                            <div class="content">

                                    <div class="row slot">

                                            <p> <strong id="packageDateOffset"> </strong> تا پایان پکیج فعلی شما باقیمانده است. </p>

                                    </div> <!-- row -->


                            </div>
                        </div>



                        <!-- uniqe visitor counter -->
                        <div class="card">
                            <div class="settingHeader slot">

                                 <h4 class="title"> تعداد بازدیدکننده‌ها در پکیج فعلی </h4>

                                <div class="clear"></div>
                            </div>
                            <div class="content">

                                    <div class="row slot">

                                      <div class="progress">
                                        <div class="progress-bar progress-bar-striped active" id="packageUsageProgressBar" role="progressbar"
                                        aria-valuenow="" aria-valuemin="0" aria-valuemax="100">

                                        </div>
                                      </div>

                                      <div class="visitorDetails">

                                        <div class="col-xs-12 col-md-4">
                                          <span id="packageDetailVisitorUsed"> </span>
                                          <p> بازدیدکننده واقعی </p>
                                        </div>

                                        <div class="col-xs-12 col-md-4">
                                          <span id="packageDetailVisitorDifference"> </span>
                                          <p> استفاده شده </p>
                                        </div>

                                        <div class="col-xs-12 col-md-4">
                                          <span id="packageDetailVisitor"></span>
                                          <p> ظرفیت بازدیدکننده پکیج </p>
                                        </div>

                                      </div>

                                    </div> <!-- row -->


                            </div>
                        </div>


                    </div>


                </div>
            </div>
        </div>


    </div>
</div>


</body>

<script type="text/javascript">

$(document).ready(function() {

    $("input[name='sabetMikonimIntg']").on("click", function () {
       $(this).select();
    });

});

</script>

    <!--   Core JS Files   -->
    <script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/bootstrap.min.js" type="text/javascript"></script>

</html>
