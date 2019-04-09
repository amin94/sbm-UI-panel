<?php
ob_start();
session_start();
require_once('config.php');
require 'phpmailer/PHPMailerAutoload.php';

function unique_id($l = 20) {
  return substr(md5(uniqid(mt_rand(), true)), 0, $l);
}

$errors         = array();  	// array to hold validation errors
$data 			= array(); 		// array to pass back data

$con = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($con->connect_error) {

   $data['success'] = false;
   $errors['reason'] = "systemError";
   $errors["errorText"] = "Connection failed: " . $con->connect_error;
   $data['errors']  = $errors;

} else {


// validate the variables ======================================================
	// if any of these variables don't exist, add an error to our $errors array

$updatePackage = $_POST['updatePackage'];

if ($updatePackage=='false') {


  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $email = $_POST['email'];
  $passwd = $_POST['passwd'];
  $newPasswd = md5($passwd);
  $selectedPackage = "test";

  if (empty($name))
    $errors['name'] = 'نام و نام خانوادگی‌تان را وارد نمایید';
  if (empty($phone))
    $errors['phone'] = 'شماره موبایل‌تان را وارد نمایید';
  if (empty($email))
    $errors['email'] = 'آدرس ایمیل‌تان را وارد نمایید';
  if (empty($passwd))
    $errors['passwd'] = 'رمز عبورتان را وارد نمایید';



   $date = date('Y-m-d');



  // if there are any errors in our errors array, return a success boolean of false
  if ( ! empty($errors)) {
    // if there are items in our errors array, return those errors
    $data['success'] = false;
    $errors['reason'] = "fields";
    $data['errors']  = $errors;
  } else {
    // if there are no errors process our form, then return a message
    // DO ALL YOUR FORM PROCESSING HERE
    // THIS CAN BE WHATEVER YOU WANT TO DO (LOGIN, SAVE, UPDATE, WHATEVER)
    // show a message of success and provide a true success variable


    // generate uniqe user id
    $randomCounter = 1;
    while($randomCounter<($randomCounter+1)) {

      $userID = unique_id();


      $qry = mysqli_query($con, "SELECT * FROM users WHERE sId='$userID'");

      if (!$qry)
      {
          $data['success'] = false;
          $errors['reason'] = "systemError";
          $errors["errorText"] = 'mysql select user error for cid: ' . mysqli_error($con);
          $data['errors']  = $errors;
      }

      if(mysqli_num_rows($qry) > 0){

          // echo "cid already exists";

      }else{

          break;

      }

      $randomCounter++;

    }





// Processor & Adding To DB ===========================================================




// return a response ===========================================================

$qry = mysqli_query($con, "SELECT * FROM users WHERE email='$email'");

if (!$qry)
{
    $data['success'] = false;
    $errors['reason'] = "systemError";
    $errors["errorText"] = 'select from users error to check user exist or no: ' . mysqli_error($con);
    $data['errors']  = $errors;

}

if(mysqli_num_rows($qry) > 0){

  $errors['email'] = 'ایمیل وارد شده قبلا در سیستم ثبت شده است. قبلا ثبت نام کرده اید؟ <a href="http://amins-macbook-pro.local:5757/sabetmikonimv2//"> وارد شوید </a>';
  $data['success'] = false;
  $errors['reason'] = "fields";
  $data['errors']  = $errors;

}else{

  $sql = "INSERT INTO users (sId,email,password,name,mobile,date,intgVerify,getstart_status,last_package,status)
    VALUES ('$userID','$email','$newPasswd','$name','$phone','$date','false','true','$selectedPackage','test')";

    if ($con->query($sql) === TRUE) {



      // find package detail
      $packageQry = mysqli_query($con, "SELECT * FROM packages WHERE package_name='$selectedPackage'");

      if (!$packageQry)
      {
          $data['success'] = false;
          $errors['reason'] = "systemError";
          $errors["errorText"] = 'mysql error for select packages: ' . mysqli_error($con);
          $data['errors']  = $errors;
      } else {

      if(mysqli_num_rows($packageQry) > 0){

        $packageDetail=mysqli_fetch_row($packageQry);

        $packageDetailExpire = $packageDetail[3];
        $packageDetailVisitor = $packageDetail[4];


        $sql = "INSERT INTO buy_packages (sId,package_name,date,package_expire,package_visitor,used,status,authority,ref_id)
          VALUES ('$userID','$selectedPackage','$date','$packageDetailExpire','$packageDetailVisitor','0','active','test','test')";

          if ($con->query($sql) === TRUE) {

            $data['userID'] = $userID;
            $data['email'] = $email;

            $data['success'] = true;
            $data['message'] = 'Success!';



            // send verfication email
            $emailVerifyLink = 'http://amins-macbook-pro.local:5757/sabetmikonimv2/index.php?acc='.$userID.'&req=emailVerify';

              $verifyLink = $emailVerifyLink;
              ob_start();
              include "email.phtml";
              $msgBody = ob_get_contents();
              ob_end_clean();

          // $msgBody = render_email($emailVerifyLink);

            $mail = new PHPMailer(true);
            $mail->IsSMTP();
            try {
              $mail->Host       = "smtp.gmail.com";
              $mail->SMTPAuth   = true;
              $mail->SMTPSecure = "tls";
              $mail->Port       = 587;
              $mail->Username   = "sabetmikonim97@gmail.com";
              $mail->Password   = "AMIN_majidi97";
              $mail->AddReplyTo('no-reply@sabetmikonim.com', 'گروه ثابت میکنیم');
              $mail->AddAddress($email);
              $mail->SetFrom('no-reply@sabetmikonim.com', 'گروه ثابت میکنیم'); //
              $mail->Subject = 'فعالسازی ایمیل در سرویس ثابت میکنیم';
              $mail->AltBody = 'برنامه شما از این ایمیل پشتیبانی نمی کند، برای دیدن آن، لطفا از برنامه دیگری استفاده نمائید'; // متنی برای کاربرانی که نمی توانند ایمیل را به درستی مشاهده کنند
              $mail->CharSet = 'UTF-8';
              $mail->ContentType = 'text/html';
              $mail->MsgHTML($msgBody); // متن پیام به صورت html
              //$mail->AddAttachment('images/phpmailer.gif'); // ضمیمه کردن فایل
              $mail->Send();
            }
            catch (phpmailerException $e) {
                $data['success'] = false;
                $errors['reason'] = "emailError";
                $errors["errorText"] = $e->errorMessage();
                $data['errors']  = $errors;
            }
            catch (Exception $e) {
                $data['success'] = false;
                $errors['reason'] = "emailError";
                $errors["errorText"] = $e->getMessage();
                $data['errors']  = $errors;
            }




          } else {
            $data['success'] = false;
            $errors['reason'] = "systemError";
            $errors["errorText"] = 'error add package to buy table!: ' . mysqli_error($con);
            $data['errors']  = $errors;
          }


      }

  }

    } else {
      $data['success'] = false;
      $errors['reason'] = "systemError";
      $errors["errorText"] = 'insert to users db error: ' . mysqli_error($con);
      $data['errors']  = $errors;
    }

}





  }


} elseif ($updatePackage=='resendEmail') {

  $email = $_POST['email'];
  $userID = $_POST['userID'];

  $emailVerifyLink = 'http://amins-macbook-pro.local:5757/sabetmikonimv2/index.php?acc='.$userID.'&req=emailVerify';

  function render_email($verifyLink) {
  ob_start();
  include "email.phtml";
  return ob_get_contents();
}

$msgBody = render_email($emailVerifyLink);

  $mail = new PHPMailer(true);
  $mail->IsSMTP();
  try {
    $mail->Host       = "smtp.gmail.com";
    $mail->SMTPAuth   = true;
    $mail->SMTPSecure = "tls";
    $mail->Port       = 587;
    $mail->Username   = "sabetmikonim97@gmail.com";
    $mail->Password   = "AMIN_majidi97";
    $mail->AddReplyTo('no-reply@sabetmikonim.com', 'گروه ثابت میکنیم');
    $mail->AddAddress($email);
    $mail->SetFrom('no-reply@sabetmikonim.com', 'گروه ثابت میکنیم'); //
    $mail->Subject = 'فعالسازی ایمیل در سرویس ثابت میکنیم';
    $mail->AltBody = 'برنامه شما از این ایمیل پشتیبانی نمی کند، برای دیدن آن، لطفا از برنامه دیگری استفاده نمائید'; // متنی برای کاربرانی که نمی توانند ایمیل را به درستی مشاهده کنند
    $mail->CharSet = 'UTF-8';
    $mail->ContentType = 'text/html';
    $mail->MsgHTML($msgBody); // متن پیام به صورت html
    //$mail->AddAttachment('images/phpmailer.gif'); // ضمیمه کردن فایل
    $mail->Send();
  }
  catch (phpmailerException $e) {
      $data['success'] = false;
      $errors['reason'] = "emailError";
      $errors["errorText"] = $e->errorMessage();
      $data['errors']  = $errors;
  }
  catch (Exception $e) {
      $data['success'] = false;
      $errors['reason'] = "emailError";
      $errors["errorText"] = $e->getMessage();
      $data['errors']  = $errors;
  }

}

}

	// return all our data to an AJAX call
	echo json_encode($data);
