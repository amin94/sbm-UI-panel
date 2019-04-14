<?php
ob_start();
session_start();
require_once('config.php');

$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
if(!$link) {
die('error ' . mysql_error());
}

$db = mysql_select_db(DB_DATABASE);
if(!$db) {
die("error");
}


$Authority = $_GET['Authority'];

$qry="SELECT * FROM buy_packages WHERE authority='$Authority'";
$result=mysql_query($qry);

if($result) {
  if(mysql_num_rows($result) == 1) {

    $buyPackageDetail = mysql_fetch_assoc($result);

    $buyPackageDetailName = $buyPackageDetail['package_name'];
    $buyPackageDetailUserID = $buyPackageDetail['sId'];

    $packageQry="SELECT * FROM packages WHERE package_name='$buyPackageDetailName'";
    $packageResult=mysql_query($packageQry);

    if($packageResult) {
      if(mysql_num_rows($packageResult) == 1) {

        $packageDetail = mysql_fetch_assoc($packageResult);

        $packageDetailPrice = $packageDetail['price'];

      }

    }



  }

}




$MerchantID = '96f05bde-61c0-11e8-8f20-005056a205be';
$Amount = $packageDetailPrice; //Amount will be based on Toman


if ($_GET['Status'] == 'OK') {

$client = new SoapClient('https://www.zarinpal.com/pg/services/WebGate/wsdl', ['encoding' => 'UTF-8']);

$result = $client->PaymentVerification(
[
'MerchantID' => $MerchantID,
'Authority' => $Authority,
'Amount' => $Amount,
]
);

if ($result->Status == 100) {
Header('Location: http://amins-macbook-pro.local:5757/sabetmikonimv2/app.php?pay_status=ok');

mysql_query("UPDATE buy_packages SET ref_id='$result->RefID',status='active' WHERE authority='$Authority'");
mysql_query("UPDATE users SET status='active',reason='',last_package='$buyPackageDetailName' WHERE sId='$buyPackageDetailUserID'");

$_SESSION['SM_expire'] = false;
unset($_SESSION['SM_testProfile']);
} else {
// system error cancel
Header('Location: http://amins-macbook-pro.local:5757/sabetmikonimv2/pay.php?pay_status=nok&cancel=error');
mysql_query("UPDATE buy_packages SET ref_id='fail' WHERE authority='$Authority'");
$_SESSION['SM_expire'] = true;
}
} else {

// cancel by user

Header('Location: http://amins-macbook-pro.local:5757/sabetmikonimv2/pay.php?pay_status=nok&cancel=user');
mysql_query("UPDATE buy_packages SET ref_id='fail' WHERE authority='$Authority'");
$_SESSION['SM_expire'] = true;

}





 ?>
