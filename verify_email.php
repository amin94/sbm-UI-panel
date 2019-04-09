<?php
ob_start();
session_start();
require_once('config.php');

$email_send = $_POST['email'];

if ($email_send == 1) {

	$to = $_COOKIE['email'];
	$subject = "فعالسازی آدرس ایمیل";

	$message = "
	<html>
	<head>
	<title>HTML email</title>
	</head>
	<body>
	<p>This email contains HTML Tags!</p>
	<table>
	<tr>
	<th>Firstname</th>
	<th>Lastname</th>
	</tr>
	<tr>
	<td>John</td>
	<td>Doe</td>
	</tr>
	</table>
	</body>
	</html>
	";

	// Always set content-type when sending HTML email
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

	// More headers
	$headers .= 'From: <support@amark.ir>' . "\r\n";
	$headers .= 'Cc: aminmajidi96@gmail.com' . "\r\n";

	mail($to,$subject,$message,$headers);

	}


?>