<?php
ob_start();
session_start();

	// setcookie('email', '', time() - 3600, "/");
	// setcookie('name', '', time() - 3600, "/");
	// setcookie('acc_type', '', time() - 3600, "/");

	unset($_SESSION['SM_id']);
	unset($_SESSION['SM_email']);
	unset($_SESSION['SM_name']);
	unset($_SESSION['emailVerify']);
	unset($_SESSION['SM_expire']);
	unset($_SESSION['SM_testProfile']);


	header("location: http://amins-macbook-pro.local:5757/sabetmikonimv2/");
	exit();

ob_end_flush();
?>
