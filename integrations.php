<script type="text/javascript">
  var thisPage = 'integrationMenu';
</script>

<?php

  require("header.php");
  ob_start();
  session_start();

 ?>

 <script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/integrations.js?v=1.0.0"></script>

    <div class="main-panel intgContent">

        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-9" style="margin:auto; float: none">

                        <!-- user information -->
                        <div class="card">
                            <div class="intgHeader">
                                <h1 class="title"> اتصال به سایت </h1>

                                <p>
                                    با استفاده از راهنمای زیر می‌توانید سرویس ثابت میکنیم را به راحتی به وب‌سایت‌تان متصل نمایید. در صورت وجود هرگونه مشکل
                                    از طریق چت آنلاین با پشتیبانی در تماس باشید.
                                </p>

                            </div>
                            <div class="content">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label> ۱- کد زیر را کپی کرده و در فوتر سایت کپی نمایید. </label>
                                                <p> کد زیر را در صفحاتی که میخواهید اطلاعات فرم در آن ثبت شود و یا قصد نمایش نوتیفیکیشن در آن صفحه را دارید، قرار دهید. (معمولا با قرار دادن کد در فایل فوتر، این کد در همه صفحات به صورت خودکار درج می‌شود.) </p>
                                                <input type="text" class="form-control" name="sabetMikonimIntg" readonly="readonly" value="">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">



                                          <div id="connectionStatusBody" class="connectionStatus">

                                            <span id="connectionStatusText"></span>

                                            <span class="lastConnect disn" id="lastConnectText">  </span>

                                          </div>
                                        </div>
                                    </div> <!-- row -->


                                    <div class="row" style="margin-top:25px;">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label> ۲- وبسایت‌تان متصل نشد؟ </label>
                                                <p> در صورت متصل نشدن سایت، لطفا با ایمیل <a href="mailto:support@sabetmikonim.com"> support@sabetmikonim.com </a> و یا <a href="#" onclick="$crisp.push(['do', 'chat:open']);"> چت آنلاین ما </a> در ارتباط باشید.  </p>
                                            </div>
                                        </div>
                                    </div>

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
