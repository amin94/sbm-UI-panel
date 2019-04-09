<?php
ob_start();
session_start();
require_once('config.php');


$selectedPackage = $_POST['packageOption'];
$userID = $_SESSION['SM_id'];
$date = date('Y-m-d');


$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
if(!$link) {
die('error ' . mysql_error());
}

$db = mysql_select_db(DB_DATABASE);
if(!$db) {
die("error");
}


$qry="SELECT * FROM packages WHERE package_name='$selectedPackage'";
$result=mysql_query($qry);

if($result) {
  if(mysql_num_rows($result) == 1) {

    $packageDetail = mysql_fetch_assoc($result);

    $packageDetailExpire = $packageDetail['package_expire'];
    $packageDetailVisitor = $packageDetail['package_visitor'];
    $packageDetailPrice = $packageDetail['price'];
    $packageDetailName = $packageDetail['name'];

  }

}


$MerchantID = '96f05bde-61c0-11e8-8f20-005056a205be'; //Required
$Amount = $packageDetailPrice; //Amount will be based on Toman - Required
$Description = 'پکیج '.$packageDetailName.' سرویس ثابت میکنیم'; // Required
$CallbackURL = 'http://amins-macbook-pro.local:5757/sabetmikonimv2/pay_verify.php'; // Required


$client = new SoapClient('https://www.zarinpal.com/pg/services/WebGate/wsdl', ['encoding' => 'UTF-8']);

$result = $client->PaymentRequest(
[
'MerchantID' => $MerchantID,
'Amount' => $Amount,
'Description' => $Description,
'CallbackURL' => $CallbackURL,
]
);

//Redirect to URL You can do it also by creating a form
if ($result->Status == 100) {
Header('Location: https://www.zarinpal.com/pg/StartPay/'.$result->Authority);

mysql_query("INSERT INTO buy_packages (sId,package_name,date,package_expire,package_visitor,used,status,authority,ref_id) VALUES ('$userID','$selectedPackage','$date','$packageDetailExpire','$packageDetailVisitor','0','deactive','$result->Authority','0')");


//برای استفاده از زرین گیت باید ادرس به صورت زیر تغییر کند:
//Header('Location: https://www.zarinpal.com/pg/StartPay/'.$result->Authority.'/ZarinGate');
} else {
echo'ERR: '.$result->Status;
}
