<script type="text/javascript">
  var thisPage = 'profilesMenu';
</script>


<?php
  require("header.php");
 ?>

 <script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/profile.js?v=1.0.0"></script>


    <div class="main-panel panelPageBody">

        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-9" style="margin:auto; float: none">

                        <!-- user information -->

                        <div class="cardOutHeader">
                          <h3> پروفایل شما </h3>
                        </div> <!-- card out header -->



                        <div class="card">


                          <div class="settingHeader slot">
                                <div class="col-xs-12 col-md-6 noPaddingRight"> <h4 class="title"> اطلاعات پروفایل </h4> </div>
                                <div class="clear"></div>
                            </div>



                            <div class="content">

                              <form id="profileEditForm" method="post">

                                <div class="row">

                                  <div class="col-md-12">
                                    <div class="form-group" id="emailGroup">
                                      <label>

                                         آدرس ایمیل

                                      </label>

                                      <input type="text" class="form-control" name="userEmail" disabled value="">

                                    </div>
                                  </div>

                                </div>



                                <div class="row">
                                  <div class="col-md-6">
                                    <div class="form-group" id="nameGroup">
                                      <label>

                                         نام و نام خانوادگی

                                      </label>

                                      <input type="text" class="form-control" name="userName" value="">

                                    </div>
                                  </div>
                                  <div class="col-md-6">
                                    <div class="form-group" id="mobileGroup">
                                      <label>

                                         شماره موبایل

                                      </label>

                                      <input type="text" class="form-control" name="userMobile" value="">

                                    </div>
                                  </div>
                                </div>



                                <div class="cardButtons">

                                  <button type="submit" name="saveProfileSettings" class="btn btn-fill"> بروز رسانی‌ اطلاعات پروفایل </button>

                                </div>


                              </form>


                            </div> <!-- content -->

                        </div> <!-- card -->






                        <div class="card">

                          <div class="settingHeader slot">
                                <div class="col-xs-12 col-md-6 noPaddingRight"> <h4 class="title"> تغییر رمز عبور </h4> </div>
                                <div class="clear"></div>
                            </div>

                            <div class="content">


                              <form id="changePassForm" method="post">

                                <div class="row">

                                  <div class="col-md-12">
                                    <div class="form-group" id="oldPassGroup">
                                      <label>

                                         رمز عبور فعلی

                                      </label>

                                      <input type="password" class="form-control" name="oldPass" placeholder="****">

                                    </div>
                                  </div>

                                </div>

                                <div class="row">
                                  <div class="col-md-6">
                                    <div class="form-group" id="newPass1Group">
                                      <label>

                                         رمز عبور جدید

                                      </label>

                                      <input type="password" class="form-control" name="newPass" placeholder="****">

                                    </div>
                                  </div>
                                  <div class="col-md-6">
                                    <div class="form-group" id="repeatNewPassGroup">
                                      <label>

                                         تکرار رمز عبور جدید

                                      </label>

                                      <input type="password" class="form-control" name="repeatNewPass" placeholder="****">

                                    </div>
                                  </div>
                                </div>


                                <div class="cardButtons">

                                  <button type="submit" name="changePass" class="btn btn-fill"> تغییر رمز عبور </button>

                                </div>


                              </form>


                            </div> <!-- content -->

                        </div> <!-- card -->








                    </div> <!-- grid -->


                </div> <!-- row -->



            </div>
        </div>


    </div>
</div>


</body>


    <!--   Core JS Files   -->
    <script src="http://amins-macbook-pro.local:5757/sabetmikonimv2/assets/js/bootstrap.min.js" type="text/javascript"></script>



</html>
